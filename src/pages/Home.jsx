import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';

export default function Home() {
    return (
        <>
            <SEO
                title="Lavorazioni CNC di Precisione a Castelvetro di Modena"
                description="MBM Meccanica: fresatura CNC e tornitura CNC a Castelvetro di Modena. Lavorazioni di precisione per automotive, Formula 1 e settore alimentare. Conto terzi e su commessa con progettazione CAD/CAM."
                keywords="MBM Meccanica, metalmeccanica Castelvetro di Modena, metalmeccanica Modena, officina meccanica Modena, lavorazioni meccaniche di precisione, lavorazioni conto terzi Modena, lavorazioni su commessa Modena, officina meccanica Emilia Romagna, componenti meccanici automotive, lavorazioni settore alimentare, componenti Formula 1, metalmeccanica Emilia Romagna"
            />
            <JsonLd />
            <div>Home</div>
        </>
    );
}
