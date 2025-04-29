'use server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const API_BASE = process.env.NEXT_PUBLIC_API_ENDPOINT || '';
const formSchema = z.object({
  name: z.string().min(1),
  from_mail: z.string().email(),
  body: z.string().min(10),
});
type SubmitData = z.infer<typeof formSchema>;
interface FormResponse {
  details: {
    inquiry_name: string;
    inquiry_info: string;
    thanks_text: string;
  };
}

// GETリクエストハンドラー
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get('formId');

    if (!formId) {
      return NextResponse.json(
        { error: 'formId is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_BASE}/6/form/${formId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch form data: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json({
      details: data.details || {
        inquiry_name: '',
        inquiry_info: '',
        thanks_text: '',
      },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      {
        details: {
          inquiry_name: '',
          inquiry_info: 'エラーが発生しました。後ほど再試行してください。',
          thanks_text: '',
        },
      },
      { status: 500 }
    );
  }
}

// POSTリクエストハンドラー
export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      return NextResponse.json(
        { error: 'バリデーションエラー' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_BASE}/6/form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || 'サーバーエラーが発生しました' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
