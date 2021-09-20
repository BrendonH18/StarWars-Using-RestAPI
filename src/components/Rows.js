import React from "react";

const DisplayRows = ({ characterObject }) => {
  return characterObject.map(character => {
    return(
      <tr key={character.key}>
        <td className="text-center">{character.key}</td>
        <td className="text-center">{character.fullname}</td>
        <td className="text-center">{character.birthday}</td>
        <td className="text-center">{character.height}</td>
        <td className="text-center">{character.mass}</td>
        <td className="text-center">{character.home}</td>
        <td className="text-center">{character.species}</td>
      </tr>
    )
    })
  
}

export default DisplayRows