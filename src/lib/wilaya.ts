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

export async function getWilayas() {
  const fullUrl =
    (process.env.NODE_ENV === "production"
      ? (process.env.VERCEL_URL as string)
      : "http://localhost:3000") + "/data/wilayas.json";

  const responseWilayas = await fetch(fullUrl);
  if (!responseWilayas.ok) {
    const errWilayas = await responseWilayas.json();
    console.error({ errWilayas });
    throw new Error("Something went wrong when getting Wilayas list.");
  }

  const wilayas: Wilaya[] = await responseWilayas.json();
  return wilayas;
}
