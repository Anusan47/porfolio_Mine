"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { IconExternalLink } from "@tabler/icons-react";

export interface CredentialType {
  id: string;
  title: string;
  issuer: string;
  platform: string;
  type: string;
  issueDate: string;
  verificationUrl: string;
  image: string;
  description: string;
  featured: boolean;
  iframeHtml?: string; // Optional iframe to embed
}

interface CredentialCardProps {
  credential: CredentialType;
  index: number;
}

export function CredentialCard({ credential, index }: CredentialCardProps) {
  return (
    <BlurFade delay={0.1 + index * 0.05} direction="up" inView>
      <a 
        href={credential.verificationUrl !== "#" ? credential.verificationUrl : undefined} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block h-full group outline-none"
      >
        <div className="group/glow relative h-full flex flex-col overflow-hidden p-6 border rounded-xl sm:rounded-lg bg-background transition-all duration-400 hover:border-primary/50">
          <SpotlightGlow />
          <div className="flex flex-row space-x-4 items-start mb-4">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden shrink-0 border bg-white p-1">
              <Image 
                src={credential.image} 
                alt={credential.title} 
                fill 
                className="object-contain" 
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground bg-secondary/50">
                  {credential.type}
                </span>
                {credential.verificationUrl !== "#" && (
                  <IconExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <h3 className="mt-2 font-bold tracking-tight text-base sm:text-lg text-primary group-hover:text-primary/80 transition-colors">
                {credential.title}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {credential.issuer} • {credential.platform}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {credential.description}
          </p>
          <div className="mt-auto pt-4 border-t text-xs font-medium text-muted-foreground">
            Issued: {new Date(credential.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </div>
        </div>
      </a>
    </BlurFade>
  );
}
