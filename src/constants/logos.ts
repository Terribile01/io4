export interface Logo {
  name: string;
  url: string;
  slug: string;
}

// Color hex for accent-blue (#0A84FF) -> 0A84FF
const ACCENT_BLUE_HEX = "0A84FF";

const getSiUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}/${ACCENT_BLUE_HEX}`;

export const CMS_LOGOS: Logo[] = [
  { name: "WordPress", slug: "wordpress", url: getSiUrl("wordpress") },
  { name: "Hostinger", slug: "hostinger", url: getSiUrl("hostinger") },
  { name: "Wix", slug: "wix", url: getSiUrl("wix") },
  { name: "Squarespace", slug: "squarespace", url: getSiUrl("squarespace") },
  { name: "Shopify", slug: "shopify", url: getSiUrl("shopify") }
];

export const DEV_LOGOS: Logo[] = [
  { name: "GitHub", slug: "github", url: getSiUrl("github") },
  { name: "Vercel", slug: "vercel", url: getSiUrl("vercel") },
  { name: "Vite", slug: "vite", url: getSiUrl("vite") },
  { name: "React", slug: "react", url: getSiUrl("react") },
  { name: "Tailwind CSS", slug: "tailwindcss", url: getSiUrl("tailwindcss") }
];

export const AI_LOGOS: Logo[] = [
  { name: "Jules", slug: "digitalocean", url: getSiUrl("digitalocean") },
  { name: "ChatGPT", slug: "openai", url: "https://svgl.app/library/openai.svg" }, // SimpleIcons doesn't have it under 'openai' or 'chatgpt' reliably in some CDNs
  { name: "Gemini", slug: "googlegemini", url: getSiUrl("googlegemini") },
  { name: "Claude", slug: "anthropic", url: getSiUrl("anthropic") },
  { name: "Meta AI", slug: "meta", url: getSiUrl("meta") },
  { name: "Midjourney", slug: "midjourney", url: "https://svgl.app/library/midjourney.svg" },
  { name: "Perplexity", slug: "perplexity", url: getSiUrl("perplexity") },
  { name: "Hugging Face", slug: "huggingface", url: getSiUrl("huggingface") },
  { name: "Mistral AI", slug: "mistralai", url: getSiUrl("mistralai") },
  { name: "Groq", slug: "groq", url: "https://svgl.app/library/groq.svg" }
];
