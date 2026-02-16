import { defineCollection, z } from "astro:content";

const legal = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});

const courses = defineCollection({
  schema: z.object({
    title: z.string(),
    courseCode: z.string(),
    category: z.enum(["A", "AM", "B", "BE", "C", "CE", "D", "X"]),
    categoryName: z.string(),
    description: z.string().optional(),
    price: z.string().optional(),
    priceNote: z.string().optional(),
    duration: z.string().optional(),
    theoryHours: z.string().optional(),
    drivingHours: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    includes: z.array(z.string()).optional(),
    teooriaIframeUrl: z.string(),
    startDate: z.string().optional(),
    isFeatured: z.boolean().optional().default(false),
  }),
});

const services = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    shortDescription: z.string().optional(),
    type: z.enum(["loppastme", "libedasoit", "ametikoolitus", "other"]),
    price: z.string().optional(),
    duration: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    includes: z.array(z.string()).optional(),
    teooriaIframeUrl: z.string().optional(),
  }),
});

export const collections = {
  legal,
  courses,
  services,
};
