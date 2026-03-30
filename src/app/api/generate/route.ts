import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const SYSTEM_PROMPT = `You are a senior email deliverability consultant.
Return ONLY valid JSON with this structure: { summary, duration, keyRules[],
weeklyPlan[{week, dailyVolume, totalVolume, minOpenRate, segments, focus,
warning}], ispTips{gmail,outlook,yahoo}, redFlags[], successMetrics[] }`;

export async function POST(req: NextRequest) {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    const body = await req.json();

    const {
      domainHistory,
      listSize,
      listAge,
      engagementLevel,
      esp,
      dailyVolumeTarget,
      useCase,
      industry,
      ispMix,
      previousIssues,
    } = body;

    const userPrompt = `Generate an email warmup strategy for:

Domain/IP History: ${domainHistory}
List Size: ${listSize} subscribers
List Age: ${listAge} months
Engagement Level: ${engagementLevel}
ESP: ${esp}
Daily Volume Target: ${dailyVolumeTarget} emails/day
Use Case: ${useCase}
Industry: ${industry}
ISP Mix: ${ispMix}
Previous Issues: ${previousIssues || "None reported"}

Provide a detailed, actionable warmup plan tailored to these specifics.
The weeklyPlan should ramp up to reach the daily volume target.
Include practical segments like "Top 10% engagers", "30-day openers", etc.
Make warnings specific and actionable.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Strip markdown code fences if present
    let jsonText = content.text.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const strategy = JSON.parse(jsonText);

    return NextResponse.json(strategy);
  } catch (err) {
    console.error("API error:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
