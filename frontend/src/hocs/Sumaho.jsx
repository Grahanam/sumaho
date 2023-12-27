
import { Route, Routes } from "react-router-dom"
import Navbar from "../containers/Navbar"
import Home from "../pages/Home"
import Search from "../pages/Search"
import Addproduct from "../pages/AddProduct"
import Singleproduct from "../pages/Singleproduct"


const Sumaho=()=>{
    return(
        <div className=" h-screen">
            <Navbar/>
         {/* <Sidebar/> */}
         <div className='w-full pt-[70px] h-[100%]'>
           {/* <Topbar/> */}
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/addproduct" element={<Addproduct/>}/>
                <Route path="/product/:id" element={<Singleproduct/>}/>        
           
            </Routes>
            {/* <Footer/> */}
         </div>
         </div>
    )
}

export default Sumaho