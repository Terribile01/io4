import { useState, useEffect } from "react";
import { LeadSubmission } from "../types";
import { Users, Euro, CheckCircle2, Trash2, Clock, Eye, Sparkles, Filter, Briefcase } from "lucide-react";

// Initial mock leads to pre-populate the interactive simulator
const INITIAL_DEMO_LEADS: LeadSubmission[] = [
  {
    id: "lead_1",
    clientName: "Giovanni Moretti",
    businessName: "Moretti Atelier Sposa Milan",
    email: "giovanni.moretti@atelier.it",
    phone: "+39 347 1234567",
    niche: "Salute, Wellness & Bellezza",
    goals: ["Creare un nuovo Sito Web da zero", "Ottenere più contatti e richiedenti preventivo (Lead Gen)"],
    webType: "In Puro Codice Custom (React / CSS / SEO d'Elite)",
    budget: "Professional (€1.500 - €3.500)",
    timestamp: "Oggi, 11:24",
    status: "Nuovo"
  },
  {
    id: "lead_2",
    clientName: "Dr. Roberto Valenti",
    businessName: "Studio Odontoiatrico Valenti",
    email: "roberto.valenti@odontos.it",
    phone: "+39 02 876543",
    niche: "Servizi Professionali (Legali, Medici, Fiscale)",
    goals: ["Ridisegnare il mio Sito attuale (Restyling)", "Gestire Campagne ADS (Meta / Google) per vendere subito"],
    webType: "WordPress (Ottimo ed autonomo)",
    budget: "Starter (€500 - €1.500)",
    timestamp: "Ieri, 18:15",
    status: "Contattato"
  },
  {
    id: "lead_3",
    clientName: "Silvia Marchetti",
    businessName: "Garda Charme Boutique Hotel",
    email: "silvia.m@gardacharme.it",
    phone: "+39 335 9876543",
    niche: "Turismo, Hotel e Accommodation",
    goals: ["Posizionarmi su Google (Ottimizzazione SEO)", "Ottieni più contatti e richiedenti preventivo (Lead Gen)"],
    webType: "In Puro Codice Custom (React / CSS / SEO d'Elite)",
    budget: "Premium / Scalabile (€3.500+)",
    timestamp: "2 giorni fa",
    status: "Nuovo"
  }
];

export default function AdminHub() {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [filter, setFilter] = useState<string>("Tutti");
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);

  useEffect(() => {
    // Load leads from localStorage, inject defaults if empty
    const stored = localStorage.getItem("fw_leads_database");
    if (stored) {
      try {
        setLeads(JSON.parse(stored));
      } catch (e) {
        setLeads(INITIAL_DEMO_LEADS);
      }
    } else {
      setLeads(INITIAL_DEMO_LEADS);
      localStorage.setItem("fw_leads_database", JSON.stringify(INITIAL_DEMO_LEADS));
    }

    // Listener for custom events when new leads are inserted on the contact form
    const handleNewLead = () => {
      const updated = localStorage.getItem("fw_leads_database");
      if (updated) {
        setLeads(JSON.parse(updated));
      }
    };
    window.addEventListener("fw_new_lead_added", handleNewLead);
    return () => window.removeEventListener("fw_new_lead_added", handleNewLead);
  }, []);

  const updateStatus = (id: string, newStatus: "Nuovo" | "Contattato" | "Archiviato") => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setLeads(updated);
    localStorage.setItem("fw_leads_database", JSON.stringify(updated));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    localStorage.setItem("fw_leads_database", JSON.stringify(updated));
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null);
    }
  };

  const filteredLeads = filter === "Tutti" 
    ? leads 
    : leads.filter(l => l.status === filter);

  // Compute stats for CRM overview cards
  const totalLeads = leads.length;
  const activeLeads = leads.filter(l => l.status === "Nuovo").length;
  
  // Pipeline value estimation based on budget descriptions
  const calculatePipelineValue = () => {
    return leads.reduce((acc, lead) => {
      let value = 1000; // default starter
      if (lead.budget.includes("3.500+")) value = 4000;
      else if (lead.budget.includes("Professional")) value = 2500;
      return acc + value;
    }, 0);
  };

  const pipelineValue = calculatePipelineValue();

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-line-ivory shadow-lg select-none" id="lead-crm-simulation">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-line-ivory">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-purple bg-accent-purple/10 px-3 py-1 rounded-full mb-2 inline-block">
            Ingegneria Gestionale Custom
          </span>
          <h3 className="font-display text-2xl font-bold text-charcoal">
            Hub Acquisizione &amp; CRM Simulator
          </h3>
          <p className="text-xs text-muted-grey mt-1">
            Qui vedi in tempo reale come i tuoi contatti vengono incanalati, tracciati e pronti per essere monetizzati.
          </p>
        </div>
        
        {/* Toggle / Tabs Filter */}
        <div className="flex items-center gap-1 bg-white border border-line-ivory p-1 rounded-none">
          {["Tutti", "Nuovo", "Contattato"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-none transition-colors cursor-pointer ${
                filter === item 
                  ? "bg-charcoal text-white" 
                  : "text-muted-grey hover:text-charcoal bg-transparent"
              }`}
            >
              {item === "Nuovo" ? "Da Gestire" : item}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/60 p-4 rounded-xl border border-line-ivory shadow-sm flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-accent-blue/10 text-accent-blue">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase text-muted-grey">Total Lead Raccolte</p>
            <p className="font-display text-lg font-bold text-charcoal">{totalLeads}</p>
          </div>
        </div>

        <div className="bg-white/60 p-4 rounded-xl border border-line-ivory shadow-sm flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-accent-pink/10 text-accent-pink">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase text-muted-grey">In Attesa di Risposta</p>
            <p className="font-display text-lg font-bold text-charcoal">{activeLeads}</p>
          </div>
        </div>

        <div className="bg-white/60 p-4 rounded-xl border border-line-ivory shadow-sm flex items-center gap-4">
          <div className="p-2.5 rounded-lg bg-accent-orange/10 text-accent-orange">
            <Euro className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase text-muted-grey">Stima Ecosistema Pipeline</p>
            <p className="font-display text-lg font-bold text-charcoal">€ {pipelineValue.toLocaleString("it-IT")}</p>
          </div>
        </div>
      </div>

      {/* Workbench Layout: Leads List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* List (Left) */}
        <div className="lg:col-span-7 space-y-3 max-h-[460px] overflow-y-auto pr-1">
          {filteredLeads.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-line-ivory rounded-2xl">
              <Users className="w-8 h-8 text-muted-grey/60 mx-auto mb-2" />
              <p className="text-sm font-semibold text-charcoal">Nessu contatto in questo stato</p>
              <p className="text-xs text-muted-grey mt-0.5">Usa il form dell'Audit sopra per simularne l'invio!</p>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left flex gap-4 ${
                  selectedLead?.id === lead.id
                    ? "border-accent-purple bg-accent-purple/[0.03] shadow-md"
                    : "border-line-ivory bg-white hover:border-accent-purple/30"
                }`}
              >
                {/* Visual Status Indicator */}
                <div className="mt-1 shrink-0">
                  <span className={`w-3 h-3 rounded-full block border-2 border-white shadow-sm ${
                    lead.status === "Nuovo" ? "bg-accent-pink" : "bg-green-500"
                  }`}></span>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-semibold text-charcoal truncate">{lead.businessName}</h4>
                    <span className="text-[10px] text-muted-grey shrink-0">{lead.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-muted-grey truncate">Cliente: {lead.clientName}</p>
                  
                  {/* Goals tags */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[9px] font-bold text-charcoal/80 bg-bg-ivory border border-line-ivory px-2 py-0.5 rounded">
                      {lead.niche.split(" ")[0]}
                    </span>
                    <span className="text-[9px] font-bold text-[#E5E2E1] bg-charcoal px-2 py-0.5 rounded">
                      {lead.budget.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Visualizer (Right) */}
        <div className="lg:col-span-5 bg-white border border-line-ivory rounded-2xl p-5 min-h-[380px] flex flex-col justify-between">
          {selectedLead ? (
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4 pb-3 border-b border-line-ivory/60">
                  <div>
                    <h4 className="font-display text-sm font-bold text-charcoal">{selectedLead.businessName}</h4>
                    <p className="text-[10px] text-muted-grey">{selectedLead.niche}</p>
                  </div>
                  <button 
                    onClick={() => deleteLead(selectedLead.id)}
                    className="text-muted-grey hover:text-accent-pink transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Info List */}
                <div className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-3">
                    <span className="text-muted-grey">Referente:</span>
                    <span className="col-span-2 font-medium text-charcoal">{selectedLead.clientName}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-grey">Email:</span>
                    <a href={`mailto:${selectedLead.email}`} className="col-span-2 text-accent-blue hover:underline break-all">
                      {selectedLead.email}
                    </a>
                  </div>
                  {selectedLead.phone && (
                    <div className="grid grid-cols-3">
                      <span className="text-muted-grey">Telefono:</span>
                      <span className="col-span-2 font-mono text-charcoal">{selectedLead.phone}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-3">
                    <span className="text-muted-grey">Piattaforma:</span>
                    <span className="col-span-2 font-medium text-charcoal">{selectedLead.webType}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-grey">Budget:</span>
                    <span className="col-span-2 text-charcoal font-semibold bg-bg-ivory px-2 py-0.5 rounded border border-line-ivory/50 w-max">
                      {selectedLead.budget}
                    </span>
                  </div>
                  {selectedLead.currentWebsite && (
                    <div className="grid grid-cols-3">
                      <span className="text-muted-grey">Sito:</span>
                      <span className="col-span-2 truncate text-charcoal/80 font-mono italic">{selectedLead.currentWebsite}</span>
                    </div>
                  )}
                  
                  {/* Multi Objectives list */}
                  <div className="pt-2">
                    <span className="text-muted-grey block mb-1">Obiettivi Richiesti:</span>
                    <div className="space-y-1 pl-2">
                      {selectedLead.goals ? (
                        selectedLead.goals.map((g, i) => (
                          <div key={i} className="flex gap-1.5 items-center text-[11px] text-charcoal/90">
                            <span className="w-1 h-1 rounded-full bg-accent-purple shrink-0" />
                            <span>{g}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-muted-grey italic">Nessun obiettivo indicato</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status workflow togglers */}
              <div className="mt-6 pt-4 border-t border-line-ivory flex gap-3 text-xs justify-end">
                {selectedLead.status === "Nuovo" ? (
                  <button
                    onClick={() => updateStatus(selectedLead.id, "Contattato")}
                    className="flex items-center gap-1.5 text-white bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-none font-bold uppercase tracking-wider text-[9px] cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Segna come Contattato
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatus(selectedLead.id, "Nuovo")}
                    className="flex items-center gap-1.5 text-charcoal border border-line-ivory hover:bg-bg-ivory/50 transition-colors px-4 py-2 rounded-none font-bold uppercase tracking-wider text-[9px] cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" /> Reimposta come Nuovo
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-grey space-y-2">
              <Eye className="w-10 h-10 stroke-1 opacity-70" />
              <p className="text-xs font-semibold">Nessuna lead selezionata</p>
              <p className="text-[11px] max-w-xs leading-relaxed">
                Clicca su una richiesta nella lista a sinistra per caricarne i dettagli informativi, i requisiti tecnologici ed aggiornare lo stato di contatto.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
