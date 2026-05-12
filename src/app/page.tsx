import { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Trees,
  Tent, 
  Users, 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  Leaf, 
  Store,
  ChevronRight,
  Info,
  Calendar,
  Zap,
  ArrowDownToLine,
  Hammer,
  BadgePercent,
  CheckCircle2,
  Languages
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BUSINESS_CONFIG, INVESTMENT_ITEMS, MONTHLY_COSTS_BREAKDOWN, EXPANSION_PLAN } from "@/lib/constants";
import { translations, type Language } from "@/lib/translations";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ProposalPage() {
  const [occupancy, setOccupancy] = useState(80);
  const [lang, setLang] = useState<Language>("id");

  const t = translations[lang];

  const financials = useMemo(() => {
    const { 
      numberOfYurts, 
      nightlyRate, 
      daysPerMonth, 
      fixedOperatingCosts, 
      villageSharePercent, 
      investorSharePercent,
      marketingPercent,
      restaurantReservePercent,
      investorRepaymentTarget,
      restaurantCost
    } = BUSINESS_CONFIG;

    const occupancyRate = occupancy / 100;
    const grossRoomRevenue = numberOfYurts * nightlyRate * daysPerMonth * occupancyRate;
    const profitBeforeDistributions = grossRoomRevenue - fixedOperatingCosts;
    
    let villageMonthlyShare = 0;
    let investorMonthlyRepayment = 0;
    let marketingMonthlyBudget = 0;
    let restaurantMonthlyReserve = 0;
    let operatorMonthlyProfit = 0;
    let annualVillageShare = 0;
    let investorRepaymentMonths: string | number = "N/A";
    let restaurantFundingMonths: string | number = "N/A";

    if (profitBeforeDistributions > 0) {
      villageMonthlyShare = profitBeforeDistributions * villageSharePercent;
      investorMonthlyRepayment = profitBeforeDistributions * investorSharePercent;
      marketingMonthlyBudget = profitBeforeDistributions * marketingPercent;
      restaurantMonthlyReserve = profitBeforeDistributions * restaurantReservePercent;
      
      operatorMonthlyProfit = profitBeforeDistributions - (
        villageMonthlyShare + 
        investorMonthlyRepayment + 
        marketingMonthlyBudget + 
        restaurantMonthlyReserve
      );
      
      annualVillageShare = villageMonthlyShare * 12;
      investorRepaymentMonths = (investorRepaymentTarget / investorMonthlyRepayment).toFixed(1);
      restaurantFundingMonths = (restaurantCost / restaurantMonthlyReserve).toFixed(1);
    } else {
      operatorMonthlyProfit = profitBeforeDistributions;
    }

    return {
      grossRoomRevenue,
      fixedOperatingCosts,
      profitBeforeDistributions,
      villageMonthlyShare,
      investorMonthlyRepayment,
      marketingMonthlyBudget,
      restaurantMonthlyReserve,
      operatorMonthlyProfit,
      annualVillageShare,
      investorRepaymentMonths,
      restaurantFundingMonths,
      isProfitable: profitBeforeDistributions > 0
    };
  }, [occupancy]);

  return (
    <main className="min-h-screen cinematic-bg text-slate-800">
      {/* Language Toggle */}
      <div className="fixed top-8 right-8 z-[100]">
        <button 
          onClick={() => setLang(lang === "en" ? "id" : "en")}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all shadow-2xl"
        >
          <Languages className="w-4 h-4" />
          {lang === "en" ? "Bahasa Indonesia" : "English"}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/mockup.jpeg"
          alt="Hortensia Field Glamping Mockup"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] p-5 border border-white/20 shadow-2xl">
                <Image src="/images/logo.png" alt="Hortensia Field Logo" width={96} height={96} className="w-full h-full object-contain" />
              </div>
            </div>
            <span className="inline-block px-5 py-2 mb-8 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              {t.hero.proposal}
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] drop-shadow-2xl">
              {t.hero.title1} <br />
              <span className="text-blue-100/90 font-light italic">{t.hero.title2}</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/80 mb-14 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-lg">
              {t.hero.subtitle}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.hero.features.map((item, i) => {
                const icons = [Tent, Users, Leaf];
                const Icon = icons[i];
                return (
                  <div key={i} className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl transition-transform hover:scale-105">
                    <Icon className="w-8 h-8 mb-4 text-blue-200" />
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <span className="text-white/50 text-sm">{item.sub}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t.hero.scroll}</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 text-blue-600 font-bold uppercase tracking-widest text-xs"
          >
            <Trees className="w-4 h-4" /> {t.vision.tag}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-slate-900">{t.vision.title}</h2>
          <p className="text-xl text-slate-600 mb-16 leading-relaxed font-light">
            {t.vision.description}
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {t.vision.points.map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-slate-700 font-medium">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stage 1 Investment Breakdown */}
      <section className="py-32 bg-slate-50 border-y border-slate-200">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{t.investment.tag}</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">{t.investment.title}</h2>
              <p className="text-slate-500">
                {t.investment.description}
              </p>
            </div>
            <div className="bg-white px-8 py-6 rounded-3xl border border-blue-100 shadow-xl text-center md:text-right">
               <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">{t.investment.totalLabel}</p>
               <p className="text-3xl font-black text-blue-600">{formatIDR(BUSINESS_CONFIG.stageOneInvestment)}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INVESTMENT_ITEMS.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">{(t.investment.items as any)[item.name] || item.name}</h3>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-sm text-slate-400">
                    {item.quantity > 1 ? `${item.quantity} ${t.investment.items.units} × ${formatIDR(item.costPerUnit)}` : t.investment.items["Lump sum"]}
                  </p>
                  <span className="font-bold text-slate-900">{formatIDR(item.total)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Operations & Waterfall */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{t.operations.tag}</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-8">{t.operations.title}</h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              {t.operations.description}
            </p>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <Hammer className="w-6 h-6 text-blue-600" /> {t.operations.fixedCostsTitle}
              </h3>
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                {MONTHLY_COSTS_BREAKDOWN.map((item, i) => (
                  <div key={i} className={cn(
                    "flex justify-between p-6",
                    i !== MONTHLY_COSTS_BREAKDOWN.length - 1 && "border-b border-slate-50"
                  )}>
                    <span className="text-slate-600 font-medium">{(t.operations.fixedCostsItems as any)[item.name] || item.name}</span>
                    <span className="text-slate-900 font-bold">{formatIDR(item.cost)}</span>
                  </div>
                ))}
                <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                  <span className="font-bold">{t.operations.totalFixedCosts}</span>
                  <span className="text-xl font-black">{formatIDR(BUSINESS_CONFIG.fixedOperatingCosts)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 p-10 rounded-[3rem] border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <BadgePercent className="w-7 h-7 text-blue-600" /> {t.operations.waterfallTitle}
            </h3>
            <div className="space-y-10">
              <WaterfallItem label={t.operations.waterfallItems.village.label} percent={BUSINESS_CONFIG.villageSharePercent * 100} color="bg-emerald-500" desc={t.operations.waterfallItems.village.desc} />
              <WaterfallItem label={t.operations.waterfallItems.investor.label} percent={BUSINESS_CONFIG.investorSharePercent * 100} color="bg-blue-600" desc={t.operations.waterfallItems.investor.desc} />
              <WaterfallItem label={t.operations.waterfallItems.marketing.label} percent={BUSINESS_CONFIG.marketingPercent * 100} color="bg-indigo-500" desc={t.operations.waterfallItems.marketing.desc} />
              <WaterfallItem label={t.operations.waterfallItems.resto.label} percent={BUSINESS_CONFIG.restaurantReservePercent * 100} color="bg-amber-500" desc={t.operations.waterfallItems.resto.desc} />
              <WaterfallItem label={t.operations.waterfallItems.operator.label} percent={Math.round((1 - (BUSINESS_CONFIG.villageSharePercent + BUSINESS_CONFIG.investorSharePercent + BUSINESS_CONFIG.marketingPercent + BUSINESS_CONFIG.restaurantReservePercent)) * 100)} color="bg-slate-700" desc={t.operations.waterfallItems.operator.desc} />
            </div>
            
            <div className="mt-12 p-6 bg-white rounded-2xl border border-blue-100 flex items-start gap-4">
              <Info className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
              <p className="text-sm text-slate-500 italic leading-relaxed">
                {t.operations.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="px-6 max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">{t.calculator.tag}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-2">{t.calculator.title}</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {t.calculator.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-3xl">
              <div className="mb-12">
                <div className="flex justify-between items-end mb-8">
                  <label className="text-lg font-medium text-white/90">{t.calculator.occupancyLabel}</label>
                  <div className="text-right">
                    <span className="text-5xl font-black text-blue-400">{occupancy}%</span>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{t.calculator.marketTarget}</p>
                  </div>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={occupancy}
                  onChange={(e) => setOccupancy(parseInt(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400 hover:accent-blue-300 transition-all"
                />
                <div className="flex justify-between mt-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  <span>{t.calculator.conservative}</span>
                  <span>{t.calculator.optimal}</span>
                  <span>{t.calculator.maximum}</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-start gap-5">
                  <TrendingUp className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-white/90 mb-1">{t.calculator.scalingTitle}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {t.calculator.scalingDesc}
                    </p>
                  </div>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-start gap-5">
                  <ArrowDownToLine className="w-6 h-6 text-emerald-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-white/90 mb-1">{t.calculator.bufferTitle}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {t.calculator.bufferDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!financials.isProfitable ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full bg-amber-500/10 border border-amber-500/20 p-16 rounded-[3rem] text-center flex flex-col items-center justify-center"
                  >
                    <Info className="w-16 h-16 text-amber-500 mb-6 opacity-50" />
                    <h3 className="text-3xl font-bold text-amber-200 mb-4">{t.calculator.baselineNotMet}</h3>
                    <p className="text-white/50 text-lg leading-relaxed max-w-sm">
                      {t.calculator.baselineDesc(formatIDR(BUSINESS_CONFIG.fixedOperatingCosts))}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    <ResultCard
                      label={t.calculator.results.grossRevenue}
                      value={formatIDR(financials.grossRoomRevenue)}
                      subLabel={t.calculator.results.monthlyTotal}
                      color="blue"
                    />
                    <ResultCard
                      label={t.calculator.results.villageShare}
                      value={formatIDR(financials.villageMonthlyShare)}
                      subLabel={t.calculator.results.communityBenefit}
                      color="emerald"
                      highlight
                    />
                    <ResultCard
                      label={t.calculator.results.investorShare}
                      value={formatIDR(financials.investorMonthlyRepayment)}
                      subLabel={t.calculator.results.investorTarget}
                      color="indigo"
                    />
                    <ResultCard
                      label={t.calculator.results.restoReserve}
                      value={formatIDR(financials.restaurantMonthlyReserve)}
                      subLabel={t.calculator.results.expansionFund}
                      color="amber"
                    />
                    <ResultCard
                      label={t.calculator.results.operatorProfit}
                      value={formatIDR(financials.operatorMonthlyProfit)}
                      subLabel={t.calculator.results.retainedEarnings}
                      color="slate"
                    />
                    <ResultCard
                      label={t.calculator.results.annualVillage}
                      value={formatIDR(financials.annualVillageShare)}
                      subLabel={t.calculator.results.projection}
                      color="emerald"
                    />
                    
                    {/* Timeline Results */}
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-6 mt-4">
                       <div className="bg-white/10 p-10 rounded-[2.5rem] border border-white/10 shadow-xl">
                          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-400 mb-4">{t.calculator.timeline.investorTitle}</p>
                          <p className="text-5xl font-black text-white mb-2">{financials.investorRepaymentMonths}</p>
                          <p className="text-sm text-white/40">{t.calculator.timeline.investorSub}</p>
                       </div>
                       <div className="bg-white/10 p-10 rounded-[2.5rem] border border-white/10 shadow-xl">
                          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-amber-400 mb-4">{t.calculator.timeline.restoTitle}</p>
                          <p className="text-5xl font-black text-white mb-2">{financials.restaurantFundingMonths}</p>
                          <p className="text-sm text-white/40">{t.calculator.timeline.restoSub}</p>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Structure Section */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-3xl">
             <Image src="/images/mockup.jpeg" alt="Investor vision" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-blue-900/40" />
             <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/20">
                   <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">{t.investor.targetLabel}</p>
                   <p className="text-4xl font-black text-white">{formatIDR(BUSINESS_CONFIG.investorRepaymentTarget)}</p>
                </div>
             </div>
          </div>
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{t.investor.tag}</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-8">{t.investor.title}</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
              {t.investor.description}
            </p>
            <div className="space-y-6">
               {t.investor.points.map((item, i) => (
                 <div key={i} className="flex gap-5 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 shrink-0">
                       <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                       <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2 Expansion Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <Image src="/images/resto2.png" alt="Expansion vision" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="px-6 max-w-6xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">{t.expansion.tag}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8">{t.expansion.title}</h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed font-light">
              {t.expansion.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-10">
              {t.expansion.cards.map((card, i) => {
                const Icons = [Store, Calendar];
                const Icon = Icons[i];
                return (
                  <div key={i} className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                    <Icon className="w-10 h-10 text-amber-400 mb-6" />
                    <h4 className="text-xl font-bold mb-3">{card.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Scenario Cards */}
      <section className="py-32 bg-white">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.scenarios.title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic font-light leading-relaxed">
              {t.scenarios.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScenarioCard 
              occupancy={40}
              revenue={42240000}
              villageShare={3798400}
              investorShare={5935000}
              reserve={2374000}
              profit={10445600}
              timeline={38.4}
              label={t.scenarios.labels.conservative}
              t={t}
            />
            <ScenarioCard 
              occupancy={60}
              revenue={63360000}
              villageShare={7177600}
              investorShare={11215000}
              reserve={4486000}
              profit={19738400}
              timeline={20.3}
              label={t.scenarios.labels.moderate}
              t={t}
            />
            <ScenarioCard 
              occupancy={80}
              revenue={84480000}
              villageShare={10556800}
              investorShare={16495000}
              reserve={6598000}
              profit={29031200}
              timeline={13.8}
              label={t.scenarios.labels.marketTarget}
              featured
              t={t}
            />
            <ScenarioCard 
              occupancy={100}
              revenue={105600000}
              villageShare={13936000}
              investorShare={21775000}
              reserve={8710000}
              profit={38324000}
              timeline={10.5}
              label={t.scenarios.labels.maximum}
              t={t}
            />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-40 px-6 text-center max-w-4xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] -z-10" />
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl border border-blue-50">
          <ShieldCheck className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">{t.closing?.title || t.hero.title1}</h2>
        <p className="text-2xl text-slate-500 leading-relaxed font-light italic mb-16">
          "{t.hero.subtitle}"
        </p>
        <div className="w-32 h-0.5 bg-blue-600/20 mx-auto" />
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-slate-100 text-center bg-white">
        <div className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-5 text-left">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl p-3 border border-blue-100">
                <Image src="/images/logo.png" alt="Logo" width={56} height={56} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Hortensia Field Glamping</p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">{t.footer.location}</p>
              </div>
           </div>
           <p className="text-slate-400 text-sm italic">{t.footer.tagline}</p>
           <p className="text-slate-300 text-[10px] uppercase tracking-widest">&copy; {t.footer.copy}</p>
        </div>
      </footer>
    </main>
  );
}

function WaterfallItem({ label, percent, color, desc }: any) {
  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <div>
          <h4 className="font-bold text-slate-900">{label}</h4>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
        <span className="text-lg font-black text-slate-900">{percent}%</span>
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          className={cn("h-full", color)}
        />
      </div>
    </div>
  );
}

function ResultCard({ label, value, subLabel, color, highlight = false }: any) {
  const colors: any = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    indigo: "text-indigo-400",
    purple: "text-purple-400",
    slate: "text-slate-400",
    amber: "text-amber-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-8 rounded-[2.5rem] border transition-all duration-500",
        highlight 
          ? "bg-white text-slate-900 border-white shadow-3xl scale-105 z-10" 
          : "bg-white/5 text-white border-white/10"
      )}
    >
      <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50", !highlight && colors[color])}>
        {label}
      </p>
      <p className={cn("text-3xl font-black mb-1", highlight ? "text-slate-900" : "text-white")}>
        {value}
      </p>
      <p className={cn("text-xs opacity-40 font-medium", highlight ? "text-slate-500" : "text-white/40")}>
        {subLabel}
      </p>
    </motion.div>
  );
}

function ScenarioCard({ occupancy, revenue, villageShare, investorShare, reserve, profit, timeline, label, featured = false, t }: any) {
  return (
    <div className={cn(
      "p-10 rounded-[3rem] border transition-all duration-500 flex flex-col h-full",
      featured 
        ? "bg-blue-600 border-blue-400 shadow-3xl lg:-mt-8 lg:-mb-8 relative z-10 text-white" 
        : "bg-white border-slate-100 shadow-sm text-slate-900"
    )}>
      <div className="mb-10">
        <span className={cn(
          "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]",
          featured ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
        )}>
          {label}
        </span>
        <h3 className="text-5xl font-black mt-6 tracking-tighter">{occupancy}%</h3>
        <p className={cn("text-xs uppercase tracking-widest font-bold mt-1", featured ? "text-white/60" : "text-slate-400")}>{t.scenarios.labels.occupancy}</p>
      </div>

      <div className="space-y-5 mb-10 flex-grow">
        <ScenarioItem label={t.scenarios.labels.grossRevenue} value={formatIDR(revenue)} light={featured} />
        <ScenarioItem label={t.scenarios.labels.villageShare} value={formatIDR(villageShare)} light={featured} highlight />
        <ScenarioItem label={t.scenarios.labels.investorRepay} value={formatIDR(investorShare)} light={featured} />
        <ScenarioItem label={t.scenarios.labels.restoReserve} value={formatIDR(reserve)} light={featured} />
      </div>

      <div className={cn(
        "pt-8 border-t",
        featured ? "border-white/20" : "border-slate-100"
      )}>
        <p className={cn("text-[10px] uppercase tracking-widest font-black mb-3", featured ? "text-white/50" : "text-slate-300")}>{t.scenarios.labels.repaymentSpeed}</p>
        <p className="text-4xl font-black">{timeline} <span className="text-sm font-light opacity-60 tracking-normal">{t.scenarios.labels.months}</span></p>
      </div>
    </div>
  );
}

function ScenarioItem({ label, value, light, highlight }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className={cn("font-medium", light ? "text-white/60" : "text-slate-400")}>{label}</span>
      <span className={cn(
        "font-black tracking-tight",
        highlight ? (light ? "text-white" : "text-emerald-600") : ""
      )}>{value}</span>
    </div>
  );
}
