/**
 * Book-button handoff. This is the only function a Book button should call.
 *
 * `handoffBooking` POSTs the composed email to /api/booking-email, which sends
 * it to `COMPANY_INBOX` with `replyTo` set to the passenger. The mail secret
 * stays on the server.
 */
export const COMPANY_INBOX = "tsolakisg@viewventures.co";

export type CoachId = "minivan" | "minibus" | "midi" | "coach";

export type BookingRequest = {
  pickup: string;
  destination: string;
  when: string;
  returnWhen: string;
  passengers: number;
  coachId: CoachId;
  coachLabel: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export type BookingEmail = {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

export type HandoffResult = {
  delivered: boolean;
  email: BookingEmail;
};

export function composeBookingEmail(request: BookingRequest): BookingEmail {
  const when = request.when.replace("T", " ");
  const back = request.returnWhen ? request.returnWhen.replace("T", " ") : "one way";
  const lines = [
    "New coach request from Hermes",
    "",
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    `Phone: ${request.phone}`,
    "",
    `From: ${request.pickup}`,
    `To: ${request.destination}`,
    `Depart: ${when}`,
    `Return: ${back}`,
    `Passengers: ${request.passengers}`,
    `Coach: ${request.coachLabel}`,
    "",
    request.notes ? `Notes: ${request.notes}` : "Notes: —",
  ];
  return {
    to: COMPANY_INBOX,
    replyTo: request.email.trim(),
    subject: `Hermes · ${request.pickup} → ${request.destination} · ${request.passengers} pax · ${request.coachLabel}`,
    text: lines.join("\n"),
  };
}

export async function handoffBooking(request: BookingRequest): Promise<HandoffResult> {
  const email = composeBookingEmail(request);
  const res = await fetch("/api/booking-email", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(email),
  });
  if (!res.ok) throw new Error("Could not send the request");
  const { delivered } = (await res.json()) as { delivered?: boolean };
  return { delivered: delivered === true, email };
}
