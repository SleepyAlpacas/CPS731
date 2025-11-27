import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./components/NavBar.jsx";

function App() {
  const [count, setCount] = useState(0);
  function incrementCount() {
    setCount(count + 1);
  }

  const [dbreq, setdbreq] = useState([]);

  useEffect(() => {
    const testQuery = async () => {
      const res = await axios.get("https://cps731.onrender.com/test");
      //const res = await axios.get("http://localhost:8080/test")
      console.log(res.data);
      setdbreq(res.data[0]);
    };
    testQuery();
  }, []);

  return (
    <div className="page">
      {/* <button>
        <Link to={"/admin"}>Admin Page</Link>
      </button>
      <button>
        <Link to={"/user"}>User</Link>
      </button> */}
      <NavBar />

      <br />

      <h2>Example of How State Variables Work in React:</h2>
      <button onClick={incrementCount}>Increase Count</button>
      <p>{count}</p>

      <br></br>

      <h2>Example of a DB Fetch (let it load, our free server is slow) </h2>
      {dbreq.map((res) => (
        <div key={res.TestString}>{res.TestString}</div>
      ))}
    </div>
  );
}

export default App;
