import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [user, setUser] = useState<any>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(localStorage.getItem("user")!);
      console.log(localStorage.getItem("user"));
      console.log({ user });
    }
  }, []);

  useEffect(() => {
    user == "" ? navigate("/") : navigate("/menu");
  }, [user]);

  return (
    <div className="app">
      <Routes>
        <Route index element={<Login />} />
        <Route path="menu" element={<Menu />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
