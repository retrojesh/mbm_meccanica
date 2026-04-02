import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// TODO: change to the actual domain when the site goes live
const BASE_URL = 'https://www.mbmmeccanica.it';

export default function SEO({ title, description, keywords }) {
    const { pathname } = useLocation();
    const fullTitle = `${title} | MBM Meccanica`;
    const canonicalUrl = `${BASE_URL}${pathname}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="MBM Meccanica" />
            <meta property="og:locale" content="it_IT" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
        </Helmet>
    );
}
