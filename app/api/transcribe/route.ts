import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'Falta configurar GROQ_API_KEY.' }, { status: 500 });

    const incoming = await request.formData();
    const audio = incoming.get('audio');
    if (!(audio instanceof File) || audio.size === 0) return NextResponse.json({ error: 'No llegó audio.' }, { status: 400 });

    const body = new FormData();
    body.append('file', audio, audio.name || 'pregunta.webm');
    body.append('model', 'whisper-large-v3-turbo');
    body.append('language', 'es');
    body.append('response_format', 'json');

    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body,
    });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || 'No pude transcribir el audio.' }, { status: response.status });

    return NextResponse.json({ text: String(data?.text || '').trim() });
  } catch {
    return NextResponse.json({ error: 'No pude procesar el audio.' }, { status: 500 });
  }
}
