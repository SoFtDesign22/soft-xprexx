import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Soft Xprexx — Moving What Matters",
  description: "Fast, reliable shipping, cargo and gift delivery built to make moving what matters easier.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.heroIntro='pending';document.documentElement.dataset.routeIntro='pending';setTimeout(function(){delete document.documentElement.dataset.heroIntro;delete document.documentElement.dataset.routeIntro},4000)}` }} /></head><body>{children}</body></html>;
}
