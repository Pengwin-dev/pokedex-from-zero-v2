import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);



const defaultData= {
  
  labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
  datasets: [
    {
      label: 'Stat Distribution',
      data: [45, 49, 49, 65, 65, 45],
      backgroundColor: 'rgba(100, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
  
  
};




function PokemonCard() {
  

  const pokeApiDomain = `https://pokeapi.co/api/v2/pokemon/`;
  const [currentId, setCurrentId] = useState(1);
  const [pokemon, setPokemon] = useState({ sprites: {}, weight: 0, abilities: [], types: [], stats: [{hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0}]});
  const [loading, setLoading] = useState(false);
  const [weaknesses, setWeaknesses] = useState([]);
  const [stats,setStats] = useState([]);
  
  useEffect(() => {
    fetch(`${pokeApiDomain}${currentId}`)
    .then(response => response.json())
    .then((data)=>{
      setCurrentId(data.id);
      setPokemon(data);
      const typeUrls = data.types.map(type => type.type.url);
      typeUrls.map((url) => fetch(url)
      .then((response)=>response.json())
      .then((response)=> setWeaknesses(response.damage_relations.double_damage_from)))
      .then((response)=> setStats(response.stats));
      setLoading(false)

    })
    .catch((err)=>
    console.log(err))
  }, [currentId]);

  const getPokemon = (id) => {
    if(id > 0 && id < 152){
      setCurrentId(id);
    }
    else if( id === 0){
      setCurrentId(151);
      
    }
    else if(id===152){
      setCurrentId(1);
      
    }
    
      
    
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="pokemon"
        height="300"
        
        image={pokemon.sprites.front_default}
      />
      <CardContent>
        <Typography className = "pokemon-name" gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography className = "pokemon-types" variant="body2" color="text.secondary">
        Types: {pokemon.types.map((type) => type.type.name).join(', ')}
        
        </Typography>
        <Typography className = "pokemon-weaknesses" variant="body2" color="text.secondary">
        weaknesses: {weaknesses.map((weakness) => weakness.name).join(', ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" className="arrow-button left" onClick={() => getPokemon(currentId - 1)}> - </Button>
        <Button size="medium" className="arrow-button right" onClick={() => getPokemon(currentId + 1)}> + </Button>
      </CardActions>
      <Typography className = "pokemon-stats" variant="body2" color="text.secondary">
        Stats: {pokemon.stats.map((stat)=> stat.stat.name + ": " + stat.base_stat).join(', ')}
        </Typography>
      <Radar data={defaultData}/>
     
      
    </Card>
    
  );
}

export default PokemonCard;
