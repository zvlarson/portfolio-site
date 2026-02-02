import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://zvlarson.com';
const DEFAULT_TITLE = 'Zach Larson | Software Engineer';
const DEFAULT_DESCRIPTION = 'Full-stack software engineer specializing in building exceptional digital experiences. View my portfolio, case studies, and testimonials.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  children,
}) {
  const fullTitle = title ? `${title} | Zach Larson` : DEFAULT_TITLE;
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Zach Larson" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {children}
    </Helmet>
  );
}
