import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://dhisnivara.id'),
  title: {
    default: "Dhisnivara - Jual Jamur Tiram, Shiitake, Kuping & Baglog Berkualitas | Malang",
    template: "%s | Dhisnivara"
  },
  description: "Produsen dan supplier jamur tiram, jamur shiitake, jamur kuping, jamur tiram coklat, dan baglog jamur berkualitas tinggi di Malang. Harga terjangkau, pengiriman cepat ke seluruh Indonesia.",
  keywords: [
    "jamur tiram",
    "jamur shiitake",
    "jamur kuping",
    "jamur tiram coklat",
    "baglog jamur",
    "jual jamur",
    "jual jamur tiram",
    "jual baglog",
    "jamur segar",
    "produsen jamur",
    "supplier jamur",
    "jamur Malang",
    "budidaya jamur",
    "jamur organik",
    "Dhisnivara"
  ],
  authors: [{ name: "Dhisnivara" }],
  creator: "Dhisnivara",
  publisher: "Dhisnivara",
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://dhisnivara.id',
    siteName: 'Dhisnivara',
    title: 'Dhisnivara - Jual Jamur Tiram, Shiitake, Kuping & Baglog Berkualitas',
    description: 'Produsen dan supplier jamur tiram, jamur shiitake, jamur kuping, jamur tiram coklat, dan baglog jamur berkualitas tinggi di Malang.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dhisnivara - Produsen Jamur Berkualitas',
      }
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Dhisnivara - Jual Jamur Tiram, Shiitake, Kuping & Baglog',
    description: 'Produsen jamur tiram, shiitake, kuping, dan baglog berkualitas di Malang',
    images: ['/og-image.jpg'],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
