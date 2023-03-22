import * as React from 'react';
import {BarChart} from './BarChart';
import { useState, useEffect,useContext } from 'react';
import {Abilities}   from './Abilities';
import{Card,Avatar,IconButton, CardHeader, CardActions, CardContent, CardMedia, Button, Typography, Grid} from '@mui/material';
import { Types } from './Types';
import { Weaknessess } from './Weaknesses';
import  ThemeContext  from './context/ThemeContext';



export default function MediaCard({pokemonInfo, weaknessess, statsInfo}) {
  
  // console.log(pokemonInfo);
  // const [weaknes, setweaknes] = useState([]);
  const data = useContext(ThemeContext);
  const getImage=(info)=>{
    return info.sprites.other['official-artwork'].front_default
  };

  const getLogo=(info)=>{
    return info.sprites.front_default;
  };

  const getTypes= (info) => {
    if (info!=null && info.types!=null)
      return info.types.map(item => item.type.name);
    return [];
  };

  // const getStatsInfo = (pokemonInfo1)=>{
  //   let label1 = [];
  //   let stats1 = [];

  //   // console.log(pokemonInfo1);
  //   // pokemonInfo1.stats.forEach(element => {
  //   //   label1.push(element.stat.name);
  //   //   stats1.push(element.base_stat);
  //   // });
  //   return [label1, stats1];

  // }
 
  return (
     <div className= {data.Theme}>
    <Card sx={{ maxWidth: 345, backgroundColor: 'dark'}}>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: 'white', boxShadow:5, padding:'5px', margin: '2px'}} 
                  aria-label="recipe " 
                  src={getLogo(pokemonInfo)}>
          </Avatar>
        }
        titleTypographyProps= {{variant:'h4', align:'center'}}
        title={pokemonInfo.name}
        subheader= {
          <Types info = {getTypes(pokemonInfo)}/>
        }
      />
      
      <CardMedia
        sx={{
          minHeight: '300px',
          maxHeight: '300px',
          padding: "15px",
          objectFit: "contain",
          backgroundColor: 'skyblue',
          width: "auto" 
        }}
        image={getImage(pokemonInfo)}
        
      /> 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
           <BarChart inputData={statsInfo}/>
        </Typography>
        <Typography variant="body2" color="text.secondary">
        </Typography>
        <Typography gutterBottom variant="h3" component="div">
          Info
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          WEIGHT: {pokemonInfo.weight}
        </Typography>
        <Weaknessess weaknesssess={weaknessess}/>
        <Typography gutterBottom variant="h3" component="div">
          ABILITIES:
        </Typography>
        <Abilities pokemonInfo={pokemonInfo} />
      </CardContent>
      
    </Card>

     </div>
  );
}