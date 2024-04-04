import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleApi = (e) => {
    e.preventDefault();
    const data = { username, password };
    const url = "http://localhost:3000/login";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
    setUsername("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleApi}
      className="w-full h-[50%] flex flex-col items-center justify-center py-8"
    >
      <h1 className="text-2xl font-semibold">Welcome to Login page</h1>
      <label htmlFor="username" className="text-xl font-medium py-2">
        Username : &nbsp;
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-[1px] border-black"
          required={true}
        />
      </label>
      <label htmlFor="password" className="text-xl font-medium pb-2">
        Password : &nbsp;
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-[1px] border-black"
          required
        />
      </label>
      <div>
        <button
          className="text-lg font-semibold px-3 py-1 bg-blue-200 rounded-lg mr-2"
          type="submit"
        >
          Login
        </button>
        <Link to="/signup" className="font-medium underline hover:no-underline">
          Signup
        </Link>
      </div>
    </form>
  );
}

export default Login;
