import '../styles/PokemonCard.css';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { NavBar } from './UI/NavBar';

function PokemonCard() {
  const pokeApiDomain = `https://pokeapi.co/api/v2/pokemon/`;
  const [currentId, setCurrentId] = useState(1);
  const [pokemon, setPokemon] = useState({sprites:{other:{"official-artwork":{}}}, weight:0, abilities:[]});
  const [isLoading, setIsLoading] = useState(false);
  const [weaknes, setWeaknesses] = useState([]);
  const [statsInfo, setStatsInfo] = useState([]);


  const getPokemon = (id) => {
    id= id > 150 ? 1 : id < 1 ? 150 : id;
    setCurrentId(id);
  };

  async function setPokemonDamage1 (info) {
    setWeaknesses([]);
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

    setWeaknesses([...new Set(weaknes)]);
    
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
      <NavBar>POKEMONCARD </NavBar>
        {
          isLoading ? (
            <>
              <h1>Loading.....</h1>
            </>
          ) : (
          <div>
             
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
              <div className='Pokedex-Frame'>
            <div>
              <label className="Pokemon-Name">{pokemon.name.toUpperCase()}</label>
            </div>
            <div>
              <img src={pokemon.sprites.front_default} className="Pokemon-Sprite" alt="logo" />
            </div>
            <div>
              <button className="arrow-button left" onClick={() => getPokemon(currentId - 1)}></button>
              <button className="arrow-button right" onClick={() => getPokemon(currentId + 1)}></button>
            </div>
            <div className="Pokemon-Weight">
              <label className="Pokemon-Weight-Title">Weight: </label>
              {
                <div key={uuidv4()}>
                  <label className="Pokemon-Weight-Value">{pokemon.weight}</label>
                </div>
              }
                
                
            </div>

            <div>
              <label className="Pokemon-Moves">Moves:</label>
              {
                
                // select just first 4 moves
                  pokemon.moves.slice(0,4).map(item => (
                    <div key={uuidv4()}>
                      <label >{item.move.name}</label>
                    </div>
                
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