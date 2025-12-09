import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function generateSEO({
  title,
  description,
  image = '/og-image.png',
  url,
  type = 'website',
}: SEOProps): Metadata {
  const siteName = 'Therassist';
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export const defaultSEO: Metadata = generateSEO({
  title: 'AI-Powered Therapy Management',
  description: 'Streamline your therapy practice with AI-powered session management, transcription, and client insights.',
});
