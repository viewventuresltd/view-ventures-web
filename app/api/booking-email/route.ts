import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { COMPANY_INBOX } from "../../lib/booking/handoff";

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export async function POST(req: NextRequest) {
  try {
    const { replyTo, subject, text } = await req.json();

    // The recipient is fixed server-side; the browser only supplies the content.
    if (typeof replyTo !== "string" || !EMAIL_RE.test(replyTo) || replyTo.length > 254) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (typeof subject !== "string" || typeof text !== "string" || !subject.trim() || !text.trim()) {
      return NextResponse.json({ error: "Missing booking details." }, { status: 400 });
    }
    if (subject.length > 300 || text.length > 5000) {
      return NextResponse.json({ error: "Booking details are too long." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"View Ventures Booking" <${process.env.CONTACT_EMAIL_USER}>`,
      to: COMPANY_INBOX,
      replyTo,
      subject: subject.replace(/[\r\n]+/g, " "),
      text,
    });

    return NextResponse.json({ delivered: info.accepted.length > 0 });
  } catch (err) {
    console.error("Booking email error:", err);
    return NextResponse.json({ error: "Failed to send booking request." }, { status: 500 });
  }
}
