/*
    Small utility functions and helpers. Only functions are kept here like
    formatDate, Capitalize etc..
*/

export function formatLable(text: string): string {
  return text
    .replace(/([A-Z])/g, " $1") // split text
    .replace(/^./, (str) => str.toUpperCase()) // capitalize everything
    .trim(); // remove unecessary spaces
}

export function parseNumberOrKeepString(
  value: unknown,
): number | string | null {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return null;

    const num = Number(trimmed);
    return Number.isNaN(num) ? value : num;
  }
  return null;
}

export function capitalizeFirstLetter(text: string): string {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}
