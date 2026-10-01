"use client";

import { useState } from "react";
import credentialsData from "@/data/credentials.json";
import { CredentialCard } from "@/components/credentials/CredentialCard";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconCertificate, IconSearch, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";

export default function CredentialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("All");

  const { credentials } = credentialsData;
  const platforms = ["All", ...Array.from(new Set(credentials.map(c => c.platform)))];

  const filteredCredentials = credentials.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === "All" || c.platform === filterPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="relative min-h-screen w-full bg-background pt-24 pb-12">
      <div className="mx-auto flex max-w-5xl flex-col space-y-8 px-4">
        
        {/* Header */}
        <BlurFade delay={0.05} direction="up" inView>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4">
                <IconArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <SectionHeading icon={<IconCertificate className={headingIconClass} />}>
                My Credentials
              </SectionHeading>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                A collection of my certifications, badges, and achievements across various platforms.
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Filters and Search */}
        <BlurFade delay={0.1} direction="up" inView>
          <div className="flex flex-col md:flex-row gap-4 justify-between bg-secondary/30 p-4 rounded-xl border">
            <div className="relative flex-1 max-w-md">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search credentials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => setFilterPlatform(platform)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterPlatform === platform 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-background border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Credentials Grid */}
        {filteredCredentials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCredentials.map((cred, i) => (
              <CredentialCard key={cred.id} credential={cred} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl border-dashed">
            <IconCertificate className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No credentials found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters or search term.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}
