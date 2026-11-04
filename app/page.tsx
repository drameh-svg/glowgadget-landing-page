import { BrandMoment } from "@/app/components/BrandMoment";
import { Colorways } from "@/app/components/Colorways";
import { CustomizationSection } from "@/app/components/CustomizationSection";
import { HeroSection } from "@/app/components/HeroSection";
import { HowItWorks } from "@/app/components/HowItWorks";
import { ProductStatement } from "@/app/components/ProductStatement";
import { WaitlistSection } from "@/app/components/WaitlistSection";
import { WordmarkSection } from "@/app/components/WordmarkSection";

export default function HomePage() {
  return (
    <div className="frame" id="top">
      <main className="page">
        <HeroSection />
        <WordmarkSection />
        <ProductStatement />
        <HowItWorks />
        <Colorways />
        <CustomizationSection />
        <BrandMoment />
        <WaitlistSection />
      </main>
    </div>
  );
}
