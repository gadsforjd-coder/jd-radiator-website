// ============================================================================
// 品牌保护与防伪声明 (Brand Protection & Anti-Counterfeit Statement).
// v1 serves Chinese visitors: Chinese content is rendered for every locale by
// design (the banner linking here only appears on zh pages). Canonical +
// hreflang still point at the localized URLs so search engines index cleanly.
//
// FACTS (LOCKED — do not alter without owner sign-off):
// - Company: 天津市九鼎阳光暖通有限公司 (原天津市九鼎不锈钢制品有限公司, 同一公司更名)
// - ®清单v2 (2026-10-08 店小二+运营 对齐定稿): exactly THREE marks may carry ®:
//   九鼎散热器®(71721073, 至2033-12-13) / 阳光九鼎®(8464198, 至2031-07-20) /
//   圆形徽标图形商标®(13503043, 续展至2035-04-13). 九鼎(13502959) /
//   蒙特利尔 MENGTELAIER(6311833) are stated as "持有" + 注册号 only, no ®
//   (续展核实中). ASHAP / 新鼎徽 must NOT appear with ® anywhere.
// - Anti-counterfeit labels: 中国产品质量365防伪查询系统, verify at www.zx3315.cn.
// - Hotline: 022-69189950. Never name any other brand on this page.
// ============================================================================

import type { Metadata } from "next";
import Image from "next/image";
import { BASE_URL } from "@/lib/constants";
import { languageAlternates } from "@/lib/i18n";

const PAGE_TITLE = "品牌保护与防伪声明 | 九鼎散热器";
const PAGE_DESC =
  "天津市九鼎阳光暖通有限公司官方品牌保护与防伪声明：注册商标信息、正品识别三步法（认准九鼎logo、刮开防伪标涂层取码、登录 zx3315.cn 验真）、商标问题热线 022-69189950 及官方联系渠道。";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    alternates: {
      canonical: `${BASE_URL}/${lang}/brand-protection`,
      languages: languageAlternates("/brand-protection"),
    },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESC,
      url: `${BASE_URL}/${lang}/brand-protection`,
    },
  };
}

// 正品识别三步 (locked wording)
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

export default function BrandProtectionPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-gray-50">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">
          官方声明
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">
          品牌保护与防伪声明
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">
          认准九鼎logo与官方防伪标，正品可刮码验真。
        </p>
      </section>

      <section className="py-16 lg:py-20 px-6 lg:px-14 bg-white">
        <div className="max-w-3xl mx-auto space-y-14">
          {/* 公司声明 */}
          <article>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-4">
              公司声明
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              天津市九鼎阳光暖通有限公司（原天津市九鼎不锈钢制品有限公司，系同一公司更名）郑重声明：本公司是九鼎品牌散热器的生产厂家。为维护消费者与合作伙伴的合法权益，现就本公司注册商标及正品防伪识别方式声明如下。
            </p>
          </article>

          {/* 注册商标 */}
          <article>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-4">
              注册商标
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-5">
              九鼎系列商标由天津市九鼎阳光暖通有限公司（原天津市九鼎不锈钢制品有限公司）持有。
            </p>
            <div className="space-y-4 mb-5">
              <div className="border border-[#F1E7DC] bg-[var(--jd-cream)] rounded-lg p-6">
                <p className="text-lg text-gray-900 font-bold mb-1">九鼎散热器®</p>
                <p className="text-gray-600 leading-relaxed">
                  注册号 71721073，第11类，有效期至2033年12月13日。
                </p>
              </div>
              <div className="border border-[#F1E7DC] bg-[var(--jd-cream)] rounded-lg p-6">
                <p className="text-lg text-gray-900 font-bold mb-1">阳光九鼎®</p>
                <p className="text-gray-600 leading-relaxed">
                  注册号 8464198，第11类，已续展，有效期至2031年7月20日。
                </p>
              </div>
              <div className="border border-[#F1E7DC] bg-[var(--jd-cream)] rounded-lg p-6">
                <p className="text-lg text-gray-900 font-bold mb-1">圆形徽标（图形商标）®</p>
                <p className="text-gray-600 leading-relaxed">
                  注册号 13503043，第11类，已续展，有效期至2035年4月13日。
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              此外，本公司还持有“九鼎”（注册号
              13502959）、“九鼎阳光”（注册号 17329730）、“蒙特利尔
              MENGTELAIER”（注册号 6311833）等系列商标。
            </p>
          </article>

          {/* 正品识别三步 */}
          <article>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-6">
              正品识别三步
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="border border-[#F1E7DC] rounded-lg p-6 bg-white shadow-[0_1px_12px_rgba(30,41,59,0.05)]"
                >
                  <span className="inline-grid place-items-center w-10 h-10 rounded-full bg-[var(--jd-orange)] text-white font-black text-lg mb-4">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-5 mt-8 border border-[#F1E7DC] rounded-lg p-5 bg-gray-50">
              <Image
                src="/assets/brand-logo-2026.png"
                alt="九鼎品牌logo"
                width={96}
                height={96}
                className="object-contain shrink-0"
              />
              <p className="text-gray-600 leading-relaxed">
                请认准九鼎品牌logo。正品贴有“中国产品质量365防伪查询系统”防伪标，刮开涂层后扫码，或登录{" "}
                <a
                  href="https://www.zx3315.cn"
                  target="_blank"
                  rel="noopener"
                  className="text-[var(--jd-red)] font-semibold underline underline-offset-2"
                >
                  www.zx3315.cn
                </a>{" "}
                输入防伪码验真。
              </p>
            </div>
          </article>

          {/* 市场提示 */}
          <article>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-4">
              市场提示
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              近期市场上出现仿冒本公司品牌标识的产品。请广大消费者与经销商在选购时注意核对品牌logo与官方防伪标，通过本页所列官方渠道确认产品来源，谨防混淆。
            </p>
          </article>

          {/* 商标问题与举报 */}
          <article>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-4">
              商标问题与举报
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              如对本公司商标、产品真伪有任何疑问，或发现假冒本公司品牌的线索，欢迎各界向本厂举报。商标问题热线：
              <a
                href="tel:022-69189950"
                className="text-[var(--jd-red)] font-bold whitespace-nowrap"
              >
                022-69189950
              </a>
              。
            </p>
          </article>

          {/* 官方渠道 */}
          <article>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-4">
              官方渠道
            </h2>
            <ul className="text-lg text-gray-600 leading-relaxed space-y-3">
              <li>
                <strong className="text-gray-900">官网：</strong>{" "}
                <a
                  href="https://www.jdradiator.com"
                  className="text-[var(--jd-red)] font-semibold underline underline-offset-2"
                >
                  https://www.jdradiator.com
                </a>
              </li>
              <li>
                <strong className="text-gray-900">邮箱：</strong>{" "}
                <a href="mailto:lunan@jdradiator.com" className="underline underline-offset-2">
                  lunan@jdradiator.com
                </a>{" "}
                /{" "}
                <a href="mailto:kevin@jdradiator.com" className="underline underline-offset-2">
                  kevin@jdradiator.com
                </a>
              </li>
              <li>
                <strong className="text-gray-900">电话：</strong>{" "}
                <a href="tel:+862269189950" className="whitespace-nowrap">
                  +86-22-69189950
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
