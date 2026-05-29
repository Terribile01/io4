import { useState } from "react";
import { TrendingUp, RefreshCw, Sparkles, MessageSquare } from "lucide-react";

export default function ROICalculator() {
  const [budget, setBudget] = useState(1000); // Monthly budget €
  const [cpc, setCpc] = useState(0.80); // Avg cost per click
  const [convRate, setConvRate] = useState(1.5); // Website conversion rate % (standard is ~1.5%)
  const [closeRate, setCloseRate] = useState(15); // Percentage of leads closed %
  const [customerValue, setCustomerValue] = useState(800); // Average value of a client in €

  // Calculations
  const estimatedClicks = Math.round(budget / cpc);
  const estimatedLeads = Math.round(estimatedClicks * (convRate / 100));
  const estimatedCustomers = Math.round(estimatedLeads * (closeRate / 100));
  const estimatedRevenue = estimatedCustomers * customerValue;
  const netProfit = estimatedRevenue - budget;
  const roi = budget > 0 ? Math.round((netProfit / budget) * 100) : 0;

  // Comparison with a standard unoptimized site (e.g., 0.5% conversion and 8% close)
  const baseClicks = Math.round(budget / (cpc * 1.2)); // Unoptimized campaign has higher CPC
  const baseLeads = Math.round(baseClicks * (0.6 / 100)); // 0.6% conversion
  const baseCustomers = Math.round(baseLeads * (8 / 100)); // 8% close
  const baseRevenue = baseCustomers * customerValue;
  const baseNetProfit = baseRevenue - budget;

  const extraRevenue = estimatedRevenue - baseRevenue;

  const handleReset = () => {
    setBudget(1000);
    setCpc(0.80);
    setConvRate(2.5);
    setCloseRate(15);
    setCustomerValue(800);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-line-ivory shadow-lg select-none" id="roi-calculator-widget">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-line-ivory">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-none mb-2 inline-block">
            Simulatore ROI & Strategia
          </span>
          <h3 className="font-display text-2xl font-bold text-charcoal">
            Calcola la tua Potenza di Acquisizione
          </h3>
          <p className="text-xs text-muted-grey mt-1">
            Visualizza l'impatto reale di un sito performante e campagne pubblicitarie attive.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-muted-grey hover:text-charcoal transition-colors px-3 py-1.5 rounded-none border border-line-ivory/50 bg-white/50"
        >
          <RefreshCw className="w-3 h-3" /> Ripristina default
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Sliders */}
        <div className="lg:col-span-7 space-y-6">
          {/* Budget Ad */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-charcoal flex items-center gap-1.5">
                Investimento Pubblicitario Mensile
                <span className="text-xs text-muted-grey">(Meta & Google Ads)</span>
              </label>
              <span className="font-mono font-bold text-charcoal bg-white px-2.5 py-1 rounded-md shadow-sm border border-line-ivory/30">
                € {budget.toLocaleString("it-IT")}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="100"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-line-ivory rounded-lg appearance-none cursor-pointer accent-accent-blue"
            />
            <div className="flex justify-between text-[10px] text-muted-grey font-mono">
              <span>€ 200</span>
              <span>€ 5.000</span>
              <span>€ 10.000</span>
            </div>
          </div>

          {/* CPC Cost */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-charcoal flex items-center gap-1.5">
                Costo stimato per singolo Click (CPC)
                <span className="text-xs text-muted-grey">(Competitività settore)</span>
              </label>
              <span className="font-mono font-bold text-charcoal bg-white px-2.5 py-1 rounded-md shadow-sm border border-line-ivory/30">
                € {cpc.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.15"
              max="4.00"
              step="0.05"
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
              className="w-full h-1.5 bg-line-ivory rounded-lg appearance-none cursor-pointer accent-accent-blue"
            />
            <div className="flex justify-between text-[10px] text-muted-grey font-mono">
              <span>€ 0.15 (E-commerce)</span>
              <span>€ 1.50 (Servizi locali)</span>
              <span>€ 4.00 (B2B competitivo)</span>
            </div>
          </div>

          {/* Website Conversion rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-charcoal flex items-center gap-1.5">
                Tasso di Conversione del Sito Web
                <span className="text-[11px] font-bold text-accent-pink bg-accent-pink/10 px-2 py-0.5 rounded-none whitespace-nowrap">
                  {convRate < 1.0 ? "Scarso (Standard)" : convRate < 2.5 ? "Medio (WordPress)" : "Eccellente (Codice Custom)"}
                </span>
              </label>
              <span className="font-mono font-bold text-charcoal bg-white px-2.5 py-1 rounded-md shadow-sm border border-line-ivory/30">
                {convRate}%
              </span>
            </div>
            <input
              type="range"
              min="0.3"
              max="10"
              step="0.1"
              value={convRate}
              onChange={(e) => setConvRate(Number(e.target.value))}
              className="w-full h-1.5 bg-line-ivory rounded-lg appearance-none cursor-pointer accent-accent-pink"
            />
            <div className="flex justify-between text-[10px] text-muted-grey font-mono">
              <span>0.3% (Sito lento)</span>
              <span>2.5% (Sito ottimizzato)</span>
              <span>10.0% (Landing d'Elite)</span>
            </div>
          </div>

          {/* Close rate percentage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-charcoal flex items-center gap-1.5">
                Tasso di Chiusura dei Contatti (Vendite)
                <span className="text-xs text-muted-grey">(Quante richieste diventano clienti veri)</span>
              </label>
              <span className="font-mono font-bold text-charcoal bg-white px-2.5 py-1 rounded-md shadow-sm border border-line-ivory/30">
                {closeRate}%
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="60"
              step="1"
              value={closeRate}
              onChange={(e) => setCloseRate(Number(e.target.value))}
              className="w-full h-1.5 bg-line-ivory rounded-lg appearance-none cursor-pointer accent-accent-orange"
            />
            <div className="flex justify-between text-[10px] text-muted-grey font-mono">
              <span>2% (E-commerce puro)</span>
              <span>15% (Consulenza)</span>
              <span>60% (Fiducia alta)</span>
            </div>
          </div>

          {/* Client value */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-charcoal flex items-center gap-1.5">
                Valore Economico Medio di un Cliente
                <span className="text-xs text-muted-grey">(Valore medio acquisto / contratto)</span>
              </label>
              <span className="font-mono font-bold text-charcoal bg-white px-2.5 py-1 rounded-md shadow-sm border border-line-ivory/30">
                € {customerValue.toLocaleString("it-IT")}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={customerValue}
              onChange={(e) => setCustomerValue(Number(e.target.value))}
              className="w-full h-1.5 bg-line-ivory rounded-lg appearance-none cursor-pointer accent-accent-orange"
            />
            <div className="flex justify-between text-[10px] text-muted-grey font-mono">
              <span>€ 50 (Shop)</span>
              <span>€ 1.000 (Sito/Campagne)</span>
              <span>€ 5.000 (Consulenza Premium)</span>
            </div>
          </div>
        </div>

        {/* Right column: ROI Metrics Visual Block */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="bg-charcoal text-white rounded-2xl p-6 flex flex-col gap-5 shadow-inner">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest text-[#BDBAB2] font-semibold">Risultati Stimati</span>
              <div className="flex items-center gap-1 text-[11px] text-accent-orange font-bold font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange live-beacon"></span>
                LIVE CALCULATOR
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] text-muted-grey uppercase">Click Mensili</p>
                <p className="font-display text-lg font-bold font-mono text-white mt-1">{estimatedClicks}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-grey uppercase">Contatti (Lead)</p>
                <p className="font-display text-lg font-bold font-mono text-accent-blue mt-1">~{estimatedLeads}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] text-muted-grey uppercase">Nuovi Clienti Chiusi</p>
                <p className="font-display text-lg font-bold font-mono text-accent-orange mt-1">~{estimatedCustomers}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-grey uppercase">Valore ROI Stimato</p>
                <p className="font-display text-lg font-bold font-mono text-white mt-1">
                  <span className={roi >= 100 ? "text-green-400" : "text-white"}>{roi}%</span>
                </p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-muted-grey uppercase">Fatturato Netto Stimato</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="font-display text-3xl font-black font-mono text-white">
                  € {estimatedRevenue.toLocaleString("it-IT")}
                </p>
                <span className="text-xs text-white/60">mensili</span>
              </div>
            </div>
          </div>

          {/* Interactive Lesson Card */}
          <div className="grad-sunset text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between h-full min-h-[160px]">
            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Il Potere del Codice &amp; UX
              </div>
              <p className="text-white/90 text-xs leading-relaxed">
                Ottimizzando il sito dal classico <strong>0.5%</strong> al nostro standard medio di <strong>{convRate}%</strong>, 
                attiri il triplo di lead reali allo stesso costo pubblicitario!
              </p>
            </div>
            {extraRevenue > 0 && (
              <div className="mt-4 pt-4 border-t border-white/20 flex gap-2 items-center">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/75">Guadagno extra stimato</p>
                  <p className="font-mono text-sm font-bold text-white">+ € {extraRevenue.toLocaleString("it-IT")} / mese</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-bg-ivory rounded-none border border-line-ivory/60 text-xs">
        <span className="text-muted-grey text-left">
          * Nota: questi calcoli si basano su medie statistiche di mercato locali nel mercato italiano. I risultati effettivi dipendono dalla tua offerta, concorrenza geografica e forza commerciale.
        </span>
        <a 
          href="#pricing"
          className="bg-charcoal text-white hover:bg-[#2A2A2F] transition-all px-4 py-2.5 rounded-none font-bold text-center w-full sm:w-auto shrink-0 uppercase tracking-widest text-[10px]"
        >
          Richiedi Studio Completo
        </a>
      </div>
    </div>
  );
}
