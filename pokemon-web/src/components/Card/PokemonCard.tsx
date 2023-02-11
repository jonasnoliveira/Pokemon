import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Pokemon } from "interface";
import { FaHeart } from "react-icons/fa";

export default function PokemonCard(props: Pokemon) {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`;

  function Favorite() {
    let getFavorite: any = [];
    let local = localStorage.getItem("Favorite");

    if (local !== null) {
      local = JSON.parse(local);
      if (typeof local?.[0] === "object") {
        getFavorite = local;
      }
    }

    let favorite: Pokemon = props;

    let listFavorites;

    if (getFavorite.length > 0) {
      listFavorites = [...getFavorite, favorite];
    } else {
      listFavorites = [favorite];
    }

    localStorage.setItem("Favorite", JSON.stringify(listFavorites));
    props.favorites();
  }

  return (
    <Card className="w-68 max-sm:w-64 block border-2 rounded-md shadow-lg shadow-primaryDark border-blue-400 hover:border-blue-700">
      <CardHeader color="blue" className="relative h-40 shadow-none">
        <div className="flex flex-row items-center justify-between">
          <Typography variant="h5" className="m-2 text-black">
            #{props.id}
          </Typography>
          <Button
            className="bg-red-600 w-6 h-6 flex items-center justify-center hover:text-red-600 hover:bg-white focus:text-red-600 focus:bg-white"
            onClick={Favorite}
          >
            <FaHeart />
          </Button>
        </div>
        <img src={image} alt="img-blur-shadow" className="h-full w-full" />
      </CardHeader>
      <CardBody className="flex items-center justify-center p-3">
        <button className="w-24 m-1 mt-6 border-2 border-blue-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-md p-2">
          {props.name}
        </button>
        {props.types.map((pokemonType) => (
          <button className="w-24 m-1 mt-6 border-2 border-blue-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 rounded-md p-2">
            {pokemonType.type.name}
          </button>
        ))}
      </CardBody>
    </Card>
  );
}
