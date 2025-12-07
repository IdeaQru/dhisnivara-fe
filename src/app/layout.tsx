import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL('https://dhisnivara.id'),
  
  // Title Configuration
  title: {
    default: "Dhisnivara - Premium Organic Mushroom Farming | Produsen Jamur Organik & Program Kemitraan Malang",
    template: "%s | Dhisnivara"
  },
  
  // Description
  description: "Produsen jamur organik premium (tiram putih, tiram coklat, shiitake, kuping) dengan teknologi IoT Smart Farming di Malang. Program kemitraan budidaya jamur dengan jaminan buyback Rp 15.000/kg dan sistem monitoring real-time. Investasi mulai 50 juta dengan return 12% per tahun.",
  
  // Keywords - disesuaikan dengan konten aktual
  keywords: [
    // Produk Utama
    "jamur tiram putih",
    "jamur tiram coklat",
    "jamur shiitake premium",
    "jamur kuping organik",
    "baglog jamur berkualitas",
    
    // Jual Beli
    "jual jamur organik",
    "jual jamur tiram Malang",
    "jual jamur shiitake",
    "jual baglog jamur",
    "supplier jamur organik",
    "distributor jamur premium",
    
    // Program Kemitraan
    "kemitraan jamur",
    "program kemitraan budidaya jamur",
    "bisnis jamur menguntungkan",
    "usaha budidaya jamur",
    "franchise jamur",
    "investasi jamur",
    
    // Teknologi
    "IoT smart farming",
    "budidaya jamur teknologi IoT",
    "monitoring jamur otomatis",
    "sistem penyiraman otomatis",
    "kumbung jamur modern",
    
    // Jaminan & Keunggulan
    "jaminan buyback jamur",
    "guaranteed buyback Rp 15000",
    "budidaya jamur tanpa risiko",
    "supply baglog kontinu",
    
    // Lokasi
    "jamur Malang",
    "jamur Jawa Timur",
    "produsen jamur Malang",
    "budidaya jamur Malang",
    "kumbung jamur Harjokuncaran",
    "jamur Kediri",
    
    // Umum
    "jamur segar kualitas ekspor",
    "jamur organik bersertifikat",
    "jamur food safety",
    "harga jamur tiram",
    "cara budidaya jamur",
    "Dhisnivara",
    "investasi pertanian",
    "agribisnis menguntungkan"
  ],
  
  // Author Information
  authors: [
    { 
      name: "Dhisnivara",
      url: "https://dhisnivara.id"
    }
  ],
  creator: "Dhisnivara Premium Organic Mushroom",
  publisher: "Dhisnivara",
  
  // Application Name
  applicationName: "Dhisnivara - Premium Organic Mushroom Farming",
  
  // Referrer Policy
  referrer: 'origin-when-cross-origin',
  
  // Category
  category: 'Agriculture, Food Production, Smart Farming',
  
  // Classification
  classification: 'Business, Agriculture Technology',
  
  // Open Graph Metadata
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://dhisnivara.id',
    siteName: 'Dhisnivara - Premium Organic Mushroom Farming',
    title: 'Dhisnivara - Program Kemitraan Budidaya Jamur dengan IoT Technology & Guaranteed Buyback',
    description: 'Produsen jamur organik premium dengan teknologi IoT Smart Farming. Program kemitraan lengkap: desain kumbung, supply baglog, jaminan buyback Rp 15.000/kg, dan monitoring real-time. Investasi mulai 50 juta, return 12%/tahun.',
    images: [
      {
        url: '/logo-dhisnivara.png',
        width: 1200,
        height: 630,
        alt: 'Dhisnivara - Premium Organic Mushroom Farming',
        type: 'image/png',
      },
      {
        url: '/jamur-1.png',
        width: 800,
        height: 800,
        alt: 'Jamur Tiram Putih Premium Kualitas Ekspor',
        type: 'image/png',
      },
      {
        url: '/jamur-2.png',
        width: 800,
        height: 800,
        alt: 'Jamur Organik dengan IoT Smart Farming Technology',
        type: 'image/png',
      },
      {
        url: '/jamur-3.png',
        width: 800,
        height: 800,
        alt: 'Shiitake Premium dan Jamur Kuping Organik',
        type: 'image/png',
      },
      {
        url: '/jamur-4.png',
        width: 800,
        height: 800,
        alt: 'Program Kemitraan Budidaya Jamur Dhisnivara',
        type: 'image/png',
      }
    ],
    emails: ['info@dhisnivara.id'],
    phoneNumbers: ['+62-811-359-0718'],
  },
  
  // Twitter Card Metadata
  twitter: {
    card: 'summary_large_image',
    site: '@dhisnivara',
    creator: '@dhisnivara',
    title: 'Dhisnivara - Kemitraan Budidaya Jamur IoT Technology',
    description: 'Program kemitraan budidaya jamur dengan teknologi IoT, jaminan buyback Rp 15.000/kg, dan dukungan penuh dari desain hingga pemasaran. Investasi mulai 50 juta.',
    images: {
      url: '/logo-dhisnivara.png',
      alt: 'Dhisnivara - Premium Organic Mushroom Farming',
    },
  },
  
  // Robots Configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  
  },
  
  // Verification Codes
  verification: {
    google: 'f73013cebb421088',
  },
  
  // Alternate Languages
  alternates: {
    canonical: 'https://dhisnivara.id',
    languages: {
      'id-ID': 'https://dhisnivara.id',
    },
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'mask-icon',
        url: '/logo-dhisnivara.png',
      }
    ],
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // App Links
  appLinks: {
    web: {
      url: 'https://dhisnivara.id',
      should_fallback: true,
    },
  },
  
  // Other Metadata - disesuaikan dengan info kontak aktual
  other: {
    'contact:email': 'info@dhisnivara.id',
    'contact:phone_number': '+62-811-359-0718',
    'contact:address': 'Jl. Maghenda No.88, RT.11 RW.03, Krajan, Harjokuncaran, Kec. Sumbermanjing Wetan, Kabupaten Malang, Jawa Timur 65176',
    'business:contact_data:street_address': 'Jl. Maghenda No.88, RT.11 RW.03, Krajan, Harjokuncaran',
    'business:contact_data:locality': 'Malang',
    'business:contact_data:region': 'Jawa Timur',
    'business:contact_data:postal_code': '65176',
    'business:contact_data:country_name': 'Indonesia',
    'business:hours': 'Mon-Sat 08:00-17:00',
    'geo.region': 'ID-JI',
    'geo.placename': 'Malang',
    'geo.position': '-8.3535;112.7589',
    'ICBM': '-8.3535, 112.7589',
    'price:currency': 'IDR',
    'price:amount': '15000',
    'product:category': 'Organic Mushroom',
    'product:brand': 'Dhisnivara',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#4CAF50" />
        <meta name="color-scheme" content="light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dhisnivara" />
        <meta name="format-detection" content="telephone=yes" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        
        {/* Business Schema Meta */}
        <meta property="business:hours:day" content="monday" />
        <meta property="business:hours:start" content="08:00" />
        <meta property="business:hours:end" content="17:00" />
        
        {/* Favicon Links */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
