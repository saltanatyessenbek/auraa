export const dynamic = "force-dynamic";
import { providerName } from "../../../lib/llm";

// Open /api/health to check which AI provider the deployed site sees.
export async function GET() {
  return Response.json({ version: "aura-v2-gemini", ai: providerName(), youtube: !!process.env.YOUTUBE_API_KEY });
}
