'use server';
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

export async function getForm(formId: number): Promise<FormResponse> {
  try {
    const res = await fetch(`${API_BASE}/6/form/${formId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch form data: ${res.statusText}`);
    }

    const data = await res.json();
    return {
      details: data.details || {
        inquiry_name: '',
        inquiry_info: '',
        thanks_text: '',
      },
    };
  } catch (error) {
    console.error('Error in getForm:', error);
    return {
      details: {
        inquiry_name: '',
        inquiry_info: 'エラーが発生しました。後ほど再試行してください。',
        thanks_text: '',
      },
    };
  }
}

export async function submitForm(formData: SubmitData) {
  const result = formSchema.safeParse(formData);

  if (!result.success) {
    throw new Error('バリデーションエラー');
  }

  try {
    const res = await fetch(`${API_BASE}/6/form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'サーバーエラーが発生しました');
    }

    return true;
  } catch (error) {
    console.error('Error in submitForm:', error);
    throw error;
  }
}
