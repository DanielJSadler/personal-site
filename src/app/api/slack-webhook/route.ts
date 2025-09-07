import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Slack signature verification for Slash Commands / Events.
 * Docs: https://api.slack.com/authentication/verifying-requests-from-slack
 */
export async function POST(req: NextRequest) {
  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
  if (!slackSigningSecret) {
    return NextResponse.json(
      { error: "SLACK_SIGNING_SECRET not configured" },
      { status: 500 },
    );
  }

  const timestamp = req.headers.get("x-slack-request-timestamp");
  const slackSignature = req.headers.get("x-slack-signature");

  if (!timestamp || !slackSignature) {
    return NextResponse.json(
      { error: "Missing Slack signature headers" },
      { status: 400 },
    );
  }

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(timestamp)) > 60 * 5) {
    return NextResponse.json({ error: "Stale request" }, { status: 400 });
  }

  const rawBody = await req.text();

  const sigBasestring = `v0:${timestamp}:${rawBody}`;
  const mySignature =
    "v0=" +
    createHmac("sha256", slackSigningSecret)
      .update(sigBasestring, "utf8")
      .digest("hex");

  const valid =
    mySignature.length === slackSignature.length &&
    timingSafeEqual(Buffer.from(mySignature), Buffer.from(slackSignature));

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  console.log("IS VALID");
  const params = JSON.parse(rawBody) as {
    token: string;
    challenge?: string;
    type: string;
  };
  if (params.challenge) {
    return new NextResponse(params.challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
  interface SlackEvent {
    token: string;
    team_id?: string;
    api_app_id?: string;
    event?: {
      type?: string;
      user?: {
        id?: string;
        team_id?: string;
        name?: string;
        profile?: { status_text?: string; real_name?: string };
      };
    };
  }

  const eventObj: SlackEvent = params as unknown as SlackEvent;
  const eventType = eventObj.event?.type;

  function checkStatusForKeywords(statusText: string | undefined): boolean {
    if (!statusText) return false;
    const keywords = [
      "huddle",
      "in a meeting",
      "meeting",
      "busy",
      "do not disturb",
    ];
    const lower = statusText.toLowerCase();
    return keywords.some((k) => lower.includes(k));
  }

  if (eventType === "user_status_changed") {
    const statusText = eventObj.event?.user?.profile?.status_text ?? "";
    const userName =
      eventObj.event?.user?.profile?.real_name ??
      eventObj.event?.user?.name ??
      eventObj.event?.user?.id ??
      "unknown";

    console.log(`User ${userName} status changed to: '${statusText}'`);

    const inKeywords = checkStatusForKeywords(statusText);
    const headers = { "Content-Type": "application/json" };
    if (inKeywords) {
      console.log(`🔴 Keyword detected in status: '${statusText}'`);
      try {
        await fetch(
          `${process.env.WEBHOOK_BASE_URL}${process.env.HA_SLACK_IN_MEETING_WEBHOOK_ID}`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ value1: userName, value2: statusText }),
          },
        );
      } catch (e) {
        console.error("IFTTT in_meeting call failed", e);
      }
      return NextResponse.json(
        { message: "Status keyword detected and handled" },
        { status: 200 },
      );
    } else {
      console.log(`✅ No keywords found in status: '${statusText}'`);
      try {
        await fetch(
          `${process.env.WEBHOOK_BASE_URL}${process.env.HA_SLACK_LEFT_MEETING_WEBHOOK_ID}`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ value1: userName, value2: statusText }),
          },
        );
      } catch (e) {
        console.error("IFTTT left_meeting call failed", e);
      }
    }
  }

  return NextResponse.json({ message: "Event processed" }, { status: 200 });
}
