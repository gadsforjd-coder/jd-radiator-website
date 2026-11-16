// Shown on the success screen when a visitor left a phone number but no email,
// so the team can still reach them. Sales/Lu 2026-11-16: EN/RU/ZH only; other
// locales (incl. Kazakh until a native speaker reviews it) fall back to English.
const HINTS: Record<string, string> = {
  en: "Thanks! To help us reply faster, you can also leave your email, WhatsApp or Telegram, or write to kevin@jdradiator.com.",
  ru: "Спасибо! Чтобы мы ответили быстрее, оставьте также email, WhatsApp или Telegram либо напишите на kevin@jdradiator.com.",
  zh: "已收到!如方便,也请留下邮箱、WhatsApp 或 Telegram,或发邮件至 kevin@jdradiator.com,方便我们更快联系您。",
};

export function phoneOnlyHint(locale: string): string {
  return HINTS[locale] ?? HINTS.en;
}
