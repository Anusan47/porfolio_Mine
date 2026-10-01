import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconCertificate, IconArrowRight } from "@tabler/icons-react";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";
import Image from "next/image";
import credentialsData from "@/data/credentials.json";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

export default function CredentialsShowcase() {
  const { stats, credentials } = credentialsData;
  const featured = credentials.find(c => c.featured) || credentials[0];

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

        {/* Featured Credential */}
        <BlurFade delay={0.15} direction="up" inView className="md:col-span-2">
          <a href={featured.verificationUrl} target="_blank" rel="noopener noreferrer" className="block h-full group">
            <div className="group/glow relative h-full overflow-hidden p-6 border rounded-xl sm:rounded-lg bg-background transition-all duration-400 hover:border-primary/50">
              <SpotlightGlow />
              <div className="flex flex-row space-x-4 items-start">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden shrink-0 border bg-white p-1">
                  <Image src={featured.image} alt={featured.title} fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                     <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Featured {featured.type}</span>
                  </div>
                  <h3 className="mt-2 font-bold tracking-tight text-base sm:text-lg text-primary group-hover:text-primary/80 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {featured.issuer} • {featured.platform}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {featured.description}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </BlurFade>
      </div>
    </div>
  );
}
