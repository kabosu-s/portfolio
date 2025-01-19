"use client";
import { useCursorEffect } from "@/app/_hooks/useCursorEffect";
import styles from "@/app/_components/cursor/Customcursor.module.scss";
const CustomCursor = () => {
  useCursorEffect();
  return (
    <div
    className={styles.cursor_container}
      id="cursor"
    />
  );
};

export default CustomCursor;
