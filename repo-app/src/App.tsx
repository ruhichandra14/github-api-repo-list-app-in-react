import "./App.css";
import MainContainer from "./components/main";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
