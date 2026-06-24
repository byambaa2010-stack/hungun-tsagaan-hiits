import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ApolloClientProvider from "@/lib/apollo/provider";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GER GROUP | Шилэн фасад, хөнгөн цагаан хийц",
  description:
    "GER GROUP - Монголын шилэн фасад, хөнгөн цагаан хийцийн шийдэл нийлүүлэгч. Чанар, технологи, найдвартай байдал.",
  keywords: [
    "шилэн фасад",
    "хөнгөн цагаан хийц",
    "GER GROUP",
    "Монгол",
    "зураг төсөл",
  ],
};

export function generateStaticParams() {
  return [{ locale: "mn" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <NextIntlClientProvider messages={messages}>
          <ApolloClientProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </ThemeProvider>
          </ApolloClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
