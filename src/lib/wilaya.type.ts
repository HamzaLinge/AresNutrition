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
