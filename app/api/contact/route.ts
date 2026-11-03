import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if ([firstName, lastName, email, message].some((v) => typeof v !== "string") || !EMAIL_RE.test(email) || message.length > 5000) {
      return NextResponse.json({ error: "Invalid inquiry." }, { status: 400 });
    }
    const safe = { firstName: escapeHtml(firstName), lastName: escapeHtml(lastName), email: escapeHtml(email), message: escapeHtml(message) };

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"View Ventures Contact" <${process.env.CONTACT_EMAIL_USER}>`,
      to: "tsolakisg@viewventures.co",
      replyTo: email,
      subject: `New inquiry from ${firstName} ${lastName}`.replace(/[\r\n]+/g, " "),
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #1456B4;">New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
          <hr style="border-color: #eee;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${safe.message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
