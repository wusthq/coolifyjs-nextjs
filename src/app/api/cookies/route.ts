import { COOKIE_NAME } from "@/lib/cookies";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookieStore = cookies();

    const teamId = body.teamId;

    if (teamId) {
      cookieStore.set(COOKIE_NAME.TEAM_ID, teamId);
    } else {
      cookieStore.delete(COOKIE_NAME.TEAM_ID);
    }

    return new Response("ok");
  } catch (err) {
    return new Response("error");
  }
}
