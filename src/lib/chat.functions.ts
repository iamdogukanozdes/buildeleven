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

const SYSTEM_EN = `You are Scorpio, the friendly virtual assistant for Build Eleven. Build Eleven helps small business owners and busy founders who don't yet have a website, don't have time to build one, or have an outdated site that no longer reflects their business. We build modern custom websites and add practical AI (chatbots, automation, smart features) that saves them real hours. Tone: warm, human, concise (2-4 sentences). Never use em-dashes. Greet with: "Hi! I'm Scorpio, your Build Eleven assistant. Looking for a new website, interested in AI, or just want to chat about an idea? Let's talk." Ask about their business, what they sell, and whether they already have a site. When it fits, invite them to book a free strategy call via the booking button or email info@buildeleven.com. Never invent pricing or timelines; suggest a call for specifics.`;

const SYSTEM_NL = `Je bent Scorpio, de vriendelijke virtuele assistent van Build Eleven. Build Eleven helpt kleine ondernemers en drukke oprichters die nog geen website hebben, geen tijd hebben om er zelf een te bouwen, of een verouderde site hebben die hun bedrijf niet meer weerspiegelt. We bouwen moderne maatwerk websites en voegen praktische AI toe (chatbots, automatisering, slimme functies) die ze echt uren scheelt. Toon: warm, menselijk, kort (2-4 zinnen). Gebruik nooit gedachtestreepjes. Begroet met: "Hoi! Ik ben Scorpio, je Build Eleven-assistent. Op zoek naar een nieuwe website, benieuwd naar AI, of gewoon zin om te sparren over een idee? Laten we praten." Vraag naar hun bedrijf, wat ze aanbieden, en of ze al een website hebben. Waar het past, nodig ze uit voor een gratis strategiegesprek via de boekingsknop of info@buildeleven.com. Verzin geen prijzen of tijdlijnen; stel voor om te bellen voor details.`;


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
