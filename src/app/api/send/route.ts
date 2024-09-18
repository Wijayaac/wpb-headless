import { EmailTemplate } from "../../../components/email/test-email";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);
interface CloudflareTurnstileResponse {
  success: boolean;
  "errors-codes": string[];
  challenge_ts: string;
  hostname: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      address,
      state,
      zip,
      message,
      products,
      estimatedTotal,
      token,
    } = body;

    const turnsstileRequest = await fetch(
      `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
      {
        method: "POST",
        body: `secret=${encodeURIComponent(
          process.env.TURNSTILE_SECRET_KEY!,
        )}&response=${encodeURIComponent(token)}`,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      },
    );

    const turnstileResponse =
      (await turnsstileRequest.json()) as CloudflareTurnstileResponse;

    if (!turnstileResponse.success) {
      return Response.json({ message: "Invalid token" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["wijayaac25@gmail.com"],
      subject: "New Product Inquiry",
      react: EmailTemplate({
        name,
        address,
        state,
        zip,
        message,
        products,
        estimatedTotal,
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
