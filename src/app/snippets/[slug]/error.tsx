"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="p-8 bg-danger border-4 border-text shadow-large">
        <h1 className="text-4xl md:text-5xl font-black text-surface uppercase leading-tight mb-4">
          Something went wrong!
        </h1>
        <p className="text-surface font-bold text-lg mb-8 leading-relaxed">
          スニペットの読み込み中にエラーが発生しました。
          <br />
          MDXの構文エラーや、一時的なネットワークの問題の可能性があります。
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-surface text-text border-4 border-text shadow-mini font-black text-xl uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hover transition-all"
          >
            Try again
          </button>
          <Link
            href="/snippets"
            className="px-8 py-4 bg-primary text-text border-4 border-text shadow-mini font-black text-xl uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hover transition-all"
          >
            Go back to list
          </Link>
        </div>
      </div>
    </div>
  );
}
