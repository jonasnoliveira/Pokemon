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

  return (
    <Card className="w-68 block border-2 border-blue-400">
      <CardHeader color="blue" className="relative h-40">
        <div className="flex flex-row items-center justify-between">
          <Typography variant="h5" color="gray" className="m-2">
            #{props.id}
          </Typography>
          <Button>
            <FaHeart />
          </Button>
        </div>
        <img src={image} alt="img-blur-shadow" className="h-full w-full" />
      </CardHeader>
      <CardBody className="flex items-center justify-center p-3">
        <button className="w-24 m-1 mt-6 border-2 border-blue-700 rounded-md p-2">
          {props.name}
        </button>
        {props.types.map((pokemonType) => (
          <button className="w-24 m-1 mt-6 border-2 border-blue-700 rounded-md p-2">
            {pokemonType.type.name}
          </button>
        ))}
      </CardBody>
    </Card>
  );
}
