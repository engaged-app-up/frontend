import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
import logo from "../assets/img/engaged.svg";

export default function Login(props) {

  const [isLogin, setIsLogin] = useState(true);
  const [userInput, setUserInput] = useState({email: '', password: ''}); //initial state for form inputs.
  const [state, dispatch] = useContext(GlobalContext);
  const auth = getAuth(); //firebase auth obj

  const handleInput = (event) => {
    setUserInput({ ...userInput, [event.target.id]: event.target.value });
  }

  const handleFormState = (event) => {
    event.preventDefault();
    setUserInput({email: '', password: ''});
    setIsLogin(!isLogin);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      //login logic
      try {
      await signInWithEmailAndPassword(auth, userInput.email, userInput.password);
      } catch (err) {
        console.log(err);
      }
    } else {
      // register user
      try {
        const user = {email: userInput.email, password: userInput.password, displayName: `${userInput.firstName} ${userInput.lastName}`};
        const response = await fetch('http://localhost:3001/api/users/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        // if registration was successful, signin with firebase (fireBase onAuthStateChange in GlobalContext will update the user in the global state :D  )
        if (response.ok) {
          await signInWithEmailAndPassword(auth, user.email, user.password);
        }

      } catch (err) {
        console.log(err);
      }
    }
  }

  if (state.user) return <Navigate to="/dashboard" />;

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden p-4 gap-3">
      <div className="w-full md:max-w-xs mx-auto"><img className="logo-fill" src={logo} /></div>
      <div className="w-full p-6 mx-auto bg-white rounded-md shadow-md lg:max-w-xl ">
        <h1 className="text-3xl font-semibold text-center text-sky-400">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-sky-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-600 focus:ring-sky-600 focus:outline-none focus:ring "
              onChange={handleInput}
              value={userInput.email}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-sky-600"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-600 focus:ring-sky-600 focus:outline-none focus:ring "
              onChange={handleInput}
              value={userInput.password}
            />
          </div>
          {isLogin && <a href="#" className="text-xs text-sky-600 hover:underline">
            Forget Password?
          </a>}
          {!isLogin && (
            <>
              <div className="mb-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-sky-600"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-600 focus:ring-sky-600 focus:outline-none focus:ring "
                  onChange={handleInput}
                  value={userInput.firstName}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-sky-600"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-600 focus:ring-sky-600 focus:outline-none focus:ring "
                  onChange={handleInput}
                  value={userInput.lastName}
                />
              </div>
            </>
          )}
          <div className="mt-6">
            <button type="submit" onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-sky-600 rounded-md hover:bg-sky-500 focus:outline-none focus:bg-purple-600">
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account"}
          <a href="#" className="ml-1 font-medium text-sky-400 hover:underline" onClick={handleFormState}>
            {isLogin ? "Sign up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
}
