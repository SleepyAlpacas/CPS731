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
      const res = await axios.get("https://cps731.onrender.com/test");
      console.log(res.data);
      setdbreq(res.data)
    }
    testQuery()
  }, []);
    


  return (
    <>
      <p>[Insert content here]</p>
      <br></br>
      <h2>Here's a short example of how state variables work in react:</h2>
      <button onClick={incrementCount}>Increase Count</button>
      <p>{count}</p>

      <br></br>
      <h2>And here's a short example of how to fetch data from our database</h2>
      {dbreq.map(res=>(
        <div>
          {res.TestString}
        </div>
      ))}
    </>
  )
}



export default App
