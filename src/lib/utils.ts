import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function formDataToObject(
  formData: FormData
): Record<string, string | File | string[] | File[]> {
  const result: Record<string, any> = {};

  formData.forEach((value, key) => {
    // Check if the key already exists
    if (result.hasOwnProperty(key)) {
      // If it exists and is not an array, convert it into an array
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      // Push the new value to the array
      result[key].push(value);
    } else {
      // If it doesn't exist, just add the value
      result[key] = value;
    }
  });

  return result;
}
