export type PokemonTypes = {
  type: {
    name: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  url: string;
  types: PokemonTypes[];
};

export type Request = {
  id: number;
  types: PokemonTypes[];
};

export type Page = {
  next: () => {} | null;
  prev: () => {} | null;
};
