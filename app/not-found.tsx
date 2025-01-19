import styles from '@/app/style/page.module.scss';
// app/not-found.tsx
export default function NotFound() {
  return (
      <section className={styles.mv_wrapper}>
      <h1>404</h1>
      <p>ページが見つかりませんでした</p>
    </section>
  );
}