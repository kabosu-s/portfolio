'use client';
import React, { useRef, useEffect } from 'react';
import { ScrambleTextProps } from '@/types/types';

class TextScramble {
  el: HTMLElement;
  chars: string;
  frameRequest: number | null;
  frame: number;
  queue: Array<any>;
  resolve?: () => void;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#__';
    this.frameRequest = null;
    this.frame = 0;
    this.queue = [];
    this.update = this.update.bind(this);
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 5);
      const end = start + Math.floor(Math.random() * 3);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest as number);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span>${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve?.();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, hoverText }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const fxRef = useRef<TextScramble | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      fxRef.current = new TextScramble(elementRef.current);
    }
  }, []);

  const handleMouseEnter = () => {
    fxRef.current?.setText(hoverText);
  };

  const handleMouseLeave = () => {
    fxRef.current?.setText(text);
  };

  return (
    <div
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </div>
  );
};

export default ScrambleText;
