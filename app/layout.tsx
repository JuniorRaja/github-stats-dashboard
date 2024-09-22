import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import ThemeProvider from "@/app/provider"; // Import the ThemeProvider component from the appropriate package

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GitHub Stats Dashboard",
  description:
    "Modern, responsive web application built with Next.js, Tailwind CSS, and TypeScript. To display detailed GitHub user statistics, intuitive visualization of repository and contribution data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <main className="relative bg-gray-100 dark:bg-gray-900 flex justify-center items-center overflow-hidden flex-col mx-auto sm:px-10 px-5">
            <Header />
            <div className="">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
