import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Auravyx – AI wellness intelligence for real skin, real tones, real lives",
  description: "Auravyx is an inclusive wellness intelligence system that understands skin, biology, and daily life for people who are usually overlooked by generic beauty tech. Patent-pending AI for skin, nutrition, and routine guidance.",
  keywords: ["AI wellness", "inclusive skincare", "skin intelligence", "diverse skin tones", "personalized wellness", "beauty tech"],
  authors: [{ name: "Auravyx Technologies Ltd" }],
  openGraph: {
    title: "Auravyx – AI wellness intelligence",
    description: "AI that finally understands your skin, biology, and lived experience.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auravyx – AI wellness intelligence",
    description: "AI that finally understands your skin, biology, and lived experience.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

