import logo from "./logo.svg";
import Header from "./components/Header";
import Cards from "./components/Cards";
import CardsDetails from "./components/CardsDetails";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Cards></Cards>} />
        <Route path="/cart/:id" element={<CardsDetails />} />
      </Routes>
    </>
  );
}

export default App;
