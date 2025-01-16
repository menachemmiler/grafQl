import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  }
  return <div className="menu">
    <h1>Menu</h1>
    <button onClick={handleLogout}>Logout</button>
  </div>;
};

export default Menu;
