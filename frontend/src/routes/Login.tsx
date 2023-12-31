import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "../index.css"

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const login = () => {
    var string = "http://20.84.65.85:3000/usuarios/"+user+"/"+pass;
    fetch(string, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json(); 
      }
      if (!res.ok) {
        auth.isAuthenticated = false;
        alert("Verifique sus datos de ingreso");
      }
    })
    .then((userData) => {
      if (userData) {
        auth.login(userData);
        navigate(userData.tipo === 1 ? "/Dashboard2" : "/Dashboard");
      }
    })
    .catch((error) => {
      throw error;
    });
  };

  return (
    <>
      <main>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form>
          <h3>Login Here</h3>

          <label>Username</label>
          <input type="text" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} name="username" required />

          <label>Password</label>
          <input type="password" placeholder="Password" value={pass} onChange={(e) => setPassword(e.target.value)} name="password" />  
        </form> 
        <button onClick={() => login()}>Log In</button>          
      </main>
    </>
  );
}
