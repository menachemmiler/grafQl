import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation Mutation($name: String!) {
    addAuthor(name: $name) {
      id
      name
    }
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    try {
      const { data } = await register({ variables: { name: username } }); // הרצת המיוטציה עם הפרמטרים
      if (data?.addAuthor) {
        // שמירת המשתמש ב-localStorage
        localStorage.setItem("user", JSON.stringify(data.addAuthor));
        // מעבר לנתיב החדש
        navigate("/menu"); // החלף לנתיב הרצוי
      } else {
        alert("Registration failed! Please try again.");
      }
    } catch (err) {
      alert("An error occurred while registering.");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      <Link to={"/"}>already have an account?</Link>
    </div>
  );
};

export default Register;
