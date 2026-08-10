import type { MetadataRoute } from "next";

const SITE_URL = "https://shivypatel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
  ];

  return staticRoutes;
}
