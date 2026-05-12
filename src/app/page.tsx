"use client";

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
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BUSINESS_CONFIG, INVESTMENT_ITEMS, MONTHLY_COSTS_BREAKDOWN, EXPANSION_PLAN } from "@/lib/constants";
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
              Sustainable Partnership Proposal
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] drop-shadow-2xl">
              Hortensia Field <br />
              <span className="text-blue-100/90 font-light italic">Glamping Village</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/80 mb-14 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-lg">
              A low-impact mountain retreat designed to create sustainable tourism, local employment, investor repayment, and long-term village income.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Tent, title: "4 Boutique Yurts", sub: "Low-impact design" },
                { icon: Users, title: "Village Partnership", sub: "Shared monthly success" },
                { icon: Leaf, title: "Eco-Conscious", sub: "Preserving landscape" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl transition-transform hover:scale-105">
                  <item.icon className="w-8 h-8 mb-4 text-blue-200" />
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <span className="text-white/50 text-sm">{item.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
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
            <Trees className="w-4 h-4" /> The Vision
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-slate-900">A Respectful Partnership</h2>
          <p className="text-xl text-slate-600 mb-16 leading-relaxed font-light">
            Our vision is to transform the existing hydrangea field into a premium yet sustainable glamping destination. By building on wooden platforms, we ensure the natural beauty of the field remains protected and untouched, creating a bridge between modern comfort and village heritage.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              "Preserving the hydrangea field",
              "Low-impact construction",
              "Community land partnership",
              "Sustainable local tourism",
              "Shared benefit structure",
              "Long-term village income",
              "Natural mountain atmosphere",
              "100% Local staff employment"
            ].map((text, i) => (
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
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Phased Development</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Stage 1 Investment Breakdown</h2>
              <p className="text-slate-500">
                A clear, itemized breakdown of the initial capital required to launch the glamping operation.
              </p>
            </div>
            <div className="bg-white px-8 py-6 rounded-3xl border border-blue-100 shadow-xl text-center md:text-right">
               <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Total Initial Investment</p>
               <p className="text-3xl font-black text-blue-600">{formatIDR(BUSINESS_CONFIG.stageOneInvestment)}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INVESTMENT_ITEMS.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">{item.name}</h3>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-sm text-slate-400">
                    {item.quantity > 1 ? `${item.quantity} units × ${formatIDR(item.costPerUnit)}` : "Lump sum"}
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
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Sustainable Growth</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-8">Monthly Operations & Distribution</h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Our business model ensures that all partners benefit directly from the retreat's performance. After fixed operating costs are met, the remaining profit follows a transparent "waterfall" distribution.
            </p>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                <Hammer className="w-6 h-6 text-blue-600" /> Fixed Operating Costs
              </h3>
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                {MONTHLY_COSTS_BREAKDOWN.map((item, i) => (
                  <div key={i} className={cn(
                    "flex justify-between p-6",
                    i !== MONTHLY_COSTS_BREAKDOWN.length - 1 && "border-b border-slate-50"
                  )}>
                    <span className="text-slate-600 font-medium">{item.name}</span>
                    <span className="text-slate-900 font-bold">{formatIDR(item.cost)}</span>
                  </div>
                ))}
                <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                  <span className="font-bold">Total Monthly Fixed Costs</span>
                  <span className="text-xl font-black">{formatIDR(BUSINESS_CONFIG.fixedOperatingCosts)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 p-10 rounded-[3rem] border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <BadgePercent className="w-7 h-7 text-blue-600" /> Profit Waterfall Model
            </h3>
            <div className="space-y-10">
              <WaterfallItem label="Village Share" percent={BUSINESS_CONFIG.villageSharePercent * 100} color="bg-emerald-500" desc="Direct community monthly benefit" />
              <WaterfallItem label="Investor Repayment" percent={BUSINESS_CONFIG.investorSharePercent * 100} color="bg-blue-600" desc="Temporary share until 115% ROI reached" />
              <WaterfallItem label="Marketing Budget" percent={BUSINESS_CONFIG.marketingPercent * 100} color="bg-indigo-500" desc="Generating new guest bookings" />
              <WaterfallItem label="Stage 2 Reserve" percent={BUSINESS_CONFIG.restaurantReservePercent * 100} color="bg-amber-500" desc="Funding the future restaurant expansion" />
              <WaterfallItem label="Operator Profit" percent={Math.round((1 - (BUSINESS_CONFIG.villageSharePercent + BUSINESS_CONFIG.investorSharePercent + BUSINESS_CONFIG.marketingPercent + BUSINESS_CONFIG.restaurantReservePercent)) * 100)} color="bg-slate-700" desc="Remaining share for management" />
            </div>
            
            <div className="mt-12 p-6 bg-white rounded-2xl border border-blue-100 flex items-start gap-4">
              <Info className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
              <p className="text-sm text-slate-500 italic leading-relaxed">
                Allocations are calculated as a percentage of "Profit Before Distributions" (Revenue minus Operating Costs).
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
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">Transparency Tool</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 mt-2">Interactive Performance Calculator</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Adjust the occupancy rate to visualize the dynamic impact on partner distributions and repayment timelines.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-3xl">
              <div className="mb-12">
                <div className="flex justify-between items-end mb-8">
                  <label className="text-lg font-medium text-white/90">Occupancy Rate</label>
                  <div className="text-right">
                    <span className="text-5xl font-black text-blue-400">{occupancy}%</span>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">Market Target (80%)</p>
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
                  <span>Conservative</span>
                  <span>Optimal</span>
                  <span>Maximum</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-start gap-5">
                  <TrendingUp className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-white/90 mb-1">Scaling Success</h4>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Distributions grow linearly as occupancy increases, ensuring everyone wins together.
                    </p>
                  </div>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-start gap-5">
                  <ArrowDownToLine className="w-6 h-6 text-emerald-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-white/90 mb-1">Fixed Cost Buffer</h4>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Costs remain fixed at {formatIDR(BUSINESS_CONFIG.fixedOperatingCosts)}, creating high leverage as revenue climbs.
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
                    <h3 className="text-3xl font-bold text-amber-200 mb-4">Baseline Not Met</h3>
                    <p className="text-white/50 text-lg leading-relaxed max-w-sm">
                      Occupancy must be high enough to cover the monthly fixed costs of {formatIDR(BUSINESS_CONFIG.fixedOperatingCosts)}.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    <ResultCard
                      label="Gross Room Revenue"
                      value={formatIDR(financials.grossRoomRevenue)}
                      subLabel="Monthly Total"
                      color="blue"
                    />
                    <ResultCard
                      label="Village Monthly Share"
                      value={formatIDR(financials.villageMonthlyShare)}
                      subLabel="Community Benefit"
                      color="emerald"
                      highlight
                    />
                    <ResultCard
                      label="Investor Share"
                      value={formatIDR(financials.investorMonthlyRepayment)}
                      subLabel="Target: 227.7M"
                      color="indigo"
                    />
                    <ResultCard
                      label="Restaurant Reserve"
                      value={formatIDR(financials.restaurantMonthlyReserve)}
                      subLabel="Expansion Fund"
                      color="amber"
                    />
                    <ResultCard
                      label="Operator Profit"
                      value={formatIDR(financials.operatorMonthlyProfit)}
                      subLabel="Retained Earnings"
                      color="slate"
                    />
                    <ResultCard
                      label="Annual Village Share"
                      value={formatIDR(financials.annualVillageShare)}
                      subLabel="12-Month Projection"
                      color="emerald"
                    />
                    
                    {/* Timeline Results */}
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-6 mt-4">
                       <div className="bg-white/10 p-10 rounded-[2.5rem] border border-white/10 shadow-xl">
                          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-400 mb-4">Investor Repayment</p>
                          <p className="text-5xl font-black text-white mb-2">{financials.investorRepaymentMonths}</p>
                          <p className="text-sm text-white/40">Months to 115% ROI</p>
                       </div>
                       <div className="bg-white/10 p-10 rounded-[2.5rem] border border-white/10 shadow-xl">
                          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-amber-400 mb-4">Stage 2 Funding</p>
                          <p className="text-5xl font-black text-white mb-2">{financials.restaurantFundingMonths}</p>
                          <p className="text-sm text-white/40">Months to Restaurant Fund</p>
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
                   <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Investor Repayment Target</p>
                   <p className="text-4xl font-black text-white">{formatIDR(BUSINESS_CONFIG.investorRepaymentTarget)}</p>
                </div>
             </div>
          </div>
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Financial Model</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-8">Investor Return Structure</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
              The investor receives a temporary share of operating profits until the original investment plus a 15% return bonus has been fully repaid. This structure ensures a clean exit for investors and long-term sustainability for the village.
            </p>
            <div className="space-y-6">
               {[
                 { title: "No Permanent Equity", desc: "Project remains 100% locally controlled after exit." },
                 { title: "115% Repayment Cap", desc: "Total repayment is capped at IDR 227.7M." },
                 { title: "Direct Profit Share", desc: "Investor receives 25% of monthly operating profit." },
                 { title: "Performance Based", desc: "Repayment speed scales with actual business success." }
               ].map((item, i) => (
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
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">Phase 2 Strategy</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8">Expansion: Forest Kitchen & Lounge</h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed font-light">
              Once the initial project is proven successful, we will activate Stage 2. This communal dining space will enhance the guest experience and provide a second revenue stream for the village.
            </p>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                 <Store className="w-10 h-10 text-amber-400 mb-6" />
                 <h4 className="text-xl font-bold mb-3">Funding from Profit</h4>
                 <p className="text-sm text-white/50 leading-relaxed">
                   Stage 2 is funded entirely from the 10% monthly reserve, removing any immediate construction risk for partners.
                 </p>
              </div>
              <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                 <Calendar className="w-10 h-10 text-blue-400 mb-6" />
                 <h4 className="text-xl font-bold mb-3">Timeline Trigger</h4>
                 <p className="text-sm text-white/50 leading-relaxed">
                   Construction begins as soon as the IDR 85,000,000 reserve target is reached through operational success.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scenario Cards */}
      <section className="py-32 bg-white">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Performance Scenarios</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic font-light leading-relaxed">
              "We believe in presenting realistic projections. Here is how the project performs under different market conditions."
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
              label="Conservative"
            />
            <ScenarioCard 
              occupancy={60}
              revenue={63360000}
              villageShare={7177600}
              investorShare={11215000}
              reserve={4486000}
              profit={19738400}
              timeline={20.3}
              label="Moderate"
            />
            <ScenarioCard 
              occupancy={80}
              revenue={84480000}
              villageShare={10556800}
              investorShare={16495000}
              reserve={6598000}
              profit={29031200}
              timeline={13.8}
              label="Market Target"
              featured
            />
            <ScenarioCard 
              occupancy={100}
              revenue={105600000}
              villageShare={13936000}
              investorShare={21775000}
              reserve={8710000}
              profit={38324000}
              timeline={10.5}
              label="Maximum"
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
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-10 leading-tight">Building a Sustainable Future Together</h2>
        <p className="text-2xl text-slate-500 leading-relaxed font-light italic mb-16">
          "This proposal is designed to create a sustainable tourism partnership where the village, investors, operators, and environment all benefit together."
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
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Local Village Partnership &middot; Bali</p>
              </div>
           </div>
           <p className="text-slate-400 text-sm italic">Designed for community prosperity and landscape preservation.</p>
           <p className="text-slate-300 text-[10px] uppercase tracking-widest">&copy; 2026 Proposal &middot; All Rights Reserved</p>
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

function ScenarioCard({ occupancy, revenue, villageShare, investorShare, reserve, profit, timeline, label, featured = false }: any) {
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
        <p className={cn("text-xs uppercase tracking-widest font-bold mt-1", featured ? "text-white/60" : "text-slate-400")}>Occupancy</p>
      </div>

      <div className="space-y-5 mb-10 flex-grow">
        <ScenarioItem label="Gross Revenue" value={formatIDR(revenue)} light={featured} />
        <ScenarioItem label="Village Share" value={formatIDR(villageShare)} light={featured} highlight />
        <ScenarioItem label="Investor Repay" value={formatIDR(investorShare)} light={featured} />
        <ScenarioItem label="Resto Reserve" value={formatIDR(reserve)} light={featured} />
      </div>

      <div className={cn(
        "pt-8 border-t",
        featured ? "border-white/20" : "border-slate-100"
      )}>
        <p className={cn("text-[10px] uppercase tracking-widest font-black mb-3", featured ? "text-white/50" : "text-slate-300")}>Repayment Speed</p>
        <p className="text-4xl font-black">{timeline} <span className="text-sm font-light opacity-60 tracking-normal">Months</span></p>
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
