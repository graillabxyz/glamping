"use client";

import { useState, useMemo, useEffect } from "react";
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

const formatCompact = (amount: number, lang: Language) => {
  if (amount >= 1000000) {
    const value = amount / 1000000;
    // For values >= 1M, show decimals if needed
    const formattedValue = new Intl.NumberFormat(lang === "id" ? "id-ID" : "en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
    return `${lang === "id" ? "Rp " : "Rp "}${formattedValue}${lang === "id" ? " jt" : " M"}`;
  }
  return formatIDR(amount);
};

export default function ProposalPage() {
  const [occupancy, setOccupancy] = useState(80);
  const [lang, setLang] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <main className="min-h-screen cinematic-bg text-slate-800">
      {/* Language Toggle */}
      <div className="fixed top-8 right-8 z-[100] flex gap-2">
        <button 
          onClick={() => setLang("en")}
          className={cn(
            "px-4 py-2 backdrop-blur-xl border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-2xl",
            lang === "en" 
              ? "bg-white text-blue-600 border-white" 
              : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
          )}
        >
          English
        </button>
        <button 
          onClick={() => setLang("id")}
          className={cn(
            "px-4 py-2 backdrop-blur-xl border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-2xl",
            lang === "id" 
              ? "bg-white text-blue-600 border-white" 
              : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
          )}
        >
          Bahasa
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
            <div className="flex justify-center mb-10">
              <div className="relative group">
                {/* Premium Logo Frame */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative w-28 h-28 bg-white/5 backdrop-blur-3xl rounded-[2.2rem] p-6 border border-white/20 shadow-[0_0_50px_-12px_rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden">
                   {/* Subtle animated inner glow */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30" />
                   <Image 
                    src="/images/logo.png" 
                    alt="Hortensia Field Logo" 
                    width={100} 
                    height={100} 
                    className="w-full h-full object-contain relative z-10 filter drop-shadow-2xl" 
                   />
                </div>
              </div>
            </div>
            <span className="inline-block px-5 py-2 mb-8 text-[10px] font-black tracking-[0.3em] uppercase bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/30 text-blue-100">
              {t.hero.proposal}
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              {t.hero.title1} <br />
              <span className="text-blue-200/90 font-light italic tracking-tight">{t.hero.title2}</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/70 mb-16 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-lg">
              {t.hero.subtitle}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.hero.features.map((item, i) => {
                const icons = [Tent, Users, Leaf];
                const Icon = icons[i];
                return (
                  <div key={i} className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl transition-all hover:bg-white/10 hover:scale-105 group">
                    <Icon className="w-8 h-8 mb-4 text-blue-300 group-hover:text-blue-200 transition-colors" />
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <span className="text-white/40 text-sm group-hover:text-white/60">{item.sub}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[9px] uppercase tracking-[0.5em] font-black">{t.hero.scroll}</span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
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
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-slate-900 leading-tight">{t.vision.title}</h2>
          <p className="text-xl text-slate-500 mb-16 leading-relaxed font-light">
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
                className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
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
              <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4 leading-tight">{t.investment.title}</h2>
              <p className="text-slate-500 text-lg font-light">
                {t.investment.description}
              </p>
            </div>
            <div className="bg-white px-10 py-8 rounded-[2.5rem] border border-blue-100 shadow-2xl text-center md:text-right">
               <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-2">{t.investment.totalLabel}</p>
               <p className="text-4xl font-black text-blue-600">{formatCompact(BUSINESS_CONFIG.stageOneInvestment, lang)}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INVESTMENT_ITEMS.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">{(t.investment.items as any)[item.name] || item.name}</h3>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-xs text-slate-400 font-medium">
                    {item.quantity > 1 ? `${item.quantity} ${t.investment.items.units} × ${formatCompact(item.costPerUnit, lang)}` : t.investment.items["Lump sum"]}
                  </p>
                  <span className="font-black text-slate-900">{formatCompact(item.total, lang)}</span>
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
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-8 leading-tight">{t.operations.title}</h2>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-light">
              {t.operations.description}
            </p>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <Hammer className="w-6 h-6 text-blue-600" /> {t.operations.fixedCostsTitle}
              </h3>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                {MONTHLY_COSTS_BREAKDOWN.map((item, i) => (
                  <div key={i} className={cn(
                    "flex justify-between p-7",
                    i !== MONTHLY_COSTS_BREAKDOWN.length - 1 && "border-b border-slate-50"
                  )}>
                    <span className="text-slate-600 font-medium">{(t.operations.fixedCostsItems as any)[item.name] || item.name}</span>
                    <span className="text-slate-900 font-bold">{formatCompact(item.cost, lang)}</span>
                  </div>
                ))}
                <div className="bg-slate-900 text-white p-8 flex justify-between items-center">
                  <span className="font-bold opacity-70">{t.operations.totalFixedCosts}</span>
                  <span className="text-2xl font-black">{formatCompact(BUSINESS_CONFIG.fixedOperatingCosts, lang)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/30 p-12 rounded-[3.5rem] border border-blue-100/50 backdrop-blur-sm">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <BadgePercent className="w-8 h-8 text-blue-600" /> {t.operations.waterfallTitle}
            </h3>
            <div className="space-y-12">
              <WaterfallItem label={t.operations.waterfallItems.village.label} percent={BUSINESS_CONFIG.villageSharePercent * 100} color="bg-emerald-500" desc={t.operations.waterfallItems.village.desc} />
              <WaterfallItem label={t.operations.waterfallItems.investor.label} percent={BUSINESS_CONFIG.investorSharePercent * 100} color="bg-blue-600" desc={t.operations.waterfallItems.investor.desc} />
              <WaterfallItem label={t.operations.waterfallItems.marketing.label} percent={BUSINESS_CONFIG.marketingPercent * 100} color="bg-indigo-500" desc={t.operations.waterfallItems.marketing.desc} />
              <WaterfallItem label={t.operations.waterfallItems.resto.label} percent={BUSINESS_CONFIG.restaurantReservePercent * 100} color="bg-amber-500" desc={t.operations.waterfallItems.resto.desc} />
              <WaterfallItem label={t.operations.waterfallItems.operator.label} percent={Math.round((1 - (BUSINESS_CONFIG.villageSharePercent + BUSINESS_CONFIG.investorSharePercent + BUSINESS_CONFIG.marketingPercent + BUSINESS_CONFIG.restaurantReservePercent)) * 100)} color="bg-slate-700" desc={t.operations.waterfallItems.operator.desc} />
            </div>
            
            <div className="mt-14 p-7 bg-white rounded-3xl border border-blue-100 flex items-start gap-4 shadow-sm">
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />

        <div className="px-6 max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">{t.calculator.tag}</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 mt-4 leading-tight">{t.calculator.title}</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
              {t.calculator.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/10 shadow-3xl">
              <div className="mb-14">
                <div className="flex justify-between items-end mb-10">
                  <label className="text-xl font-medium text-white/80">{t.calculator.occupancyLabel}</label>
                  <div className="text-right">
                    <span className="text-6xl font-black text-blue-400 tabular-nums leading-none">{occupancy}%</span>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-2">{t.calculator.marketTarget}</p>
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
                <div className="flex justify-between mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                  <span>{t.calculator.conservative}</span>
                  <span>{t.calculator.optimal}</span>
                  <span>{t.calculator.maximum}</span>
                </div>
              </div>

              <div className="space-y-10">
                <div className="p-7 rounded-[2rem] bg-white/5 border border-white/5 flex items-start gap-6 group hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90 mb-1">{t.calculator.scalingTitle}</h4>
                    <p className="text-sm text-white/40 leading-relaxed font-light">
                      {t.calculator.scalingDesc}
                    </p>
                  </div>
                </div>
                <div className="p-7 rounded-[2rem] bg-white/5 border border-white/5 flex items-start gap-6 group hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <ArrowDownToLine className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90 mb-1">{t.calculator.bufferTitle}</h4>
                    <p className="text-sm text-white/40 leading-relaxed font-light">
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
                    key="not-profitable"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full min-h-[500px] bg-amber-500/5 border border-amber-500/20 p-20 rounded-[3.5rem] text-center flex flex-col items-center justify-center backdrop-blur-sm"
                  >
                    <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-8">
                       <Info className="w-10 h-10 text-amber-500 opacity-60" />
                    </div>
                    <h3 className="text-4xl font-black text-amber-200 mb-6">{t.calculator.baselineNotMet}</h3>
                    <p className="text-white/40 text-xl leading-relaxed max-w-sm font-light">
                      {t.calculator.baselineDesc(formatIDR(BUSINESS_CONFIG.fixedOperatingCosts))}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="profitable"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid md:grid-cols-2 gap-8"
                  >
                    <ResultCard
                      label={t.calculator.results.grossRevenue}
                      value={formatCompact(financials.grossRoomRevenue, lang)}
                      subLabel={t.calculator.results.monthlyTotal}
                      color="blue"
                    />
                    <ResultCard
                      label={t.calculator.results.villageShare}
                      value={formatCompact(financials.villageMonthlyShare, lang)}
                      subLabel={t.calculator.results.communityBenefit}
                      color="emerald"
                      highlight
                    />
                    <ResultCard
                      label={t.calculator.results.investorShare}
                      value={formatCompact(financials.investorMonthlyRepayment, lang)}
                      subLabel={t.calculator.results.investorTarget}
                      color="indigo"
                    />
                    <ResultCard
                      label={t.calculator.results.restoReserve}
                      value={formatCompact(financials.restaurantMonthlyReserve, lang)}
                      subLabel={t.calculator.results.expansionFund}
                      color="amber"
                    />
                    <ResultCard
                      label={t.calculator.results.operatorProfit}
                      value={formatCompact(financials.operatorMonthlyProfit, lang)}
                      subLabel={t.calculator.results.retainedEarnings}
                      color="slate"
                    />
                    <ResultCard
                      label={t.calculator.results.annualVillage}
                      value={formatCompact(financials.annualVillageShare, lang)}
                      subLabel={t.calculator.results.projection}
                      color="emerald"
                    />
                    
                    {/* Timeline Results */}
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-8 mt-4">
                       <div className="bg-white/10 p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
                          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-400 mb-6">{t.calculator.timeline.investorTitle}</p>
                          <p className="text-6xl font-black text-white mb-3 tabular-nums">{financials.investorRepaymentMonths}</p>
                          <p className="text-sm text-white/30 font-medium uppercase tracking-widest">{t.calculator.timeline.investorSub}</p>
                       </div>
                       <div className="bg-white/10 p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/20 transition-colors" />
                          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-400 mb-6">{t.calculator.timeline.restoTitle}</p>
                          <p className="text-6xl font-black text-white mb-3 tabular-nums">{financials.restaurantFundingMonths}</p>
                          <p className="text-sm text-white/30 font-medium uppercase tracking-widest">{t.calculator.timeline.restoSub}</p>
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
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-3xl group">
             <Image src="/images/mockup.jpeg" alt="Investor vision" fill className="object-cover opacity-60 scale-105 group-hover:scale-110 transition-transform duration-[3s]" />
             <div className="absolute inset-0 bg-blue-900/60" />
             <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/20 shadow-3xl w-full max-w-[90%]"
                >
                   <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-4">{t.investor.targetLabel}</p>
                   <p className="text-3xl md:text-5xl font-black text-white tabular-nums drop-shadow-2xl break-words">{formatCompact(BUSINESS_CONFIG.investorRepaymentTarget, lang)}</p>
                </motion.div>
             </div>
          </div>
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{t.investor.tag}</span>
            <h2 className="text-5xl font-black text-slate-900 mt-4 mb-10 leading-tight">{t.investor.title}</h2>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-light">
              {t.investor.description}
            </p>
            <div className="space-y-10">
               {t.investor.points.map((item, i) => (
                 <div key={i} className="flex gap-6 items-start">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mt-1 shrink-0">
                       <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h4>
                       <p className="text-slate-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2 Expansion Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <Image src="/images/resto2.png" alt="Expansion vision" fill className="object-cover opacity-20 scale-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
        
        <div className="px-6 max-w-6xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">{t.expansion.tag}</span>
            <h2 className="text-5xl md:text-6xl font-black mt-4 mb-10 leading-tight">{t.expansion.title}</h2>
            <p className="text-xl text-white/50 mb-16 leading-relaxed font-light max-w-xl">
              {t.expansion.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-12">
              {t.expansion.cards.map((card, i) => {
                const Icons = [Store, Calendar];
                const Icon = Icons[i];
                return (
                  <div key={i} className="p-10 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl mb-8 flex items-center justify-center transition-transform group-hover:scale-110",
                      i === 0 ? "bg-amber-500/20" : "bg-blue-500/20"
                    )}>
                      <Icon className={cn("w-8 h-8", i === 0 ? "text-amber-400" : "text-blue-400")} />
                    </div>
                    <h4 className="text-2xl font-bold mb-4">{card.title}</h4>
                    <p className="text-white/40 leading-relaxed font-light">
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
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-6 leading-tight">{t.scenarios.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto italic font-light text-lg leading-relaxed">
              {t.scenarios.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              lang={lang}
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
              lang={lang}
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
              lang={lang}
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
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-48 px-6 text-center max-w-4xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-50/50 rounded-full blur-[140px] -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-12 shadow-2xl border border-blue-50/50 rotate-12 hover:rotate-0 transition-transform duration-500"
        >
          <ShieldCheck className="w-12 h-12 text-blue-600" />
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-12 leading-tight">{t.closing?.title || t.hero.title1}</h2>
        <p className="text-2xl md:text-3xl text-slate-400 leading-relaxed font-light italic mb-20 max-w-3xl mx-auto">
          "{t.hero.subtitle}"
        </p>
        <div className="w-40 h-1 bg-gradient-to-r from-transparent via-blue-600/20 to-transparent mx-auto" />
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 text-center bg-white relative z-10">
        <div className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="flex items-center gap-6 text-left">
              <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] p-4 border border-blue-100 shadow-inner">
                <Image src="/images/logo.png" alt="Logo" width={64} height={64} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-xl tracking-tight">Hortensia Field Glamping</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-[0.3em] font-black">{t.footer.location}</p>
              </div>
           </div>
           <p className="text-slate-400 text-base font-light italic max-w-xs">{t.footer.tagline}</p>
           <div className="text-right">
             <p className="text-slate-300 text-[10px] uppercase tracking-[0.4em] font-black">&copy; {t.footer.copy}</p>
             <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest mt-2">Sustainable Partnership</p>
           </div>
        </div>
      </footer>
    </main>
  );
}

function WaterfallItem({ label, percent, color, desc }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{label}</h4>
          <p className="text-sm text-slate-400 font-light">{desc}</p>
        </div>
        <span className="text-2xl font-black text-slate-900 tabular-nums">{percent}%</span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
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
      whileHover={{ y: -5 }}
      className={cn(
        "p-8 md:p-10 rounded-[3rem] border transition-all duration-500 min-h-[180px] flex flex-col justify-center",
        highlight 
          ? "bg-white text-slate-900 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] scale-105 z-10" 
          : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20"
      )}
    >
      <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-60", !highlight && colors[color])}>
        {label}
      </p>
      <p className={cn("text-2xl md:text-3xl font-black mb-2 tabular-nums break-words leading-tight", highlight ? "text-slate-900" : "text-white")}>
        {value}
      </p>
      <p className={cn("text-[10px] opacity-30 font-bold uppercase tracking-widest", highlight ? "text-slate-400" : "text-white/30")}>
        {subLabel}
      </p>
    </motion.div>
  );
}

function ScenarioCard({ occupancy, revenue, villageShare, investorShare, reserve, profit, timeline, label, featured = false, t, lang }: any) {
  return (
    <div className={cn(
      "p-8 md:p-12 rounded-[3.5rem] border transition-all duration-700 flex flex-col h-full group hover:shadow-2xl",
      featured 
        ? "bg-blue-600 border-blue-400 shadow-3xl lg:-mt-8 lg:-mb-8 relative z-10 text-white" 
        : "bg-white border-slate-100 shadow-sm text-slate-900 hover:border-blue-100 hover:scale-105"
    )}>
      <div className="mb-10">
        <span className={cn(
          "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em]",
          featured ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
        )}>
          {label}
        </span>
        <h3 className="text-5xl md:text-6xl font-black mt-10 tracking-tighter tabular-nums">{occupancy}%</h3>
        <p className={cn("text-[10px] uppercase tracking-[0.3em] font-black mt-2", featured ? "text-white/40" : "text-slate-300")}>{t.scenarios.labels.occupancy}</p>
      </div>

      <div className="space-y-4 mb-10 flex-grow">
        <ScenarioItem label={t.scenarios.labels.grossRevenue} value={formatCompact(revenue, lang)} light={featured} />
        <ScenarioItem label={t.scenarios.labels.villageShare} value={formatCompact(villageShare, lang)} light={featured} highlight />
        <ScenarioItem label={t.scenarios.labels.investorRepay} value={formatCompact(investorShare, lang)} light={featured} />
        <ScenarioItem label={t.scenarios.labels.restoReserve} value={formatCompact(reserve, lang)} light={featured} />
      </div>

      <div className={cn(
        "pt-8 border-t",
        featured ? "border-white/10" : "border-slate-50"
      )}>
        <p className={cn("text-[10px] uppercase tracking-[0.3em] font-black mb-4", featured ? "text-white/30" : "text-slate-200")}>{t.scenarios.labels.repaymentSpeed}</p>
        <p className="text-4xl md:text-5xl font-black tabular-nums">{timeline} <span className="text-sm font-light opacity-50 tracking-normal ml-1">{t.scenarios.labels.months}</span></p>
      </div>
    </div>
  );
}

function ScenarioItem({ label, value, light, highlight }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className={cn("font-medium", light ? "text-white/40" : "text-slate-400")}>{label}</span>
      <span className={cn(
        "font-black tracking-tight tabular-nums",
        highlight ? (light ? "text-white" : "text-emerald-600") : (light ? "text-white/90" : "text-slate-900")
      )}>{value}</span>
    </div>
  );
}
