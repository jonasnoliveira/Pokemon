import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from "react";
import Api from "Service/Api";

type PokemonTypes = {
  type: string;
};

type Pokemon = {
  name: string;
  url: string;
  id: number;
  types: PokemonTypes[];
};

type Request = {
  id: number;
  types: PokemonTypes[];
};

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function getAllPokemons() {
      const response = await Api.get("/pokemon");
      const { results } = response.data;

      const payloadPokeemons = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types } = await getMoreInfo(pokemon.url);

          return {
            name: pokemon.name,
            id,
            types,
          };
        })
      );
      setPokemons(payloadPokeemons);
    }

    getAllPokemons();
  }, []);

  async function getMoreInfo(url: string): Promise<Request> {
    const response = await Api.get(url);
    const { id, types } = response.data;

    return {
      id,
      types,
    };
  }

  return <div>
    {pokemons.map(item => <h1>{item.name}</h1>)}
  </div>;
}

export default App;
