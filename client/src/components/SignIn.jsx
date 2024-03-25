import React, { useState } from "react";
import {
  dataFetchStart,
  dataFetchSuccess,
  dataFetchFailed,
} from "../redux/dataSlice";
import { useDispatch } from "react-redux";

function SignIn() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      dispatch(dataFetchStart());
      const res = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.msg);
        dispatch(dataFetchFailed(data.msg));
      } else {
        dispatch(dataFetchSuccess(data.token));
        setMessage("Success");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      dispatch(dataFetchFailed(error.message));
      localStorage.removeItem("token");
    }
  };

  return (
    <div className="flex justify-center items-center  py-12">
      <div className="h-80 w-[500px] bg-white shadow-lg px-12">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center font-bold pb-8 text-xl py-2">
            Login/Register
          </h2>
          <div className="message">
            {" "}
            {/* Added wrapper div for message */}
            {message && (
              <div
                className={`text-center ${
                  message === "Success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 pb-8">
            <label>Username:</label>
            <input
              type="text"
              onChange={handleChange}
              id="username"
              className="h-8 px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
            />
            <label>Password:</label>
            <input
              type="password"
              onChange={handleChange}
              id="password"
              className="h-8 px-4 py-2 border rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full h-6 font-semibold capitalize  flex items-center justify-center py-4 text-white py-4 bg-blue-400 cursor-pointer"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
