import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { Login } from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Defect from "./components/Defect";

function App() {
  // const state = useSelector((state) => state.defectReducer);
  // console.log("ssss", state);
  return (
    <Routes>
      <Route exact path="/" component={Login} />
      <Route path="/defect" component={Defect} />
    </Routes>
  );
}

export default App;
