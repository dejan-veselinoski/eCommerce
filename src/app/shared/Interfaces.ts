export interface FacetWithValues {
    id: string;
    name: string;
    values: Array<{
        id: string;
        name: string;
        count: number;
    }>;
  }
