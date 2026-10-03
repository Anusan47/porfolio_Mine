"use client";

import { useState, useEffect } from "react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconCertificate, IconArrowRight, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";
import Image from "next/image";
import credentialsData from "@/data/credentials.json";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { motion, AnimatePresence } from "framer-motion";

export default function CredentialsShowcase() {
  const { stats, credentials } = credentialsData;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Show featured items, or just top 5 if none are featured
  const showcaseList = credentials.filter(c => c.featured);
  const displayList = showcaseList.length > 1 ? showcaseList : credentials.slice(0, 5);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % displayList.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayList.length]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <SectionHeading icon={<IconCertificate className={headingIconClass} />}>
          Credentials
        </SectionHeading>
        <Link href="/credentials" className="group flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <span>View All</span>
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stats Card */}
        <BlurFade delay={0.1} direction="up" inView className="md:col-span-1">
          <div className="group/glow relative h-full flex flex-col justify-center overflow-hidden p-6 border rounded-xl sm:rounded-lg bg-background transition-all duration-400">
            <SpotlightGlow />
            <div className="flex justify-between items-end mb-4">
               <div>
                  <p className="text-4xl font-bold tracking-tighter text-primary">{stats.total}</p>
                  <p className="text-sm font-medium text-muted-foreground">Total Credentials</p>
               </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">{stats.badges}</span>
                <span className="text-xs text-muted-foreground">Badges</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">{stats.certificates}</span>
                <span className="text-xs text-muted-foreground">Certificates</span>
              </div>
            </div>
            <div className="mt-4 flex -space-x-2">
               {/* Just simple circles to represent platforms */}
               <div className="h-8 w-8 rounded-full border-2 border-background bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">Cr</div>
               <div className="h-8 w-8 rounded-full border-2 border-background bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold">Bd</div>
               <div className="h-8 w-8 rounded-full border-2 border-background bg-blue-700 flex items-center justify-center text-[10px] text-white font-bold">MS</div>
               <div className="h-8 w-8 rounded-full border-2 border-background bg-blue-400 flex items-center justify-center text-[10px] text-white font-bold">Kg</div>
            </div>
          </div>
        </BlurFade>

        {/* Featured Credential Carousel */}
        <BlurFade delay={0.15} direction="up" inView className="md:col-span-2">
          <div className="group/glow relative h-full overflow-hidden p-6 border rounded-xl sm:rounded-lg bg-background transition-all duration-400 hover:border-primary/50 flex flex-col">
            <SpotlightGlow />
            
            <div className="flex justify-between items-center mb-4 z-10">
              <span className="text-sm font-medium text-muted-foreground">Featured Showcase</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={prevSlide}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                  aria-label="Previous credential"
                >
                  <IconChevronLeft className="h-5 w-5" />
                </button>
                <div className="text-xs font-medium text-muted-foreground">
                  {currentIndex + 1} / {displayList.length}
                </div>
                <button 
                  onClick={nextSlide}
                  className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                  aria-label="Next credential"
                >
                  <IconChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-grow flex items-center min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.a
                  key={displayList[currentIndex].title}
                  href={displayList[currentIndex].verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-row space-x-4 items-start group"
                >
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden shrink-0 border bg-white p-1 shadow-sm">
                    <Image src={displayList[currentIndex].image} alt={displayList[currentIndex].title} fill className="object-contain" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex items-center space-x-2">
                       <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-foreground">
                          {displayList[currentIndex].type}
                       </span>
                    </div>
                    <h3 className="mt-2 font-bold tracking-tight text-base sm:text-lg text-primary group-hover:text-primary/80 transition-colors line-clamp-1">
                      {displayList[currentIndex].title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground truncate">
                      {displayList[currentIndex].issuer} • {displayList[currentIndex].platform}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {displayList[currentIndex].description}
                    </p>
                  </div>
                </motion.a>
              </AnimatePresence>
            </div>
            
            {/* Progress indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
              {displayList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-primary/20 hover:bg-primary/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
