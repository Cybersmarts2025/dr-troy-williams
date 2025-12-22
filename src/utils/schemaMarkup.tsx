<<<<<<< HEAD
import React from 'react';
import { Helmet } from 'react-helmet-async';

// ============================================
// BASE CONFIGURATION - Dr. Troy Williams Data
// ============================================

export const DR_TROY_WILLIAMS_DATA = {
  name: "Troy Williams",
  alternateName: ["Dr. Troy Williams", "Dr. Troy Williams, PhD", "The Proactive AI PI"],
  honorificPrefix: "Dr.",
  honorificSuffix: "PhD",
  givenName: "Troy",
  familyName: "Williams",
  jobTitles: [
    "Cybersecurity Engineer",
    "Artificial Intelligence Scientist",
    "Licensed Tennessee Private Investigator",
    "Founder & Chief Intelligence Architect at Cybersmarts.ai",
    "National Fraud Prevention Architect",
    "U.S. Sovereign Technology Developer"
  ],
  description: "Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation. As a Licensed Tennessee Private Investigator and independent researcher, he is dedicated to securing America's digital future through sovereign technology. His research and publications are independently developed and published.",
  url: "https://www.DrTroyWilliams.net",
  image: "https://www.DrTroyWilliams.net/lovable-uploads/troy-williams-headshot-transparent.png",
  sameAs: [
    "https://www.linkedin.com/in/cybersmarts/",
    "https://www.researchgate.net/profile/Troy-Williams-34",
    "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6aboratory",
    "https://scholar.google.com/citations?user=troy-williams",
    "https://www.wikidata.org/wiki/Q136302603"
  ],
  knowsAbout: [
    "Cybersecurity", "Artificial Intelligence", "Synthetic Identity Fraud",
    "Fraud Detection", "Machine Learning", "Information Security",
    "Private Investigation", "Post-Quantum Cryptography", "Behavioral Intelligence",
    "Zero Trust Architecture"
  ],
  trademarks: [
    { name: "PatriotProof™", description: "Fortress-level national identity and fraud defense system" },
    { name: "FraudDNA™", description: "Pattern analysis engine for synthetic identity detection" },
    { name: "AISF™", description: "Autonomous Intelligence Security Framework" },
    { name: "PPP™", description: "Proactive Prevention Platform" },
    { name: "ScamAtlas™", description: "Interactive threat intelligence mapping system" }
  ],
  patent: "PCT/US25/43982 - Synthetic Identity Detection Methodology",
  education: [
    { name: "Doctoral-level research in artificial intelligence and cybersecurity", institution: "", level: "Doctoral" },
    { name: "Master of Science in IT Management", institution: "Western Governors University", level: "Graduate", year: "2020" },
    { name: "Bachelor of Science in Cybersecurity & Information Assurance", institution: "Western Governors University", level: "Undergraduate", year: "2019" },
    { name: "Prompt Engineering Certification", institution: "Vanderbilt University", level: "Professional" },
    { name: "Financial Fraud & Courtroom Ethics Training", institution: "SBI Seminars", level: "Professional" },
    { name: "Licensed Private Investigator", institution: "State of Tennessee", level: "License" }
  ],
  organization: {
    name: "Cybersmarts.ai LLC",
    url: "https://www.DrTroyWilliams.net"
  },
  address: {
    locality: "Lebanon",
    region: "Tennessee",
    country: "US"
  },
  awards: [
    "Patent PCT/US25/43982 - Synthetic Identity Detection Methodology",
    "Governor Bill Lee Recognition - State Security Contributions",
    "ResearchGate Research Interest Score: 8.0"
  ],
  libraryReference: {
    name: "Wilson County Public Library",
    url: "https://wilsoncopublib.org"
  }
};

// ============================================
// COMPREHENSIVE PERSON SCHEMA
// ============================================

interface ComprehensivePersonSchemaProps {
  includeTrademarks?: boolean;
  includeEducation?: boolean;
  includeAwards?: boolean;
  customData?: Partial<typeof DR_TROY_WILLIAMS_DATA>;
}

export const DrTroyWilliamsSchema = ({
  includeTrademarks = true,
  includeEducation = true,
  includeAwards = true,
  customData
}: ComprehensivePersonSchemaProps = {}) => {
  const data = { ...DR_TROY_WILLIAMS_DATA, ...customData };
  
  const personSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${data.url}/#person`,
    "name": data.name,
    "givenName": data.givenName,
    "familyName": data.familyName,
    "alternateName": data.alternateName,
    "honorificPrefix": data.honorificPrefix,
    "honorificSuffix": data.honorificSuffix,
    "jobTitle": data.jobTitles,
    "description": data.description,
    "url": data.url,
    "image": {
      "@type": "ImageObject",
      "url": data.image,
      "width": 400,
      "height": 400,
      "caption": `${data.alternateName[0]} - ${data.jobTitles[0]} and ${data.jobTitles[1]}`
    },
    "sameAs": data.sameAs,
    "knowsAbout": data.knowsAbout,
    "worksFor": {
      "@type": "Organization",
      "name": data.organization.name,
      "url": data.organization.url
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.address.locality,
      "addressRegion": data.address.region,
      "addressCountry": data.address.country
    },
    "nationality": { "@type": "Country", "name": "United States" }
  };

  if (includeEducation) {
    // Only include non-doctoral credentials with institutions
    personSchema.hasCredential = data.education
      .filter(edu => edu.level !== "Doctoral" && edu.institution)
      .map(edu => ({
        "@type": "EducationalOccupationalCredential",
        "name": edu.name,
        "credentialCategory": edu.level === "License" ? "Professional License" : 
          edu.level === "Professional" ? "Professional Certification" : `${edu.level} Degree`,
        "educationalLevel": edu.level,
        ...(edu.year && { "dateCreated": edu.year }),
        "recognizedBy": {
          "@type": edu.level === "License" ? "GovernmentOrganization" : "EducationalOrganization",
          "name": edu.institution
        }
      }));

    // Only include WGU for mentorship context (non-doctoral)
    personSchema.alumniOf = [...new Set(data.education.map(edu => edu.institution))]
      .filter(inst => inst && inst !== "State of Tennessee" && inst !== "")
      .filter(inst => inst === "Western Governors University")
      .map(inst => ({
        "@type": "EducationalOrganization",
        "name": inst
      }));
  }

  if (includeTrademarks) {
    personSchema.owns = data.trademarks.map(tm => ({
      "@type": "Product",
      "name": tm.name,
      "description": tm.description
    }));
  }

  if (includeAwards) {
    personSchema.award = data.awards;
  }

  personSchema.memberOf = [{
    "@type": "LibrarySystem",
    "name": data.libraryReference.name,
    "url": data.libraryReference.url,
    "description": "Published works cataloged in library holdings"
  }];

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// UNIFIED PAGE SCHEMA COMPONENT
// ============================================

interface PageSchemaProps {
  title: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'ProfilePage' | 'CollectionPage';
  includePersonSchema?: boolean;
  includeBreadcrumbs?: boolean;
  includeOrganization?: boolean;
  breadcrumbItems?: { name: string; path: string }[];
  datePublished?: string;
  dateModified?: string;
}

export const PageSchema = ({
  title,
  description,
  path,
  type = 'WebPage',
  includePersonSchema = false,
  includeBreadcrumbs = true,
  includeOrganization = false,
  breadcrumbItems,
  datePublished,
  dateModified
}: PageSchemaProps) => {
  const baseUrl = DR_TROY_WILLIAMS_DATA.url;
  const fullUrl = `${baseUrl}${path}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${fullUrl}/#webpage`,
    "name": title,
    "description": description,
    "url": fullUrl,
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "about": { "@id": `${baseUrl}/#person` },
    "author": { "@id": `${baseUrl}/#person` },
    ...(datePublished && { "datePublished": datePublished }),
    ...(dateModified && { "dateModified": dateModified }),
    "inLanguage": "en-US"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "Dr. Troy Williams - Cybersecurity & AI Expert",
    "url": baseUrl,
    "description": DR_TROY_WILLIAMS_DATA.description,
    "publisher": { "@id": `${baseUrl}/#person` },
    "inLanguage": "en-US"
  };

  const defaultBreadcrumbs = [
    { name: "Home", path: "/" },
    { name: title, path: path }
  ];

  const breadcrumbs = breadcrumbItems || defaultBreadcrumbs;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.path}`
    }))
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": DR_TROY_WILLIAMS_DATA.organization.name,
    "url": DR_TROY_WILLIAMS_DATA.organization.url,
    "founder": { "@id": `${baseUrl}/#person` },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": DR_TROY_WILLIAMS_DATA.address.locality,
      "addressRegion": DR_TROY_WILLIAMS_DATA.address.region,
      "addressCountry": DR_TROY_WILLIAMS_DATA.address.country
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {includeBreadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {includePersonSchema && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${baseUrl}/#person`,
            "name": DR_TROY_WILLIAMS_DATA.name,
            "url": baseUrl,
            "sameAs": DR_TROY_WILLIAMS_DATA.sameAs
          })}
        </script>
      )}
      {includeOrganization && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
    </Helmet>
  );
};

// ============================================
// SIMPLE SCHEMA COMPONENTS
// ============================================

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  image?: string;
  sameAs?: string[];
  description?: string;
  alumniOf?: string[];
}

export const PersonSchema = ({
  name,
  jobTitle,
  image,
  sameAs,
  description,
  alumniOf
}: PersonSchemaProps) => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    ...(image && { "image": image }),
    ...(sameAs && { "sameAs": sameAs }),
    ...(description && { "description": description }),
    ...(alumniOf && { "alumniOf": alumniOf })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
};

interface BookSchemaProps {
  title: string;
  author?: string;
  description?: string;
  isbn?: string;
  url?: string;
  image?: string;
  publisher?: string;
  datePublished?: string;
}

export const BookSchema = ({
  title,
  author = DR_TROY_WILLIAMS_DATA.alternateName[0],
  description,
  isbn,
  url,
  image,
  publisher,
  datePublished
}: BookSchemaProps) => {
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": title,
    "author": {
      "@type": "Person",
      "name": author,
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`
    },
    ...(description && { "description": description }),
    ...(isbn && { "isbn": isbn }),
    ...(url && { "url": url }),
    ...(image && { "image": image }),
    ...(publisher && { 
      "publisher": {
        "@type": "Organization",
        "name": publisher
      }
    }),
    ...(datePublished && { "datePublished": datePublished })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(bookSchema)}
      </script>
    </Helmet>
  );
};

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  includeFounder?: boolean;
}

export const OrganizationSchema = ({
  name = DR_TROY_WILLIAMS_DATA.organization.name,
  url = DR_TROY_WILLIAMS_DATA.organization.url,
  logo,
  description,
  sameAs,
  includeFounder = true
}: OrganizationSchemaProps) => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DR_TROY_WILLIAMS_DATA.url}/#organization`,
    "name": name,
    "url": url,
    ...(logo && { "logo": logo }),
    ...(description && { "description": description }),
    ...(sameAs && { "sameAs": sameAs }),
    ...(includeFounder && {
      "founder": {
        "@type": "Person",
        "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
        "name": DR_TROY_WILLIAMS_DATA.name
      }
    }),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": DR_TROY_WILLIAMS_DATA.address.locality,
      "addressRegion": DR_TROY_WILLIAMS_DATA.address.region,
      "addressCountry": DR_TROY_WILLIAMS_DATA.address.country
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
    </Helmet>
  );
};

interface WebPageSchemaProps {
  name: string;
  description: string;
  url?: string;
}

export const WebPageSchema = ({
  name,
  description,
  url
}: WebPageSchemaProps) => {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    ...(url && { "url": url })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
};

interface BreadcrumbListSchemaProps {
  items: { name: string; item: string }[];
}

export const BreadcrumbListSchema = ({ items }: BreadcrumbListSchemaProps) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// ARTICLE & BLOG SCHEMAS
// ============================================

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url?: string;
  articleType?: 'Article' | 'NewsArticle' | 'BlogPosting' | 'TechArticle';
  publisher?: { name: string; logo?: string };
}

export const ArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = DR_TROY_WILLIAMS_DATA.alternateName[0],
  url,
  articleType = 'Article',
  publisher
}: ArticleSchemaProps) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": articleType,
    "headline": headline,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    ...(dateModified && { "dateModified": dateModified }),
    "author": {
      "@type": "Person",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
      "name": author
    },
    "publisher": publisher ? {
      "@type": "Organization",
      "name": publisher.name,
      ...(publisher.logo && { "logo": { "@type": "ImageObject", "url": publisher.logo } })
    } : {
      "@type": "Organization",
      "name": DR_TROY_WILLIAMS_DATA.organization.name,
      "url": DR_TROY_WILLIAMS_DATA.organization.url
    },
    ...(url && { "url": url, "mainEntityOfPage": url })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
};

export const NewsArticleSchema = ArticleSchema;

// ============================================
// SERVICE & PRODUCT SCHEMAS
// ============================================

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: { name: string; url?: string };
  areaServed?: string;
  serviceType?: string;
  url?: string;
  offers?: { name: string; description: string }[];
}

export const ServiceSchema = ({
  name,
  description,
  provider = DR_TROY_WILLIAMS_DATA.organization,
  areaServed = "United States",
  serviceType,
  url,
  offers
}: ServiceSchemaProps) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#organization`,
      "name": provider.name,
      ...(provider.url && { "url": provider.url })
    },
    "areaServed": areaServed,
    ...(serviceType && { "serviceType": serviceType }),
    ...(url && { "url": url }),
    ...(offers && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${name} Services`,
        "itemListElement": offers.map(offer => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": offer.name,
            "description": offer.description
          }
        }))
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};

interface ProductSchemaProps {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  url?: string;
}

export const ProductSchema = ({
  name,
  description,
  image,
  brand = DR_TROY_WILLIAMS_DATA.organization.name,
  url
}: ProductSchemaProps) => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    ...(image && { "image": image }),
    "brand": {
      "@type": "Organization",
      "name": brand
    },
    ...(url && { "url": url }),
    "manufacturer": {
      "@type": "Organization",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#organization`,
      "name": DR_TROY_WILLIAMS_DATA.organization.name
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// FAQ & HOW-TO SCHEMAS
// ============================================

interface FAQSchemaProps {
  questions: { question: string; answer: string }[];
}

export const FAQSchema = ({ questions }: FAQSchemaProps) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
  image?: string;
}

export const HowToSchema = ({
  name,
  description,
  steps,
  totalTime,
  image
}: HowToSchemaProps) => {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    ...(totalTime && { "totalTime": totalTime }),
    ...(image && { "image": image }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// EVENT & VIDEO SCHEMAS
// ============================================

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  isVirtual?: boolean;
  url?: string;
  image?: string;
}

export const EventSchema = ({
  name,
  description,
  startDate,
  endDate,
  location,
  isVirtual = false,
  url,
  image
}: EventSchemaProps) => {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    ...(endDate && { "endDate": endDate }),
    "eventAttendanceMode": isVirtual 
      ? "https://schema.org/OnlineEventAttendanceMode" 
      : "https://schema.org/OfflineEventAttendanceMode",
    ...(location && {
      "location": isVirtual 
        ? { "@type": "VirtualLocation", "url": location }
        : { "@type": "Place", "name": location }
    }),
    "organizer": {
      "@type": "Person",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
      "name": DR_TROY_WILLIAMS_DATA.name
    },
    ...(url && { "url": url }),
    ...(image && { "image": image })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
    </Helmet>
  );
};

interface VideoObjectSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}

export const VideoObjectSchema = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration
}: VideoObjectSchemaProps) => {
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    ...(contentUrl && { "contentUrl": contentUrl }),
    ...(embedUrl && { "embedUrl": embedUrl }),
    ...(duration && { "duration": duration }),
    "author": {
      "@type": "Person",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
      "name": DR_TROY_WILLIAMS_DATA.name
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(videoSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// COURSE & EDUCATION SCHEMAS
// ============================================

interface CourseSchemaProps {
  name: string;
  description: string;
  provider?: string;
  url?: string;
  image?: string;
}

export const CourseSchema = ({
  name,
  description,
  provider = DR_TROY_WILLIAMS_DATA.organization.name,
  url,
  image
}: CourseSchemaProps) => {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider
    },
    "instructor": {
      "@type": "Person",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
      "name": DR_TROY_WILLIAMS_DATA.name
    },
    ...(url && { "url": url }),
    ...(image && { "image": image })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(courseSchema)}
      </script>
    </Helmet>
  );
};
=======
import React from 'react';
import { Helmet } from 'react-helmet-async';

// ============================================
// BASE CONFIGURATION - Dr. Troy Williams Data
// ============================================

export const DR_TROY_WILLIAMS_DATA = {
  name: "Troy Williams",
  alternateName: ["Dr. Troy Williams", "Dr. Troy Williams, PhD", "The Proactive AI PI"],
  honorificPrefix: "Dr.",
  honorificSuffix: "PhD",
  givenName: "Troy",
  familyName: "Williams",
  jobTitles: [
    "Cybersecurity Engineer",
    "Artificial Intelligence Scientist",
    "Licensed Tennessee Private Investigator",
    "Founder & Chief Intelligence Architect at Cybersmarts.ai",
    "National Fraud Prevention Architect",
    "U.S. Sovereign Technology Developer"
  ],
  description: "Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation. As a Licensed Tennessee Private Investigator and independent researcher, he is dedicated to securing America's digital future through sovereign technology. His research and publications are independently developed and published.",
  url: "https://www.DrTroyWilliams.net",
  image: "https://www.DrTroyWilliams.net/assets/troy-williams-headshot-transparent.png",
  sameAs: [
    "https://www.linkedin.com/in/cybersmarts/",
    "https://www.researchgate.net/profile/Troy-Williams-34",
    "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6aboratory",
    "https://scholar.google.com/citations?user=troy-williams",
    "https://www.wikidata.org/wiki/Q136302603"
  ],
  knowsAbout: [
    "Cybersecurity", "Artificial Intelligence", "Synthetic Identity Fraud",
    "Fraud Detection", "Machine Learning", "Information Security",
    "Private Investigation", "Post-Quantum Cryptography", "Behavioral Intelligence",
    "Zero Trust Architecture"
  ],
  trademarks: [
    { name: "PatriotProof™", description: "Fortress-level national identity and fraud defense system" },
    { name: "FraudDNA™", description: "Pattern analysis engine for synthetic identity detection" },
    { name: "AISF™", description: "Autonomous Intelligence Security Framework" },
    { name: "PPP™", description: "Proactive Prevention Platform" },
    { name: "ScamAtlas™", description: "Interactive threat intelligence mapping system" }
  ],
  patent: "PCT/US25/43982 - Synthetic Identity Detection Methodology",
  education: [
    { name: "Doctoral-level research in artificial intelligence and cybersecurity", institution: "", level: "Doctoral" },
    { name: "Master of Science in IT Management", institution: "Western Governors University", level: "Graduate", year: "2020" },
    { name: "Bachelor of Science in Cybersecurity & Information Assurance", institution: "Western Governors University", level: "Undergraduate", year: "2019" },
    { name: "Prompt Engineering Certification", institution: "Vanderbilt University", level: "Professional" },
    { name: "Financial Fraud & Courtroom Ethics Training", institution: "SBI Seminars", level: "Professional" },
    { name: "Licensed Private Investigator", institution: "State of Tennessee", level: "License" }
  ],
  organization: {
    name: "Cybersmarts.ai LLC",
    url: "https://www.DrTroyWilliams.net"
  },
  address: {
    locality: "Lebanon",
    region: "Tennessee",
    country: "US"
  },
  awards: [
    "Patent PCT/US25/43982 - Synthetic Identity Detection Methodology",
    "Governor Bill Lee Recognition - State Security Contributions",
    "ResearchGate Research Interest Score: 8.0"
  ],
  libraryReference: {
    name: "Wilson County Public Library",
    url: "https://wilsoncopublib.org"
  }
};

// ============================================
// COMPREHENSIVE PERSON SCHEMA
// ============================================

interface ComprehensivePersonSchemaProps {
  includeTrademarks?: boolean;
  includeEducation?: boolean;
  includeAwards?: boolean;
  customData?: Partial<typeof DR_TROY_WILLIAMS_DATA>;
}

export const DrTroyWilliamsSchema = ({
  includeTrademarks = true,
  includeEducation = true,
  includeAwards = true,
  customData
}: ComprehensivePersonSchemaProps = {}) => {
  const data = { ...DR_TROY_WILLIAMS_DATA, ...customData };
  
  const personSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${data.url}/#person`,
    "name": data.name,
    "givenName": data.givenName,
    "familyName": data.familyName,
    "alternateName": data.alternateName,
    "honorificPrefix": data.honorificPrefix,
    "honorificSuffix": data.honorificSuffix,
    "jobTitle": data.jobTitles,
    "description": data.description,
    "url": data.url,
    "image": {
      "@type": "ImageObject",
      "url": data.image,
      "width": 400,
      "height": 400,
      "caption": `${data.alternateName[0]} - ${data.jobTitles[0]} and ${data.jobTitles[1]}`
    },
    "sameAs": data.sameAs,
    "knowsAbout": data.knowsAbout,
    "worksFor": {
      "@type": "Organization",
      "name": data.organization.name,
      "url": data.organization.url
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.address.locality,
      "addressRegion": data.address.region,
      "addressCountry": data.address.country
    },
    "nationality": { "@type": "Country", "name": "United States" }
  };

  if (includeEducation) {
    // Only include non-doctoral credentials with institutions
    personSchema.hasCredential = data.education
      .filter(edu => edu.level !== "Doctoral" && edu.institution)
      .map(edu => ({
        "@type": "EducationalOccupationalCredential",
        "name": edu.name,
        "credentialCategory": edu.level === "License" ? "Professional License" : 
          edu.level === "Professional" ? "Professional Certification" : `${edu.level} Degree`,
        "educationalLevel": edu.level,
        ...(edu.year && { "dateCreated": edu.year }),
        "recognizedBy": {
          "@type": edu.level === "License" ? "GovernmentOrganization" : "EducationalOrganization",
          "name": edu.institution
        }
      }));

    // Only include WGU for mentorship context (non-doctoral)
    personSchema.alumniOf = [...new Set(data.education.map(edu => edu.institution))]
      .filter(inst => inst && inst !== "State of Tennessee" && inst !== "")
      .filter(inst => inst === "Western Governors University")
      .map(inst => ({
        "@type": "EducationalOrganization",
        "name": inst
      }));
  }

  if (includeTrademarks) {
    personSchema.owns = data.trademarks.map(tm => ({
      "@type": "Product",
      "name": tm.name,
      "description": tm.description
    }));
  }

  if (includeAwards) {
    personSchema.award = data.awards;
  }

  personSchema.memberOf = [{
    "@type": "LibrarySystem",
    "name": data.libraryReference.name,
    "url": data.libraryReference.url,
    "description": "Published works cataloged in library holdings"
  }];

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// UNIFIED PAGE SCHEMA COMPONENT
// ============================================

interface PageSchemaProps {
  title: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'ProfilePage' | 'CollectionPage';
  includePersonSchema?: boolean;
  includeBreadcrumbs?: boolean;
  includeOrganization?: boolean;
  breadcrumbItems?: { name: string; path: string }[];
  datePublished?: string;
  dateModified?: string;
}

export const PageSchema = ({
  title,
  description,
  path,
  type = 'WebPage',
  includePersonSchema = false,
  includeBreadcrumbs = true,
  includeOrganization = false,
  breadcrumbItems,
  datePublished,
  dateModified
}: PageSchemaProps) => {
  const baseUrl = DR_TROY_WILLIAMS_DATA.url;
  const fullUrl = `${baseUrl}${path}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${fullUrl}/#webpage`,
    "name": title,
    "description": description,
    "url": fullUrl,
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "about": { "@id": `${baseUrl}/#person` },
    "author": { "@id": `${baseUrl}/#person` },
    ...(datePublished && { "datePublished": datePublished }),
    ...(dateModified && { "dateModified": dateModified }),
    "inLanguage": "en-US"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "Dr. Troy Williams - Cybersecurity & AI Expert",
    "url": baseUrl,
    "description": DR_TROY_WILLIAMS_DATA.description,
    "publisher": { "@id": `${baseUrl}/#person` },
    "inLanguage": "en-US"
  };

  const defaultBreadcrumbs = [
    { name: "Home", path: "/" },
    { name: title, path: path }
  ];

  const breadcrumbs = breadcrumbItems || defaultBreadcrumbs;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.path}`
    }))
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": DR_TROY_WILLIAMS_DATA.organization.name,
    "url": DR_TROY_WILLIAMS_DATA.organization.url,
    "founder": { "@id": `${baseUrl}/#person` },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": DR_TROY_WILLIAMS_DATA.address.locality,
      "addressRegion": DR_TROY_WILLIAMS_DATA.address.region,
      "addressCountry": DR_TROY_WILLIAMS_DATA.address.country
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {includeBreadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {includePersonSchema && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${baseUrl}/#person`,
            "name": DR_TROY_WILLIAMS_DATA.name,
            "url": baseUrl,
            "sameAs": DR_TROY_WILLIAMS_DATA.sameAs
          })}
        </script>
      )}
      {includeOrganization && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
    </Helmet>
  );
};

// ============================================
// SIMPLE SCHEMA COMPONENTS
// ============================================

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  image?: string;
  sameAs?: string[];
  description?: string;
  alumniOf?: string[];
}

export const PersonSchema = ({
  name,
  jobTitle,
  image,
  sameAs,
  description,
  alumniOf
}: PersonSchemaProps) => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    ...(image && { "image": image }),
    ...(sameAs && { "sameAs": sameAs }),
    ...(description && { "description": description }),
    ...(alumniOf && { "alumniOf": alumniOf })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
};

interface BookSchemaProps {
  title: string;
  author?: string;
  description?: string;
  isbn?: string;
  url?: string;
  image?: string;
  publisher?: string;
  datePublished?: string;
}

export const BookSchema = ({
  title,
  author = DR_TROY_WILLIAMS_DATA.alternateName[0],
  description,
  isbn,
  url,
  image,
  publisher,
  datePublished
}: BookSchemaProps) => {
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": title,
    "author": {
      "@type": "Person",
      "name": author,
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`
    },
    ...(description && { "description": description }),
    ...(isbn && { "isbn": isbn }),
    ...(url && { "url": url }),
    ...(image && { "image": image }),
    ...(publisher && { 
      "publisher": {
        "@type": "Organization",
        "name": publisher
      }
    }),
    ...(datePublished && { "datePublished": datePublished })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(bookSchema)}
      </script>
    </Helmet>
  );
};

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  includeFounder?: boolean;
}

export const OrganizationSchema = ({
  name = DR_TROY_WILLIAMS_DATA.organization.name,
  url = DR_TROY_WILLIAMS_DATA.organization.url,
  logo,
  description,
  sameAs,
  includeFounder = true
}: OrganizationSchemaProps) => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DR_TROY_WILLIAMS_DATA.url}/#organization`,
    "name": name,
    "url": url,
    ...(logo && { "logo": logo }),
    ...(description && { "description": description }),
    ...(sameAs && { "sameAs": sameAs }),
    ...(includeFounder && {
      "founder": {
        "@type": "Person",
        "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
        "name": DR_TROY_WILLIAMS_DATA.name
      }
    }),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": DR_TROY_WILLIAMS_DATA.address.locality,
      "addressRegion": DR_TROY_WILLIAMS_DATA.address.region,
      "addressCountry": DR_TROY_WILLIAMS_DATA.address.country
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
    </Helmet>
  );
};

interface WebPageSchemaProps {
  name: string;
  description: string;
  url?: string;
}

export const WebPageSchema = ({
  name,
  description,
  url
}: WebPageSchemaProps) => {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    ...(url && { "url": url })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
};

interface BreadcrumbListSchemaProps {
  items: { name: string; item: string }[];
}

export const BreadcrumbListSchema = ({ items }: BreadcrumbListSchemaProps) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// ARTICLE & BLOG SCHEMAS
// ============================================

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url?: string;
  articleType?: 'Article' | 'NewsArticle' | 'BlogPosting' | 'TechArticle';
  publisher?: { name: string; logo?: string };
}

export const ArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = DR_TROY_WILLIAMS_DATA.alternateName[0],
  url,
  articleType = 'Article',
  publisher
}: ArticleSchemaProps) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": articleType,
    "headline": headline,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    ...(dateModified && { "dateModified": dateModified }),
    "author": {
      "@type": "Person",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
      "name": author
    },
    "publisher": publisher ? {
      "@type": "Organization",
      "name": publisher.name,
      ...(publisher.logo && { "logo": { "@type": "ImageObject", "url": publisher.logo } })
    } : {
      "@type": "Organization",
      "name": DR_TROY_WILLIAMS_DATA.organization.name,
      "url": DR_TROY_WILLIAMS_DATA.organization.url
    },
    ...(url && { "url": url, "mainEntityOfPage": url })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
};

export const NewsArticleSchema = ArticleSchema;

// ============================================
// SERVICE & PRODUCT SCHEMAS
// ============================================

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: { name: string; url?: string };
  areaServed?: string;
  serviceType?: string;
  url?: string;
  offers?: { name: string; description: string }[];
}

export const ServiceSchema = ({
  name,
  description,
  provider = DR_TROY_WILLIAMS_DATA.organization,
  areaServed = "United States",
  serviceType,
  url,
  offers
}: ServiceSchemaProps) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#organization`,
      "name": provider.name,
      ...(provider.url && { "url": provider.url })
    },
    "areaServed": areaServed,
    ...(serviceType && { "serviceType": serviceType }),
    ...(url && { "url": url }),
    ...(offers && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${name} Services`,
        "itemListElement": offers.map(offer => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": offer.name,
            "description": offer.description
          }
        }))
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};

interface ProductSchemaProps {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  url?: string;
}

export const ProductSchema = ({
  name,
  description,
  image,
  brand = DR_TROY_WILLIAMS_DATA.organization.name,
  url
}: ProductSchemaProps) => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    ...(image && { "image": image }),
    "brand": {
      "@type": "Organization",
      "name": brand
    },
    ...(url && { "url": url }),
    "manufacturer": {
      "@type": "Organization",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#organization`,
      "name": DR_TROY_WILLIAMS_DATA.organization.name
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// FAQ & HOW-TO SCHEMAS
// ============================================

interface FAQSchemaProps {
  questions: { question: string; answer: string }[];
}

export const FAQSchema = ({ questions }: FAQSchemaProps) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
  image?: string;
}

export const HowToSchema = ({
  name,
  description,
  steps,
  totalTime,
  image
}: HowToSchemaProps) => {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    ...(totalTime && { "totalTime": totalTime }),
    ...(image && { "image": image }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// EVENT & VIDEO SCHEMAS
// ============================================

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  isVirtual?: boolean;
  url?: string;
  image?: string;
}

export const EventSchema = ({
  name,
  description,
  startDate,
  endDate,
  location,
  isVirtual = false,
  url,
  image
}: EventSchemaProps) => {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    ...(endDate && { "endDate": endDate }),
    "eventAttendanceMode": isVirtual 
      ? "https://schema.org/OnlineEventAttendanceMode" 
      : "https://schema.org/OfflineEventAttendanceMode",
    ...(location && {
      "location": isVirtual 
        ? { "@type": "VirtualLocation", "url": location }
        : { "@type": "Place", "name": location }
    }),
    "organizer": {
      "@type": "Person",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
      "name": DR_TROY_WILLIAMS_DATA.name
    },
    ...(url && { "url": url }),
    ...(image && { "image": image })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
    </Helmet>
  );
};

interface VideoObjectSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}

export const VideoObjectSchema = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration
}: VideoObjectSchemaProps) => {
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    ...(contentUrl && { "contentUrl": contentUrl }),
    ...(embedUrl && { "embedUrl": embedUrl }),
    ...(duration && { "duration": duration }),
    "author": {
      "@type": "Person",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
      "name": DR_TROY_WILLIAMS_DATA.name
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(videoSchema)}
      </script>
    </Helmet>
  );
};

// ============================================
// COURSE & EDUCATION SCHEMAS
// ============================================

interface CourseSchemaProps {
  name: string;
  description: string;
  provider?: string;
  url?: string;
  image?: string;
}

export const CourseSchema = ({
  name,
  description,
  provider = DR_TROY_WILLIAMS_DATA.organization.name,
  url,
  image
}: CourseSchemaProps) => {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider
    },
    "instructor": {
      "@type": "Person",
      "@id": `${DR_TROY_WILLIAMS_DATA.url}/#person`,
      "name": DR_TROY_WILLIAMS_DATA.name
    },
    ...(url && { "url": url }),
    ...(image && { "image": image })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(courseSchema)}
      </script>
    </Helmet>
  );
};
>>>>>>> 64263f1404bb2a2578060545a1ceec5d8ce5d053
