import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Pipeline } from "@/components/pipeline";
import { FeaturePillars } from "@/components/feature-pillars";
import { FeatureChips } from "@/components/feature-chips";
import { BuiltOn } from "@/components/built-on";
import { PreFooter } from "@/components/pre-footer";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pipeline />
        <FeaturePillars />
        <FeatureChips />
        <BuiltOn />
        <PreFooter />
      </main>
      <Footer />
    </>
  );
}
