import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Pokemon } from "interface";

export default function PokemonCard(props: Pokemon) {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`

  return (
    <Card className="w-56 border-2 border-blue-400">
      <CardHeader color="blue" className="relative h-40">
        <Typography variant="h5" color="gray" className="m-2">
          #{props.id}
        </Typography>
        <img src={image} alt="img-blur-shadow" className="h-full w-full" />
      </CardHeader>
      <CardBody className="flex items-center justify-center p-3">
        <Typography variant="h5" className="m-2">
          {props.name}
        </Typography>
        {props.types.map(pokemonType =>
        <Typography variant="h5" color="gray" className="m-2">
           {pokemonType.type.name}
        </Typography>
        )}
      </CardBody>
    </Card>
  );
}
