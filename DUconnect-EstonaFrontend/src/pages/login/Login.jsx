import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState(""); // Change username to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { login } = useContext(AuthContext);
  // const navigate = useNavigate();

  const handleLogin = async () => {


    console.log(email, password);

    try {
      const response = await fetch('http://localhost:8001/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Change username to email
      });
      
      if (response.ok) {
        // Redirect to Home page if login is successful
        window.location.href = "/"; // Redirect manually since useNavigate doesn't work outside of React Router
      } else {
        const data = await response.json();
        setError(data.detail);
      }
    } catch (error) {
      setError("An error occurred while logging in");
    }
    finally {
      // Reset email and password fields
      setEmail("");
      setPassword("");
    }

    // login();
    // navigate("/");
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>DUconnect</h1>
          <p>A Social media hub of Dhaka University</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* Change username to email */}
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={handleLogin}>Login</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
