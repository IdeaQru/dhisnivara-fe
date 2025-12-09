'use client';

const baseUrl = 'https://dhisnivara.id';
const logoUrl = `${baseUrl}/logo-dhisnivara.png`; // ✅ Update ke nama yang benar

export function SchemaOrganization() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://dhisnivara.id/#organization',
    name: 'Dhisnivara',
    url: 'https://dhisnivara.id',
    logo: logoUrl, // ✅ Sekarang menggunakan logo yang benar
    image: 'https://dhisnivara.id/og-image.jpg',
    description: 'Penyedia jamur tiram organik berkualitas ekspor dengan program kemitraan dan investasi',
    slogan: 'Premium Organic Mushroom Farming',
    sameAs: [
      'https://www.instagram.com/dhisnivara.id',
      'https://www.facebook.com/dhisnivara',
      'https://www.tiktok.com/@dhisnivara.id',
      'https://www.youtube.com/@dhisnivara',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Maghenda No.88, RT.11 RW.03',
      addressLocality: 'Harjokuncaran',
      addressRegion: 'Jawa Timur',
      postalCode: '65176',
      addressCountry: 'ID',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+62-811-359-0718',
        email: 'info@dhisnivara.id',
        areaServed: 'ID',
        availableLanguage: ['id', 'en'],
        hoursAvailable: 'Mo-Sa 08:00-17:00 WIB',
      },
    ],
    founder: {
      '@type': 'Person',
      name: 'Dhisnivara Team',
    },
    foundingDate: '2020',
    operatingStatus: 'Operational',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

export function SchemaLocalBusiness() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://dhisnivara.id/#localbusiness',
    name: 'Dhisnivara',
    image: logoUrl, // ✅ Sekarang menggunakan logo yang benar
    description: 'Penyedia jamur organik dengan teknologi IoT monitoring dan program kemitraan',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Maghenda No.88, RT.11 RW.03',
      addressLocality: 'Harjokuncaran',
      addressRegion: 'Jawa Timur',
      postalCode: '65176',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-8.6500',
      longitude: '110.8333',
    },
    telephone: '+62-811-359-0718',
    email: 'info@dhisnivara.id',
    url: 'https://dhisnivara.id',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: 'IDR',
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}

export function SchemaProducts() {
  const productsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://dhisnivara.id/produk/#products',
    name: 'Produk Jamur Dhisnivara',
    description: 'Koleksi lengkap jamur organik berkualitas ekspor dari Dhisnivara',
    itemListElement: [
      {
        '@type': 'Product',
        '@id': 'https://dhisnivara.id/produk/jamur-tiram#product',
        name: 'Jamur Tiram Putih',
        description: 'Jamur tiram putih segar kualitas ekspor dengan tekstur lembut dan rasa gurih alami',
        image: 'https://dhisnivara.id/images/jamur-tiram.jpg',
        offers: {
          '@type': 'AggregateOffer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'IDR',
          price: '15000',
        },
        producer: {
          '@type': 'Organization',
          name: 'Dhisnivara',
          url: 'https://dhisnivara.id',
          logo: logoUrl,
        },
      },
      {
        '@type': 'Product',
        '@id': 'https://dhisnivara.id/produk/jamur-tiram-coklat#product',
        name: 'Jamur Tiram Coklat',
        description: 'Varian tiram coklat dengan aroma lebih kuat dan tekstur kenyal, cocok untuk olahan premium',
        image: 'https://dhisnivara.id/images/jamur-tiram-coklat.jpg',
        offers: {
          '@type': 'AggregateOffer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'IDR',
          price: '15000',
        },
        producer: {
          '@type': 'Organization',
          name: 'Dhisnivara',
          url: 'https://dhisnivara.id',
          logo: logoUrl,
        },
      },
      {
        '@type': 'Product',
        '@id': 'https://dhisnivara.id/produk/jamur-kuping#product',
        name: 'Jamur Kuping Organik',
        description: 'Jamur kuping organik dengan kandungan serat tinggi, ideal untuk menu diet dan kesehatan',
        image: 'https://dhisnivara.id/images/jamur-kuping.jpg',
        offers: {
          '@type': 'AggregateOffer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'IDR',
          price: '15000',
        },
        producer: {
          '@type': 'Organization',
          name: 'Dhisnivara',
          url: 'https://dhisnivara.id',
          logo: logoUrl,
        },
      },
      {
        '@type': 'Product',
        '@id': 'https://dhisnivara.id/produk/jamur-shiitake#product',
        name: 'Jamur Shiitake Premium',
        description: 'Shiitake premium dengan aroma khas dan kaya umami, favorit chef profesional',
        image: 'https://dhisnivara.id/images/jamur-shiitake.jpg',
        offers: {
          '@type': 'AggregateOffer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'IDR',
          price: '15000',
        },
        producer: {
          '@type': 'Organization',
          name: 'Dhisnivara',
          url: 'https://dhisnivara.id',
          logo: logoUrl,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
    />
  );
}

export function SchemaPartnershipProgram() {
  const partnershipSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://dhisnivara.id/kemitraan/#service',
    name: 'Program Kemitraan Jamur Dhisnivara',
    description: 'Solusi lengkap untuk membangun bisnis jamur yang profitable dengan dukungan desain, supply baglog, guaranteed buyback, dan teknologi IoT monitoring',
    provider: {
      '@type': 'Organization',
      name: 'Dhisnivara',
      url: 'https://dhisnivara.id',
      image: logoUrl,
      logo: logoUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    serviceType: 'Business Partnership',
    offers: [
      {
        '@type': 'Offer',
        name: 'Desain & Konstruksi Kumbung',
        description: 'Membantu desain optimal layout kumbung sesuai lahan dengan standar production-grade',
      },
      {
        '@type': 'Offer',
        name: 'Supply Baglog Berkelanjutan',
        description: 'Supply baglog berkualitas tinggi secara kontinu tanpa khawatir kehabisan stok',
      },
      {
        '@type': 'Offer',
        name: 'Guaranteed Buyback Rp 15.000/kg',
        description: 'Jaminan pembelian semua hasil panen jamur dengan harga tetap',
      },
      {
        '@type': 'Offer',
        name: 'Teknologi IoT Monitoring',
        description: 'Sistem IoT untuk monitoring suhu, kelembaban, automated watering system dari smartphone',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(partnershipSchema) }}
    />
  );
}

export function SchemaInvestmentProgram() {
  const investmentSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': 'https://dhisnivara.id/investasi/#service',
    name: 'Program Investasi Dhisnivara',
    description: 'Program investasi pertanian dengan return tetap 12% per tahun dan perlindungan asuransi untuk hasil optimal',
    provider: {
      '@type': 'Organization',
      name: 'Dhisnivara',
      url: 'https://dhisnivara.id',
      logo: logoUrl,
    },
    feesAndCommissionsSpecification: 'Return tetap 12% per tahun dengan bunga majemuk',
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(investmentSchema) }}
    />
  );
}

export function SchemaBreadcrumb() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dhisnivara.id',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Produk',
        item: 'https://dhisnivara.id/produk',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Kemitraan',
        item: 'https://dhisnivara.id/kemitraan',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Investasi',
        item: 'https://dhisnivara.id/investasi',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Kontak',
        item: 'https://dhisnivara.id/kontak',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
