import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// Define a type that handles both single and multiple values for form fields
// type FormDataValue = string | File | Array<string | File>;
// type FormDataObject = {
//   [key: string]: FormDataValue;
// };

// export function formDataToObject(formData: FormData): FormDataObject {
//   const obj: FormDataObject = {};
//   for (const [key, value] of formData.entries()) {
//     if (obj[key] !== undefined) {
//       // Ensure obj[key] is treated as an array if it's not undefined
//       if (!Array.isArray(obj[key])) {
//         // Explicitly cast obj[key] to FormDataValue to tell TypeScript this could be an array
//         obj[key] = [obj[key] as FormDataValue]; // Use casting to assure TypeScript of type safety
//       }
//       // Now TypeScript knows obj[key] is an array, no cast needed on this line
//       (obj[key] as Array<string | File>).push(value);
//     } else {
//       obj[key] = value;
//     }
//   }
//   return obj;
// }

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
