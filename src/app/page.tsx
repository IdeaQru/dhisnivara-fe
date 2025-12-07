import Hero from '@/components/Hero'
import ProductSection from '@/components/ProductSection'
import MitraSection from '@/components/MitraSection'
import LocationSection from '@/components/LocationSection'
import CollaborationSection from '@/components/CollaborationSection'
import InvestmentSection from '@/components/InvestmentSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
export default function Home() {
  return (
    <main>
      <Hero />
      <ProductSection />
      <MitraSection />
      <LocationSection />
      <CollaborationSection />
      <InvestmentSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
