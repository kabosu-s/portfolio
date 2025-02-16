'use client';
import { useCursorEffect } from '@/app/_hooks/useCursorEffect';
import styles from '@/app/_components/cursor/Customcursor.module.scss';
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
      <label className={styles.cursor_label}>
        <input
          type="checkbox"
          className={styles.cursor_checkbox}
          checked={isVisible}
          onChange={handleToggle}
        />
      </label>
      {isVisible && <div className={styles.cursor_container} id="cursor" />}
    </>
  );
};
export default CustomCursor;
