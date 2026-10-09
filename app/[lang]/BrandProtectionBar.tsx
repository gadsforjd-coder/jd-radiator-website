"use client";

// ============================================================================
// 中文站品牌保护滚动声明条 + 绿色「验证真伪」入口（Lu 2026-10-09 需求）.
// zh only — the layout gates rendering, this file never checks locale itself.
//
// COPY IS LOCKED: every sentence below is lifted verbatim from the line-passed
// brand-protection page (app/[lang]/brand-protection/page.tsx). Do not reword
// without 店小二 line-pass + owner sign-off. Hotline 022-69189950; verify at
// www.zx3315.cn; never name any other brand here.
// ============================================================================

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MARQUEE_TEXT =
  "⚠️ 谨防仿冒：天津市九鼎阳光暖通有限公司郑重声明——认准九鼎logo与官方防伪标，正品可刮码验真。商标问题热线 022-69189950";

// 正品识别三步 (locked wording, identical to brand-protection page)
const steps = [
  {
    title: "认准九鼎logo",
    desc: "正品产品及包装均使用本公司九鼎品牌标识。购买时请先核对logo。",
  },
  {
    title: "刮开防伪标涂层取码",
    desc: "正品贴有“中国产品质量365防伪查询系统”防伪标，刮开涂层即可获取防伪码。",
  },
  {
    title: "zx3315.cn 验真 / 扫码验真",
    desc: "登录 www.zx3315.cn 输入防伪码，或直接扫描防伪标上的二维码，即可核验真伪。",
  },
];

export default function BrandProtectionBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* 滚动声明条 */}
      <div className="flex items-stretch bg-[var(--jd-cream)] border-b border-[#F1E7DC]">
        <div className="relative flex-1 overflow-hidden" aria-label={MARQUEE_TEXT}>
          <div className="animate-marquee-fast flex items-center gap-16 whitespace-nowrap py-2 text-xs sm:text-sm text-[#1E293B] leading-snug w-max">
            {[0, 1].map((i) => (
              <span key={i} aria-hidden={i === 1} className="flex items-center gap-16">
                <span>
                  {MARQUEE_TEXT}{" "}
                  <Link
                    href="/zh/brand-protection"
                    className="text-[var(--jd-red)] font-bold whitespace-nowrap hover:underline underline-offset-2"
                  >
                    了解详情→
                  </Link>
                </span>
              </span>
            ))}
          </div>
        </div>
        {/* 绿色验真入口 */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 flex items-center gap-1.5 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm px-3 sm:px-5 cursor-pointer transition-colors"
          aria-haspopup="dialog"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
            aria-hidden
          >
            <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          验证真伪
        </button>
      </div>

      {/* 验真弹层 */}
      {open && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center p-4 bg-black/55"
          role="dialog"
          aria-modal="true"
          aria-label="验证真伪"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="关闭"
              className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 text-xl leading-none cursor-pointer"
            >
              ×
            </button>

            <p className="text-[#15803D] uppercase tracking-[0.2em] font-extrabold text-xs mb-2">
              官方防伪
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
              验证真伪 · 正品识别三步
            </h2>

            <ol className="space-y-4 mb-6">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 inline-grid place-items-center w-8 h-8 rounded-full bg-[#15803D] text-white font-black">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <figure className="border border-[#F1E7DC] rounded-lg p-4 bg-gray-50 mb-6">
              <Image
                src="/assets/fangwei-label-sample.png"
                alt="九鼎官方防伪标样式（示意图）"
                width={1200}
                height={896}
                className="w-full h-auto rounded"
              />
              <figcaption className="text-xs text-gray-500 text-center mt-2">
                官方防伪标样式（示意图：二维码为示意图案，实际防伪码以产品所贴防伪标为准）
              </figcaption>
            </figure>

            <div className="rounded-lg bg-[var(--jd-cream)] border border-[#F1E7DC] p-4 text-sm text-gray-700 leading-relaxed">
              如对产品真伪有任何疑问，或发现假冒本公司品牌的线索，欢迎拨打商标问题热线{" "}
              <a href="tel:022-69189950" className="text-[var(--jd-red)] font-bold whitespace-nowrap">
                022-69189950
              </a>
              ，或登录{" "}
              <a
                href="https://www.zx3315.cn"
                target="_blank"
                rel="noopener"
                className="text-[var(--jd-red)] font-semibold underline underline-offset-2"
              >
                www.zx3315.cn
              </a>{" "}
              输入防伪码验真。
            </div>

            <div className="mt-5 text-center">
              <Link
                href="/zh/brand-protection"
                onClick={() => setOpen(false)}
                className="text-[var(--jd-red)] font-bold hover:underline underline-offset-2"
              >
                查看完整《品牌保护与防伪声明》→
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
