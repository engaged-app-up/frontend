import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Login(props) {

  const [isLogin, setIsLogin] = useState(true);
  const [userInput, setUserInput] = useState({email: '', password: ''}); //initial state for form inputs.
  const [state, dispatch] = useContext(GlobalContext);
  const auth = getAuth(); //firebase auth obj

  const handleInput = (event) => {
    setUserInput({ ...userInput, [event.target.id]: event.target.value });
  }

  const handleFormState = (event) => {
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
      // register
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, userInput.email, userInput.password);
        const user = userCredential.user;
        //using firebase's updateProfile to update other user fields with form data.
        await updateProfile(auth.currentUser, {
          displayName: `${userInput.firstName} ${userInput.lastName}`,
          photoURL: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'
        })
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (state.user) return <Navigate to="/dashboard" />;

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden c">
      <div className="w-full p-6 m-auto bg-blue-400 rounded-md shadow-md lg:max-w-xl ">
        <h1 className="text-3xl font-semibold text-center text-yellow-400 underline">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-yellow-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-yellow-400 focus:outline-none focus:ring "
              onChange={handleInput}
              value={userInput.email}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-yellow-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-yellow-400 focus:outline-none focus:ring "
              onChange={handleInput}
              value={userInput.password}
            />
          </div>
          {isLogin && <a href="#" className="text-xs text-yellow-400 hover:underline">
            Forget Password?
          </a>}
          {!isLogin && (
            <>
              <div className="mb-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-yellow-400"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-yellow-400 focus:outline-none focus:ring "
                  onChange={handleInput}
                  value={userInput.firstName}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-yellow-400"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-blue-400 focus:ring-yellow-400 focus:outline-none focus:ring "
                  onChange={handleInput}
                  value={userInput.lastName}
                />
              </div>
            </>
          )}
          <div className="mt-6">
            <button type="submit" onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-400 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account"}
          <a href="#" className="font-medium text-yellow-400 hover:underline" onClick={handleFormState}>
            {isLogin ? "Sign up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
}
