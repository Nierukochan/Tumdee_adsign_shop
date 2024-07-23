import React from 'react'
import {Link} from 'react-router-dom'

function homepage() {
  return (
    <div>
      <h1>Hello Manchester</h1>
      <br />
      <Link to="/login">
        <button type="submit" >New Log-in</button>
      </Link>
    </div>
    
  )
}

export default homepage