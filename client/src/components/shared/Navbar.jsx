// import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { RxMoon, RxSun } from 'react-icons/rx';
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import useAuth from './../../hooks/useAuth';
import logo from '/logo.png';


const Navbar = () => {

  const { loggedOut, user } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || localStorage.setItem('theme', 'winter'));
  // State to track whether the dropdown is open or closed
  const [dropdown, setDropdown] = useState(false);



  const menuList = <>
    <li><NavLink to='/'
      end
      className={({ isActive }) =>
        ` transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
        }`}>Home</NavLink></li>
    <li><NavLink to='/allTestPage'
      end
      className={({ isActive }) =>
        ` transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
        }`}>All Tests</NavLink></li>
    <li><NavLink to='/featured'
      end
      className={({ isActive }) =>
        ` transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
        }`}>Featured</NavLink></li>
    <li><NavLink to='/healthQnA'
      end
      className={({ isActive }) =>
        ` transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
        }`}>HealthQnA</NavLink></li>
    {
      user && <>
        <li><NavLink to='/dashboard'
          end
          className={({ isActive }) =>
            ` transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
            }`}>Dashboard</NavLink></li>
      </>
    }
    {
      !user && <>
        <li><NavLink to='/registration'
          end
          className={({ isActive }) =>
            ` transition-colors duration-300 transform rounded-lg hover:bg-primary hover:text-base-300 ${isActive ? 'bg-primary text-base-300' : ''
            }`}>Register</NavLink></li>
      </>
    }
  </>

  const list = <>
    {/* <li>
      <div className='justify-between'>Add Job</div>
    </li> */}
    <li>
      <Link to='/dashboard'>Profile</Link>
    </li>
    <li>
      <Link to='/dashboard/appointments'>Upcoming Appointment</Link>
    </li>
    <li>
      <Link to='/dashboard/testResults'>Test Result</Link>
    </li>
    <li
      className="rounded-xl p-2 m-2 text-right"
      onClick={loggedOut}
    >
      <button className='bg-base-300 hover:bg-neutral hover:text-white block text-center'>Logout</button>
    </li>
  </>


  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  // set theme
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme])

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('dim');
    } else {
      setTheme('winter');
    }
  }



  return (
    <div className='navbar bg-base-100 shadow-2xl container px-4 mx-auto my-4 rounded-lg font-serif'>

      {/* burger menu */}
      <div className="">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {menuList}
          </ul>
        </div>
      </div>

      {/* logo and website name */}
      <div className='flex-1'>
        <Link to="/" className='flex gap-2 items-center'>
          <img className='w-auto h-7 rounded'
            referrerPolicy='no-referrer' src={logo} alt='' />
          <span className='font-bold'>{import.meta.env.VITE_WEBSITE}</span>
        </Link>
      </div>

      {/* nav menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  px-1 space-x-2">
          {menuList}
        </ul>
      </div>

      <div className='flex-1 navbar-end'>

        {/* login */}
        <div className='z-50'>
          {
            user ?

              <div className="dropdown dropdown-end" onClick={toggleDropdown}>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle btn-outline avatar animate-pulse hover:animate-none">
                  <div className="w-10 rounded-full">

                    <img
                      data-tooltip-id="name-tooltip"
                      data-tooltip-content={`${user?.displayName || user?.email}`}
                      referrerPolicy="no-referrer"
                      alt="Tailwind CSS Navbar component"
                      src=
                      {
                        user?.photoURL ? user?.photoURL
                          : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"
                      }
                    />
                    <Tooltip id="name-tooltip" />
                  </div>
                </div>

                {dropdown && (
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[2] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-64">
                    <li >
                      <p className="flex justify-center items-center">
                        Hi,
                        {/* <span className="text-info badge-outline">{userData[0]?.isAdmin ? "Admin" : "User"}</span> */}
                        <span className=" text-blue-500 font-serif">
                          {
                            user?.displayName || user?.email
                          }
                        </span>
                      </p>
                    </li>
                    <div className="divider divider-secondary my-0" ></div>
                    {list}
                  </ul>
                )}


              </div>

              : <Link to="/login"
                className="btn btn-outline text-center rounded-3xl hover:bg-neutral animate-pulse hover:text-white hover:border-0 hover:animate-none"
              >
                <GoPerson />
              </Link>
          }

        </div>

        {/* Theme changer */}
        <div>
          <label className="ml-4 swap swap-rotate">

            {/* <motion.div
              initial={{ scale: 0 }}
              animate={{ rotate: 180, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 60,
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
                damping: 20
              }}
            >

            </motion.div> */}
            {/* this hidden checkbox controls the state */}
            <input
              onChange={handleToggle}
              type="checkbox"
              className="theme-controller"
            />

            {/* sun icon */}
            {/* < RxSun className="swap-off fill-current w-10 h-10" /> */}
            {
              theme == "winter" && <>< RxSun className=" fill-current w-10 h-10" /></>
            }

            {/* moon icon */}
            {/* <RxMoon className="swap-on fill-current w-10 h-10" />             */}
            {
              theme == "dim" && <> <RxMoon className="fill-current w-10 h-10" /></>
            }

          </label>
        </div>

      </div>
    </div >
  )
}

export default Navbar