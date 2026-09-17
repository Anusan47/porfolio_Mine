"use client";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BlurFade } from "../ui/blur-fade";
import { data } from "../../data/data"
import { IconBrush, IconLink } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { motion } from "framer-motion";

export default function Projects() {
    return (
        <div className="flex flex-col">
            <SectionHeading icon={<IconBrush className={headingIconClass} />}>
                Projects
            </SectionHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mx-auto">
                {data.projects.map((item, index) => (
                    <BlurFade
                        key={item.title}
                        delay={0.04 * 12 + index * 0.05}
                    >
                        <ProjectCard
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            tags={item.technologies}
                            video={item.video}
                            iframe={(item as any).iframe}
                            thumbnail={item.thumbnail}
                        />
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}
interface Props {
    title: string;
    href?: string;
    description: string;
    tags: readonly string[];
    link?: string;
    image?: string;
    video?: string;
    iframe?: string;
    thumbnail?: string;
    links?: readonly {
        icon: React.ReactNode;
        type: string;
        href: string;
    }[];
}

export function ProjectCard({ title, href, description, tags, link, image, video, iframe, thumbnail, links }: Readonly<Props>) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleVideoPlaying = () => {
            setIsVideoPlaying(true);
        };

        video.addEventListener("playing", handleVideoPlaying);

        // Explicitly try to play the video
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Video started playing successfully
                    setIsVideoPlaying(true);
                })
                .catch((error) => {
                    // Autoplay was prevented, show video anyway after a short delay
                    console.log("Autoplay prevented:", error);
                    setTimeout(() => {
                        setIsVideoPlaying(true);
                    }, 500);
                });
        }

        // Fallback: show video after 3 seconds if event doesn't fire
        const fallbackTimer = setTimeout(() => {
            setIsVideoPlaying(true);
        }, 3000);

        return () => {
            video.removeEventListener("playing", handleVideoPlaying);
            clearTimeout(fallbackTimer);
        };
    }, []);

    return (
        <Link href={href || "#"} className="block h-full group">
            <Card
                className={
                    "relative flex flex-col overflow-hidden border hover:shadow-md transition-all duration-300 ease-out h-full"
                }
            >
                <div className="relative overflow-hidden h-55 bg-muted">
                    {/* Thumbnail - Shows immediately, stays blurred until video plays */}
                    {video && thumbnail && (
                        <div className="absolute top-0 left-0 w-full h-full blur-sm scale-105">
                            <Image
                                src={thumbnail}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-top"
                                priority
                                onError={(e) => console.error("Video error:", e)}
                            />
                        </div>
                    )}
                    {/* Video - Fades in on top when playing */}
                    {video && (
                        <motion.video
                            ref={videoRef}
                            src={video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVideoPlaying ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover object-top z-10"
                        />
                    )}
                    {/* iframe Support */}
                    {iframe && (
                        <div className="absolute inset-0 bg-[#050914] z-10 overflow-hidden flex items-center justify-center">
                            <iframe 
                                src={iframe} 
                                className="w-[1000px] h-[600px] max-w-none border-none pointer-events-none" 
                                style={{ transform: 'scale(0.55)', transformOrigin: 'center' }}
                                title={title}
                                tabIndex={-1}
                            />
                        </div>
                    )}
                    {/* Static Image fallback */}
                    {!video && !iframe && image && (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-top"
                        />
                    )}
                    {/* Link Icon */}
                    <div className="absolute top-2 right-2 bg-black/20 text-white rounded-full p-1 z-20 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity duration-300">
                        <IconLink className="h-5 w-5" />
                    </div>
                </div>
                <CardHeader className="px-2">
                    <div className="space-y-1">
                        <CardTitle className="mt-2 text-base">{title}</CardTitle>
                        <div className="hidden text-xs underline print:visible">
                            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
                        </div>
                        <div className="prose max-w-full text-pretty text-sm mt-2 text-muted-foreground dark:prose-invert">
                            {description}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="mt-2 flex flex-col px-2">
                    {tags && tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags?.map((tag) => (
                                <Badge
                                    className="px-1 py-0.5 text-[12px]"
                                    variant="secondary"
                                    key={tag}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="px-2 pb-2">
                    {links && links.length > 0 && (
                        <div className="flex flex-row flex-wrap items-start gap-1">
                            {links?.map((link) => (
                                <Link href={link?.href} key={link.href} target="_blank">
                                    <Badge className="flex gap-2 text-[12px]">
                                        {link.icon}
                                        {link.type}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
}