import { SubmitData, FormResponse } from "@/app/_types/types";

export const API_BASE = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

/**
* サーバーからフォーム データを取得します。
* @param {number} formId - 取得するフォームの ID。
* @returns {Promise<Response>} - フォーム応答データ。
*/


export const getForm = async (formId: number): Promise<FormResponse> => {
  try {
    const res = await fetch(`${API_BASE}/6/form/${formId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch form data: ${res.statusText}`);
    }

 // レスポンスを JSON に変換
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
  // エラーハンドリングのためにデフォルトの `details` を返す
    return {
      details: {
        inquiry_name: '',
        inquiry_info: 'エラーが発生しました。後ほど再試行してください。',
        thanks_text: '',
      },
    };
  }
};

/**
* フォームデータをサーバーに送信します。
* @param {SubmitData} data - 送信するフォームデータ。
* @returns {Promise<void>}
*/
export const submitForm = async (data: SubmitData): Promise<void> => {
  try {
    const res = await fetch(`${API_BASE}/6/form`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }
  } catch (error) {
    console.error('Error in submitForm:', error);
    throw error;
  }
};
