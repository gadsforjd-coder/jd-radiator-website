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
//   (续展核实中). 新鼎徽 must NOT appear with ®.
// - ASHAP: shown as brand mark, NO ® and NO "注册商标" wording on the zh site
//   until CN application 65404971 is verified registered (DE reg 30 2022 222 295
//   is verified but only supports ® in DE/EU/export contexts, not here).
// - Scope per Lu 2026-10-09: statement + correct-logo education ONLY. No 防伪标/
//   刮码/zx3315.cn verification mechanics anywhere on the site.
// - Hotline: 022-69189950. Never name any other brand on this page.
// ============================================================================

import type { Metadata } from "next";
import Image from "next/image";
import { BASE_URL } from "@/lib/constants";
import { languageAlternates } from "@/lib/i18n";

const PAGE_TITLE = "品牌保护声明 | 九鼎散热器";
const PAGE_DESC =
  "天津市九鼎阳光暖通有限公司官方品牌保护声明：注册商标信息、正品logo识别、商标问题热线 022-69189950 及官方联系渠道。";

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

export default function BrandProtectionPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 lg:py-24 px-6 lg:px-14 bg-gray-50">
        <p className="text-[var(--jd-red)] uppercase tracking-[0.2em] font-extrabold text-sm mb-5">
          官方声明
        </p>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl">
          品牌保护声明
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed mt-7 max-w-3xl">
          认准九鼎官方logo与名义，谨防仿冒。
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

          {/* 如何辨认正品 */}
          <article>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-4">
              如何辨认正品
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              正品产品及包装均使用本公司品牌标识。购买时请先核对logo，谨防仿冒。
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <figure className="border border-[#F1E7DC] rounded-lg p-6 bg-gray-50 grid place-items-center">
                <Image
                  src="/assets/brand-logo-2026.png"
                  alt="九鼎品牌logo"
                  width={160}
                  height={160}
                  className="object-contain h-28 w-auto"
                />
                <figcaption className="text-gray-700 font-bold mt-4 text-center">
                  九鼎散热器®
                  <span className="block text-sm text-gray-500 font-normal mt-1">
                    注册商标（注册号 71721073）
                  </span>
                </figcaption>
              </figure>
              <figure className="border border-[#F1E7DC] rounded-lg p-6 bg-gray-50 grid place-items-center">
                <Image
                  src="/assets/ashap-logo.png"
                  alt="ASHAP 品牌标识"
                  width={240}
                  height={71}
                  className="object-contain h-16 w-auto"
                />
                <figcaption className="text-gray-700 font-bold mt-4 text-center">
                  ASHAP
                  <span className="block text-sm text-gray-500 font-normal mt-1">
                    本公司品牌标识
                  </span>
                </figcaption>
              </figure>
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
