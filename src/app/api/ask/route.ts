import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured' },
      { status: 500 },
    );
  }

  let body: { question?: string; articleTitle?: string; articleContent?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { question, articleTitle, articleContent } = body;
  if (!question?.trim()) {
    return NextResponse.json({ error: 'Question is required' }, { status: 400 });
  }

  const systemPrompt = `You are a helpful assistant for Kameralog Malaysia — a camera gear and content creation resource for Malaysian creators.

Answer the user's question using ONLY the provided article as context. Be concise (2-4 sentences). Be specific and practical. If the article doesn't contain enough information to answer, say so briefly. Use the same language the question was asked in.

Rules:
- Be direct. No fluff, no "Great question!" filler.
- Mention specific prices in RM when relevant.
- Reference the article by name when useful.
- If unsure, say "This article doesn't cover that specifically" rather than guessing.`;

  const userPrompt = articleContent
    ? `Article: "${articleTitle}"\n\n---\n\n${articleContent.slice(0, 6000)}\n\n---\n\nQuestion: ${question}`
    : `Article: "${articleTitle}"\n\nQuestion: ${question}`;

  try {
    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 300,
          topP: 0.8,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Gemini API error:', res.status, err);
      return NextResponse.json(
        { error: 'Failed to generate answer' },
        { status: 502 },
      );
    }

    const data = await res.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      return NextResponse.json(
        { error: 'No answer generated — try rephrasing your question' },
        { status: 200 },
      );
    }

    return NextResponse.json({ answer: answer.trim() });
  } catch (err) {
    console.error('Ask API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
