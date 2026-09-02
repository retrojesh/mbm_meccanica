import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://www.mbmmeccanica.com';
// Immagine di anteprima per le condivisioni social (1200x630).
// Resta in JPEG: alcuni scraper social non gestiscono WebP.
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const OG_IMAGE_ALT =
    'MBM Meccanica - lavorazioni CNC di precisione, flangia in alluminio lavorata a Castelvetro di Modena';

export default function SEO({ title, description, noindex = false, appendBrand = true }) {
    const { pathname } = useLocation();
    // appendBrand={false} per i title che contengono già "MBM Meccanica",
    // così da non ritrovarsi il brand due volte.
    const fullTitle = appendBrand ? `${title} | MBM Meccanica` : title;
    const canonicalUrl = `${BASE_URL}${pathname}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {noindex ? (
                <meta name="robots" content="noindex, follow" />
            ) : (
                <link rel="canonical" href={canonicalUrl} />
            )}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="MBM Meccanica" />
            <meta property="og:locale" content="it_IT" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={OG_IMAGE} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={OG_IMAGE_ALT} />

            {/* Twitter / X */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={OG_IMAGE} />
            <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
        </Helmet>
    );
}
