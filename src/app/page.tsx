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
  Zap
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
      initialInvestment 
    } = BUSINESS_CONFIG;

    const occupancyRate = occupancy / 100;
    const grossRoomRevenue = numberOfYurts * nightlyRate * daysPerMonth * occupancyRate;
    const profitBeforeVillageShare = grossRoomRevenue - fixedOperatingCosts;
    
    let villageMonthlyShare = 0;
    let netOperatingProfitAfterVillageShare = 0;
    let annualVillageShare = 0;
    let paybackMonths: string | number = "N/A";

    if (profitBeforeVillageShare > 0) {
      villageMonthlyShare = profitBeforeVillageShare * villageSharePercent;
      netOperatingProfitAfterVillageShare = profitBeforeVillageShare - villageMonthlyShare;
      annualVillageShare = villageMonthlyShare * 12;
      paybackMonths = (initialInvestment / netOperatingProfitAfterVillageShare).toFixed(1);
    }

    return {
      grossRoomRevenue,
      fixedOperatingCosts,
      profitBeforeVillageShare,
      villageMonthlyShare,
      netOperatingProfitAfterVillageShare,
      annualVillageShare,
      paybackMonths,
      isProfitable: profitBeforeVillageShare > 0
    };
  }, [occupancy]);

  return (
    <main className="min-h-screen natural-gradient text-slate-800">
      {/* Hero Section with Mockup Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/mockup.jpeg"
          alt="Hortensia Field Glamping Mockup"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              Partnership Proposal
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight drop-shadow-2xl">
              Hortensia Field <br />
              <span className="text-blue-200">Glamping Village</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-lg">
              A low-impact mountain retreat designed to create local income, village profit share, and sustainable tourism.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Tent, label: "4 Yurt Rooms" },
                { icon: Wallet, label: "IDR 600k / Night" },
                { icon: Users, label: "Village Profit Share" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                  <item.icon className="w-8 h-8 mb-3 text-blue-200" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Project Overview - Image Removed as requested */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 text-forest-900">Project Overview</h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Our vision is to transform the existing hydrangea field into a premium yet sustainable glamping destination. By building on wooden platforms, we ensure the natural beauty of the field remains protected and untouched.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              "Existing hydrangea field remains protected",
              "Simple yurts on elevated wooden platforms",
              "Shared bathroom to reduce construction impact",
              "Phase 2 expansion for communal dining",
              "100% Local staff employment",
              "Direct monthly village profit share"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <ChevronRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-slate-700 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initial Investment Section */}
      <section className="py-24 bg-white/50 border-y border-slate-200">
        <div className="px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">Initial Investment</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A transparent breakdown of the startup costs required to launch this partnership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {INVESTMENT_ITEMS.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-slate-500">
                    {item.quantity > 1 ? `${item.quantity} units × ${formatIDR(item.costPerUnit)}` : "Lump sum"}
                  </p>
                </div>
                <span className="font-bold text-forest-800">{formatIDR(item.total)}</span>
              </div>
            ))}
          </div>

          <div className="bg-forest-900 text-white p-10 rounded-3xl flex flex-col md:flex-row justify-between items-center shadow-2xl">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold opacity-80">Total Initial Investment</h3>
              <p className="text-blue-200">Excluding future planned expansions</p>
            </div>
            <div className="text-4xl md:text-5xl font-bold">
              {formatIDR(BUSINESS_CONFIG.initialInvestment)}
            </div>
          </div>
        </div>
      </section>

      {/* First Expansion Plan Section with Waterfall Video and Resto1.png */}
      <section className="relative py-32 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/waterfall1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-forest-900/80" />
        
        <div className="relative z-10 px-6 max-w-6xl mx-auto text-white">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-6 font-bold uppercase tracking-widest text-xs">
                <Zap className="w-4 h-4" /> Future Growth
              </div>
              <h2 className="text-5xl font-bold mb-6">{EXPANSION_PLAN.title}</h2>
              <p className="text-xl text-white/70 mb-10 leading-relaxed font-light">
                {EXPANSION_PLAN.description}
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Target Timeline</h4>
                    <p className="text-white/50">{EXPANSION_PLAN.timeline} after launch</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Wallet className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Estimated Re-investment</h4>
                    <p className="text-white/50">{formatIDR(EXPANSION_PLAN.estimatedCost)} from retained earnings</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-3xl"
            >
              <Image
                src="/images/resto1.png"
                alt="Restaurant Expansion Concept"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-sm font-bold uppercase tracking-widest text-blue-200">Phase 2 Visualization</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Monthly Operating Costs */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-forest-900 mb-4">Monthly Operating Costs</h2>
          <p className="text-slate-500">Fixed expenses that ensure smooth daily operations and local employment.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8">
            {MONTHLY_COSTS_BREAKDOWN.map((item, i) => (
              <div key={i} className={cn(
                "flex justify-between py-4",
                i !== MONTHLY_COSTS_BREAKDOWN.length - 1 && "border-bottom border-slate-100"
              )}>
                <span className="text-slate-700 font-medium">{item.name}</span>
                <span className="text-slate-900 font-semibold">{formatIDR(item.cost)}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 p-8 flex justify-between items-center border-t border-slate-100">
            <span className="text-lg font-bold text-forest-900">Total Fixed Costs</span>
            <span className="text-2xl font-bold text-forest-900">{formatIDR(BUSINESS_CONFIG.fixedOperatingCosts)}/month</span>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="py-24 rock-bg relative">
        <div className="absolute inset-0 rock-overlay" />
        <div className="px-6 max-w-6xl mx-auto relative z-10 text-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Interactive Performance Calculator</h2>
            <p className="text-white/60">Adjust the occupancy rate to see how the village benefits monthly.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/10">
              <div className="mb-10">
                <div className="flex justify-between items-end mb-6">
                  <label className="text-lg font-medium text-white/90">Occupancy Rate</label>
                  <span className="text-4xl font-bold text-blue-300">{occupancy}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={occupancy}
                  onChange={(e) => setOccupancy(parseInt(e.target.value))}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
                <div className="flex justify-between mt-4 text-sm text-white/40">
                  <span>Conservative (20%)</span>
                  <span>Target (80%)</span>
                  <span>Full (100%)</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-white/5 flex items-start gap-4">
                  <Info className="w-5 h-5 text-blue-300 mt-1" />
                  <p className="text-sm text-white/70 leading-relaxed">
                    The village receives <span className="text-blue-200 font-bold">{(BUSINESS_CONFIG.villageSharePercent * 100).toFixed(1)}%</span> of operating profit after all fixed costs are covered.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 flex items-start gap-4">
                  <TrendingUp className="w-5 h-5 text-blue-300 mt-1" />
                  <p className="text-sm text-white/70 leading-relaxed">
                    Lower initial investment of <span className="text-blue-200 font-bold">{formatIDR(BUSINESS_CONFIG.initialInvestment)}</span> results in a faster payback period.
                  </p>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              <AnimatePresence mode="wait">
                {!financials.isProfitable ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="md:col-span-2 bg-amber-500/20 border border-amber-500/30 p-10 rounded-[2rem] text-center"
                  >
                    <h3 className="text-2xl font-bold text-amber-200 mb-2">Not profitable at this occupancy</h3>
                    <p className="text-white/70">Occupancy must be high enough to cover the {formatIDR(BUSINESS_CONFIG.fixedOperatingCosts)} fixed monthly costs.</p>
                  </motion.div>
                ) : (
                  <>
                    <ResultCard
                      label="Gross Room Revenue"
                      value={formatIDR(financials.grossRoomRevenue)}
                      subLabel="Monthly total"
                      color="blue"
                    />
                    <ResultCard
                      label="Profit Before Share"
                      value={formatIDR(financials.profitBeforeVillageShare)}
                      subLabel="After operational costs"
                      color="green"
                    />
                    <ResultCard
                      label="Village Monthly Share"
                      value={formatIDR(financials.villageMonthlyShare)}
                      subLabel="Direct community benefit"
                      color="indigo"
                      highlight
                    />
                    <ResultCard
                      label="Annual Village Share"
                      value={formatIDR(financials.annualVillageShare)}
                      subLabel="Projected yearly total"
                      color="purple"
                    />
                    <ResultCard
                      label="Net Operating Profit"
                      value={formatIDR(financials.netOperatingProfitAfterVillageShare)}
                      subLabel="After village share"
                      color="slate"
                    />
                    <ResultCard
                      label="Payback Period"
                      value={`${financials.paybackMonths} Months`}
                      subLabel="Estimated ROI"
                      color="emerald"
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Village Benefit Section with Moving Water Video Overlay */}
      <section className="relative py-24 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="/videos/movingwater.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">Community Benefits</h2>
            <p className="text-slate-500">More than just profit, this is a partnership for sustainable growth.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Wallet, 
                title: "Passive Income", 
                desc: "Monthly profit share without selling or developing the land yourself." 
              },
              { 
                icon: Users, 
                title: "Jobs", 
                desc: "Priority hiring for village members in housekeeping, security, and service." 
              },
              { 
                icon: Leaf, 
                title: "Conservation", 
                desc: "The hydrangea field is preserved and maintained as a core asset." 
              },
              { 
                icon: TrendingUp, 
                title: "Tourism Growth", 
                desc: "High-quality visitors bring visibility and growth to the entire village." 
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/rock2.jpg')] bg-cover bg-fixed" />
        <div className="absolute inset-0 bg-slate-900/90" />
        <div className="px-6 max-w-6xl mx-auto relative z-10 text-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-blue-200">ROI Sustainability Scenarios</h2>
            <p className="text-white/50">Performance expectations at different market conditions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ScenarioCard 
              occupancy={40}
              revenue={28800000}
              profit={10300000}
              villageShare={2636800}
              netProfit={7663200}
              label="Conservative"
            />
            <ScenarioCard 
              occupancy={60}
              revenue={43200000}
              profit={24700000}
              villageShare={6323200}
              netProfit={18376800}
              label="Target"
            />
            <ScenarioCard 
              occupancy={80}
              revenue={57600000}
              profit={39100000}
              villageShare={10009600}
              netProfit={29090400}
              label="High Performance"
              featured
            />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-10">
          <ShieldCheck className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-4xl font-bold text-forest-900 mb-8">Building a Sustainable Future Together</h2>
        <p className="text-2xl text-slate-500 leading-relaxed font-light italic">
          "This proposal is designed to create a simple, beautiful, and sustainable tourism business where the village benefits every month while the land and natural atmosphere remain protected."
        </p>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 text-center text-slate-400 text-sm bg-white">
        &copy; 2026 Hortensia Field Glamping &middot; Local Village Partnership &middot; Bali, Indonesia
      </footer>
    </main>
  );
}

function ResultCard({ label, value, subLabel, color, highlight = false }: any) {
  const colors: any = {
    blue: "text-blue-300",
    green: "text-emerald-300",
    indigo: "text-indigo-300",
    purple: "text-purple-300",
    slate: "text-slate-300",
    emerald: "text-green-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-8 rounded-[2rem] border transition-all duration-500",
        highlight 
          ? "bg-white text-forest-900 border-white shadow-2xl scale-105 z-10" 
          : "bg-white/5 text-white border-white/10"
      )}
    >
      <p className={cn("text-xs font-bold uppercase tracking-widest mb-4 opacity-60", !highlight && colors[color])}>
        {label}
      </p>
      <p className={cn("text-2xl font-bold mb-2", highlight ? "text-forest-900" : "text-white")}>
        {value}
      </p>
      <p className={cn("text-sm opacity-50", highlight ? "text-forest-800" : "text-white/50")}>
        {subLabel}
      </p>
    </motion.div>
  );
}

function ScenarioCard({ occupancy, revenue, profit, villageShare, netProfit, label, featured = false }: any) {
  return (
    <div className={cn(
      "p-10 rounded-[2.5rem] border transition-all duration-500",
      featured 
        ? "bg-blue-600 border-blue-400 shadow-2xl md:-mt-6 md:-mb-6 relative z-10" 
        : "bg-slate-800 border-slate-700"
    )}>
      <div className="mb-8">
        <span className={cn(
          "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest",
          featured ? "bg-white/20 text-white" : "bg-blue-500/10 text-blue-400"
        )}>
          {label}
        </span>
        <h3 className="text-4xl font-bold mt-4">{occupancy}% <span className="text-lg opacity-60 font-normal">Occupancy</span></h3>
      </div>

      <div className="space-y-4 mb-8">
        <ScenarioItem label="Gross Revenue" value={formatIDR(revenue)} light={featured} />
        <ScenarioItem label="Operating Costs" value={formatIDR(BUSINESS_CONFIG.fixedOperatingCosts)} light={featured} />
        <ScenarioItem label="Village Share" value={formatIDR(villageShare)} light={featured} highlight />
      </div>

      <div className={cn(
        "pt-8 border-t",
        featured ? "border-white/20" : "border-slate-700"
      )}>
        <p className="text-sm opacity-60 mb-2 uppercase font-bold tracking-widest">Net Operating Profit</p>
        <p className="text-3xl font-bold">{formatIDR(netProfit)}</p>
      </div>
    </div>
  );
}

function ScenarioItem({ label, value, light, highlight }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className={cn("text-sm", light ? "text-white/70" : "text-white/40")}>{label}</span>
      <span className={cn(
        "font-semibold",
        highlight ? (light ? "text-white font-bold" : "text-blue-400") : ""
      )}>{value}</span>
    </div>
  );
}
