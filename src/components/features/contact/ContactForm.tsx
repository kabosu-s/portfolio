"use client";

import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  subject: z.string().min(1, "件名を入力してください"),
  message: z.string().min(1, "メッセージを入力してください"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-400 mb-2">
          送信完了
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          お問い合わせありがとうございます。メッセージは正常に送信されました。
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          別のメッセージを送る
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="山田 太郎"
            className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${
              errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-800"
            } rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all`}
          />
          {errors.name && (
            <p className="text-xs font-medium text-red-500">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-bold text-slate-700 dark:text-slate-300"
          >
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${
              errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"
            } rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all`}
          />
          {errors.email && (
            <p className="text-xs font-medium text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="text-sm font-bold text-slate-700 dark:text-slate-300"
        >
          件名 <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="お仕事のご依頼について"
          className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${
            errors.subject ? "border-red-500" : "border-slate-200 dark:border-slate-800"
          } rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all`}
        />
        {errors.subject && (
          <p className="text-xs font-medium text-red-500">{errors.subject}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-bold text-slate-700 dark:text-slate-300"
        >
          メッセージ <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder="こちらにメッセージを入力してください"
          className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${
            errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-800"
          } rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none`}
        />
        {errors.message && (
          <p className="text-xs font-medium text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin" />
            送信中...
          </>
        ) : (
          "メッセージを送信する"
        )}
      </button>
    </form>
  );
};
