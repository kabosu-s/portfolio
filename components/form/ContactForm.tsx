'use client';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getForm, submitForm } from '@/app/api/sendMessage/route';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, {
    message: '名前を入力してください',
  }),
  from_mail: z.string().email({
    message: '有効なメールアドレスを入力してください',
  }),
  body: z.string().min(10, {
    message: 'メッセージは10文字以上で入力してください',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface FormDetails {
  inquiry_name: string;
  inquiry_info: string;
  thanks_text: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formDetails, setFormDetails] = useState<FormDetails>({
    inquiry_name: '',
    inquiry_info: '',
    thanks_text: '',
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      from_mail: '',
      body: '',
    },
  });

  useEffect(() => {
    const fetchFormDetails = async () => {
      const formId = 3;
      const response = await getForm(formId);
      setFormDetails(response.details);
    };

    fetchFormDetails();
  }, []);

  async function onSubmit(values: FormValues) {
    if (isConfirming) {
      setIsSubmitting(true);
      try {
        await submitForm(values);
        setIsSubmitted(true);
      } catch (error) {
        console.error('送信エラー:', error);
        toast('送信エラー', {
          description: '送信に失敗しました。もう一度お試しください。',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        });
      } finally {
        setIsSubmitting(false);
        setIsConfirming(false);
      }
    } else {
      setIsConfirming(true);
    }
  }

  function onBack() {
    setIsConfirming(false);
  }

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold">お問い合わせありがとうございます</h2>
        <p className="text-muted-foreground">
          {formDetails.thanks_text || 'お問い合わせを受け付けました。内容を確認の上、担当者より折り返しご連絡いたします。'}
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            form.reset();
          }}
          className="mt-6"
        >
          新しい問い合わせを作成
        </Button>
      </div>
    );
  }

  if (isConfirming) {
    const values = form.getValues();
    return (
      <div className="mr-0 ml-auto space-y-8 max-w-2xl">
        <h2 className="text-2xl font-bold">確認画面</h2>
        <p className="text-muted-foreground">
          こちらの内容で送信させていただきます。よろしければ「送信する」をクリックしてください。
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold">お名前</h3>
            <p className="mt-1 p-2 border bg-muted">{values.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold">メールアドレス</h3>
            <p className="mt-1 p-2 border bg-muted">{values.from_mail}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold">{formDetails.inquiry_name}</h3>
            <p className="mt-1 p-2 border bg-muted whitespace-pre-wrap">{values.body}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            修正する
          </Button>
          <Button type="button" onClick={() => onSubmit(values)} disabled={isSubmitting} className="flex-1">
            {isSubmitting ? '送信中...' : '送信する'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mr-0 ml-auto space-y-8 max-w-2xl">

        <p className="text-muted-foreground">
          {formDetails.inquiry_info || 'お問い合わせフォーム'}
        </p>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">お名前</FormLabel>
              <FormControl>
                <Input placeholder=" " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="from_mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">メールアドレス</FormLabel>
              <FormControl>
                <Input type="email" placeholder=" " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">{formDetails.inquiry_name}</FormLabel>
              <FormControl>
                <Textarea placeholder=" " className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          確認画面へ
        </Button>
      </form>
    </Form>
  );
}
