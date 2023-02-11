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
  favorites: any;
};

export type Request = {
  id: number;
  types: PokemonTypes[];
};