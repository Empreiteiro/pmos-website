import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { getServerDict } from "@/lib/i18n/server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PMOS — The PM workspace that reads the web for you.",
  description:
    "PMOS pulls signals from the web, clusters them into feature opportunities, writes PRDs, and ships them to your tracker. Sits between research tools and delivery trackers.",
  openGraph: {
    title: "PMOS — The PM workspace that reads the web for you.",
    description:
      "PMOS pulls signals from the web, clusters them into feature opportunities, writes PRDs, and ships them to your tracker.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { locale } = await getServerDict();
  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <LocaleProvider initialLocale={locale}>
            <LenisProvider>
              <a href="#main" className="skip-link">
                {locale === "pt" ? "Ir para o conteúdo" : "Skip to content"}
              </a>
              {children}
            </LenisProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
