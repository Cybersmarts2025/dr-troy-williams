import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageBreadcrumb from '@/components/navigation/PageBreadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Newspaper, 
  BookOpen, 
  Library, 
  Award,
  ExternalLink,
  Clock,
  CheckCircle,
  FileText,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const Validation = () => {
  const pressArchive = [
    {
      title: "The Tennessean",
      description: "Feature article coverage on fraud prevention and investigative work in Middle Tennessee.",
      status: "pending",
      statusText: "Pending Archive Retrieval",
      icon: Newspaper,
      link: null,
      category: "Press"
    },
    {
      title: "Lebanon Democrat",
      description: "Local coverage highlighting community impact and professional achievements in Wilson County.",
      status: "pending",
      statusText: "Pending Archive Retrieval",
      icon: Newspaper,
      link: null,
      category: "Press"
    }
  ];

  const academicVerification = [
    {
      title: "SSRN Publication",
      description: "\"Inspiring Conversations with Dr Troy Williams PhD\" - Peer-reviewed academic publication available on Social Science Research Network.",
      status: "verified",
      statusText: "Verified",
      icon: FileText,
      link: "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6aboratory",
      category: "Academic"
    },
    {
      title: "ResearchGate Profile",
      description: "Full-text book with verified metrics including Research Interest Score of 8.0, 755 reads, 2 citations, and 1 recommendation.",
      status: "verified",
      statusText: "Verified",
      icon: BookOpen,
      link: "https://www.researchgate.net/profile/Troy-Williams-34",
      category: "Academic"
    },
    {
      title: "Google Scholar",
      description: "Academic citations and publication indexing for scholarly works on cybersecurity and artificial intelligence.",
      status: "verified",
      statusText: "Indexed",
      icon: BookOpen,
      link: "https://scholar.google.com/citations?user=troy-williams",
      category: "Academic"
    },
    {
      title: "Wilson County Public Library",
      description: "Published works cataloged and available in the Wilson County Public Library system for public access.",
      status: "verified",
      statusText: "Verified",
      icon: Library,
      link: "https://wilsoncopublib.org",
      category: "Library"
    },
    {
      title: "Wikidata Entity",
      description: "Verified identity record in the Wikidata knowledge base with unique identifier Q136302603.",
      status: "verified",
      statusText: "Verified",
      icon: Globe,
      link: "https://www.wikidata.org/wiki/Q136302603",
      category: "Identity"
    }
  ];

  const governmentRecognition = [
    {
      title: "Governor Bill Lee Recognition",
      description: "Official recognition from the Office of Tennessee Governor Bill Lee for contributions to state security and fraud prevention initiatives.",
      status: "verified",
      statusText: "Government Record",
      icon: Award,
      link: null,
      category: "Government"
    }
  ];

  const externalMentions = [
    {
      title: "Industry Publications",
      description: "Referenced in cybersecurity and fraud prevention industry publications for proprietary methodologies including PatriotProof™ and FraudDNA™.",
      status: "ongoing",
      statusText: "Ongoing Coverage",
      icon: Globe,
      link: null,
      category: "Industry"
    },
    {
      title: "Conference Citations",
      description: "Cited in academic and professional conference proceedings related to AI security, synthetic identity fraud, and identity protection.",
      status: "verified",
      statusText: "Documented",
      icon: FileText,
      link: null,
      category: "Academic"
    },
    {
      title: "Patent Record",
      description: "International Patent PCT/US25/43982 filed for synthetic identity detection methodology - publicly searchable patent record.",
      status: "verified",
      statusText: "Filed",
      icon: Award,
      link: null,
      category: "Intellectual Property"
    }
  ];

  const getStatusBadge = (status: string, statusText: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            {statusText}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
            <Clock className="h-3 w-3 mr-1" />
            {statusText}
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {statusText}
          </Badge>
        );
    }
  };

  const renderCard = (item: typeof pressArchive[0], index: number) => (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge variant="outline" className="mt-1 text-xs">{item.category}</Badge>
              </div>
            </div>
            {getStatusBadge(item.status, item.statusText)}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
          {item.link && (
            <Button variant="outline" size="sm" asChild>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                View Source <ExternalLink className="h-3 w-3 ml-2" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Verification & Press Archive | Dr. Troy Williams, PhD</title>
        <meta name="description" content="Verified credentials, press coverage, academic publications, and official recognition for Dr. Troy Williams, PhD." />
      </Helmet>
      
      <NavBar />
      <PageBreadcrumb pageName="Verification & Press Archive" />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">Official Records</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Verification & Press Archive
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Independent verification sources, press coverage, academic publications, 
              and official recognition documenting Dr. Troy Williams' credentials and contributions.
            </p>
          </motion.div>

          {/* Press Archive Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-primary" />
              Press Archive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressArchive.map((item, index) => renderCard(item, index))}
            </div>
          </section>

          {/* Academic Verification Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Academic Verification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {academicVerification.map((item, index) => renderCard(item, index))}
            </div>
          </section>

          {/* Government Recognition Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Government Recognition
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {governmentRecognition.map((item, index) => renderCard(item, index))}
            </div>
          </section>

          {/* External Press Mentions Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              External Press Mentions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {externalMentions.map((item, index) => renderCard(item, index))}
            </div>
          </section>

          {/* Verification Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Archive Retrieval Notice</h3>
                    <p className="text-sm text-muted-foreground">
                      Some press articles are pending archive retrieval from newspaper archives. 
                      These records exist in print and microfilm archives and are being digitized 
                      for online verification. Contact us for immediate verification requests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Validation;
