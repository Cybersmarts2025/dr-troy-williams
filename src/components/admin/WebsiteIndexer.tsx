import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, FileSearch, Plus, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface IndexedPage {
  url: string;
  title: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
}

const WebsiteIndexer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isIndexing, setIsIndexing] = useState(false);
  const [isBulkIndexing, setIsBulkIndexing] = useState(false);
  const [indexedPages, setIndexedPages] = useState<IndexedPage[]>([]);

  // Pages to index - comprehensive sitemap
  const sitemap = [
    { url: '/', title: 'Home - Dr. Troy Williams, PhD' },
    { url: '/about', title: 'About Dr. Troy Williams' },
    { url: '/master-bio', title: 'Master Biography' },
    { url: '/credentials', title: 'Credentials & Education' },
    { url: '/timeline', title: 'Career Timeline' },
    { url: '/research-footprint', title: 'Research Footprint' },
    { url: '/technology-stack', title: 'Technology Stack' },
    { url: '/national-mission', title: 'National Mission' },
    { url: '/books', title: 'Books & Publications' },
    { url: '/press', title: 'Press & Media' },
    { url: '/press-kit', title: 'Press Kit' },
    { url: '/validation', title: 'Validation & Verification' },
    { url: '/blog', title: 'Blog' },
    { url: '/ai-tools', title: 'AI-Powered Tools' },
    { url: '/certifications', title: 'Certifications' },
    { url: '/cybersecurity', title: 'Cybersecurity Services' },
    { url: '/auto-security', title: 'Automotive Cybersecurity' },
    { url: '/ip', title: 'Intellectual Property Protection' },
    { url: '/synthetic-identity-defense', title: 'Synthetic Identity Defense' },
    { url: '/stolen-nation', title: 'Stolen Nation Briefings' },
    { url: '/aisf', title: 'AISF - Autonomous Intelligence Security Framework' },
    { url: '/ppp', title: 'PPP - Proactive Prevention Platform' },
    { url: '/scam-atlas', title: 'ScamAtlas' },
    { url: '/job-ready-360', title: 'Job Ready 360' },
    { url: '/mentorship', title: 'Mentorship Program' },
    { url: '/consultation', title: 'Consultation Services' },
    { url: '/appointments', title: 'Book Appointment' },
    { url: '/contact', title: 'Contact' },
    { url: '/resources', title: 'Resources' },
    { url: '/webinars', title: 'Webinars' },
  ];

  const extractPageContent = async (pageUrl: string): Promise<string> => {
    try {
      const descriptions: Record<string, string> = {
        '/': `Dr. Troy Williams, PhD, is The Proactive AI PI - a cybersecurity engineer, artificial intelligence scientist, and licensed private investigator. He specializes in synthetic identity fraud detection and prevention. Dr. Williams is the creator of four trademarked defense systems: PatriotProof™ (fortress-level identity defense), FraudDNA™ (behavioral pattern analysis), AISF™ (Autonomous Intelligence Security Framework), and PPP™ (Proactive Prevention Platform). He is the inventor listed on international patent application PCT/US25/43982 for synthetic identity detection methodology. His mission is Protecting America Through Technology™. Based in Tennessee, he leads CyberSmarts AI LLC and Information Systems Inc.`,
        
        '/about': `Dr. Troy Williams, PhD, represents a unique convergence of three critical disciplines: cybersecurity engineering, artificial intelligence science, and licensed private investigation. Known professionally as The Proactive AI PI, Williams has dedicated his career to identifying and neutralizing synthetic identity fraud—one of the fastest-growing and least understood threats to American financial infrastructure. Through doctoral-level research in artificial intelligence and cybersecurity, Williams brings both academic rigor and real-world investigative experience. His independent research has been featured on SSRN and ResearchGate, achieving a Research Interest Score of 8.0.`,
        
        '/master-bio': `Master Biography of Dr. Troy Williams, PhD - comprehensive timeline from 1993 to 2027. Career milestones include: 1993 - Career beginning in investigations, 2015-2023 - Advanced degrees and certifications, 2024 - Patent filing PCT/US25/43982, 2025 - Launch of trademarked systems PatriotProof™, FraudDNA™, AISF™, PPP™. Currently developing prototype for financial fraud detection including PatriotProof™, CyberSmarts, LegalSmarts, and ReAIM platforms. His research and publications are independently developed and published. Specialized training includes prompt engineering under Dr. Jules White at Vanderbilt University and financial fraud investigation through SBI Seminars.`,
        
        '/credentials': `Dr. Troy Williams holds doctoral-level research credentials in Artificial Intelligence and Information Technology. Additional credentials include: Master's in IT Management, Bachelor's in Cybersecurity & Information Assurance, Tennessee Licensed Private Investigator. Training from Vanderbilt University (prompt engineering under Dr. Jules White) and SBI Seminars (financial fraud and courtroom ethics). His research and publications are independently developed and published. ResearchGate metrics: Score 8.0, 755+ reads.`,
        
        '/timeline': `Career timeline of Dr. Troy Williams spanning 32+ years of investigative experience. Key milestones: 1993 - Career foundation, 2015-2023 - Advanced education and certifications, 2024 - International patent application PCT/US25/43982 filed, 2025 - Launch of four trademarked defense systems forming the first unified synthetic identity prevention architecture in the United States. Ongoing prototype development for financial fraud detection platforms.`,
        
        '/research-footprint': `Research publications and academic profiles of Dr. Troy Williams. Featured on SSRN and ResearchGate with Research Interest Score of 8.0 and 755+ reads. Research focuses on synthetic identity fraud detection, AI security frameworks, and proactive prevention methodologies. His research and publications are independently developed and published. International patent application PCT/US25/43982 covers synthetic identity detection methodology.`,
        
        '/technology-stack': `Dr. Troy Williams' technology stack includes four trademarked defense systems: PatriotProof™ - fortress-level national identity and fraud defense, FraudDNA™ - pattern analysis engine for synthetic identity detection, AISF™ - Autonomous Intelligence Security Framework for real-time security, PPP™ - Proactive Prevention Platform. Additional platforms include ScamAtlas™ for national fraud visualization. These systems integrate to form the first unified synthetic identity prevention architecture in the United States.`,
        
        '/national-mission': `Dr. Troy Williams' national mission: Protecting America Through Technology™. Mission pillars include defending against synthetic identity fraud, developing domestic technology independence, and building sovereign AI security systems. His work addresses the threat of identity engineering using fragmented data across 200+ unregulated systems. The mission roadmap spans from 1993 foundational work to 2027 prototype completion.`,
        
        '/books': `Books and publications by Dr. Troy Williams covering artificial intelligence, cybersecurity, and digital investigation methodologies. Topics include synthetic identity fraud, proactive prevention, AI security frameworks, and digital investigation methods. Available on Amazon Author page. Essential reading for technology professionals, policymakers, and security specialists.`,
        
        '/press': `Press coverage and media features of Dr. Troy Williams, PhD. Available for interviews on synthetic identity fraud, AI security, cybersecurity threats, and fraud prevention. Media inquiries welcome for podcasts, keynotes, panel discussions, and expert commentary on national security technology topics.`,
        
        '/press-kit': `Press kit for Dr. Troy Williams, PhD - The Proactive AI PI. Includes official headshot, bio snippets (short, medium, extended), speaking topics, and downloadable assets. Official profiles: Amazon Author Page, LinkedIn, ResearchGate, YouTube Channel. Interview topics include synthetic identity fraud, AI security frameworks, automotive cybersecurity, and national technology sovereignty.`,
        
        '/validation': `Validation and verification archive for Dr. Troy Williams' credentials, research, and professional standing. Includes patent verification (PCT/US25/43982), research metrics, professional licenses, and independent verification sources.`,
        
        '/blog': `Blog featuring articles on cybersecurity, AI security, synthetic identity fraud trends, fraud prevention strategies, and national security technology topics. Written by Dr. Troy Williams, PhD.`,
        
        '/ai-tools': `AI-powered tools including intelligent Q&A assistant for cybersecurity questions, research analysis assistant, and consultation guidance. Powered by advanced AI models trained on Dr. Troy Williams' expertise in synthetic identity fraud, cybersecurity, and AI security.`,
        
        '/certifications': `Professional certifications and credentials held by Dr. Troy Williams including cybersecurity certifications, fraud investigation credentials, and Tennessee Private Investigator license. Ongoing professional development in AI security and fraud prevention.`,
        
        '/cybersecurity': `Cybersecurity services offered by Dr. Troy Williams including security assessments, vulnerability testing, compliance audits (NIST, ISO 27001, PCI-DSS, HIPAA), incident response, BEC prevention, and security architecture reviews.`,
        
        '/auto-security': `Automotive cybersecurity consulting services covering vehicle security assessments, CAN bus security, connected car threat modeling, autonomous vehicle security, and regulatory compliance with UN R155 and ISO 21434 standards.`,
        
        '/ip': `Intellectual property protection services including trade secret security, data loss prevention (DLP), insider threat programs, digital forensics, and security for R&D environments.`,
        
        '/synthetic-identity-defense': `Synthetic Identity Defense Service - high-authority institutional offering for banks and government agencies. Core message: synthetic identity is not identity theft but identity engineering using fragmented data across 200+ unregulated systems. Service integrates four trademarked systems: PatriotProof™, FraudDNA™, AISF™, PPP™. Deliverables include ecosystem investigation, synthetic human detection, fragment analysis, financial aging detection, social graph discovery, document entropy analysis, and quantum-era risk forecasting.`,
        
        '/stolen-nation': `Stolen Nation briefings - intelligence reports on synthetic identity fraud, financial crimes, and threats to American digital infrastructure. Professional national security tone. Authored by Dr. Troy Williams, PhD. Tagline: Protecting America Through Technology™.`,
        
        '/aisf': `AISF™ - Autonomous Intelligence Security Framework. Trademarked system by Dr. Troy Williams for real-time AI-driven security monitoring and threat detection. Part of the unified synthetic identity prevention architecture.`,
        
        '/ppp': `PPP™ - Proactive Prevention Platform. Trademarked system by Dr. Troy Williams for proactive threat identification and neutralization before attacks materialize. Integrates with PatriotProof™, FraudDNA™, and AISF™.`,
        
        '/scam-atlas': `ScamAtlas™ - National visualization platform for fraud tracking and mapping. Developed by Dr. Troy Williams to provide geographic and temporal analysis of fraud patterns across the United States.`,
        
        '/job-ready-360': `Job Ready 360™ - Career acceleration system for WGU alumni by Dr. Troy Williams. Eight sequential stages: Target Your Role, Reverse Resume, Portfolio and Proof, Professional Presence, Interview Mastery, Employer Research, Follow Up System, Career Operating System. Emphasizes value-driven positioning, employer alignment, and proof-based credentialing.`,
        
        '/mentorship': `Professional mentorship program by Dr. Troy Williams for cybersecurity professionals and career changers. Guidance on career development, technical skills, and industry best practices. Module-based curriculum with instructor feedback.`,
        
        '/consultation': `Consultation services with Dr. Troy Williams covering cybersecurity assessments, fraud prevention strategy, AI security implementation, synthetic identity defense, and expert advisory services for organizations.`,
        
        '/appointments': `Book an appointment with Dr. Troy Williams for consultations, speaking engagements, expert witness services, or security assessments. Multiple appointment types available.`,
        
        '/contact': `Contact Dr. Troy Williams for cybersecurity consultations, speaking engagements, expert witness services, media inquiries, or to schedule a consultation. Based in Tennessee.`,
        
        '/resources': `Resource library with downloadable materials on cybersecurity, AI security, fraud prevention, and related topics from Dr. Troy Williams.`,
        
        '/webinars': `Webinars and online events hosted by Dr. Troy Williams on cybersecurity, AI security, synthetic identity fraud, and professional development topics.`,
      };

      return descriptions[pageUrl] || `Content for ${pageUrl} - part of Dr. Troy Williams' website covering cybersecurity, AI security, and fraud prevention.`;
    } catch (error) {
      console.error(`Error extracting content from ${pageUrl}:`, error);
      throw error;
    }
  };

  const indexPage = async (pageUrl: string, pageTitle: string, pageContent: string) => {
    const { data, error } = await supabase.functions.invoke('index-website-content', {
      body: {
        url: `https://drtroywilliams.com${pageUrl}`,
        title: pageTitle,
        content: pageContent,
      }
    });

    if (error) throw error;
    if (!data.success) throw new Error(data.error || 'Failed to index');

    return data;
  };

  const handleSingleIndex = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title || !content) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsIndexing(true);
    try {
      await indexPage(url, title, content);
      toast.success('Page indexed successfully!');
      setUrl('');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error indexing page:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to index page');
    } finally {
      setIsIndexing(false);
    }
  };

  const handleBulkIndex = async () => {
    setIsBulkIndexing(true);
    const results: IndexedPage[] = [];

    for (const page of sitemap) {
      try {
        const pageContent = await extractPageContent(page.url);
        await indexPage(page.url, page.title, pageContent);
        
        results.push({
          url: page.url,
          title: page.title,
          status: 'success',
          message: 'Indexed successfully'
        });
        
        toast.success(`Indexed: ${page.title}`);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error indexing ${page.url}:`, error);
        results.push({
          url: page.url,
          title: page.title,
          status: 'error',
          message: error instanceof Error ? error.message : 'Failed to index'
        });
        toast.error(`Failed to index: ${page.title}`);
      }
    }

    setIndexedPages(results);
    setIsBulkIndexing(false);
    
    const successCount = results.filter(r => r.status === 'success').length;
    toast.success(`Bulk indexing complete! ${successCount}/${sitemap.length} pages indexed`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSearch className="h-5 w-5" />
            Website Content Indexer
          </CardTitle>
          <p className="text-sm text-gray-600">
            Index website pages so the AI assistant can answer questions from your site content
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bulk Index Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database className="h-5 w-5" />
              Bulk Index All Pages
            </h3>
            <p className="text-sm text-gray-600">
              Index all {sitemap.length} main pages automatically
            </p>
            <Button
              onClick={handleBulkIndex}
              disabled={isBulkIndexing}
              className="w-full"
            >
              {isBulkIndexing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Indexing {sitemap.length} pages...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Index All Pages
                </>
              )}
            </Button>

            {indexedPages.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Indexing Results:</h4>
                {indexedPages.map((page, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{page.title}</span>
                    <Badge variant={page.status === 'success' ? 'default' : 'destructive'}>
                      {page.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Plus className="h-5 w-5" />
              Index Single Page
            </h3>
            <form onSubmit={handleSingleIndex} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Page URL</label>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="/page-path"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Page Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Page Title"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Page Content</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Main content of the page..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isIndexing}
                className="w-full"
              >
                {isIndexing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Indexing...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Index Page
                  </>
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteIndexer;
