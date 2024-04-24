export type Wilaya = {
  city: string;
  lat: string; // Assuming latitude as string since the data comes in string format, can be converted to number if necessary
  lng: string; // Assuming longitude as string for the same reason as latitude
  country: string;
  iso2: string;
  admin_name: string;
  capital: string; // Could be an empty string if not a capital, so keep as string
  population: string; // Population as a string, but can be converted to number if needed for calculations
  population_proper: string; // Similarly treated as string as above
};

// export async function getWilayas() {
//   const fullUrl =
//     (process.env.NODE_ENV === "production"
//       ? `https://${process.env.VERCEL_URL as string}`
//       : "http://localhost:3000") + "/data/wilayas.json";

//   console.log({ fullUrl });

//   try {
//     const responseWilayas = await fetch(fullUrl);
//     if (!responseWilayas.ok) {
//       const errorBody = await responseWilayas.text(); // Get full response body
//       console.error("HTTP Status:", responseWilayas.status);
//       console.error("Response Headers:", responseWilayas.headers);
//       console.error("Response Body:", errorBody.substring(0, 500)); // Print first 500 chars of the response
//       throw new Error("Error with getting wilayas");
//     }

//     const wilayasRaw = await responseWilayas.text();
//     // console.log({ wilayasRaw });

//     const wilayas: Wilaya[] = JSON.parse(wilayasRaw);
//     return wilayas;
//   } catch (err) {
//     console.error("Error GET wilayas caught:", err);
//     throw err;
//   }
// }
