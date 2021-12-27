export const formatTime = (timestamp: Date) => {
  return `${timestamp.getFullYear()}/${("0" + (timestamp.getMonth() + 1)).slice(
    -2
  )}/${("0" + timestamp.getDate()).slice(-2)} ${(
    "0" + timestamp.getHours()
  ).slice(-2)}:${("0" + timestamp.getMinutes()).slice(-2)}`;
};
