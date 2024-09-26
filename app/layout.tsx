import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import ThemeProvider from "@/app/provider"; // Import the ThemeProvider component from the appropriate package
import { BackgroundBeams } from "@/components/background-beams";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Choose the weights you need
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
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider>
          <main className="relative bg-gradient-to-b from-white to-neutral-300 dark:from-neutral-950 dark:to-neutral-800  flex justify-center items-center overflow-hidden flex-col mx-auto sm:px-10 px-5">
            <Header />
            <BackgroundBeams>{children}</BackgroundBeams>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
