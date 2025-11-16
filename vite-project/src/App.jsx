import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"



function App() {
  const [count, setCount] = useState(0);
  function incrementCount(){
    setCount(count + 1);
  }



  const [dbreq, setdbreq] = useState([]);

  useEffect(() =>{
    const testQuery = async()=>{
      const res = await axios.get("http://localhost:8080");
      console.log(res)
    }
    testQuery()
  }, []);
    
  return (
    <>
      <p>[Insert content here]</p>
      <br></br>
      <p>Also a short example of how state variables work in react:</p>
      <button onClick={incrementCount}>Increase Count</button>
      <p>{count}</p>
    </>
  )
}



export default App
