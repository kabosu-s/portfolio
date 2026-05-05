"use client";

import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "お名前を入力してください"),
  email: z.string().trim().email("有効なメールアドレスを入力してください"),
  subject: z.string().trim().min(1, "件名を入力してください"),
  message: z.string().trim().min(1, "メッセージを入力してください"),
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
      <div className="bg-success/20 border-4 border-text p-8 text-center shadow-[4px_4px_0px_0px_rgba(28,41,60,1)] dark:shadow-[4px_4px_0px_0px_rgba(251,251,249,1)]">
        <h2 className="text-3xl font-black text-text dark:text-surface mb-2 uppercase">
          Success!
        </h2>
        <p className="text-text dark:text-slate-300 font-bold mb-6">
          お問い合わせありがとうございます。メッセージは正常に送信されました。
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-2 bg-secondary text-surface border-2 border-text font-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-[2px_2px_0px_0px_rgba(28,41,60,1)] transition-all"
        >
          Another Message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label
            htmlFor="name"
            className="text-sm font-black text-text dark:text-surface uppercase tracking-wider"
          >
            お名前 <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="山田 太郎"
            className={`w-full px-4 py-3 bg-surface dark:bg-slate-800 border-2 ${
              errors.name ? "border-danger" : "border-text"
            } shadow-[2px_2px_0px_0px_rgba(28,41,60,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none outline-none transition-all font-bold text-text dark:text-surface`}
          />
          {errors.name && (
            <p className="text-xs font-black text-danger uppercase">{errors.name}</p>
          )}
        </div>
        <div className="space-y-3">
          <label
            htmlFor="email"
            className="text-sm font-black text-text dark:text-surface uppercase tracking-wider"
          >
            メールアドレス <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className={`w-full px-4 py-3 bg-surface dark:bg-slate-800 border-2 ${
              errors.email ? "border-danger" : "border-text"
            } shadow-[2px_2px_0px_0px_rgba(28,41,60,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none outline-none transition-all font-bold text-text dark:text-surface`}
          />
          {errors.email && (
            <p className="text-xs font-black text-danger uppercase">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="subject"
          className="text-sm font-black text-text dark:text-surface uppercase tracking-wider"
        >
          件名 <span className="text-danger">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="お仕事のご依頼について"
          className={`w-full px-4 py-3 bg-surface dark:bg-slate-800 border-2 ${
            errors.subject ? "border-danger" : "border-text"
          } shadow-[2px_2px_0px_0px_rgba(28,41,60,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none outline-none transition-all font-bold text-text dark:text-surface`}
        />
        {errors.subject && (
          <p className="text-xs font-black text-danger uppercase">{errors.subject}</p>
        )}
      </div>

      <div className="space-y-3">
        <label
          htmlFor="message"
          className="text-sm font-black text-text dark:text-surface uppercase tracking-wider"
        >
          メッセージ <span className="text-danger">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder="こちらにメッセージを入力してください"
          className={`w-full px-4 py-3 bg-surface dark:bg-slate-800 border-2 ${
            errors.message ? "border-danger" : "border-text"
          } shadow-[2px_2px_0px_0px_rgba(28,41,60,1)] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none outline-none transition-all resize-none font-bold text-text dark:text-surface`}
        />
        {errors.message && (
          <p className="text-xs font-black text-danger uppercase">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-primary text-text border-4 border-text shadow-[6px_6px_0px_0px_rgba(28,41,60,1)] dark:shadow-[6px_6px_0px_0px_rgba(251,251,249,1)] font-black text-xl uppercase tracking-tighter hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(28,41,60,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <span className="w-6 h-6 border-4 border-text border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message <span className="text-2xl">→</span>
          </>
        )}
      </button>
    </form>
  );
};
