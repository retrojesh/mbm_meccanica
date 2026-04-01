import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

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
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}
