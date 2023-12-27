import { faIndianRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"




const Productcard=({product,index})=>{
      return(
      
          <div key={index} class="rounded-lg shadow  text-left">
        <Link to={`/product/${product._id}`}>
        <img class="rounded-lg" src={product.picture[0].url} alt="" />
        </Link>
        <div class="p-5">
            <Link to={`/product/${product._id}`}>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
            </Link>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">4.4 <i><FontAwesomeIcon icon={faStar}/></i>(4)</p>
           <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><i><FontAwesomeIcon icon={faIndianRupeeSign}/></i>{product.price}</h5>
           </div>
        </div>

      )
}


export default Productcard