import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Times Edu Ex Awards",
  description: "Times Edu Ex Awards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/image/logo.png" sizes="any" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
