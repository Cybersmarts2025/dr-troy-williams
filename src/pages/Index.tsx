
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import WorkHistory from "@/components/WorkHistory";
import YouTubeSection from "@/components/YouTubeSection";
import SocialLinks from "@/components/SocialLinks";
// Removed PDFUploader import

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HeroSection />
        <WorkHistory />
        <YouTubeSection />
        <SocialLinks />
        {/* Removed PDFUploader component */}
      </main>
    </div>
  );
};

export default Index;
