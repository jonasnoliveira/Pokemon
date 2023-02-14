import PokemonCard from "components/Card/PokemonCard";
import Nav from "components/Nav/Nav";
import { Pokemon} from "interface";

export default function FavoritePage() {
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
  }

  let pokemon = getPokemons();

  getPokemons();

  return (
    <div>
      <Nav />
      <div className="grid justify-center mx-8 my-4 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
        {pokemon && pokemon.length > 0 ? (
          pokemon.map(
            (item: Pokemon) => (
              <PokemonCard
                id={item.id}
                name={item.name}
                url={item.url}
                types={item.types}
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
