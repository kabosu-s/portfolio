import Link from "next/link";
import { ContactForm } from "@/components/features/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-black text-text hover:text-secondary transition-colors group"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span> Back to Home
        </Link>
        
        <div className="mt-8 p-8 bg-primary border-4 border-text shadow-large">
          <h1 className="text-5xl font-black tracking-tight text-text uppercase">Contact</h1>
          <p className="text-text font-bold mt-4 text-lg">
            デザインの相談、開発の依頼など、<br />
            こちらのフォームからお気軽にお問い合わせください。
          </p>
        </div>
      </div>

      <div className="p-8 border-4 border-text bg-surface shadow-large">
        <ContactForm />
      </div>
    </div>
  );
}
