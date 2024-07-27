import { useState , useEffect} from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'

function homepage() {
  const [name, setName] = useState('');
  useEffect(() => {
    const storedName = localStorage.getItem("user");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const navigator = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();

      await axios.post("http://localhost:2000/api/authenticate/logout")
      navigator('/')
  }

  return (
    <div>
      <h1>Hello Manchester</h1>
      <h1>{name}</h1>
      <br />
      <Link to="/login">
        <button type="submit" >New Log-in</button>
      </Link>
      <br />
        <button onClick={handleClick} type='submit'>Log-out</button>
    </div>
    
  )
}

export default homepage