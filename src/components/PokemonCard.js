import '../styles/PokemonCard.css';
import { useState, useEffect, useContext } from 'react';
import{Card,Avatar,IconButton, CardHeader, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import MediaCard from './CustomCards';
import { NavBar } from './UI/NavBar';

function PokemonCard() {
  const pokeApiDomain = `https://pokeapi.co/api/v2/pokemon/`;
  const [currentId, setCurrentId] = useState(1);
  const [pokemon, setPokemon] = useState({sprites:{other:{"official-artwork":{}}}, weight:0, abilities:[]});
  const [isLoading, setIsLoading] = useState(false);
  const [weaknes, setweaknes] = useState([]);
  const [statsInfo, setStatsInfo] = useState([]);


  const getPokemon = (id) => {
    id= id > 150 ? 1 : id < 1 ? 150 : id;
    setCurrentId(id);
  };

  async function setPokemonDamage1 (info) {
    setweaknes([]);
    let typeUrls= info.types.map(item =>item.type.url);
    let results = [];
    
    await Promise.all(typeUrls.map(async (typeUrl) => {
      await fetch(typeUrl)
      .then(response => response.json())
      .then(data => {
        let damageFromDouble = data.damage_relations.double_damage_from
                              .map(x=>x.name);
        results.push(damageFromDouble);
      })
    }));

    results.forEach(element => {
      element.forEach(newType => {
        weaknes.push(newType);
      });
    });

    setweaknes([...new Set(weaknes)]);
    
    return weaknes;
  }

  const getPokemonDamage = (info) => {
    return setPokemonDamage1(info);
  }
  
  const setStatsInformation = (pokemonInfo1)=>{
    let label1 = [];
    let stats1 = [];

    console.log(pokemonInfo1);
    pokemonInfo1.stats.forEach(element => {
      label1.push(element.stat.name);
      stats1.push(element.base_stat);
    });
    
    setStatsInfo({labels: label1, stats: stats1});
  }

  useEffect(() => {
    setIsLoading(true);
    getPokemon(currentId);
    fetch(`${pokeApiDomain}${currentId}`)
      .then(response => response.json())
      .then(pokemonData => {
        setCurrentId(pokemonData.id);
        setPokemon(pokemonData);
        getPokemonDamage(pokemonData);
        setStatsInformation(pokemonData);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, [currentId]);

  return (
    <div className="App">
      <header className="App-header">
      <NavBar>hola </NavBar>
        {
          isLoading ? (
            <>
              <h1>Loading.....</h1>
            </>
          ) : (
          <div>
              {/* Head container */ }
            <div style=
              {{
                borderRadius:'5px',
                boxShadow: '0 0 0 .4em yellow',
                display: 'flex',
                flexDirection:'row',
                zIndex:100

              }}>
              <div style= {{marginRight:'-23px', zIndex:1, display:'flex', alignItems:'center'}}>
                <button onClick = {()=> getPokemon(currentId-1)}>{'<'}</button>
              </div>
              <div>
                <MediaCard  pokemonInfo= {pokemon} weaknessess={weaknes} statsInfo={statsInfo}/>
              </div>
              <div style={{marginLeft:'-23px', zIndex:1, display:'flex', alignItems:'center'}}>
                <button onClick={()=> getPokemon(currentId + 1)}>{'>'}</button>
              </div>        
            </div> 
          </div>
          )
        }
      </header >
    </div >
  );
}

export default PokemonCard;