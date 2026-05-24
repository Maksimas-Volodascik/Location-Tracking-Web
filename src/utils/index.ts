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
