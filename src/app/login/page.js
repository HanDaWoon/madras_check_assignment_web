"use client";
import { useState } from "react";
import { mFetch } from "@/util/MFetch";

const login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mFetch("/user", {
      headers: {
        Authorization:
          "Basic " + btoa(e.target.email.value + ":" + e.target.password.value),
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          console.log(res.headers.getSetCookie());
          return res.json();
        }
        throw new Error("Login Failed");
      })
      .then((res) => {
        sessionStorage.setItem("userDetail", JSON.stringify(res.data));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="bg-gray-100">
      <div className="flex justify-center h-screen w-screen items-center">
        <form
          className="w-full md:w-1/3 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-2xl font-bold text-gray-600 mb-6">
            LOGIN
          </h1>
          <div className="w-3/4 mb-6">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
              placeholder="User Name or Email ID"
            />
          </div>
          <div className="w-3/4 mb-6">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 "
              placeholder="Password"
            />
          </div>
          <div className="w-3/4 mt-4">
            <button
              type="submit"
              className="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
            >
              {!isLoading ? "Login" : "Loading..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default login;
