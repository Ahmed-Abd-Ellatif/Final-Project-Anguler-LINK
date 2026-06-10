export interface Lookups {
  _id: string;
  name: string;
}

export interface LookupsApiResponse {
  status: string;
  results: number;
  data: Lookups[];
}
