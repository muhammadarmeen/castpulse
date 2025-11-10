import type { NextApiRequest, NextApiResponse } from "next";
import { calculateScore, getTitle, getMotivation } from "../../lib/scoreCalc";
import { kv } from "@vercel/kv";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const FID = req.query.fid as string || "demo_user";

  try {
    const response = await fetch(`https://warpcast-api.neynar.io/v2/users/${FID}/casts?limit=50`);
    const casts = await response.json();

    const today = new Date().toISOString().slice(0, 10);
    const todaysCasts = casts.filter((c: any) => c.timestamp.startsWith(today));

    const totalCasts = todaysCasts.length;
    const totalLikes = todaysCasts.reduce((sum: number, c: any) => sum + (c.likes || 0), 0);
    const totalRecasts = todaysCasts.reduce((sum: number, c: any) => sum + (c.recasts || 0), 0);
    const totalReplies = todaysCasts.reduce((sum: number, c: any) => sum + (c.replies || 0), 0);

    const score = calculateScore({ totalCasts, totalLikes, totalRecasts, totalReplies });

    // Fetch streak & personal best from KV
    let personalBest = parseInt((await kv.get(`${FID}:personalBest`)) as string) || 0;
    let streak = parseInt((await kv.get(`${FID}:streak`)) as string) || 0;
    const lastCheck = (await kv.get(`${FID}:lastCheck`)) as string || "";

    // Update personal best
    if (score > personalBest) {
      personalBest = score;
      await kv.set(`${FID}:personalBest`, personalBest.toString());
    }

    // Update streak
    if (lastCheck !== today && totalCasts > 0) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (lastCheck === yesterday) {
        streak += 1;
      } else {
        streak = 1;
      }
      await kv.set(`${FID}:streak`, streak.toString());
      await kv.set(`${FID}:lastCheck`, today);
    }

    const title = getTitle(streak);
    const motivation = getMotivation(score, streak, personalBest);

    res.status(200).json({
      totalCasts,
      totalLikes,
      totalRecasts,
      totalReplies,
      score,
      streak,
      personalBest,
      title,
      motivation
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch casts or update streak" });
  }
}
