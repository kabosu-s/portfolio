'use client';
import { useCursorEffect } from '@/hooks/useCursorEffect';
import styles from '@/components/cursor/Customcursor.module.scss';
import { useState } from 'react';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };
  // isVisible をフックに渡して、フック内部で制御
  useCursorEffect(isVisible);

  return (
    <>
      <label htmlFor="cursor-toggle" className={styles.cursor_label} aria-label="背景エフェクトスイッチ">
        <button role="switch" id="cursor-toggle" className={styles.cursor_button}  aria-checked={isVisible} onClick={handleToggle} tabIndex={0} />
      </label>
      <div className={styles.cursor_container} id="cursor" />
    </>
  );
};
export default CustomCursor;
