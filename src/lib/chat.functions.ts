import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30),
  lang: z.enum(["en", "nl"]).optional().default("en"),
});

const SYSTEM_EN = `You are the friendly virtual assistant for Build Eleven, a small studio that builds custom websites and implements practical AI (chatbots, automation, smart features) for founders and teams. Primary service: AI implementation. Also: web building and ongoing support. Tone: warm, human, concise (2-4 sentences). Never use em-dashes. Help visitors understand services, answer questions about AI/web projects, and when appropriate invite them to book a free strategy call by scrolling to the booking section or emailing info@buildeleven.com. Never make up pricing or timelines; suggest a call for specifics.`;

const SYSTEM_NL = `Je bent de vriendelijke virtuele assistent van Build Eleven, een klein bureau dat maatwerk websites bouwt en praktische AI implementeert (chatbots, automatisering, slimme functies) voor oprichters en teams. Hoofddienst: AI-implementatie. Ook: webontwikkeling en doorlopende support. Toon: warm, menselijk, kort (2-4 zinnen). Gebruik nooit gedachtestreepjes. Help bezoekers de diensten begrijpen, beantwoord vragen over AI/web projecten, en nodig ze uit voor een gratis strategiegesprek via het contactformulier onderaan of info@buildeleven.com. Verzin geen prijzen of tijdlijnen; stel voor om te bellen voor details.`;

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const system = data.lang === "nl" ? SYSTEM_NL : SYSTEM_EN;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [{ role: "system", content: system }, ...data.messages],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please contact us directly at info@buildeleven.com.");
      const text = await res.text();
      throw new Error(`AI request failed: ${res.status} ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = json.choices?.[0]?.message?.content?.trim() ?? "";
    if (!reply) throw new Error("Empty response from AI.");
    return { reply };
  });
