import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// Define a type that handles both single and multiple values for form fields
type FormDataObject = {
  [key: string]: string | File | Array<string | File>;
};

export function formDataToObject(formData: FormData): FormDataObject {
  const obj: FormDataObject = {};
  for (const [key, value] of formData.entries()) {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      (obj[key] as Array<string | File>).push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
