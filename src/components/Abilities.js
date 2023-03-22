
import React from 'react';
import {v4 as uuidv4} from 'uuid';


export const Abilities = ({pokemonInfo}) => {
  return (
    <div>
        {
        pokemonInfo.abilities.map(item =>(
            <div key={uuidv4()}>
                <label> {item.ability.name}</label>
            </div>
        ))
        }
    </div>
  )
}