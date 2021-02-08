import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost/"
      : "https://dodog.org/";
  useEffect(() => {
    axios
      .get(API_URL + "api/test")
      .then(({ data }) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  }, [API_URL]);

  console.log("process.env", process.env);

  return (
    <div className="App">
      <header className="App-header">
        TEST
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
