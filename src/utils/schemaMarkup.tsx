import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  author: string;
  description?: string;
  isbn?: string;
  url?: string;
  image?: string;
  publisher?: string;
  datePublished?: string;
}

export const BookSchema = ({
  title,
  author,
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
      "name": author
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
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export const OrganizationSchema = ({
  name,
  url,
  logo,
  description,
  sameAs
}: OrganizationSchemaProps) => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    ...(url && { "url": url }),
    ...(logo && { "logo": logo }),
    ...(description && { "description": description }),
    ...(sameAs && { "sameAs": sameAs })
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
  items: {
    name: string;
    item: string;
  }[];
}

export const BreadcrumbListSchema = ({
  items
}: BreadcrumbListSchemaProps) => {
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

interface VideoObjectSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
}

export const VideoObjectSchema = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl
}: VideoObjectSchemaProps) => {
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    ...(contentUrl && { "contentUrl": contentUrl }),
    ...(embedUrl && { "embedUrl": embedUrl })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(videoSchema)}
      </script>
    </Helmet>
  );
};

// New schema for press articles
interface NewsArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  publisher: {
    name: string;
    logo?: string;
  };
  author?: string;
  url?: string;
}

export const NewsArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  publisher,
  author = "Dr. Troy Williams",
  url
}: NewsArticleSchemaProps) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": headline,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "publisher": {
      "@type": "Organization",
      "name": publisher.name,
      ...(publisher.logo && { 
        "logo": {
          "@type": "ImageObject",
          "url": publisher.logo
        } 
      })
    },
    "author": {
      "@type": "Person",
      "name": author
    },
    ...(url && { "url": url })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
};

// Service schema for professional services
interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url?: string;
  };
  areaServed?: string;
  serviceType?: string;
  url?: string;
  offers?: {
    name: string;
    description: string;
  }[];
}

export const ServiceSchema = ({
  name,
  description,
  provider,
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
      "name": provider.name,
      ...(provider.url && { "url": provider.url })
    },
    ...(areaServed && { "areaServed": areaServed }),
    ...(serviceType && { "serviceType": serviceType }),
    ...(url && { "url": url }),
    ...(offers && {
      "offers": offers.map(offer => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": offer.name,
          "description": offer.description
        }
      }))
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
