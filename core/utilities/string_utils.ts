import { Headers } from "node-fetch";

/* utility functions for strings */
export const number_or_zero = (input: any): number => {
  switch (typeof input) {
    case "number": return input;
    default:
      return is_number(input) ? Number(input) : 0;
  }
};

export const is_number = (input: any): boolean => {
  return !isNaN(input) && isFinite(input);
}
