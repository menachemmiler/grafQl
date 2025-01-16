import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const LOGIN_QUERY = gql`
  query Query($name: String!) {
    authorByName(name: $name) {
      id
      name
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { loading, error, refetch } = useQuery(LOGIN_QUERY, {
    variables: { name: username },
    skip: true, // לא להריץ את השאילתה בהתחלה
  });

  const handleLogin = async () => {
    if (!username) {
      alert("Please enter username");
      return;
    }

    try {
      const { data } = await refetch(); // להריץ את השאילתה עם המשתמש שהוזן
      if (data.authorByName) {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(data.authorByName));
        // Navigate to another route
        navigate("/menu");
      } else {
        alert("User not found!");
      }
    } catch (err) {
      alert("השם לא תקין אנא הרשם");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <Link to={"/register"}>not have an account?</Link>
    </div>
  );
};

export default Login;
