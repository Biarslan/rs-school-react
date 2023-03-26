import ICard from '../types/Card';
import BulbasaurImg from '../assets/pokemons/001Bulbasaur.png';
import CharmanderImg from '../assets/pokemons/004Charmander.png';
import SquirtleImg from '../assets/pokemons/007Squirtle.png';
import CaterpieImg from '../assets/pokemons/010Caterpie.png';
import BeedrillImg from '../assets/pokemons/015Beedrill.png';
import RattataImg from '../assets/pokemons/019Rattata.png';
import ArbokImg from '../assets/pokemons/024Arbok.png';
import PidgeotImg from '../assets/pokemons/018Pidgeot.png';
import PikachuImg from '../assets/pokemons/025Pikachu.png';

const info: ICard[] = [
  {
    name: 'Bulbasaur',
    image: BulbasaurImg,
    description:
      'Grass/Poison-type Pokémon introduced in Generation I. It is one of the three First partner Pokémon that can be chosen in the Kanto region.',
    weight: '6.9kg',
    height: '0.7m',
    link: 'https://pokemon.fandom.com/wiki/Bulbasaur',
  },
  {
    name: 'Charmander',
    image: CharmanderImg,
    description:
      'Fire-type Pokémon introduced in Generation I. It evolves into Charmeleon starting at level 16, which evolves into Charizard starting at level 36.',
    weight: '8.5kg',
    height: '0.61m',
    link: 'https://pokemon.fandom.com/wiki/Charmander',
  },
  {
    name: 'Squirtle',
    image: SquirtleImg,
    description:
      'Water-type Pokémon introduced in Generation I. It evolves into Wartortle starting at level 16. It is one of the three First partner Pokémon that can be chosen in Kanto region.',
    weight: '9.0kg',
    height: '0.5m',
    link: 'https://pokemon.fandom.com/wiki/Squirtle',
  },
  {
    name: 'Caterpie',
    image: CaterpieImg,
    description:
      'Caterpie is a worm-like Pokémon that is mainly green in color with a tan underside. Caterpie are known for their great appetites, usually eating many leaves before creating cocoons to evolve. They use self-made silk to both produce cocoons for evolution.',
    weight: '2.9kg',
    height: '0.3m',
    link: 'https://pokemon.fandom.com/wiki/Caterpie',
  },
  {
    name: 'Beedrill',
    image: BeedrillImg,
    description:
      'Beedrill is extremely territorial and will attack anyone who gets too close to their hive. They are aggressive Pokémon and collectively attack the people around them.',
    weight: '29.5kg',
    height: '1.0m',
    link: 'https://pokemon.fandom.com/wiki/Beedrill',
  },
  {
    name: 'Rattata',
    image: RattataImg,
    description:
      'Rattata is rat-like, with large incisors, a slight hump on its back towards the rear, a slightly pudgy belly, and a whisker on both sides. Female Rattata have shorter whiskers than the males.',
    weight: '3.5kg',
    height: '0.3m',
    link: 'https://pokemon.fandom.com/wiki/Rattata',
  },
  {
    name: 'Arbok',
    image: ArbokImg,
    description:
      'This Pokémon is extremely territorial. Arbok are known to be vengeful and are absolutely ruthless in pursuing anyone or thing that angers them.',
    weight: '65.0kg',
    height: '3.5m',
    link: 'https://pokemon.fandom.com/wiki/Arbok',
  },
  {
    name: 'Pidgeot',
    image: PidgeotImg,
    description:
      'Pidgeot is a powerful flier, capable of creating whirlwinds strong enough to bend trees. At maximum velocity, it can reach speeds of Mach 2 (around 1522.2 mph).',
    weight: '39.5kg',
    height: '1.5m',
    link: 'https://pokemon.fandom.com/wiki/Pidgeot',
  },
  {
    name: 'Pikachu',
    image: PikachuImg,
    description:
      'Pikachu are usually friendly creatures that love to be cuddled. They love having their tails rubbed, especially at the base; they also like being stroked.',
    weight: '6.0kg',
    height: '0.4m',
    link: 'https://pokemon.fandom.com/wiki/Pikachu',
  },
];

export default info;
