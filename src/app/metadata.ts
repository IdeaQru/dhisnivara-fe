import { Metadata, Viewport } from 'next';

const baseUrl = 'https://dhisnivara.id';
const ogImage = `${baseUrl}/og-image.jpg`;
const logoUrl = `${baseUrl}/logo-dhisnivara.png`; // ✅ Update ke nama yang benar

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Dhisnivara - Jamur Tiram Organik Berkualitas Ekspor | Kemitraan & Investasi',
  description: 'Penyedia jamur tiram, shiitake, dan kuping segar berkualitas ekspor. Program kemitraan, investasi, dan teknologi IoT monitoring dengan guaranteed buyback Rp 15.000/kg.',
  keywords: [
    'jamur tiram',
    'jamur shiitake',
    'jamur kuping',
    'budidaya jamur',
    'kemitraan jamur',
    'investasi pertanian',
    'organic mushroom',
    'jamur organik',
    'farm management',
    'IoT farming',
    'teknologi pertanian',
  ],
  authors: [{ name: 'Dhisnivara', url: baseUrl }],
  creator: 'Dhisnivara Team',
  publisher: 'Dhisnivara',
  category: 'Agriculture',
  applicationName: 'Dhisnivara',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: baseUrl,
    siteName: 'Dhisnivara',
    title: 'Dhisnivara - Jamur Organik Berkualitas Ekspor',
    description: 'Jamur tiram, shiitake, kuping segar dengan teknologi IoT. Kemitraan & investasi dengan guaranteed buyback Rp 15.000/kg.',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Dhisnivara - Premium Organic Mushroom Farming',
        type: 'image/jpeg',
      },
      {
        url: `${baseUrl}/og-image-square.jpg`,
        width: 800,
        height: 800,
        alt: 'Dhisnivara Logo',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhisnivara - Jamur Organik Berkualitas Ekspor',
    description: 'Program kemitraan dan investasi jamur dengan teknologi IoT monitoring terdepan.',
    creator: '@dhisnivara',
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      noimageindex: false,
      notranslate: false,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: baseUrl,
  },
  other: {
    'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_CODE',
    'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};
