import { EmailTemplate } from "../../../components/email/test-email";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, address, state, zip, message, products, estimatedTotal } =
      body;
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
