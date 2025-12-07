import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://dhisnivara.id'),
  
  // Title Configuration
  title: {
    default: "Dhisnivara - Jual Jamur Tiram, Shiitake, Kuping & Baglog Berkualitas | Malang",
    template: "%s | Dhisnivara"
  },
  
  // Description
  description: "Produsen dan supplier jamur tiram, jamur shiitake, jamur kuping, jamur tiram coklat, dan baglog jamur berkualitas tinggi di Malang. Harga terjangkau, pengiriman cepat ke seluruh Indonesia. Hubungi kami untuk pemesanan grosir dan eceran.",
  
  // Keywords
  keywords: [
    "jamur tiram",
    "jamur shiitake",
    "jamur kuping",
    "jamur tiram coklat",
    "jamur tiram putih",
    "baglog jamur",
    "jual jamur",
    "jual jamur tiram",
    "jual jamur shiitake",
    "jual jamur kuping",
    "jual baglog",
    "jual baglog jamur",
    "jamur segar",
    "jamur organik",
    "produsen jamur",
    "supplier jamur",
    "distributor jamur",
    "jamur Malang",
    "jamur Jawa Timur",
    "budidaya jamur",
    "cara budidaya jamur",
    "harga jamur tiram",
    "harga baglog jamur",
    "jamur berkualitas",
    "jamur premium",
    "Dhisnivara",
    "dhisnivara jamur",
    "jamur sehat",
    "jamur bergizi",
    "manfaat jamur",
    "resep jamur",
    "olahan jamur",
    "grosir jamur",
    "eceran jamur",
    "pengiriman jamur",
    "jamur untuk kesehatan"
  ],
  
  // Author Information
  authors: [
    { 
      name: "Dhisnivara",
      url: "https://dhisnivara.id"
    }
  ],
  creator: "Dhisnivara",
  publisher: "Dhisnivara",
  
  // Application Name
  applicationName: "Dhisnivara",
  
  // Referrer Policy
  referrer: 'origin-when-cross-origin',
  
  // Category
  category: 'Agriculture & Food',
  
  // Classification
  classification: 'Business',
  
  // Open Graph Metadata (menggunakan file yang ada)
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://dhisnivara.id',
    siteName: 'Dhisnivara',
    title: 'Dhisnivara - Produsen Jamur Tiram, Shiitake, Kuping & Baglog Berkualitas',
    description: 'Produsen dan supplier jamur tiram, jamur shiitake, jamur kuping, jamur tiram coklat, dan baglog jamur berkualitas tinggi di Malang. Harga terjangkau, pengiriman cepat ke seluruh Indonesia.',
    images: [
      {
        url: '/logo-dhisnivara.png',
        width: 1200,
        height: 630,
        alt: 'Dhisnivara - Produsen Jamur Berkualitas',
        type: 'image/png',
      },
      {
        url: '/jamur-1.png',
        width: 800,
        height: 800,
        alt: 'Jamur Tiram Segar Dhisnivara',
        type: 'image/png',
      },
      {
        url: '/jamur-2.png',
        width: 800,
        height: 800,
        alt: 'Jamur Shiitake Berkualitas',
        type: 'image/png',
      }
    ],
    emails: ['info@dhisnivara.id', 'sales@dhisnivara.id'],
    phoneNumbers: ['+62-819-3124-7823'],
  },
  
  // Twitter Card Metadata
  twitter: {
    card: 'summary_large_image',
    site: '@dhisnivara',
    creator: '@dhisnivara',
    title: 'Dhisnivara - Jual Jamur Tiram, Shiitake, Kuping & Baglog Berkualitas',
    description: 'Produsen jamur tiram, shiitake, kuping, dan baglog berkualitas tinggi di Malang. Harga terjangkau, pengiriman ke seluruh Indonesia.',
    images: {
      url: '/logo-dhisnivara.png',
      alt: 'Dhisnivara - Produsen Jamur Berkualitas',
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      me: ['info@dhisnivara.id'],
    },
  },
  
  // Alternate Languages
  alternates: {
    canonical: 'https://dhisnivara.id',
    languages: {
      'id-ID': 'https://dhisnivara.id',
      'en-US': 'https://dhisnivara.id/en',
    },
  },
  
  // Icons (disesuaikan dengan file yang ADA di folder public/)
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
  
  // App Links (untuk mobile app jika ada)
  appLinks: {
    web: {
      url: 'https://dhisnivara.id',
      should_fallback: true,
    },
  },
  
  // Archives (untuk blog/artikel jika ada)
  archives: ['https://dhisnivara.id/blog'],
  
  // Assets
  assets: ['https://dhisnivara.id/assets'],
  
  // Bookmarks
  bookmarks: ['https://dhisnivara.id/produk'],
  
  // Other Metadata
  other: {
    'contact:email': 'info@dhisnivara.id',
    'contact:phone_number': '+62-819-3124-7823',
    'contact:address': 'Jl. Maghenda No.88, RT.11 RW.03, Krajan, Harjokuncaran, Malang, Jawa Timur 65176',
    'business:contact_data:street_address': 'Jl. Maghenda No.88, RT.11 RW.03, Krajan, Harjokuncaran',
    'business:contact_data:locality': 'Malang',
    'business:contact_data:region': 'Jawa Timur',
    'business:contact_data:postal_code': '65176',
    'business:contact_data:country_name': 'Indonesia',
    'geo.region': 'ID-JI',
    'geo.placename': 'Malang',
    'geo.position': '-8.3535;112.7589',
    'ICBM': '-8.3535, 112.7589',
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
        
        {/* Favicon Links (menggunakan file yang ada) */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect untuk performa */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        {children}
        
        {/* Google Analytics - Ganti G-XXXXXXXXXX dengan tracking ID kamu */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* Meta Pixel (Facebook) - Optional */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display:'none'}}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
