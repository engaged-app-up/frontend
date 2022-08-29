import React from "react";

export default function Register() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden c">
      <div className="w-full p-6 m-auto bg-blue-400 rounded-md shadow-md lg:max-w-xl ">
        <h1 className="text-3xl font-semibold text-center text-yellow-400 underline">
          Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-yellow-400"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-yellow-400 focus:outline-none focus:ring "
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-yellow-400"
            >
              Choose a password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-yellow-400 focus:outline-none focus:ring "
            />
          </div>

          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-yellow-400"
            >
              Please confirm password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-yellow-400 focus:outline-none focus:ring "
            />
          </div>
          <a href="#" className="text-xs text-yellow-400 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Submit
            </button>
          </div>
        </form>

        {/* <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a href="#" className="font-medium text-yellow-400 hover:underline">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
}
