import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddItem from "./pages/AddItem";
import Orders from "./pages/Orders";
import ListItem from "./pages/ListItem";
import SideBar from "./components/SideBar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <SideBar />
      <Routes>
        <Route path="/add" element={<AddItem />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/list" element={<ListItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
