import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const [blogEntries, projectEntries] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
  ]);

  const pageUrls = [
    new URL("/", url),
    new URL("/blog/", url),
    new URL("/projects/", url),
    ...blogEntries.map(
      (entry) =>
        new URL(
          `/blog/${entry.id.split("/").map(encodeURIComponent).join("/")}`,
          url,
        ),
    ),
    ...projectEntries.map(
      (entry) => new URL(`/projects/${encodeURIComponent(entry.id)}`, url),
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageUrls.map((pageUrl) => `  <url><loc>${pageUrl.href}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};