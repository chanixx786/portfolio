import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Maven_Pro } from "next/font/google";
import "./globals.css";
import { PlexusBackground } from "@/components/triangle_mesh";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mavenPro = Maven_Pro({
  variable: "--font-maven",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "See, Think, and Contact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <PlexusBackground />
        {children}
      </body>
    </html>
  );
}
