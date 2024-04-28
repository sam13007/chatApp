import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../utils/apiService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import InputBox from "../components/InputBox";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);

      if (!loading) {
        e.preventDefault();

        const registerUserBody = {
          name,
          email,
          password,
        };
        const { data } = await registerUser(registerUserBody);

        setUser({ name: data.name, email: data.email });
        sessionStorage.setItem("user", JSON.stringify(data));
        setLoading(false);
        setEmail("");
        setPassword("");
        setName("");
        toast.success("Successfully signed up");
        navigate("/chat");
      }
    } catch (error) {
      if (error?.response?.data) toast.error("User already registered");
      setLoading(false);
      console.log(`Error in registering user ${error?.message}`);
    }
  };

  return (
    <div className="h-[30%]">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputBox
          type="text"
          placeholder="Username"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

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

export default Signup;
