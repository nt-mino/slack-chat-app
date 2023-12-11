/**
 * @description メッセージの作成日時を取得する
 * @returns {string} 作成日時 ex) 12:00
 */
export const convertTimestampToDate = (timestamp: Date): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
