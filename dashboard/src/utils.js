// 1234567.8 -> "12,34,567.80"
export const inr = (n) =>
  Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// 31428.95 -> "31.43k"
export const compact = (n) => {
  const v = Number(n || 0);
  return Math.abs(v) >= 1000 ? (v / 1000).toFixed(2) + "k" : v.toFixed(2);
};

// Every MongoDB _id starts with the time it was created.
export const timeFromId = (id) => {
  const seconds = parseInt(String(id).substring(0, 8), 16);
  if (!seconds) return "";
  return new Date(seconds * 1000).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};
