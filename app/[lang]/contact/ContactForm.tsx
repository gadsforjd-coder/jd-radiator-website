"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionary";

// FormSubmit delivers the inquiry + file attachments to this inbox (free, no
// API key). First submission triggers a one-time activation email that must be
// confirmed. AJAX endpoint returns JSON. 10MB total attachment limit.
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/lunan@jdradiator.com";
const MAX_IMAGES = 5;
const MAX_DOCS = 3;
const MAX_TOTAL_BYTES = 9.5 * 1024 * 1024;
const DOC_ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx";

type Status = "idle" | "sending" | "success" | "error" | "toolarge";

// Resize/compress an image to a web-friendly JPEG to stay within the size cap.
async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const maxDim = 1920;
    let { width, height } = bitmap;
    if (width > maxDim || height > maxDim) {
      const scale = maxDim / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

function fmtSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [images, setImages] = useState<File[]>([]);
  const [docs, setDocs] = useState<File[]>([]);

  async function onAddImages(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!picked.length) return;
    const compressed = await Promise.all(picked.map(compressImage));
    setImages((prev) => [...prev, ...compressed].slice(0, MAX_IMAGES));
  }

  function onAddDocs(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!picked.length) return;
    setDocs((prev) => [...prev, ...picked].slice(0, MAX_DOCS));
  }

  const removeImage = (i: number) => setImages((p) => p.filter((_, idx) => idx !== i));
  const removeDoc = (i: number) => setDocs((p) => p.filter((_, idx) => idx !== i));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = new FormData(form);

    const totalBytes = [...images, ...docs].reduce((s, f) => s + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setStatus("toolarge");
      return;
    }

    const fd = new FormData();
    (["name", "email", "phone", "company", "country", "message"] as const).forEach((k) =>
      fd.append(k, (raw.get(k) as string) || ""),
    );
    fd.append("_subject", "官网询盘 / Website inquiry — " + ((raw.get("name") as string) || ""));
    fd.append("_template", "table");
    fd.append("_captcha", "false");
    images.forEach((f, i) => fd.append(`图片${i + 1}`, f, f.name));
    docs.forEach((f, i) => fd.append(`文档${i + 1}`, f, f.name));

    setStatus("sending");
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      const data = await res.json().catch(() => null);
      if (res.ok && (!data || data.success === "true" || data.success === true)) {
        setStatus("success");
        form.reset();
        setImages([]);
        setDocs([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-gray-50 p-8 lg:p-12 flex items-center justify-center min-h-[300px]">
        <p className="text-lg font-semibold text-[var(--jd-dark)] text-center">{t.formSuccess}</p>
      </div>
    );
  }

  const fileChip = (f: File, onRemove: () => void) => (
    <li
      key={f.name + f.size}
      className="flex items-center justify-between gap-2 bg-white border border-gray-200 rounded px-3 py-2 text-sm"
    >
      <span className="truncate text-gray-700">
        {f.name} <span className="text-gray-400">· {fmtSize(f.size)}</span>
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove"
        className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors text-lg leading-none"
      >
        &times;
      </button>
    </li>
  );

  return (
    <form onSubmit={onSubmit} className="bg-gray-50 p-8 lg:p-12">
      <div className="grid grid-cols-2 gap-5 mb-5">
        <input name="name" placeholder={t.formName} required className="p-3 border border-gray-300 rounded w-full" />
        <input name="email" type="email" placeholder={t.formEmail} required className="p-3 border border-gray-300 rounded w-full" />
      </div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <input name="phone" placeholder={t.formPhone} className="p-3 border border-gray-300 rounded w-full" />
        <input name="company" placeholder={t.formCompany} className="p-3 border border-gray-300 rounded w-full" />
      </div>
      <input name="country" placeholder={t.formCountry} className="p-3 border border-gray-300 rounded w-full mb-5" />
      <textarea name="message" placeholder={t.formMessage} rows={5} className="w-full p-3 border border-gray-300 rounded mb-5" />

      {/* Images */}
      <div className="mb-5">
        <span className="block text-sm text-gray-500 mb-2">{t.formImage}</span>
        {images.length > 0 && <ul className="space-y-2 mb-2">{images.map((f, i) => fileChip(f, () => removeImage(i)))}</ul>}
        {images.length < MAX_IMAGES && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onAddImages}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-[var(--jd-red)]/10 file:text-[var(--jd-red)] hover:file:bg-[var(--jd-red)]/20 cursor-pointer"
          />
        )}
      </div>

      {/* Documents */}
      <div className="mb-5">
        <span className="block text-sm text-gray-500 mb-2">{t.formDocs}</span>
        {docs.length > 0 && <ul className="space-y-2 mb-2">{docs.map((f, i) => fileChip(f, () => removeDoc(i)))}</ul>}
        {docs.length < MAX_DOCS && (
          <input
            type="file"
            accept={DOC_ACCEPT}
            multiple
            onChange={onAddDocs}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-[var(--jd-red)]/10 file:text-[var(--jd-red)] hover:file:bg-[var(--jd-red)]/20 cursor-pointer"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full h-12 bg-[var(--jd-red)] text-white font-extrabold rounded hover:bg-orange-700 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? t.formSending : t.formSubmit}
      </button>
      {status === "error" && <p className="text-red-600 text-sm mt-3 text-center">{t.formError}</p>}
      {status === "toolarge" && <p className="text-red-600 text-sm mt-3 text-center">{t.formTooLarge}</p>}
    </form>
  );
}
