import React, { useContext, useState } from "react";
import { loginUser } from "../utils/apiService";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await loginUser({ email, password });

      setLoading(false);
      setEmail("");
      setPassword("");
      setUser({ name: data.name, email: data.email });
      sessionStorage.setItem("user", JSON.stringify(data));
      navigate("/chat");
      toast.success("Successfully logged in");
    } catch (error) {
      console.log("Error in login user", error);
      if (error.response.data.toLowerCase() === "invalid email or password") {
        toast.error("Invalid email or password");
      } else toast.error("Login failed");
      //wrong password or email

      setLoading(false);
    }
  };

  return (
    <div className="h-[30%]">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputBox
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputBox
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 py-2 px-4 text-white rounded-lg m-auto "
        >
          {loading ? "Loading" : "Submit"}
        </button>
      </form>
      <Toaster position="bottom-right"></Toaster>
    </div>
  );
}

export default Login;
