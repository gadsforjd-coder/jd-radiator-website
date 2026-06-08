#!/usr/bin/env python3
"""
Kling AI Image-to-Image Generation Script

Generates scene renders from product photos using Kling's image reference feature.
Submits all tasks in batch, then polls for results.

Usage:
    python3 kling-img2img.py
"""

import jwt
import time
import os
import sys
import json
import base64
import urllib.request
import urllib.error
import ssl

# Kling API endpoints
API_BASE = "https://api.klingai.com/v1/images/generations"
MODEL_NAME = "kling-v1-5"
MAX_POLL_SECONDS = 180
POLL_INTERVAL = 5

# Output directory
OUTPUT_DIR = os.path.expanduser(
    "~/zylos/workspace/jd-radiator-website/public/assets/ai-images/scene-v2"
)

# Source images directory
MEDIA_DIR = os.path.expanduser("~/zylos/components/feishu/media")

# The 6 product images with their scene descriptions
TASKS = [
    {
        "source": "feishu-2026-06-02T07-38-41-853Z-a10e88eg.png",
        "filename": "scene-column-2col-livingroom.png",
        "prompt": (
            "A modern living room with this white column radiator mounted on the wall "
            "beneath a large window, hardwood oak floors, natural daylight streaming in, "
            "minimalist Scandinavian interior design, a light gray sofa nearby, "
            "potted plants on the windowsill, interior design photography, "
            "photorealistic, warm ambient lighting"
        ),
        "label": "Column 2-col → living room",
    },
    {
        "source": "feishu-2026-06-02T07-38-46-523Z-3e946f1g.png",
        "filename": "scene-column-3col-bedroom.png",
        "prompt": (
            "A cozy modern bedroom with this white column radiator placed beside the bed "
            "against a soft gray wall, plush white bedding, bedside table with a reading "
            "lamp, light wooden floor, morning light through sheer curtains, "
            "interior design photography, photorealistic, warm and inviting atmosphere"
        ),
        "label": "Column 3-col → bedroom",
    },
    {
        "source": "feishu-2026-06-02T07-38-47-498Z-a9f3ca3g.png",
        "filename": "scene-slim-welded-hallway.png",
        "prompt": (
            "A bright modern hallway entrance with this slim white vertical radiator "
            "mounted on the wall, light tile flooring, a coat rack nearby, a console "
            "table with a small vase of flowers, natural light from a skylight above, "
            "clean contemporary design, interior design photography, photorealistic"
        ),
        "label": "Slim welded → hallway",
    },
    {
        "source": "feishu-2026-06-02T07-38-48-376Z-6bf2ad2g.png",
        "filename": "scene-panel-front-kitchen.png",
        "prompt": (
            "A modern kitchen dining area with this white panel radiator mounted on the "
            "wall near a wooden dining table, white kitchen cabinets in the background, "
            "herringbone tile backsplash, pendant lights above the table, daylight from "
            "a window, contemporary European kitchen design, interior photography, "
            "photorealistic"
        ),
        "label": "Panel front → kitchen",
    },
    {
        "source": "feishu-2026-06-02T07-38-48-903Z-bdede8cg.png",
        "filename": "scene-panel-angle-bathroom.png",
        "prompt": (
            "A modern bathroom with this white panel radiator mounted on the wall, "
            "white marble tiles, a freestanding bathtub nearby, round mirror above a "
            "vanity, soft warm lighting, towels folded on a shelf, spa-like atmosphere, "
            "interior design photography, photorealistic"
        ),
        "label": "Panel angle → bathroom",
    },
    {
        "source": "feishu-2026-06-02T07-38-49-225Z-d8581fag.png",
        "filename": "scene-copper-aluminum-nursery.png",
        "prompt": (
            "A bright children's nursery room with this vertical copper-aluminum "
            "composite radiator mounted on the wall, pastel-colored walls, a white crib, "
            "soft carpet floor, stuffed animals on a shelf, cheerful and safe atmosphere, "
            "natural daylight through curtained windows, interior design photography, "
            "photorealistic"
        ),
        "label": "Copper-aluminum → nursery",
    },
]


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
        raise RuntimeError(
            "KLING_ACCESS_KEY and KLING_SECRET_KEY must be set in environment"
        )

    now = int(time.time())
    payload = {"iss": access_key, "exp": now + 1800, "nbf": now - 5}
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token


def api_request(method, url, data=None, token=None):
    """Make an API request and return parsed JSON response."""
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)

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


def encode_image_base64(filepath):
    """Read an image file and return its base64-encoded string."""
    with open(filepath, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def submit_img2img_task(prompt, image_base64, aspect_ratio, token):
    """Submit an image-to-image generation task. Returns task_id or None."""
    data = {
        "model_name": MODEL_NAME,
        "prompt": prompt,
        "n": 1,
        "aspect_ratio": aspect_ratio,
        "image": image_base64,
        "image_reference": "subject",
        "image_fidelity": 0.8,
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


def main():
    print(f"Kling AI Image-to-Image Scene Generation")
    print(f"Model: {MODEL_NAME}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Tasks: {len(TASKS)}")
    print(f"Poll timeout: {MAX_POLL_SECONDS}s")
    print(f"{'='*60}")

    token = generate_jwt_token()

    # Phase 1: Submit all tasks
    submissions = []
    for task in TASKS:
        source_path = os.path.join(MEDIA_DIR, task["source"])
        if not os.path.exists(source_path):
            print(f"\n[SKIP] Source not found: {source_path}")
            submissions.append(
                {
                    "task_id": None,
                    "filename": task["filename"],
                    "label": task["label"],
                    "status": "source_missing",
                }
            )
            continue

        print(f"\nSubmitting: {task['label']}")
        print(f"  Source: {task['source']}")
        print(f"  Output: {task['filename']}")
        print(f"  Prompt: {task['prompt'][:80]}...")

        image_b64 = encode_image_base64(source_path)
        task_id = submit_img2img_task(task["prompt"], image_b64, "16:9", token)

        submissions.append(
            {
                "task_id": task_id,
                "filename": task["filename"],
                "label": task["label"],
                "status": "submitted" if task_id else "submit_failed",
            }
        )

        # Small delay to avoid rate limiting
        if task_id:
            time.sleep(0.5)

    # Phase 2: Poll all submitted tasks
    print(f"\n{'='*60}")
    submitted_count = sum(1 for s in submissions if s["task_id"])
    print(f"Polling {submitted_count} submitted tasks (timeout: {MAX_POLL_SECONDS}s)...")
    print(f"{'='*60}")

    pending = [s for s in submissions if s["task_id"]]
    start = time.time()

    while pending and (time.time() - start) < MAX_POLL_SECONDS:
        # Regenerate token if close to expiry
        if time.time() - start > 1500:
            token = generate_jwt_token()

        still_pending = []
        for sub in pending:
            url = f"{API_BASE}/{sub['task_id']}"
            resp = api_request("GET", url, token=token)

            if resp and resp.get("code") == 0:
                status = resp["data"]["task_status"]
                if status == "succeed":
                    images = resp["data"].get("task_result", {}).get("images", [])
                    if images:
                        image_url = images[0]["url"]
                        result = download_image(image_url, sub["filename"])
                        sub["status"] = "success" if result else "download_failed"
                        if result:
                            sub["filepath"] = result
                        print(f"  {sub['label']}: SUCCESS")
                    else:
                        sub["status"] = "no_images"
                        print(f"  {sub['label']}: No images in result")
                elif status == "failed":
                    msg = resp["data"].get("task_status_msg", "unknown")
                    sub["status"] = f"failed: {msg}"
                    print(f"  {sub['label']}: FAILED - {msg}")
                else:
                    still_pending.append(sub)
            else:
                still_pending.append(sub)

        pending = still_pending
        if pending:
            elapsed = int(time.time() - start)
            print(
                f"  ... {len(pending)} tasks still pending ({elapsed}s elapsed)"
            )
            time.sleep(POLL_INTERVAL)

    # Mark remaining as timeout
    for sub in pending:
        sub["status"] = "timeout"
        print(f"  {sub['label']}: TIMEOUT")

    # Summary
    succeeded = sum(1 for s in submissions if s["status"] == "success")
    failed = len(submissions) - succeeded
    print(f"\n{'='*60}")
    print(f"BATCH COMPLETE: {succeeded} succeeded, {failed} failed out of {len(submissions)}")
    print(f"{'='*60}")

    for s in submissions:
        icon = "OK" if s["status"] == "success" else "FAIL"
        path = s.get("filepath", "")
        print(f"  [{icon}] {s['label']}: {s['status']}")
        if path:
            print(f"        -> {path}")

    # Output results as JSON
    print(f"\n--- RESULTS JSON ---")
    print(json.dumps(submissions, indent=2, default=str))

    if any(s["status"] != "success" for s in submissions):
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
