import type { APIRoute } from "astro";

export const GET: APIRoute = ({ url }) => {
  const robots = `User-agent: *
Allow: /
Sitemap: ${new URL("/sitemap.xml", url).href}`;

  return new Response(robots, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};