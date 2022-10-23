import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext/GlobalContext";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const auth = getAuth();
  const [state, dispatch] = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (state.user) {
      try {
        await signOut(auth);
        await dispatch({type: 'LOGOUT'})
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/');
    }
  }

    return(
      <nav className="bg-blue-600 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="#" className="flex items-center">
            <span className=" header-text self-center text-g text-xl whitespace-nowrap text-yellow-400 ">
              Engaged
            </span>
          </a>
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3  text-white rounded-lg md:hidden hover:bg-blue focus:outline-none focus:ring-2 focus:ring-blue dark:text-gray "
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">

            <li>
              <NavLink
                to="/chat"
                href="#"
                className="navLinks block py-2 pr-4 pl-3 text-white hover:text-green hover:bg-light-blue md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Chat
              </NavLink>
            </li>
  
              <li>
                <NavLink
                  className="navLinks block py-2 pr-4 pl-3 text-white hover:bg-light-blue md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-yellow-400"
                  to="/"
                  href="#"
                  onClick={handleAuth}
                >
                  {
                    !state.user ? 'Login' : 'Logout'
                  }
                </NavLink>
              </li>

              </ul>
        </div>
      </div>
    </nav>
    )

    
}

  