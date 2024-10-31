import { Webhook } from "svix";
import { headers } from "next/headers";
import { EmailAddress, WebhookEvent } from "@clerk/nextjs/server";

import User from "@/app/Models/UserSchema";
import connect from "@/app/lib/connect";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created" && evt.data.email_addresses?.length > 0) {
    const { id, email_addresses } = evt.data;
    const newUser = {
      clerkUserId: id,
      emailAddress: email_addresses[0].email_address,
    };

    try {
      await connect();
      await User.create(newUser);
      console.log("User created");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("Webhook processed successfully", { status: 200 });
}
