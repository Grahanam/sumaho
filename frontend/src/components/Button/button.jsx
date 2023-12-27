import React from "react"
import Loader from "../../assets/icons/loader.svg"

const Button=({onSubmit,text,loading})=>{
    return(
        <button className="border flex items-center justify-center rounded border-navy-700 dark:border-white p-1 dark:text-white w-20" onClick={onSubmit}>
            {!loading?text:<img src={Loader} alt='loader' className="spinner p-1"/>}
        </button>
    )
}

export default Button