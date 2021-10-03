import React from "react";

const DisplayTable = ({ characters }) => {
  characters = characters.sort((a, b) => a.key - b.key)
  const rows = characters.map(character => {
    return (
      <tr key={character.key}>
        <td>{character.key}</td>
        <td>{character.name}</td>
        <td>{character.birth_year}</td>
        <td>{character.height}</td>
        <td>{character.mass}</td>
        <td>{character.homeworld}</td>
        <td>{character.species}</td>
      </tr>
)})

  return (
    <table className="table table-striped table-hover text-center">
      <thead>
        <tr key="headers">
          <th>#</th>
          <th>Name</th>
          <th>Birthyear</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Homeworld</th>
          <th>Species</th>
        </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </table>
  )
}

export default DisplayTable