import { defineCollection, z } from "astro:content";
const team = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().optional(),
      bio: z.string().optional(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      socials: z
        .object({
          twitter: z.string().optional(),
          email: z.string().optional(),
          linkedin: z.string().optional(),
          website: z.string().optional(),
        })
        .optional(),
    }),
});
const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
      isFeatured: z.boolean().optional().default(false),
    }),
});
const legal = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});
const services = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      description: z.string(),
      category: z.string().optional(),
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      priceFrom: z.string().optional(),
      duration: z.string().optional(),
      isFeatured: z.boolean().optional().default(false),
    }),
});
const jobs = defineCollection({
  schema: z.object({
    title: z.string(),
    department: z.string(),
    location: z.string(),
    type: z.enum(["Full-Time", "Part-Time", "Contract", "Internship"]),
    salary: z.string().optional(),
    description: z.string(),
    responsibilities: z.array(z.string()),
    requirements: z.array(z.string()),
    postedDate: z.date(),
    applyUrl: z.string().optional(),
  }),
});
const packages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    includedServices: z.array(z.string()),
    price: z.string(),
    duration: z.string().optional(),
    isFeatured: z.boolean().optional().default(false),
  }),
});
const customers = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      type: z.enum(["Individual", "Business"]).optional(),
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      quote: z.string().optional(),
      serviceUsed: z.string().optional(),
      vehicle: z.string().optional(),
      location: z.string().optional(),
    }),
});
export const collections = {
  team,
  legal,
  posts,
  services,
  jobs,
  packages,
  customers,
};
