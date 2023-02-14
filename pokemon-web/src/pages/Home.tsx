import { Button } from "@material-tailwind/react";
import PokemonCard from "components/Card/PokemonCard";
import Nav from "components/Nav/Nav";
import { Pokemon, Request } from "interface";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Api from "Service/Api";

function HomePage() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [favorite, setFavorite] = useState("");
  const limit = 198;

  function countFavorites() {
    let getFavorite = localStorage.getItem("Favorite");
    let countGetFavorite: any = "0";
    if (getFavorite !== null) {
      getFavorite = JSON.parse(getFavorite);
      countGetFavorite = getFavorite?.length;
    } else {
      countGetFavorite = "0";
    }

    let newFavorite = countGetFavorite;

    setFavorite(newFavorite);
  }

  function next() {
    const newOffset = offset + limit;
    setOffset(newOffset);
  }
  function prev() {
    const newOffset = offset - limit;
    setOffset(newOffset);
  }

  useEffect(() => {
    async function getAllPokemons() {
      const response = await Api.get(
        `/pokemon/?limit=${limit}&offset=${offset}`
      );
      const { results } = response.data;

      const payloadPokemons = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types } = await getMoreInfo(pokemon.url);

          return {
            name: pokemon.name,
            id,
            types,
          };
        })
      );
      setAllPokemons(payloadPokemons);
      setPokemons(payloadPokemons);
    }

    getAllPokemons();
  }, [offset, setFavorite]);

  const [query, setQuery] = useState("");

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setQuery(enteredName);
  };

  const search = () => {
    let foundName = allPokemons.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    let foundID = allPokemons.filter((item) =>
      item.id.toString().includes(query.toLowerCase())
    );

    let foundType = allPokemons.filter((item) =>
      item.types.find((item) =>
        item.type.name.toString().includes(query.toLowerCase())
      )
    );
    console.log("foundType", foundType);

    let founds = [...foundName, ...foundID, ...foundType];

    setPokemons(founds);
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
      <Nav />
      <div className="flex justify-center p-4">
        <Link to="/favorites">
          <Button className="bg-red-600 w-10 h-10 max-sm:w-7 hover:shadow-lg hover:shadow-red-700 flex items-center justify-center">
            {favorite}
            <FaRegHeart />
          </Button>
        </Link>
        <input
          className="w-48 max-sm:w-7/12 mx-4 max-sm:mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={query}
          onChange={inputHandler}
          placeholder="Pesquise seu Pokemon"
        />
        <Button
          className="w-28 max-sm:w-20 h-10 text-white bg-blue-600 hover:bg-blue-800"
          onClick={search}
        >
          Pesquisar
        </Button>
      </div>
      <div className="grid justify-center mx-8 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
        {pokemons && pokemons.length > 0 ? (
          pokemons.map((item) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              url={item.url}
              types={item.types}
              favorites={countFavorites}
            />
          ))
        ) : (
          <h2>Pokemon não encontrado!</h2>
        )}
      </div>
      <div className="text-center">
        <div className="inline-flex items-center my-5">
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
