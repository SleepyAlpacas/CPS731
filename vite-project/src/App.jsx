import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [count, setCount] = useState(0);
  function incrementCount(){
    setCount(count + 1);
  }

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
