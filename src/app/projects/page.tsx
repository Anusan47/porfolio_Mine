"use client";
import React from "react";
import { data } from "@/data/data";
import { ProjectCard } from "@/components/home/projects";
import { BlurFade } from "@/components/ui/blur-fade";
import { IconBrush } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default function ProjectsPage() {
    return (
        <div className="flex flex-col min-h-[100dvh] space-y-10 px-4 sm:px-6 md:px-8 pt-24 pb-12 max-w-5xl mx-auto">
            <div>
                <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <IconArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
                <SectionHeading icon={<IconBrush className={headingIconClass} />}>
                    All Projects
                </SectionHeading>
                <p className="text-muted-foreground mt-4 mb-8">
                    A comprehensive list of all the projects I have worked on, including web applications, mobile apps, and more.
                </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mx-auto w-full">
                {data.projects.map((item, index) => (
                    <BlurFade
                        key={item.title}
                        delay={0.04 * index}
                    >
                        <ProjectCard
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            tags={item.technologies}
                            video={item.video}
                            iframe={(item as { iframe?: string }).iframe}
                            thumbnail={item.thumbnail}
                        />
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}
