import { HeroSection } from "@/components/hero-section"
import { SetupSection } from "@/components/setup-section"
import { PipelineSection } from "@/components/pipeline-section"
import { FeaturesSection } from "@/components/features-section"
import { ArchitectureSection } from "@/components/architecture-section"
import { TeamSection } from "@/components/team-section"
import { FooterSection } from "@/components/footer-section"
import { NavigationSidebar } from "@/components/navigation-sidebar"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <NavigationSidebar />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <SetupSection />
        <PipelineSection />
        <FeaturesSection />
        <ArchitectureSection />
        <TeamSection />
        <FooterSection />
      </div>
    </main>
  )
}
