import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MadrasCheck Admin Page",
  description: "Admin page for MadrasCheck assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
