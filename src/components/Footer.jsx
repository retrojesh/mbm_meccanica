import { Link } from 'react-router-dom';
import { setConsent } from '../utils/consent';

// Dati societari obbligatori per le Srl (art. 2250 c.c.) e P.IVA (art. 35 DPR 633/72).
// REA e capitale sociale: da compilare con i dati della visura camerale.
// Finché sono vuoti non vengono mostrati.
const COMPANY = {
    name: 'M.B.M. Meccanica Srl',
    registeredOffice: 'Via Renzo Boni 54, 41058 Vignola (MO)',
    operatingOffice: 'Via M. Buonarroti 22/24, 41014 Castelvetro di Modena (MO)',
    vatNumber: '04125990368',
    rea: '', // es. 'MO-123456'
    shareCapital: '', // es. '10.000,00 € i.v.'
};

export default function Footer() {
    const legalInfo = [
        `P.IVA ${COMPANY.vatNumber}`,
        COMPANY.rea && `Reg. Imprese di Modena - REA ${COMPANY.rea}`,
        COMPANY.shareCapital && `Capitale sociale ${COMPANY.shareCapital}`,
    ].filter(Boolean);

    return (
        <footer className="border-t border-white/10 bg-slate-950 py-6 text-xs leading-relaxed text-slate-400">
            {/* Stessa larghezza della navbar; tutto su una riga dove c'è spazio */}
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
                <p>
                    <span className="font-semibold text-slate-300">{COMPANY.name}</span>
                    {' · '}Sede legale: {COMPANY.registeredOffice}
                    {' · '}Sede operativa: {COMPANY.operatingOffice}
                    {legalInfo.map(info => ` · ${info}`)}
                </p>
                <nav aria-label="Note legali" className="flex shrink-0 gap-4">
                    <Link to="/privacy" className="transition-colors hover:text-white">
                        Privacy e cookie policy
                    </Link>
                    {/* Riapre il banner del consenso */}
                    <button
                        type="button"
                        onClick={() => setConsent(null)}
                        className="cursor-pointer transition-colors hover:text-white"
                    >
                        Preferenze cookie
                    </button>
                </nav>
            </div>
        </footer>
    );
}
