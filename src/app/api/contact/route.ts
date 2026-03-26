import { NextResponse } from "next/server";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "supertaiyaki0141@gmail.com";

type ContactPayload = {
  name: string;
  email: string;
  category: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    // Content-Type validation
    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "不正なリクエストです" },
        { status: 415 }
      );
    }

    const body: ContactPayload = await req.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "必須項目を入力してください" },
        { status: 400 }
      );
    }

    // Sanitize inputs - strip HTML tags to prevent XSS
    const sanitize = (s: string) => s.replace(/<[^>]*>/g, "").trim();
    body.name = sanitize(body.name);
    body.email = body.email.trim();
    body.message = sanitize(body.message);
    body.category = sanitize(body.category ?? "other");

    // Name length validation
    if (body.name.length > 100) {
      return NextResponse.json(
        { error: "お名前は100文字以内にしてください" },
        { status: 400 }
      );
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください" },
        { status: 400 }
      );
    }

    // Category validation
    const validCategories = ["question", "correction", "ad", "collaboration", "other"];
    if (!validCategories.includes(body.category)) {
      body.category = "other";
    }

    // Rate limiting: max message length
    if (body.message.length > 5000) {
      return NextResponse.json(
        { error: "メッセージは5,000文字以内にしてください" },
        { status: 400 }
      );
    }

    // Option 1: Use a third-party email service (Resend, SendGrid, etc.)
    // For now, log the contact and return success.
    // In production, replace with actual email sending.
    //
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "AI副業ハック <noreply@ai-fukugyo-hack.com>",
    //   to: CONTACT_EMAIL,
    //   replyTo: body.email,
    //   subject: `[お問い合わせ] ${body.category}: ${body.name}`,
    //   text: `
    //     名前: ${body.name}
    //     メール: ${body.email}
    //     種類: ${body.category}
    //     ---
    //     ${body.message}
    //   `,
    // });

    console.log("[Contact Form]", {
      to: CONTACT_EMAIL,
      name: body.name,
      email: body.email,
      category: body.category,
      messageLength: body.message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
