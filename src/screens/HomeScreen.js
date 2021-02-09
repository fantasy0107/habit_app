import axios from "axios";
import logo from "../logo.svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost/"
      : "https://dodog.org/";

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
};

export default HomeScreen;
