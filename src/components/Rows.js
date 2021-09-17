import React from "react";

const DisplayRows = ({ CharacterArray }) => {
  return CharacterArray.map(character => {
    return(
      <tbody>
        <tr key={1}>
          <td className="text-center">{character.id}</td>
          <td className="text-center">{character.name}</td>
          <td className="text-center">{character.birthyear}</td>
          <td className="text-center">{character.height}</td>
          <td className="text-center">{character.mass}</td>
          <td className="text-center">{character.homeworld}</td>
          <td className="text-center">{character.species}</td>
        </tr>
      </tbody>
    )
    })
  
}

export default DisplayRows