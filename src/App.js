import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";

function App() {
  const a = 2;
  const b = 4;
  return (
    <div className="App">
      <Login />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          data-testid="mylink"
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          <li>Apple</li>
          <li>Banana</li>
          <li>Orange</li>
        </ul>
        <h1 data-testid="mytestid">Hello</h1>
        <span title="sum">{a + b}</span>
      </header>
    </div>
  );
}

export default App;
