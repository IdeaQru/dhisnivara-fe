# Panduan Implementasi SEO Lengkap untuk Dhisnivara

## 📁 File Structure

```
src/app/
├── metadata.ts          ← BARU: Metadata SEO global
├── schema.tsx           ← BARU: Structured data / Schema.org
├── layout.tsx           ← UPDATE: Integrasikan schema
├── page.tsx             ← UPDATE: Rename dari page-updated.tsx
├── robots.ts            ← SUDAH ADA: Perbarui dengan versi optimized
└── sitemap.ts           ← SUDAH ADA: Perbarui dengan versi lengkap
```

## 🚀 Langkah Implementasi

### Step 1: Copy Metadata File
1. Buat file baru: `src/app/metadata.ts`
2. Copy seluruh isi dari file `metadata.ts` yang sudah dibuat
3. **PENTING**: Ganti `YOUR_GOOGLE_VERIFICATION_CODE` dengan kode dari Google Search Console
   - Buka Google Search Console
   - Settings → Ownership verification
   - Copy verification code
   - Paste ke line yang bertulisan `'google-site-verification'`

### Step 2: Copy Schema File
1. Buat file baru: `src/app/schema.tsx`
2. Copy seluruh isi dari file `schema.tsx` yang sudah dibuat
3. Jangan perlu edit, file ini sudah complete

### Step 3: Update page.tsx
1. Buka `src/app/page.tsx` (atau sesuai struktur project Anda)
2. Replace seluruh isi dengan isi dari `page-updated.tsx`
3. Pastikan path imports (`@/components`) sesuai dengan struktur project

### Step 4: Cek & Update robots.ts dan sitemap.ts
Jika belum update, gunakan versi yang sudah di-share sebelumnya.

### Step 5: Setup Image Assets
Buat/upload image-image berikut ke folder `public/`:

```
public/
├── favicon.ico                 (favicon)
├── favicon-16x16.png           (favicon small)
├── apple-touch-icon.png        (icon untuk Apple devices)
├── og-image.jpg                (1200x630px - untuk share di social)
├── og-image-square.jpg         (800x800px - untuk profile)
├── logo.png                    (logo Dhisnivara)
└── site.webmanifest            (PWA manifest)
```

**OG Image Specs:**
- Ukuran: 1200x630 pixels
- Format: JPG
- Content: Hero image atau logo + text "Dhisnivara - Jamur Organik"
- Weight: <200KB

### Step 6: Verifikasi Google
1. Buka https://search.google.com/search-console
2. Add Property → Domain
3. Masukkan: `dhisnivara.id`
4. Pilih metode verifikasi: DNS
5. Follow instruksi Google (update DNS records)
6. Setelah verified, kembali ke Step 1 dan update verification code di metadata.ts

### Step 7: Build & Deploy
```bash
# Test locally
npm run build

# Verifikasi output
- Akses http://localhost:3000/robots.txt
- Akses http://localhost:3000/sitemap.xml
- Buka browser DevTools > Network, check response headers

# Deploy ke production
npm run deploy
# atau gunakan platform Anda (Vercel, Netlify, etc)
```

### Step 8: Post-Deployment Actions
Setelah deploy ke production:

1. **Tunggu 5-10 menit** untuk DNS propagation

2. **Verifikasi files:**
   ```
   https://dhisnivara.id/robots.txt
   https://dhisnivara.id/sitemap.xml
   ```

3. **Google Search Console:**
   - Buka URL Inspection Tool
   - Masukkan: `https://dhisnivara.id`
   - Klik "Request Indexing"
   - Monitor status crawling

4. **Test Schema di Google Rich Results Test:**
   - Kunjungi: https://search.google.com/test/rich-results
   - Masukkan URL homepage
   - Verify semua schema terdeteksi dengan benar

5. **Bing Webmaster Tools:**
   - Submit ke: https://www.bing.com/webmasters
   - Upload sitemap

## ✅ Checklist Implementasi

- [ ] File `metadata.ts` dibuat di `src/app/`
- [ ] File `schema.tsx` dibuat di `src/app/`
- [ ] File `page.tsx` diupdate dengan schema integration
- [ ] File `robots.ts` diupdate dengan versi optimized
- [ ] File `sitemap.ts` diupdate dengan halaman lengkap
- [ ] Google verification code ditambahkan ke metadata.ts
- [ ] OG images (1200x630 & 800x800) upload ke public/
- [ ] Logo.png upload ke public/
- [ ] Build lokal berhasil tanpa error
- [ ] Deploy ke production
- [ ] robots.txt & sitemap.xml accessible di domain
- [ ] Google Search Console verified
- [ ] URL submitted untuk indexing
- [ ] Rich Results Test menunjukkan schema terdeteksi

## 📊 Schema yang Diimplementasikan

### 1. **Organization Schema**
   - Informasi bisnis lengkap
   - Contact details
   - Social media links
   - Founding date

### 2. **LocalBusiness Schema**
   - Alamat & koordinat GPS
   - Jam operasional
   - Nomor telepon
   - Area layanan

### 3. **Products Schema**
   - Jamur Tiram Putih
   - Jamur Tiram Coklat
   - Jamur Kuping Organik
   - Jamur Shiitake Premium
   - Harga dan availability

### 4. **Partnership Program Schema**
   - Deskripsi lengkap
   - Service offerings (Desain, Supply, Buyback, IoT)
   - Area yang dilayani

### 5. **Investment Program Schema**
   - Return information
   - Service provider
   - Area served

### 6. **Breadcrumb Schema**
   - Navigasi struktur
   - Home → Produk → Kemitraan → Investasi → Kontak

## 🔍 Monitoring & Testing

### Tools untuk Testing:

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Untuk verifikasi schema parsing

2. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Untuk optimization suggestions

3. **Google Search Console**
   - URL: https://search.google.com/search-console
   - Monitor crawl stats, submit URLs

4. **Lighthouse**
   - Built-in di Chrome DevTools
   - Check SEO score

### Metrics untuk Monitor:

- **Crawl Status** (Google Search Console)
  - Crawled pages
  - Coverage issues
  - Excluded pages

- **Index Coverage** (Google Search Console)
  - Valid pages indexed
  - Valid pages not indexed
  - Excluded pages

- **Search Performance** (Google Search Console)
  - Total clicks
  - Total impressions
  - Average CTR
  - Average position

## ⚠️ Common Issues & Solutions

### Issue: robots.txt atau sitemap.xml tidak ditemukan
**Solution**: 
- Verify file ada di `src/app/`
- Check nama file eksak (case-sensitive)
- Rebuild & redeploy

### Issue: Schema tidak terdeteksi di Rich Results Test
**Solution**:
- Buka page source (Ctrl+U)
- Cari `<script type="application/ld+json">`
- Verify JSON syntax benar
- Copy JSON ke https://jsonlint.com/ untuk validate

### Issue: Google tidak crawl setelah 1 minggu
**Solution**:
- Submit manual di Search Console (URL Inspection → Request Indexing)
- Check robots.txt tidak memblokir
- Verify page tidak ada noindex tag
- Check page load speed (optimize jika > 3s)

### Issue: Metadata tidak muncul di social media preview
**Solution**:
- Clear social media cache
- Re-share URL di platform
- Verify OG image ada di public/
- Use: https://www.opengraph.xyz/ untuk test

## 📈 Expected Timeline

- **Hari 1-3**: Schema indexed, OG preview berfungsi
- **Minggu 1**: Homepage mulai appear di Google search
- **Minggu 2-4**: Product pages mulai indexed
- **Bulan 1-2**: Full sitemap indexed, ranking untuk low-competition keywords
- **Bulan 2-3**: Ranking improvement untuk medium-competition keywords

## 💡 Tips untuk Accelerate Indexing

1. **Internal Linking**: Link dari homepage ke semua section (Hero → ProductSection → MitraSection, etc)
2. **Content Quality**: Ensure semua text dan deskripsi SEO-friendly dan unique
3. **Image Optimization**: Compress images, add alt text dengan keywords
4. **Speed**: Optimize core web vitals (LCP, FID, CLS)
5. **Mobile**: Ensure responsive di semua devices
6. **Backlinks**: Get links dari blog agritech atau media lokal

## 📞 Support & Updates

Jika ada masalah:
1. Check file structure sesuai dokumentasi
2. Verify di Google Rich Results Test
3. Monitor di Google Search Console
4. Update ke Next.js terbaru jika perlu

---

**Created**: December 9, 2025
**Last Updated**: December 9, 2025
**Dhisnivara SEO Implementation v1.0**
