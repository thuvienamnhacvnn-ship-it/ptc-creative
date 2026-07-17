import { z } from "zod";

export const aiBriefSchema = z.object({
  industry: z.string(),
  location: z.string(),
  requestedServices: z.array(z.string()),
  goals: z.array(z.string()),
  estimatedScope: z.array(z.string()),
  missingInformation: z.array(z.string()),
  followUpQuestions: z.array(z.string()),
});

export type AiBrief = z.infer<typeof aiBriefSchema>;

export const aiRecommendationSchema = z.object({
  disclaimer: z.string(),
  services: z.array(
    z.object({
      code: z.string(),
      title: z.string(),
      priority: z.enum(["high", "medium", "low"]),
      reason: z.string(),
    })
  ),
  roadmap: z.array(
    z.object({
      phase: z.string(),
      steps: z.array(z.string()),
    })
  ),
  preparation: z.array(z.string()),
  nextSteps: z.array(z.string()),
});

export type AiRecommendation = z.infer<typeof aiRecommendationSchema>;

export const aiLeadScoreSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  nextActions: z.array(z.string()),
  risks: z.array(z.string()).default([]),
});
