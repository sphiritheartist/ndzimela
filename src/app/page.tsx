import { ArrowRight, ChevronRight, Building2, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const featuredProperties = await prisma.property.findMany({
    where: { featured: true },
    take: 6,
  });

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-10" />
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
            alt="Modern Architecture"
            className="w-full h-full object-cover opacity-60 dark:opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 max-w-4xl mx-auto leading-[1.1]">
            Investing in the Future of African Real Estate.
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto font-light mb-10">
            Sophistication, reliability, and market-leading expertise spanning premium markets across the continent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#portfolio"
              className="px-8 py-4 bg-foreground text-background rounded-full font-medium text-lg hover:opacity-90 transition-opacity flex items-center group w-full sm:w-auto justify-center"
            >
              Explore Portfolio
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Uncompromising Excellence.</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Our investment strategy relies on a rigorous analysis, aiming for stability and high yield.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300 md:col-span-2">
              <div>
                <Building2 className="w-10 h-10 mb-4 text-foreground/80" />
                <h3 className="text-2xl font-semibold mb-2">Prime Commercial</h3>
                <p className="text-foreground/60">Targeting A-grade properties strategically positioned in business hubs, ensuring long-term tenancy and appreciation.</p>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
              <div>
                <TrendingUp className="w-10 h-10 mb-4 text-foreground/80" />
                <h3 className="text-2xl font-semibold mb-2">High Yield</h3>
                <p className="text-foreground/60">Data-driven performance across residential and mixed-use portfolios.</p>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-8 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
              <div>
                <Shield className="w-10 h-10 mb-4 text-foreground/80" />
                <h3 className="text-2xl font-semibold mb-2">Risk Mitigated</h3>
                <p className="text-foreground/60">Our established frameworks ensure total asset security and compliance.</p>
              </div>
            </div>
            <div className="glass-card rounded-3xl group overflow-hidden relative md:col-span-2 hover:scale-[1.02] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
                alt="Architecture Details"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-semibold text-white mb-2">Architectural Brilliance</h3>
                <p className="text-white/80">Every acquisition must meet strict design and structural integrity standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Showcase / Horizontal Scroll */}
      <section id="portfolio" className="py-24 bg-[#050505] text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured Acquisitions.</h2>
              <p className="text-lg text-white/60">A glimpse into our premier properties.</p>
            </div>
            <button className="hidden sm:flex items-center text-white/80 hover:text-white transition-colors">
              View All <ChevronRight className="ml-1 w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {featuredProperties.map((property: any) => (
              <div key={property.id} className="flex-none w-[300px] md:w-[450px] snap-center group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{property.title}</h3>
                <p className="text-white/50 text-sm">{property.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director's Profile */}
      <section id="about" className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden max-w-md mx-auto lg:mx-0 lg:ml-auto w-full">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Cikizwa Ndzimela"
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Visionary Leadership.</h2>
              <p className="text-xl text-foreground/80 mb-6 leading-relaxed">
                Founded in 2015 by Cikizwa Ndzimela, our firm has rapidly emerged as a leader in premium property acquisition.
              </p>
              <div className="space-y-4 text-foreground/60 mb-8">
                <p>
                  Under Cikizwa's direction, Ndzimela Property Investments has built a portfolio defined by sophistication, stability, and enduring value. Her foresight in identifying high-growth corridors has consistently delivered exceptional returns for our partners.
                </p>
                <p>
                  "We do not just buy buildings; we invest in the future of the communities where they reside. True value is created when architecture meets ambition."
                </p>
              </div>
              <div className="pt-8 border-t border-border-color">
                <h4 className="font-semibold text-lg text-foreground">Cikizwa Ndzimela</h4>
                <p className="text-foreground/50">Founder & Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
