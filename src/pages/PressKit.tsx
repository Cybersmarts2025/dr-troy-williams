
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, Image, FileText, Shield, Copy, Check, 
  Mic, Video, Newspaper, Mail, Phone, Globe, 
  Award, BookOpen, Target, ExternalLink, User
} from 'lucide-react';

const interviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255),
  organization: z.string().trim().min(1, "Organization is required").max(200),
  role: z.string().trim().min(1, "Your role is required").max(100),
  interviewType: z.string().min(1, "Please select an interview type"),
  topic: z.string().trim().min(1, "Please describe the topic").max(1000),
  deadline: z.string().optional(),
  additionalInfo: z.string().max(2000).optional(),
});

type InterviewFormData = z.infer<typeof interviewSchema>;

const BioSnippet = ({ title, text, wordCount }: { title: string; text: string; wordCount?: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          {wordCount && <span className="text-xs text-muted-foreground">{wordCount}</span>}
        </div>
        <button 
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-[#B22234] text-white hover:bg-[#8B1A28] rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
};

const OFFICIAL_BIO = "Dr. Troy Williams, PhD, represents a unique convergence of three critical disciplines: cybersecurity engineering, artificial intelligence science, and licensed private investigation. Known professionally as The Proactive AI PI, Williams has dedicated his career to identifying and neutralizing synthetic identity fraud—one of the fastest-growing and least understood threats to American financial infrastructure. Through doctoral-level research in artificial intelligence and cybersecurity, Williams brings both academic rigor and real-world investigative experience to his work. His independent research has been featured on SSRN and ResearchGate, achieving a Research Interest Score of 8.0. Williams is the creator of four trademarked defense systems that together form the first unified synthetic identity prevention architecture in the United States: PatriotProof™ (fortress-level identity defense), FraudDNA™ (behavioral pattern analysis), AISF™ (Autonomous Intelligence Security Framework), and PPP™ (Proactive Prevention Platform). He holds international Patent PCT/US25/43982 for his synthetic identity detection methodology. His research and publications are independently developed and published. His specialized training includes prompt engineering under Dr. Jules White at Vanderbilt University and financial fraud investigation through SBI Seminars. Based in Tennessee, Williams operates under a singular mission: Protecting America Through Technology.";

const CopyOfficialBioButton = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(OFFICIAL_BIO);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Button 
      onClick={handleCopy}
      variant="usaRed"
      size="lg"
      className="gap-2"
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" />
          Bio Copied!
        </>
      ) : (
        <>
          <Copy className="w-5 h-5" />
          Copy Official Bio
        </>
      )}
    </Button>
  );
};

const DownloadCard = ({
  title, 
  description, 
  icon: Icon, 
  downloadUrl, 
  downloadName,
  previewContent 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
  downloadUrl: string;
  downloadName: string;
  previewContent?: React.ReactNode;
}) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden">
    <div className="aspect-video bg-[#0A1628] flex items-center justify-center">
      {previewContent || <Icon className="w-16 h-16 text-[#B22234]" />}
    </div>
    <div className="p-5">
      <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
        <Icon className="w-5 h-5 text-[#B22234]" />
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <a 
        href={downloadUrl} 
        download={downloadName}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#B22234] text-white text-sm font-medium rounded-lg hover:bg-[#8B1A28] transition-colors"
      >
        <Download className="w-4 h-4" />
        Download
      </a>
    </div>
  </div>
);

const PressKit = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<InterviewFormData>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      role: '',
      interviewType: '',
      topic: '',
      deadline: '',
      additionalInfo: '',
    },
  });

  const onSubmit = async (data: InterviewFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Interview Request Submitted",
        description: "Thank you for your interest. We will respond within 48 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const keyFacts = [
    { label: "Full Name", value: "Dr. Troy Williams, PhD" },
    { label: "Known As", value: "The Proactive AI PI" },
    { label: "Based In", value: "Tennessee, United States" },
    { label: "Expertise", value: "Cybersecurity, AI, Synthetic Identity Fraud" },
    { label: "Patent", value: "PCT/US25/43982" },
    { label: "Company", value: "Cybersmarts.ai LLC" },
  ];

  const speakingTopics = [
    "Synthetic Identity Fraud: The Invisible Threat to Financial Institutions",
    "AI-Driven Security: Building Autonomous Defense Systems",
    "Quantum Computing and the Future of Identity Protection",
    "The Proactive Prevention Paradigm: Stopping Fraud Before It Starts",
    "National Security Implications of Digital Identity Engineering",
    "From Investigation to Innovation: A Private Investigator's Journey into AI",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Press Kit | Dr. Troy Williams - Media Resources & Interview Requests</title>
        <meta 
          name="description" 
          content="Official press kit for Dr. Troy Williams, The Proactive AI PI. Download media assets, bio information, and request interviews on cybersecurity, AI, and synthetic identity fraud." 
        />
        <link rel="canonical" href="https://www.DrTroyWilliams.net/press-kit" />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Press Kit" />
        
        {/* Hero Section */}
        <section className="bg-[#0A1628] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B22234] rounded-full mb-6">
                <Newspaper className="w-5 h-5" />
                <span className="font-semibold">Official Media Resources</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Press Kit
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Everything journalists, producers, and media professionals need 
                for coverage of Dr. Troy Williams and his work in cybersecurity and AI.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-12 bg-[#B22234] text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              {keyFacts.map((fact, idx) => (
                <div key={idx}>
                  <p className="text-xs text-white/85 uppercase tracking-wider mb-1">{fact.label}</p>
                  <p className="font-semibold text-sm">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Downloadable Assets */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                Downloadable Assets
              </h2>
              <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                High-resolution images and materials approved for editorial use with proper attribution.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DownloadCard 
                  title="Official Headshot"
                  description="High-resolution professional portrait for press use."
                  icon={Image}
                  downloadUrl="/lovable-uploads/troy-williams-headshot-transparent.png"
                  downloadName="DrTroyWilliams-Headshot.png"
                  previewContent={
                    <img 
                      src="/lovable-uploads/troy-williams-headshot-transparent.png" 
                      alt="Dr. Troy Williams Headshot"
                      className="w-full h-full object-cover"
                    />
                  }
                />
                <DownloadCard 
                  title="Brand Logo"
                  description="Official brand mark and identity assets."
                  icon={Shield}
                  downloadUrl="/lovable-uploads/troy-williams-headshot-transparent.png"
                  downloadName="DrTroyWilliams-Logo.png"
                />
                <DownloadCard 
                  title="Press Release Template"
                  description="Standard press release format with key information."
                  icon={FileText}
                  downloadUrl="/press-kit-dr-troy-williams.txt"
                  downloadName="DrTroyWilliams-PressRelease.txt"
                />
                <DownloadCard 
                  title="Full Press Kit"
                  description="Complete media package with all assets and information."
                  icon={Download}
                  downloadUrl="/press-kit-dr-troy-williams.txt"
                  downloadName="DrTroyWilliams-FullPressKit.txt"
                />
              </div>

              {/* Official Profiles */}
              <div className="mt-10 pt-8 border-t border-border">
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">Official Profiles</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="https://www.amazon.com/author/troy-williams" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF9900] text-black font-medium rounded-lg hover:bg-[#e88a00] transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    Amazon Author Page
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/cybersmarts/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white font-medium rounded-lg hover:bg-[#084d94] transition-colors"
                  >
                    LinkedIn Profile
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.researchgate.net/profile/Troy-Williams-14" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00CCBB] text-white font-medium rounded-lg hover:bg-[#00b3a3] transition-colors"
                  >
                    ResearchGate
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Snippets */}
        <section className="py-16 bg-[#3C3B6E]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                Ready-to-Use Bios
              </h2>
              <p className="text-center text-muted-foreground mb-6">
                Pre-approved biographical text for articles and introductions.
              </p>
              <div className="flex justify-center mb-10">
                <CopyOfficialBioButton />
              </div>
              
              <div className="space-y-4">
                <BioSnippet 
                  title="One-Liner"
                  wordCount="15 words"
                  text="Dr. Troy Williams is The Proactive AI PI, defending America against synthetic identity fraud."
                />
                <BioSnippet 
                  title="Short Bio"
                  wordCount="50 words"
                  text="Dr. Troy Williams, PhD, is a cybersecurity engineer, artificial intelligence scientist, and licensed private investigator known as The Proactive AI PI. He is the creator of PatriotProof™, FraudDNA™, AISF™, and PPP™ systems for synthetic identity fraud defense. Based in Tennessee, his mission is Protecting America Through Technology."
                />
                <BioSnippet 
                  title="Standard Bio"
                  wordCount="100 words"
                  text="Dr. Troy Williams, PhD, is a cybersecurity engineer, artificial intelligence scientist, and licensed private investigator. Known as The Proactive AI PI, he specializes in synthetic identity fraud detection and prevention through doctoral-level research in artificial intelligence and cybersecurity. Williams is the creator of four trademarked defense systems: PatriotProof™, FraudDNA™, AISF™ (Autonomous Intelligence Security Framework), and PPP™ (Proactive Prevention Platform). His independent research has been featured on SSRN and ResearchGate. He holds Patent PCT/US25/43982 for synthetic identity detection methodology. A Tennessee native, his mission is Protecting America Through Technology."
                />
                <BioSnippet 
                  title="Extended Bio"
                  wordCount="200 words"
                  text="Dr. Troy Williams, PhD, represents a unique convergence of three critical disciplines: cybersecurity engineering, artificial intelligence science, and licensed private investigation. Known professionally as The Proactive AI PI, Williams has dedicated his career to identifying and neutralizing synthetic identity fraud—one of the fastest-growing and least understood threats to American financial infrastructure. Through doctoral-level research in artificial intelligence and cybersecurity, Williams brings both academic rigor and real-world investigative experience to his work. His independent research has been featured on SSRN and ResearchGate, achieving a Research Interest Score of 8.0. Williams is the creator of four trademarked defense systems that together form the first unified synthetic identity prevention architecture in the United States: PatriotProof™ (fortress-level identity defense), FraudDNA™ (behavioral pattern analysis), AISF™ (Autonomous Intelligence Security Framework), and PPP™ (Proactive Prevention Platform). He holds international Patent PCT/US25/43982 for his synthetic identity detection methodology. His research and publications are independently developed and published. His specialized training includes prompt engineering under Dr. Jules White at Vanderbilt University and financial fraud investigation through SBI Seminars. Based in Tennessee, Williams operates under a singular mission: Protecting America Through Technology."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Speaking Topics */}
        <section className="py-16 bg-[#0A1628] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Speaking & Interview Topics
              </h2>
              <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
                Dr. Williams is available for interviews, podcasts, keynotes, and panel discussions 
                on the following subjects.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {speakingTopics.map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <Mic className="w-5 h-5 text-[#B22234] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interview Request Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
                Request an Interview
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Submit your interview request and we will respond within 48 hours.
              </p>
              
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@publication.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization/Publication *</FormLabel>
                            <FormControl>
                              <Input placeholder="The Washington Post" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Role *</FormLabel>
                            <FormControl>
                              <Input placeholder="Senior Reporter" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="interviewType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interview Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select interview type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="print">Print/Online Article</SelectItem>
                              <SelectItem value="podcast">Podcast</SelectItem>
                              <SelectItem value="video">Video Interview</SelectItem>
                              <SelectItem value="tv">Television/Broadcast</SelectItem>
                              <SelectItem value="radio">Radio</SelectItem>
                              <SelectItem value="keynote">Speaking Engagement/Keynote</SelectItem>
                              <SelectItem value="panel">Panel Discussion</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interview Topic/Questions *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please describe the topic you'd like to discuss and any specific questions you have in mind..."
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Publication/Air Date (if applicable)</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any other details that would help us prepare..."
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#B22234] hover:bg-[#8B1A28] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Interview Request"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-[#0A1628] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Direct Media Contact</h2>
              <p className="text-gray-300 mb-8">
                For urgent media inquiries or to schedule an interview directly:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B22234] text-white font-semibold rounded-lg hover:bg-[#8B1A28] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Contact Page
                </a>
                <a 
                  href="/master-bio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  <User className="w-5 h-5" />
                  Full Biography
                </a>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  All materials in this press kit may be used for editorial purposes with attribution to 
                  Dr. Troy Williams and DrTroyWilliams.net
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PressKit;
