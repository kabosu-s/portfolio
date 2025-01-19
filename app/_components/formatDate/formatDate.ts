export const formatDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.getDay();
  const week = ["Sun", "Mon", "火", "水", "木", "金", "土"][day];
  return `${year}/${month}/${date} (${week})`;
};