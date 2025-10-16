import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
    title: "Countries Game",
    description: "Test your World Countries knowledge",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-[#24242C] text-stone-300 min-h-screen flex flex-col">
                <Header />
                <div>
                    <main className="">{children}</main>
                </div>
            </body>
        </html>
    );
}
