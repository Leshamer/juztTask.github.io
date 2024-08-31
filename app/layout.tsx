import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.scss";
import HeaderInfo from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Juzt Cars",
  description: "Juzt Task for job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderInfo/>
        {children}
      </body>
    </html>
  );
}
