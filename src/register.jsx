import { useState } from "react";
import api from "./utils/axios";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import Label from "./components/ui/label";

import Button from "./components/ui/button";
import Input from "./components/ui/input";

function Register() {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

   //States
  const [userDetails, setUserDetails] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      if(import.meta.env.ALLOW_REGISTRATION==true){
        const response = await api.post("/user/register", {
            username: userDetails.username,
            email: userDetails.email,
            password: userDetails.password,
          });
          const data = await response.data;
    
          if (data.status_code == 200) {
            setUserDetails(initialState);
            setSuccess("Registration Successfull");
          }
      }  
      else {
        setUserDetails(initialState);
        setSuccess("Registration is turned off");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errMsg = error.response.data.message;
        setError(errMsg);
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="w-96  p-4 rounded-lg drop-shadow-xl border-2 bg-white">
        <h1 className="text-3xl text-center m-3 font-bold">Register</h1>
        {isLoading && (
          <h1 className="text-2xl font-semibold text-center text-red-500">
            Processing...
          </h1>
        )}
        {error && (
          <h1 className="text-2xl font-semibold text-center text-red-500">
            {error}
          </h1>
        )}
        {success && (
          <h1 className="text-2xl font-semibold text-center text-green-500">
            {success}
          </h1>
        )}
        <form onSubmit={handleSubmit}>
          <Label htmlFor="username" text="Username" />
          <Input
            id={"username"}
            name={"username"}
            type={"text"}
            onChange={handleChange}
            value={userDetails.username}
          />

          <Label htmlFor="email" text="Email" />
          <Input
            id={"email"}
            name={"email"}
            type={"email"}
            onChange={handleChange}
            value={userDetails.email}
          />

          <Label htmlFor="password" text="Password" />
          <Input
            id={"password"}
            name={"password"}
            type={"text"}
            onChange={handleChange}
            value={userDetails.password}
          />

          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <Button text="Submit" type="submit" disabled={isLoading} />
            <Link to={"/login"}>
              Already registered <span className="text-blue-600">login?</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
