import { Button } from "@material-tailwind/react";
import PokemonCard from "components/Card/PokemonCard";
import Nav from "components/Nav/Nav";
import { Pokemon, PokemonTypes } from "interface";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";

export default function FavoritePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  function getPokemons() {
    let getFavorite: any = [];

    let local = localStorage.getItem("Favorite");
    if (local !== null) {
      local = JSON.parse(local);
      if (typeof local?.[0] === "object") {
        getFavorite = local;
      }
    }
    return getFavorite;
    console.log(getFavorite);
  }

  let pokemon = getPokemons();

  getPokemons();

  useEffect(() => {}, []);

  return (
    <div>
      <Nav />
      <div className="grid justify-center mx-8 my-4 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
        {pokemon && pokemon.length > 0 ? (
          pokemon.map(
            (item: {
              id: number;
              name: string;
              url: string;
              types: PokemonTypes[];
            }) => (
              <PokemonCard
                id={item.id}
                name={item.name}
                url={item.url}
                types={item.types}
                favorites={0}
              />
            )
          )
        ) : (
          <h2>Pokemon não encontrado!</h2>
        )}
      </div>
    </div>
  );
}
