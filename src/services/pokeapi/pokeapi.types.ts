export type PokeapiResponse = {
  id: number;
  name?: string;
  pokemon?: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
};
