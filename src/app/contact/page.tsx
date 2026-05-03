import Link from "next/link";
import { ContactForm } from "@/components/features/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-12">
        <Link
          href="/"
          className="text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight mt-4">Contact</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          お問い合わせはこちらのフォームからお送りください。
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
