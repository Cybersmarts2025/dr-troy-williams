
import React, { useEffect, useState } from 'react';
import NavBar from "@/components/NavBar";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import { WebPageSchema, PersonSchema, NewsArticleSchema } from "@/utils/schemaMarkup";
import { useToast } from "@/hooks/use-toast";

// Import our new components
import PressHero from "@/components/press/PressHero";
import MediaFeaturesSection, { MediaFeature } from "@/components/press/MediaFeaturesSection";
import AwardsSection, { Recognition } from "@/components/press/AwardsSection";
import PressContactSection from "@/components/press/PressContactSection";

const Press = () => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  const [features, setFeatures] = useState<MediaFeature[]>([{
    outlet: "USA Today",
    title: "AI in National Defense: The Next Frontier",
    date: "March 15, 2024",
    description: "Dr. Troy Williams discusses the implications of artificial intelligence technologies in national defense systems.",
    link: "#",
    logo: "https://placehold.co/200x100/cccccc/333333?text=USA+Today"
  }, {
    outlet: "The Cybersecurity Journal",
    title: "Emerging Threats in Digital Security",
    date: "February 2, 2024",
    description: "An in-depth interview covering advanced persistent threats and evolving defense mechanisms.",
    link: "#",
    logo: "https://placehold.co/200x100/cccccc/333333?text=Cybersecurity+Journal"
  }, {
    outlet: "American Investigator",
    title: "Digital Forensics: The New Frontier",
    date: "December 12, 2023",
    description: "How digital investigative techniques are revolutionizing private investigation and law enforcement.",
    link: "#",
    logo: "https://placehold.co/200x100/cccccc/333333?text=American+Investigator"
  }]);
  
  // Handle metadata fetched from the URL
  const handleMetadataFetched = (metadata: { title: string; description: string; outlet?: string }) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const newFeature: MediaFeature = {
      outlet: metadata.outlet || "Media Outlet",
      title: metadata.title,
      date: formattedDate,
      description: metadata.description || "No description available",
      link: "#",
      logo: `https://placehold.co/200x100/cccccc/333333?text=${encodeURIComponent(metadata.outlet || "Media")}`
    };
    
    setFeatures(prevFeatures => [newFeature, ...prevFeatures]);
    
    toast({
      title: "Feature Added",
      description: `Added "${metadata.title}" to your media features`,
    });
  };
  
  // Awards and recognitions data
  const recognitions: Recognition[] = [{
    title: "Top 50 Cybersecurity Experts",
    organization: "Security Magazine",
    year: "2023",
    description: "Recognized for innovative approaches to national cybersecurity policy.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=Award"
  }, {
    title: "Distinguished AI Researcher",
    organization: "National Defense Technology Institute",
    year: "2022",
    description: "For contributions to ethical AI development in defense applications.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=Award"
  }, {
    title: "Technology Leader of the Year",
    organization: "Tennessee Technology Association",
    year: "2021",
    description: "Recognized for leadership in advancing technology education and innovation.",
    logo: "https://placehold.co/120x120/cccccc/333333?text=Award"
  }];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Press & Media | Dr. Troy Williams - AI & Cybersecurity Expert</title>
        <meta name="description" content="Press releases, interviews, and media appearances of Dr. Troy Williams - trusted authority in AI, cybersecurity, and digital investigation technology." />
      </Helmet>
      
      {/* Schema.org markup */}
      <WebPageSchema name="Press & Media | Dr. Troy Williams" description="Media appearances, interviews and press coverage featuring Dr. Troy Williams, AI and cybersecurity expert." />
      
      <PersonSchema 
        name="Dr. Troy Williams" 
        jobTitle="AI Scientist, Cybersecurity Expert, U.S. Technology Authority" 
        description="Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation." 
        alumniOf={["Capitol Technology University", "Western Governors University"]} 
        sameAs={["https://www.linkedin.com/in/troywilliams", "https://twitter.com/troywilliams"]} 
      />

      {/* Add schema markup for the first media feature */}
      {features[0] && (
        <NewsArticleSchema
          headline={features[0].title}
          description={features[0].description}
          image={features[0].logo}
          datePublished={features[0].date}
          publisher={{
            name: features[0].outlet
          }}
          url={features[0].link}
        />
      )}
      
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <PressHero />
        
        {/* Featured Press Section */}
        <MediaFeaturesSection 
          features={features}
          onMetadataFetched={handleMetadataFetched}
        />
        
        {/* Awards Section */}
        <AwardsSection recognitions={recognitions} />
        
        {/* Press Contact Section */}
        <PressContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Press;
