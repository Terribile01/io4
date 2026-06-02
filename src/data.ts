import { PortfolioCase } from "./types";

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: "1",
    title: "Atelier Sposi Sartoriale",
    subtitle: "Sito custom React + Campagne Lead Generation in tutta la Lombardia",
    tag: "Custom Code",
    tech: "React, Tailwind, Meta Ads, Pixel Server-Side",
    growthMetric: "+342% Lead d'Acquisto",
    image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=600&auto=format&fit=crop",
    description: "Sito vetrina in puro codice ad altissime prestazioni abbinato a campagne Instagram con funnel a due step. Tempo di caricamento inferiore a 0.6 secondi per massimizzare il ROI pubblicitario."
  },
  {
    id: "2",
    title: "Studio Dentistico Premium",
    subtitle: "Rilancio dell'immagine di marca e posizionamento Google Ads",
    tag: "WordPress Classico",
    tech: "WordPress, Elementor Custom, Google Search Ads, Schema SEO",
    growthMetric: "+125% Appuntamenti Mensili",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop",
    description: "Un sito robusto ed elegante sviluppato in ambiente WordPress, ottimizzato per concedere al cliente totale autonomia nei post del blog e nella gestione delle tariffe, combinato con campagne locali mirate su Google Maps."
  },
  {
    id: "3",
    title: "Boutique Hotel Wellness & Spa",
    subtitle: "Interfaccia immersiva multilingua e prenotazioni dirette",
    tag: "Custom Code",
    tech: "SvelteKit, Tailwind CSS, Google Analytics 4, Tag Manager",
    growthMetric: "Disintermediazione OTA (+48% direct booking)",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    description: "Sito ultra-creativo custom per trasmettere l'atmosfera della Spa di lusso, superando i pesanti limiti prestazionali dei costruttori di siti classici, con tracciamenti e conversion API integrate."
  },
  {
    id: "4",
    title: "Accademia di Formazione Professionale",
    subtitle: "Landing Page ad alta conversione per corsi regionali",
    tag: "Squarespace Classico",
    tech: "Squarespace, Campagne Lead Gen Meta & LinkedIn, Mailchimp",
    growthMetric: "820+ Iscritti in 3 mesi",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
    description: "Configurazione e design su Squarespace per garantire il controllo e l'aggiornamento rapido dei corsi da parte del team interno, collegato a campagne di conversione mirate su Meta e funnel e-mail."
  }
];

export interface TechnicalSheet {
  id: string;
  title: string;
  description: string;
  features: string[];
  techSpecs: { label: string; value: string }[];
  icon: string;
}

export const TECHNICAL_SHEETS: TechnicalSheet[] = [
  {
    id: "wp-wix-sq",
    title: "WordPress, Wix & Squarespace",
    description: "La soluzione ideale per chi cerca flessibilità, velocità di pubblicazione e totale autonomia nella gestione dei contenuti.",
    features: [
      "Interfaccia drag-and-drop intuitiva",
      "Blog e News management integrato",
      "E-commerce setup rapido",
      "Plugin di terze parti per ogni esigenza",
      "Training incluso per aggiornamenti autonomi"
    ],
    techSpecs: [
      { label: "Piattaforme", value: "WP, Wix, Squarespace" },
      { label: "Manutenzione", value: "Bassa/Media" },
      { label: "Personalizzazione", value: "Alta (tramite plugin/temi)" },
      { label: "Tempo di consegna", value: "1-2 settimane" }
    ],
    icon: "Globe"
  },
  {
    id: "react-custom",
    title: "Codice React su Misura",
    description: "Sviluppo di siti web ad altissime prestazioni utilizzando le tecnologie più moderne per un'esperienza utente senza compromessi.",
    features: [
      "Velocità di caricamento istantanea (Core Web Vitals d'eccellenza)",
      "SEO Tecnico superiore",
      "Sicurezza totale (no plugin vulnerabili)",
      "Design 100% unico senza limiti di template",
      "Infrastruttura scalabile su cloud"
    ],
    techSpecs: [
      { label: "Stack", value: "React, Next.js, Vite, Tailwind" },
      { label: "Performance Score", value: "95-100/100 (LightHouse)" },
      { label: "Sicurezza", value: "Massima (No database statico)" },
      { label: "Tempo di consegna", value: "3-4 settimane" }
    ],
    icon: "Code"
  },
  {
    id: "lead-gen",
    title: "Lead Generation Strategica",
    description: "Sistemi completi per trasformare i visitatori in contatti qualificati e opportunità di vendita concrete.",
    features: [
      "Landing Page ad alta conversione",
      "Form di contatto intelligenti e qualificati",
      "Integrazione CRM istantanea",
      "Sistemi di tracciamento avanzati (Conversion API)",
      "A/B Testing continuo"
    ],
    techSpecs: [
      { label: "Focus", value: "Conversione / ROI" },
      { label: "Strumenti", value: "GTM, Meta CAPI, Zapier" },
      { label: "Tracciamento", value: "Server-Side" },
      { label: "Goal", value: "Massimizzazione CPL" }
    ],
    icon: "TrendingUp"
  },
  {
    id: "ads-mgmt",
    title: "Campagne ADS (Meta & Google)",
    description: "Gestione professionale della pubblicità a pagamento per portare traffico mirato e pronto all'acquisto sul tuo sito.",
    features: [
      "Analisi del target e dei competitor",
      "Creazione di copy e visual accattivanti",
      "Ottimizzazione quotidiana delle performance",
      "Reportistica chiara e trasparente",
      "Scalabilità del budget basata sui risultati"
    ],
    techSpecs: [
      { label: "Piattaforme", value: "Meta Ads, Google Search/Display" },
      { label: "Analisi", value: "GA4, Facebook Analytics" },
      { label: "Retargeting", value: "Strategie Full-Funnel" },
      { label: "Ottimizzazione", value: "Smart Bidding / Manuale" }
    ],
    icon: "BarChart2"
  }
];
