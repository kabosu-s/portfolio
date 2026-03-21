"use client";

import { ReactNode } from "react";

interface MailtoProps {
  user: string;
  domain: string;
  children: ReactNode;
  className?: string;
}

export const Mailto = ({ user, domain, children, className }: MailtoProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // クリック時のみ結合して発火。クローラーには "user" と "domain" の断片しか見えない。
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={className}
      // a11y: スクリーンリーダーには「メールを送る」という意図を伝える
      aria-label="メールクライアントを起動して連絡する"
    >
      {children}
    </a>
  );
};