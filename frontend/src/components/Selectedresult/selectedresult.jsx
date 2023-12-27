import { faMultiply } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"




const Selectedresult=({select,setselect})=>{
    return(
        <>
        {select!==''?
        <div className="p-2 bg-black text-white border-1 rounded mx-1">
            {select}<i onClick={()=>{setselect('')}} className="ml-2 p-1 hover:cursor-pointer"><FontAwesomeIcon icon={faMultiply}/></i>
        </div>
        :<>
        
        </>}
        </>
    )
}

export default Selectedresult