import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"



const Navbar=()=>{
    const [query,setquery]=useState('')
    const navigate=useNavigate()
    const [shownav,setshownav]=useState(false)
    return(
        <nav className="bg-white dark:bg-gray-900 py-2 fixed w-full z-40 top-0 left-0 border-b border-gray-200 dark:border-gray-600">


  <div className="w-full flex items-center justify-evenly mx-auto p-1">
    <span  className="flex items-center">
        <Link to='/'><span className="text-2xl md:text-3xl font-bold whitespace-nowrap tracking-[2px]">Sumaho</span></Link>
    </span>
  <div className="flex order-2">
    {/* <MainSearchBar/> */}
    <div className="relative">
        
        <input type="text" id="search-navbar" value={query} onChange={(e)=>setquery(e.target.value)} class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-transparent focus:border-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-transparent dark:focus:border-none" placeholder="Quick search..."/>
        <div 
          className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer" 
          onClick={()=>{navigate(`/search?query=${query}`)}}>
          <FontAwesomeIcon icon={faSearch}/>
        </div>
    </div>
    {/* <button onClick={()=>setshownav(!shownav)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 md:p-2 w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="md:h-4 md:w-4 lg:w-4 lg:h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button> */}
  </div>
    {/* <div id="navbar-search" className={`items-center justify-between ${shownav?'':'hidden'} w-full lg:flex lg:w-auto lg:order-1`}>
      <ul className="text-[#777777] flex flex-col lg:p-0 font-medium  bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
        <li className="hidden">
          <Link to="/" onClick={()=>setshownav(!shownav)} className="block text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
           Home
          </Link>
        </li> 
        <li>
          <Link to="/" onClick={()=>setshownav(!shownav)} className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
           Home
          </Link>
        </li> 
        <li>
          <Link to="/inquiry" onClick={()=>setshownav(!shownav)} className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            Inquiry
          </Link>
        </li>
      </ul>
    </div> */}
  </div>

        </nav>
    )
}

export default Navbar