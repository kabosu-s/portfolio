'use client';
import { useState, useEffect } from 'react';
import { Response, SubmitData } from '@/app/_types/types';
import { getForm, submitForm } from '@/app/_api/sendMessage/route';
import styles from '@/app/_components/form/Contactform.module.scss';

const FORM_ID = 3;

const FormPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitData, setSubmitData] = useState<SubmitData>({
    name: '',
    from_mail: '',
    body: '',
  });
  const [error, setError] = useState<{ message: string }[] | null>(null);
  const [response, setResponse] = useState<Response>({ details: {} });

  const validateForm = (): { isValid: boolean; errors: { message: string }[] } => {
    const errors: { message: string }[] = [];
    if (!submitData.name) {
      errors.push({ message: 'お名前は必須です' });
    }
    if (!submitData.from_mail) {
      errors.push({ message: 'メールは必須です' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitData.from_mail)) {
      errors.push({ message: 'メールの形式が正しくありません' });
    }
    if (!submitData.body) {
      errors.push({ message: '内容は必須です' });
    }
    return { isValid: errors.length === 0, errors };
  };

  const handleOnValidate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { isValid, errors } = validateForm();
    if (!isValid) {
      setError(errors);
      return;
    }
    setValidated(true);
    setError(null);
  };

  const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await submitForm(submitData);
      setSubmitted(true);
      setError(null);
    } catch (e: any) {
      console.error('Error response:', e.response?.data || e);
      setError(e.response?.errors || [{ message: '不明なエラーが発生しました' }]);
    }
  };
  const textLines2texts = (textLines: string = ''): string[] => {
    return textLines.split('\r\n');
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formResponse = await getForm(FORM_ID);
        setResponse(formResponse);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };
    fetchForm();
  }, []);

  return (
    <>
      <div className={`${styles.message_wrap}`}>
        {textLines2texts(response.details.inquiry_info || '').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      {submitted ? (
        <div className={`${styles.message_wrap}`}>
          {textLines2texts(response.details.thanks_text || '').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      ) : validated ? (
        <div className={`${styles.form_wrap} ${styles.confirmation}`}>
          <p>この内容でお送りします。</p>
            <dl>
              <dt>お名前</dt>
              <dd>{submitData.name}</dd>
            </dl>
            <dl>
              <dt>メール</dt>
              <dd>{submitData.from_mail}</dd>
            </dl>
            <dl >
              <dt>内容</dt>
              <dd className={`${styles.textarea}`}>{submitData.body}</dd>
            </dl>

          <div className={`${styles.button_wrap}`}>
            <button className={`${styles.button}`} onClick={() => setValidated(false)}>
              <span>書き直す</span>
            </button>
            <button className={`${styles.button}`} onClick={handleOnSubmit}>
              <span>送信する</span>
            </button>
          </div>
        </div>
      ) : (
        <form>
          {error && (
            <ul className={`${styles.message_wrap}`}>
              {error.map((err, idx) => (
                <li className={`${styles.error}`} key={idx}>{err.message}</li>
              ))}
            </ul>
          )}
          <div className={`${styles.form_wrap}`}>
            <dl>
              <dt>
                <label className={`${styles.label}`}>お名前</label>
              </dt>
              <dd>
                <input
                  type="text"
                  name="name"
                  className={`${styles.input_text}`}
                  value={submitData.name || ''}
                  onChange={(e) => setSubmitData({ ...submitData, name: e.target.value })}
                />
              </dd>
            </dl>
            <dl>
              <dt>
                <label className={`${styles.label}`}>メール</label>
              </dt>
              <dd>
                <input
                  type="text"
                  name="from_mail"
                  className={`${styles.input_text}`}
                  value={submitData.from_mail || ''}
                  onChange={(e) => setSubmitData({ ...submitData, from_mail: e.target.value })}
                />
              </dd>
            </dl>
            <dl>
              <dt>
                <label className={`${styles.label}`}>内容</label>
              </dt>
              <dd>
                <textarea
                  name="body"
                  className={`${styles.input_text} ${styles.textarea}`}
                  value={submitData.body || ''}
                  onChange={(e) => setSubmitData({ ...submitData, body: e.target.value })}
                />
              </dd>
            </dl>
          </div>
          <div className={`${styles.button_wrap}`}>
            <button className={`${styles.button}`} onClick={handleOnValidate}>
              <span>確認する</span>
            </button>
          </div>
        </form>
      )}
    </>
  );
};
export default FormPage;
