#!/usr/bin/env python3
"""
Kling AI Image Generation Helper Script

Usage:
    python3 kling-generate.py --prompt "..." --filename "image.png" --aspect_ratio "16:9"

    Batch mode (submit multiple, then poll all):
    python3 kling-generate.py --batch batch_config.json

Batch config JSON format:
[
    {"prompt": "...", "filename": "image.png", "aspect_ratio": "16:9"},
    ...
]
"""

import jwt
import time
import os
import sys
import json
import argparse
import urllib.request
import urllib.error
import ssl

# Kling API endpoints
API_BASE = "https://api.klingai.com/v1/images/generations"
MODEL_NAME = "kling-v1"
MAX_POLL_SECONDS = 90
POLL_INTERVAL = 5

# Output directory
OUTPUT_DIR = os.path.expanduser("~/zylos/workspace/jd-radiator-website/public/assets/ai-images")


def load_env():
    """Load environment variables from ~/zylos/.env if not already set."""
    env_path = os.path.expanduser("~/zylos/.env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, _, value = line.partition("=")
                    key = key.strip()
                    value = value.strip()
                    if key and key not in os.environ:
                        os.environ[key] = value


def generate_jwt_token():
    """Generate JWT bearer token for Kling API authentication."""
    load_env()
    access_key = os.environ.get("KLING_ACCESS_KEY")
    secret_key = os.environ.get("KLING_SECRET_KEY")
    if not access_key or not secret_key:
        raise RuntimeError("KLING_ACCESS_KEY and KLING_SECRET_KEY must be set in environment")

    now = int(time.time())
    payload = {
        "iss": access_key,
        "exp": now + 1800,
        "nbf": now - 5
    }
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token


def api_request(method, url, data=None, token=None):
    """Make an API request and return parsed JSON response."""
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)

    # Create SSL context
    ctx = ssl.create_default_context()

    try:
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP Error {e.code}: {error_body}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"  Request error: {e}", file=sys.stderr)
        return None


def submit_task(prompt, aspect_ratio, token):
    """Submit an image generation task. Returns task_id or None."""
    data = {
        "model_name": MODEL_NAME,
        "prompt": prompt,
        "n": 1,
        "aspect_ratio": aspect_ratio
    }

    resp = api_request("POST", API_BASE, data=data, token=token)
    if resp and resp.get("code") == 0:
        task_id = resp["data"]["task_id"]
        status = resp["data"]["task_status"]
        print(f"  Submitted: task_id={task_id}, status={status}")
        return task_id
    else:
        print(f"  Submit failed: {resp}", file=sys.stderr)
        return None


def poll_task(task_id, token, max_seconds=MAX_POLL_SECONDS):
    """Poll a task until completion. Returns image URL or None."""
    url = f"{API_BASE}/{task_id}"
    start = time.time()

    while time.time() - start < max_seconds:
        resp = api_request("GET", url, token=token)
        if resp and resp.get("code") == 0:
            status = resp["data"]["task_status"]
            if status == "succeed":
                images = resp["data"].get("task_result", {}).get("images", [])
                if images:
                    return images[0]["url"]
                print(f"  Task succeeded but no images found", file=sys.stderr)
                return None
            elif status == "failed":
                msg = resp["data"].get("task_status_msg", "unknown error")
                print(f"  Task failed: {msg}", file=sys.stderr)
                return None
            else:
                elapsed = int(time.time() - start)
                print(f"  Status: {status} ({elapsed}s elapsed)")
        else:
            print(f"  Poll error, retrying...")

        time.sleep(POLL_INTERVAL)

    print(f"  Timeout after {max_seconds}s", file=sys.stderr)
    return None


def download_image(url, filename):
    """Download image from URL to output directory. Returns filepath or None."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(OUTPUT_DIR, filename)

    ctx = ssl.create_default_context()
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
            with open(filepath, "wb") as f:
                f.write(resp.read())
        size_kb = os.path.getsize(filepath) / 1024
        print(f"  Downloaded: {filepath} ({size_kb:.0f} KB)")
        return filepath
    except Exception as e:
        print(f"  Download failed: {e}", file=sys.stderr)
        return None


def generate_single(prompt, filename, aspect_ratio):
    """Generate a single image end-to-end."""
    print(f"\n{'='*60}")
    print(f"Generating: {filename}")
    print(f"Aspect ratio: {aspect_ratio}")
    print(f"Prompt: {prompt[:80]}...")
    print(f"{'='*60}")

    token = generate_jwt_token()

    # Submit
    task_id = submit_task(prompt, aspect_ratio, token)
    if not task_id:
        return False

    # Poll
    image_url = poll_task(task_id, token)
    if not image_url:
        return False

    # Download
    result = download_image(image_url, filename)
    return result is not None


def generate_batch(configs):
    """Generate multiple images efficiently using batch submission + polling."""
    token = generate_jwt_token()

    # Phase 1: Submit all tasks
    tasks = []
    for cfg in configs:
        prompt = cfg["prompt"]
        filename = cfg["filename"]
        aspect_ratio = cfg["aspect_ratio"]

        print(f"\nSubmitting: {filename} ({aspect_ratio})")
        task_id = submit_task(prompt, aspect_ratio, token)
        tasks.append({
            "task_id": task_id,
            "filename": filename,
            "prompt": prompt,
            "status": "submitted" if task_id else "failed"
        })
        # Small delay between submissions to avoid rate limiting
        if task_id:
            time.sleep(0.5)

    # Phase 2: Poll all tasks
    print(f"\n{'='*60}")
    print(f"Polling {sum(1 for t in tasks if t['task_id'])} submitted tasks...")
    print(f"{'='*60}")

    pending = [t for t in tasks if t["task_id"]]
    start = time.time()

    while pending and (time.time() - start) < MAX_POLL_SECONDS:
        # Regenerate token if needed (tokens last 30 min, but just in case)
        if time.time() - start > 1500:
            token = generate_jwt_token()

        still_pending = []
        for task in pending:
            url = f"{API_BASE}/{task['task_id']}"
            resp = api_request("GET", url, token=token)

            if resp and resp.get("code") == 0:
                status = resp["data"]["task_status"]
                if status == "succeed":
                    images = resp["data"].get("task_result", {}).get("images", [])
                    if images:
                        image_url = images[0]["url"]
                        result = download_image(image_url, task["filename"])
                        task["status"] = "success" if result else "download_failed"
                        print(f"  {task['filename']}: SUCCESS")
                    else:
                        task["status"] = "no_images"
                        print(f"  {task['filename']}: No images in result")
                elif status == "failed":
                    msg = resp["data"].get("task_status_msg", "unknown")
                    task["status"] = f"failed: {msg}"
                    print(f"  {task['filename']}: FAILED - {msg}")
                else:
                    still_pending.append(task)
            else:
                still_pending.append(task)

        pending = still_pending
        if pending:
            elapsed = int(time.time() - start)
            print(f"  ... {len(pending)} tasks still pending ({elapsed}s elapsed)")
            time.sleep(POLL_INTERVAL)

    # Mark remaining as timeout
    for task in pending:
        task["status"] = "timeout"
        print(f"  {task['filename']}: TIMEOUT")

    # Summary
    succeeded = sum(1 for t in tasks if t["status"] == "success")
    failed = sum(1 for t in tasks if t["status"] != "success")
    print(f"\n{'='*60}")
    print(f"Batch complete: {succeeded} succeeded, {failed} failed out of {len(tasks)}")
    print(f"{'='*60}")

    return tasks


def main():
    parser = argparse.ArgumentParser(description="Kling AI Image Generation")
    parser.add_argument("--prompt", help="Image prompt")
    parser.add_argument("--filename", help="Output filename")
    parser.add_argument("--aspect_ratio", default="16:9", help="Aspect ratio")
    parser.add_argument("--batch", help="Path to batch config JSON file")

    args = parser.parse_args()

    if args.batch:
        with open(args.batch) as f:
            configs = json.load(f)
        results = generate_batch(configs)
        # Output results as JSON for parsing
        print("\n--- RESULTS JSON ---")
        print(json.dumps(results, indent=2))
        # Exit with error if any failed
        if any(t["status"] != "success" for t in results):
            sys.exit(1)
    elif args.prompt and args.filename:
        success = generate_single(args.prompt, args.filename, args.aspect_ratio)
        sys.exit(0 if success else 1)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
