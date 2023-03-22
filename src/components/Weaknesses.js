import React from 'react';
import {v4 as uuidv4} from 'uuid';

import{Typography} from '@mui/material';

export const Weaknessess = ({weaknesssess}) => {
  const backgroundColor = [
      'rgba(255, 99, 132)',
      'rgba(255, 159, 64)',
      'rgba(255, 205, 86)',
      'rgba(75, 192, 192)',
      'rgba(54, 162, 235)',
      'rgba(153, 102, 255)',
      'rgba(153, 102, 255)'
  ];

  return (
    <div>
      <Typography gutterBottom variant="h3" component="div">
            WEAKNESSESS
          </Typography>
      <div className = "TypesContainer">
          {
              weaknesssess.map(item =>(
                  <div key={uuidv4()}  className = "TypeChild" >
                      {item}
                  </div>
              ))
          }
      </div>
    </div>
  )
}