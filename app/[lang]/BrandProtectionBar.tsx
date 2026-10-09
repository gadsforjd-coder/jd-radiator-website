"use client";

// ============================================================================
// 中文站品牌保护滚动声明条 + 绿色「如何识别正品」入口.
// Scope per Lu 2026-10-09 (店小二 line-pass same day): statement + correct-logo
// education ONLY. No 防伪标/刮码/zx3315 verification mechanics on the site.
//
// COPY IS LOCKED: statement sentences from the line-passed brand-protection
// page; the marquee wording follows 店小二's approved phrasing (认准官方logo与
// 名义/核实热线). ASHAP shows as a brand mark with NO ® and NO "注册商标"
// wording until its CN registration status (65404971) is verified. 九鼎散热器
// may carry ® (reg. 71721073). Hotline 022-69189950. Never name other brands.
// ============================================================================

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MARQUEE_TEXT =
  "⚠️ 谨防仿冒：天津市九鼎阳光暖通有限公司郑重声明——认准九鼎官方logo与名义，核实请致电 022-69189950";

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
      {/* 滚动声明条 — relative z-30 so it paints above the homepage Hero
          (z-10, pulled up over this bar via its -mt-[96px]) while staying
          below the fixed header (z-50) and its dropdowns. Lifts the whole
          bar incl. the 如何识别正品 button in one. */}
      <div className="relative z-30 flex items-stretch bg-[#FEF0E0] border-b-2 border-[var(--jd-red)]">
        <div className="relative flex-1 overflow-hidden" aria-label={MARQUEE_TEXT}>
          <div className="animate-marquee-fast flex items-center gap-16 whitespace-nowrap py-2.5 text-[13px] sm:text-sm font-semibold text-[#1E293B] leading-snug w-max">
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
        {/* 绿色正品识别入口 */}
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
          如何识别正品
        </button>
      </div>

      {/* 正品logo识别弹层 */}
      {open && (
        <div
          className="fixed inset-0 z-[200] grid place-items-center p-4 bg-black/55"
          role="dialog"
          aria-modal="true"
          aria-label="如何识别正品"
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
              官方声明
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
              认准九鼎官方logo
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              正品产品及包装均使用本公司品牌标识。购买时请先核对logo，谨防仿冒。
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <figure className="border border-[#F1E7DC] rounded-lg p-5 bg-gray-50 grid place-items-center">
                <Image
                  src="/assets/brand-logo-2026.png"
                  alt="九鼎品牌logo"
                  width={140}
                  height={140}
                  className="object-contain h-24 w-auto"
                />
                <figcaption className="text-sm text-gray-700 font-bold mt-3 text-center">
                  九鼎散热器®
                  <span className="block text-xs text-gray-500 font-normal mt-1">
                    注册商标（注册号 71721073）
                  </span>
                </figcaption>
              </figure>
              <figure className="border border-[#F1E7DC] rounded-lg p-5 bg-gray-50 grid place-items-center">
                <Image
                  src="/assets/ashap-logo.png"
                  alt="ASHAP 品牌标识"
                  width={200}
                  height={59}
                  className="object-contain h-14 w-auto"
                />
                <figcaption className="text-sm text-gray-700 font-bold mt-3 text-center">
                  ASHAP
                  <span className="block text-xs text-gray-500 font-normal mt-1">
                    本公司品牌标识
                  </span>
                </figcaption>
              </figure>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              本公司注册商标包括：九鼎散热器®（注册号
              71721073）、阳光九鼎®（注册号 8464198）、圆形徽标®（注册号
              13503043）等。
            </p>

            <div className="rounded-lg bg-[var(--jd-cream)] border border-[#F1E7DC] p-4 text-sm text-gray-700 leading-relaxed">
              如对产品真伪有任何疑问，或发现假冒本公司品牌的线索，欢迎拨打商标问题热线{" "}
              <a href="tel:022-69189950" className="text-[var(--jd-red)] font-bold whitespace-nowrap">
                022-69189950
              </a>{" "}
              核实。
            </div>

            <div className="mt-5 text-center">
              <Link
                href="/zh/brand-protection"
                onClick={() => setOpen(false)}
                className="text-[var(--jd-red)] font-bold hover:underline underline-offset-2"
              >
                查看完整《品牌保护声明》→
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
