export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface ZippopotamUsResponse {
  places?: {
    ["place name"]: string;
    state: string;
    ["state abbreviation"]: string;
  }[];
}

export interface ZipData {
    city: string;
    state: string;
    distance: number | null;
  }
export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  location?: Location;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface SearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface Match {
  match: string;
}
