import {useEffect} from 'react'
import {Navigate, NavLink, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {FiUser} from "react-icons/fi";
import Axios from "../services/axios.js";
import Toast from "../components/core/Toast.jsx";

const navigation = [{name: 'Dashboard', to: '/'}, {name: 'Surveys', to: '/surveys'},]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DefaultLayout() {
  // get user state
  const {currentUser, userToken, setUserToken, setCurrentUser} = useStateContext();

  // Logout functionality
  const logout = (event) => {
    event.preventDefault()

    Axios.post('/logout')
      .then(res => {
        // clear user info
        setCurrentUser({})
        setUserToken(null)
      })
  }

  if (!userToken) {
    return <Navigate to='/login'/>
  }

  useEffect(() => {
    Axios.get('/user')
      .then(({data}) => {
        if (data.data) {
          setCurrentUser(data.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (<>
    <Toast/>

    <div className="container min-h-full p-1 mx-auto">

      {/* Navbar */}
      <div className="px-8 m-3 bg-green-100 rounded-full navbar text-info-content" style={{ opacity: 0.9 }}>
      <div className="navbar-start">
          <div className="text-green-800 dropdown">
            <label tabIndex={0} className="text-green-800 btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
              </svg>
            </label>
            <ul tabIndex={0}
                className="p-2 mt-3 text-yellow-200 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">

              {navigation.map((item, index) => (<li key={index}>
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({isActive}) => classNames('btn btn-ghost')}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              </li>))}

            </ul>
          </div>
          <NavLink to='/' className="text-xl text-green-800 normal-case bg-green-100 btn btn-ghost">
  <img src="https://artcaffemenu.ubuntu.click/images/Artcaffe-Logo.png" alt="Logo" className="w-auto h-8" />
</NavLink>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 text-green-800 menu menu-horizontal">
            {navigation.map((item, index) => (<li key={index}>
              <NavLink
                key={item.name}
                to={item.to}
                className={({isActive}) => classNames('btn btn-ghost')}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </NavLink>
            </li>))}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <FiUser className="w-6 h-6 text-green-800"/>
            </label>
            <ul tabIndex={0}
                className="p-2 mt-3 text-yellow-200 shadow-md menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className=" btn btn-ghost">
                  Profile
                </a>
              </li>
              <li><a className=' btn btn-ghost'>Settings</a></li>
              <li>
                <a href="" className=' btn btn-ghost'
                   onClick={(event) => logout(event)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* //Navbar */}

      {/* Content */}
      <main>
        <Outlet/>
      </main>
    </div>
  </>)
}
