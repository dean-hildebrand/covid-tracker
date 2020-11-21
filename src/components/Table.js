import React from 'react'
import '../css/table.css'

function Table({ countries }) {
  return (
    <div className="table">
    {countries.map(country => (
      <tr>
      <td>{country.country}</td>
      <td><strong>{country.cases}</strong></td>
      </tr>
    ))}
    </div>
  )
}

export default Table
