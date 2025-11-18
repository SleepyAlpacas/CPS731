import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
      //const res = await axios.get("http://localhost:8080/test")
      console.log(res.data);
      setdbreq(res.data[0])
    }
    testQuery()
  }, []);
    


  return (
    <>
      <button><Link to={'/admin'}>Admin Page</Link></button>
      <button><Link to={'/questionnairemodule'}>Questionnaire</Link></button>
      <br></br>
      <h2>Here's a short example of how state variables work in react:</h2>
      <button onClick={incrementCount}>Increase Count</button>
      <p>{count}</p>

      <br></br>
      <h2>And here's a short example of how to fetch data from our database (let it load, our free server is slow)</h2>
      {dbreq.map(res=>(
        <div>
          {res.TestString}
        </div>
      ))}
    </>
  )
}



export default App
