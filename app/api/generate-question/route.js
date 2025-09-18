import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { difficulty, topic } = await request.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // 這裡只是示範 prompt，可調整
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // 或你想用的模型
      messages: [
        { role: 'system', content: 'You are an English teacher.' },
        { role: 'user', content: `Generate one listening practice question about '${topic}' at difficulty '${difficulty}'. Provide the question text and 4 options.` }
      ]
    });

    const questionText = completion.choices[0].message.content;

    return NextResponse.json({ question: questionText });
  } catch (err) {
    console.error('OpenAI generate question error:', err);
    return NextResponse.json({ error: 'Unable to generate question' }, { status: 500 });
  }
}
