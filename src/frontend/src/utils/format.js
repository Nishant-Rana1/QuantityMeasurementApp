export function formatNumber(value, digits = 6) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "0";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(Number(value));
}

export function formatDateTime(value) {
  if (!value) return "Just now";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function downloadText(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
