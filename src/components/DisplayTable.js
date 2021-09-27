import React from "react";

const DisplayTable = ({ characters }) => {
  characters = characters.sort((a, b) => a.key - b.key)
  const rows = characters.map(character => {
    return (
      <tr key={character.key}>
        <td className="text-center">{character.key}</td>
        <td className="text-center">{character.name}</td>
        <td className="text-center">{character.birth_year}</td>
        <td className="text-center">{character.height}</td>
        <td className="text-center">{character.mass}</td>
        <td className="text-center">{character.homeworld}</td>
        <td className="text-center">{character.species}</td>
      </tr>
)})

  return (
    <table className="table" varient="dark">
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th className="text-center">Name</th>
          <th className="text-center">Birthyear</th>
          <th className="text-center">Height</th>
          <th className="text-center">Mass</th>
          <th className="text-center">Homeworld</th>
          <th className="text-center">Species</th>
        </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  )
}

export default DisplayTable