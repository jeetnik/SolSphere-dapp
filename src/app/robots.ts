import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard"], 
      },
    ],
    sitemap: "https://solsphere-rosy.vercel.app/sitemap.xml",
  };
}
