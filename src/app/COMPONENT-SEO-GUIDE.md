# SEO Component Implementation Guidelines

## 📝 Heading Structure (Sangat Penting untuk SEO)

### Aturan Dasar:
- **H1**: Hanya 1 per halaman (biasanya di Hero section)
- **H2**: Main sections (ProductSection, MitraSection, LocationSection, etc)
- **H3+**: Subsections dan detail content
- **Jangan loncat** H1 → H3, harus sequential (H1 → H2 → H3)

---

## 🎨 Component Implementation Examples

### Hero Component (H1 - Main Title)
```jsx
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 id="hero-title">
          Dhisnivara - Jamur Organik Berkualitas Ekspor
        </h1>
        <p className="hero-subtitle">
          Solusi lengkap budidaya jamur dengan teknologi IoT monitoring dan guaranteed buyback Rp 15.000/kg
        </p>
      </div>
    </section>
  )
}
```

### ProductSection Component (H2)
```jsx
export default function ProductSection() {
  const products = [
    {
      id: 'jamur-tiram',
      name: 'Jamur Tiram Putih',
      description: 'Jamur tiram putih segar kualitas ekspor dengan tekstur lembut dan rasa gurih alami',
    },
    {
      id: 'jamur-tiram-coklat',
      name: 'Jamur Tiram Coklat',
      description: 'Varian tiram coklat dengan aroma lebih kuat dan tekstur kenyal, cocok untuk olahan premium',
    },
    {
      id: 'jamur-kuping',
      name: 'Jamur Kuping Organik',
      description: 'Jamur kuping organik dengan kandungan serat tinggi, ideal untuk menu diet dan kesehatan',
    },
    {
      id: 'jamur-shiitake',
      name: 'Jamur Shiitake Premium',
      description: 'Shiitake premium dengan aroma khas dan kaya umami, favorit chef profesional',
    },
  ]

  return (
    <section className="products" aria-labelledby="products-title">
      <div className="container">
        <h2 id="products-title">Produk Jamur Unggulan Kami</h2>
        <p className="section-intro">
          Dari jamur segar berkualitas ekspor hingga produk olahan siap santap, 
          semua dikemas dengan standar food safety terbaik.
        </p>
        
        <div className="products-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-specs">
                <span className="spec">📦 500g - 1kg</span>
                <span className="spec">🌱 Panen Harian</span>
              </div>
              <a href={`/produk/${product.id}`} className="btn btn-primary">
                Lihat Detail
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### MitraSection Component (H2 - Kemitraan)
```jsx
export default function MitraSection() {
  const benefits = [
    {
      icon: '🏗️',
      title: 'Desain & Konstruksi',
      description: 'Membantu desain optimal layout kumbung sesuai lahan dengan standar production-grade',
    },
    {
      icon: '📦',
      title: 'Supply Baglog',
      description: 'Supply baglog berkualitas tinggi secara kontinu, tanpa khawatir kehabisan stok',
    },
    {
      icon: '💰',
      title: 'Guaranteed Buyback Rp 15.000/kg',
      description: 'Kami beli semua hasil panen jamur Anda dengan harga tetap. Kepastian profit tanpa risiko pemasaran.',
    },
    {
      icon: '📱',
      title: 'Teknologi IoT Monitoring',
      description: 'Real-time monitoring dari smartphone untuk suhu, kelembaban, dan automated watering system',
    },
  ]

  return (
    <section className="mitra" aria-labelledby="mitra-title">
      <div className="container">
        <h2 id="mitra-title">Program Kemitraan Dhisnivara</h2>
        <p className="section-intro">
          Solusi lengkap bangun kumbung, supply baglog, guaranteed buyback, 
          dan teknologi IoT monitoring untuk kesuksesan bisnis jamur Anda.
        </p>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>

        <h3>Perbandingan: Usaha Mandiri vs Bermitra dengan Kami</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Aspek</th>
              <th>Mandiri</th>
              <th>Bermitra Dhisnivara</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Risiko Pasar</td>
              <td>Tinggi</td>
              <td>Minimal (Guaranteed Buyback)</td>
            </tr>
            <tr>
              <td>Support Teknis</td>
              <td>Cari Sendiri</td>
              <td>Tim Expert</td>
            </tr>
            <tr>
              <td>Teknologi</td>
              <td>Manual</td>
              <td>IoT Automation</td>
            </tr>
          </tbody>
        </table>

        <div className="cta">
          <a href="/kemitraan" className="btn btn-primary btn-lg">
            Hubungi Kami untuk Konsultasi Gratis
          </a>
        </div>
      </div>
    </section>
  )
}
```

### LocationSection Component (H2 - Lokasi)
```jsx
export default function LocationSection() {
  const locations = [
    {
      id: 'kediri',
      name: 'Desa Puncu, Kabupaten Kediri',
      description: 'Fokus produksi jamur tiram skala besar untuk pasokan Jawa Timur.',
      capacity: '5000 kg/bulan',
    },
    {
      id: 'malang-1',
      name: 'Desa Harjo Kuncaran, RT 04',
      description: 'Kumbung inti di kawasan Malang Selatan dengan penerapan IoT monitoring.',
      capacity: '3000 kg/bulan',
    },
    {
      id: 'malang-2',
      name: 'Desa Harjo Kuncaran, RT 06',
      description: 'Fasilitas tambahan untuk meningkatkan kapasitas panen dan riset varietas.',
      capacity: '2000 kg/bulan',
    },
  ]

  return (
    <section className="locations" aria-labelledby="locations-title">
      <div className="container">
        <h2 id="locations-title">Lokasi Kumbung Dhisnivara</h2>
        <p className="section-intro">
          Saat ini kami mengelola 3 lokasi kumbung aktif dengan standar budidaya yang sama 
          sehingga kualitas panen tetap konsisten.
        </p>
        
        <div className="locations-grid">
          {locations.map((location) => (
            <article key={location.id} className="location-card">
              <h3>{location.name}</h3>
              <p>{location.description}</p>
              <div className="location-specs">
                <span className="spec">📊 Kapasitas: {location.capacity}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### CollaborationSection Component (H2 - Solusi Dukungan)
```jsx
export default function CollaborationSection() {
  return (
    <section className="collaboration" aria-labelledby="collab-title">
      <div className="container">
        <h2 id="collab-title">Dukungan Menyeluruh untuk Kesuksesan Anda</h2>
        
        <div className="collaboration-items">
          <article className="collab-item">
            <h3>🏗️ Desain & Konstruksi Optimal</h3>
            <p>
              Kami bantu desain optimal layout kumbung sesuai lahan Anda dengan 
              standar production-grade untuk hasil maksimal.
            </p>
          </article>

          <article className="collab-item">
            <h3>📦 Supply Baglog Berkontinyu</h3>
            <p>
              Supply baglog berkualitas tinggi secara kontinu, tanpa khawatir 
              kehabisan stok atau kualitas yang tidak konsisten.
            </p>
          </article>

          <article className="collab-item">
            <h3>💰 Jaminan Pembelian Rp 15.000/kg</h3>
            <p>
              Kami beli semua hasil panen jamur Anda dengan harga tetap Rp 15.000/kg. 
              Kepastian profit tanpa risiko pemasaran.
            </p>
          </article>

          <article className="collab-item">
            <h3>📱 Teknologi IoT Terdepan</h3>
            <p>
              Teknologi IoT untuk monitoring suhu, kelembaban, dan automated watering system. 
              Farm management langsung dari smartphone.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
```

### InvestmentSection Component (H2 - Investasi)
```jsx
export default function InvestmentSection() {
  return (
    <section className="investment" aria-labelledby="investment-title">
      <div className="container">
        <h2 id="investment-title">Program Investasi Dhisnivara</h2>
        <p className="section-intro">
          Investasi pertanian dengan return tetap 12% per tahun, bunga majemuk, 
          dan perlindungan asuransi untuk hasil optimal.
        </p>

        <h3>Simulasi Investasi Modal Rp 50.000.000</h3>
        <p>
          Simulasi menggunakan return tetap 12% per tahun dengan bunga majemuk, 
          tanpa top-up tambahan. Nilai aktual bergantung pada performa produksi dan pasar.
        </p>
        
        {/* Investment table di sini */}

        <h3>Proses Investasi</h3>
        <ol className="investment-process">
          <li>
            <strong>Konsultasi & Pendaftaran</strong>
            <p>Investor mengisi formulir, kami lakukan verifikasi identitas dan kelayakan modal.</p>
          </li>
          <li>
            <strong>Penandatanganan Kontrak</strong>
            <p>Penandatanganan kontrak investasi dan transfer dana ke rekening escrow resmi.</p>
          </li>
          <li>
            <strong>Alokasi Dana & Monitoring</strong>
            <p>Dana dialokasikan ke baglog, operasional kumbung, dan monitoring IoT real-time.</p>
          </li>
          <li>
            <strong>Distribusi Return</strong>
            <p>Setiap triwulan investor terima laporan dan transfer bagi hasil sesuai kontrak.</p>
          </li>
        </ol>

        <div className="investment-features">
          <article>
            <h3>📈 Potensi Return Lebih Tinggi</h3>
            <p>
              Return bisa naik di atas 12%. Kelebihan hasil panen langsung dibagikan 
              proporsional ke investor sesuai skema bagi hasil.
            </p>
          </article>

          <article>
            <h3>🛡️ Perlindungan Modal</h3>
            <p>
              Kami jamin buyback jamur Rp 15.000/kg. Jika ada shortfall, sebagian modal 
              dilindungi asuransi pertanian dan cadangan dana operasional.
            </p>
          </article>

          <article>
            <h3>⚠️ Klausul Force Majeure</h3>
            <p>
              Kontrak mencakup klausul force majeure. Investor berhak atas kompensasi 
              dari asuransi atau perpanjangan tenor tanpa denda.
            </p>
          </article>

          <article>
            <h3>💰 Fleksibilitas Pencairan</h3>
            <p>
              Investor bisa cairkan dana setelah 6 bulan pertama dengan pinalti 20%. 
              Setelah 1 tahun, tidak ada pinalti.
            </p>
          </article>
        </div>

        <div className="investment-cta">
          <a href="/investasi" className="btn btn-primary btn-lg">
            Hubungi Kami untuk Informasi Investasi Lengkap
          </a>
        </div>
      </div>
    </section>
  )
}
```

---

## 🎯 SEO Best Practices untuk Components

### 1. **Use Semantic HTML**
```jsx
// ✅ GOOD
<section aria-labelledby="section-title">
  <h2 id="section-title">Section Title</h2>
  <article>Content</article>
</section>

// ❌ BAD
<div>
  <div className="title">Section Title</div>
  <div>Content</div>
</div>
```

### 2. **Image Alt Text (Sangat Penting)**
```jsx
// ✅ GOOD - Descriptive and keyword-rich
<img 
  src="/jamur-tiram.jpg" 
  alt="Jamur tiram putih segar berkualitas ekspor dari Dhisnivara" 
/>

// ❌ BAD - Generic or missing
<img src="/jamur-tiram.jpg" alt="image" />
<img src="/jamur-tiram.jpg" /> {/* No alt */}
```

### 3. **Links dengan Descriptive Text**
```jsx
// ✅ GOOD
<a href="/produk/jamur-tiram">
  Jamur Tiram Putih - Kualitas Ekspor
</a>

// ❌ BAD
<a href="/produk/jamur-tiram">Click here</a>
<a href="/produk/jamur-tiram">Lihat</a>
```

### 4. **Structured Content**
```jsx
// ✅ GOOD - Clear hierarchy
<section>
  <h2>Main Topic</h2>
  <p>Introduction paragraph</p>
  <h3>Subtopic 1</h3>
  <ul>
    <li>Point 1</li>
    <li>Point 2</li>
  </ul>
  <h3>Subtopic 2</h3>
  <ul>
    <li>Point 1</li>
    <li>Point 2</li>
  </ul>
</section>

// ❌ BAD - No structure
<div className="content">
  <p>Everything mixed together without proper hierarchy</p>
  <div>More content</div>
</div>
```

### 5. **Meta Descriptions per Page**
```tsx
// pages/produk/jamur-tiram/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jamur Tiram Putih - Berkualitas Ekspor | Dhisnivara',
  description: 'Jamur tiram putih segar berkualitas ekspor dengan tekstur lembut. Panen harian 500g-1kg. Guaranteed buyback Rp 15.000/kg. Pesan sekarang!',
}

export default function JamurTiramPage() {
  return (
    // Component content
  )
}
```

---

## 📊 Monitoring Checklist

Setelah implement semua, check:

- [ ] Halaman punya 1 H1 yang descriptive
- [ ] H2+ hierarchy logical dan sequential
- [ ] Semua images punya descriptive alt text dengan keywords
- [ ] Links punya descriptive anchor text
- [ ] Section punya aria-labelledby
- [ ] Meta description per halaman
- [ ] Internal links menghubungkan related content
- [ ] Page load speed < 3 seconds
- [ ] Mobile responsive di semua devices
- [ ] Schema markup detected di Rich Results Test

---

**Last Updated**: December 9, 2025
