import { Helmet } from 'react-helmet-async';

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ManufacturingBusiness',
    name: 'MBM Meccanica',
    url: 'https://www.mbmmeccanica.it', // TODO: change to the actual domain when the site goes live
    logo: 'https://www.mbmmeccanica.it/favicon.svg', // TODO: change to the actual domain and replace favicon.svg with the real company logo
    description:
        'MBM Meccanica è un officina metalmeccanica specializzata in fresatura CNC e tornitura CNC a Castelvetro di Modena. Lavoriamo su commessa e conto terzi per il settore automotive, alimentare e motorsport, inclusa la Formula 1.',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Castelvetro di Modena',
        addressRegion: 'MO',
        postalCode: '41014',
        addressCountry: 'IT',
    },
    areaServed: [
        { '@type': 'City', name: 'Modena' },
        { '@type': 'State', name: 'Emilia-Romagna' },
        { '@type': 'Country', name: 'Italia' },
    ],
    knowsAbout: [
        'Fresatura CNC',
        'Tornitura CNC',
        'Progettazione CAD/CAM',
        'Lavorazioni meccaniche di precisione',
        'Componentistica automotive',
        'Componentistica Formula 1',
        'Lavorazioni settore alimentare',
        'Lavorazioni conto terzi',
        'Lavorazioni su commessa',
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servizi di lavorazione meccanica CNC',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Fresatura CNC',
                    description:
                        'Lavorazioni di fresatura CNC ad alta precisione per componenti meccanici su commessa e conto terzi.',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Tornitura CNC',
                    description:
                        'Tornitura CNC di precisione per la produzione di componenti meccanici in serie o su misura.',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Progettazione CAD/CAM',
                    description:
                        'Sviluppo e progettazione 3D con software CAD/CAM per la realizzazione di componenti meccanici complessi.',
                },
            },
        ],
    },
};

export default function JsonLd() {
    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
    );
}
