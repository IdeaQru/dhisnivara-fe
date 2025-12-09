import type { Metadata } from 'next'
import { metadata as pageMetadata, viewport } from './metadata'
import {
  SchemaOrganization,
  SchemaLocalBusiness,
  SchemaProducts,
  SchemaPartnershipProgram,
  SchemaInvestmentProgram,
  SchemaBreadcrumb,
} from './schema'
import Hero from '@/components/Hero'
import ProductSection from '@/components/ProductSection'
import MitraSection from '@/components/MitraSection'
import LocationSection from '@/components/LocationSection'
import CollaborationSection from '@/components/CollaborationSection'
import InvestmentSection from '@/components/InvestmentSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = pageMetadata
export { viewport }

export default function Home() {
  return (
    <>
      {/* Structured Data / Schema.org */}
      <SchemaOrganization />
      <SchemaLocalBusiness />
      <SchemaProducts />
      <SchemaPartnershipProgram />
      <SchemaInvestmentProgram />
      <SchemaBreadcrumb />

      {/* Main Content */}
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
    </>
  )
}
