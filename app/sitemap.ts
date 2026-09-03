import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://example.com";
  const districts = ["kathmandu", "lalitpur", "bhaktapur"];
  const routes = ["", ...districts.map((district) => `/${district}`)];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route ? "weekly" : "daily",
    priority: route ? 0.7 : 1,
  }));
}
