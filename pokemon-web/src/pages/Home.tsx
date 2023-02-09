import { Button } from "@material-tailwind/react";
import PokemonCard from "components/Card/PokemonCard";
import { Pagination } from "components/Pagination";
import Sidebar from "components/Side/Side";
import { Pokemon, Request } from "interface";
import React, { useEffect, useState } from "react";
import Api from "service/Api";

function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const limit = 198;

  function next() {
    const newOffset = offset + limit;
    setOffset(newOffset);
  }
  function prev() {
    const newOffset = offset - limit;
    setOffset(newOffset);
    console.log(newOffset);
  }

  useEffect(() => {
    async function getAllPokemons() {
      const response = await Api.get(
        `/pokemon/?limit=${limit}&offset=${offset}`
      );
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
  }, [offset, setCount]);

  const [query, setQuery] = useState("");

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setQuery(enteredName);
  };

  const search = () => {
    let foundName = pokemons.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log("foundName", foundName);
    // let foundId = pokemons.filter((item) => {
    //   item.id.toString().includes(query.toLowerCase());
    // });
    // console.log("foundId", foundId);
    let foundTypes = pokemons.filter((item) =>
      item.types.map((pokemonType) => {
        pokemonType.type.name.includes(query.toLowerCase());
      })
    );
    console.log("foundTypes", foundTypes);
    // let foundItems = [...foundName, ...foundId, ...foundTypes];
    setPokemons(foundName);
  };

  async function getMoreInfo(url: string): Promise<Request> {
    const response = await Api.get(url);
    const { id, types } = response.data;

    return {
      id,
      types,
    };
  }

  return (
    <div>
      <Sidebar />
      <div className="p-4">
        <input
          className="w-48 mx-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={query}
          onChange={inputHandler}
          placeholder="Pesquise o nome"
        />

        <Button className="w-28 bg-blue-600" onClick={search}>
          Pesquisar
        </Button>
      </div>
      <div className="grid mx-16 grid-cols-6 gap-6">
        {pokemons && pokemons.length > 0 ? (
          pokemons.map((item) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              url={item.url}
              types={item.types}
            />
          ))
        ) : (
          <h2>Pokemon não encontrado</h2>
        )}
      </div>
      <div className="text-center">
        <div className="inline-flex items-center mt-5">
          <button
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={prev}
          >
            Anterior
          </button>
          <button
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={next}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
