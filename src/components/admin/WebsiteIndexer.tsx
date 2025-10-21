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

  // Pages to index
  const sitemap = [
    { url: '/', title: 'Home - Dr. Troy Williams' },
    { url: '/about', title: 'About Dr. Troy Williams' },
    { url: '/books', title: 'Books & Publications' },
    { url: '/press', title: 'Press & Media' },
    { url: '/blog', title: 'Blog' },
    { url: '/ai-tools', title: 'AI-Powered Tools' },
    { url: '/certifications', title: 'Certifications & Credentials' },
    { url: '/cybersecurity', title: 'Cybersecurity Services' },
    { url: '/auto-security', title: 'Automotive Cybersecurity' },
    { url: '/ip', title: 'Intellectual Property Protection' },
    { url: '/mentorship', title: 'Mentorship Program' },
    { url: '/contact', title: 'Contact' },
  ];

  const extractPageContent = async (pageUrl: string): Promise<string> => {
    try {
      // In production, you would scrape the actual page
      // For now, return a placeholder that describes the page
      const descriptions: Record<string, string> = {
        '/': 'Dr. Troy Williams is a leading cybersecurity expert specializing in AI security, fraud prevention, and Business Email Compromise (BEC) prevention. He is the President & Director of Investigative Operations at Information Systems Inc and Founder of CyberSmarts AI LLC. His expertise includes automotive cybersecurity, intellectual property protection, quantum biometrics, and security awareness training.',
        '/about': 'Dr. Troy Williams holds a PhD in cybersecurity and specializes in AI-enhanced security systems. His research focuses on using artificial intelligence and quantum biometrics to enhance financial security. He has extensive experience in fraud detection, BEC prevention, and developing proprietary defense technologies including FraudDNA™, PatriotProof™, PPP™, and AISF™.',
        '/books': 'Dr. Williams is the author of multiple books and research publications on cybersecurity, AI security, and fraud prevention. His dissertation explored AI and quantum biometric technologies for enhancing financial security systems.',
        '/press': 'Dr. Troy Williams has been featured in multiple media outlets and industry publications. He regularly speaks at cybersecurity conferences and provides expert commentary on AI security, fraud prevention, and automotive cybersecurity topics.',
        '/blog': 'The blog features articles on cybersecurity trends, AI security developments, fraud prevention strategies, BEC attack analysis, and practical security guidance for businesses and individuals.',
        '/ai-tools': 'AI-powered cybersecurity tools including an intelligent Q&A assistant, research helper for analyzing security papers, consultation guidance tool, and professional image generation for cybersecurity presentations.',
        '/certifications': 'Dr. Williams holds multiple industry certifications in cybersecurity, fraud investigation, and automotive security. He maintains current credentials in various security frameworks and standards.',
        '/cybersecurity': 'Comprehensive cybersecurity services including security assessments, vulnerability testing, compliance audits (NIST, ISO 27001, PCI-DSS, HIPAA), incident response, and security architecture reviews.',
        '/auto-security': 'Automotive cybersecurity consulting services covering vehicle security assessments, CAN bus security, connected car threat modeling, autonomous vehicle security, and regulatory compliance (UN R155, ISO 21434).',
        '/ip': 'Intellectual property protection services including trade secret security, data loss prevention (DLP), insider threat programs, digital forensics, and security for R&D environments.',
        '/mentorship': 'Professional mentorship program for cybersecurity professionals, providing guidance on career development, technical skills enhancement, and industry best practices.',
        '/contact': 'Contact Dr. Troy Williams for cybersecurity consultations, speaking engagements, expert witness services, security assessments, or to schedule a free initial consultation.'
      };

      return descriptions[pageUrl] || `Content for ${pageUrl}`;
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
