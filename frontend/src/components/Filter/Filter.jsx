import { faChevronDown, faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"




const Filter=({results,select,setselect,title})=>{
    const [show,setshow]=useState(false)
    return(
        <div className={`relative   py-2`}>
            <div onClick={()=>{setshow(!show)}} className="flex justify-between items-center text-lg hover:bg-black hover:cursor-pointer border px-2 rounded mx-1">{title}<i className="text-sm pl-1"><FontAwesomeIcon icon={faChevronDown}/></i></div>
                <div className={`${show?'':'hidden'} w-full md:w-52 absolute t-2 l-0 bg-black z-10  border-1 rounded p-1 text-left`}>
                    {/* {brandresult.length>0?<> */}
                        {results.map((result,index)=>(
                            <div className="p-1" key={index}>
                            {result[1]==0?<></>:
                            <div onClick={()=>{
                                        if(select===result[0]){
                                            setselect('')
                                        }else{
                                            setselect(result[0])
                                        }  
                                        setshow(false)
                                    }}>
                                {select===result[0]?
                                    <i><FontAwesomeIcon icon={faSquareCheck}/></i>
                                 :
                                    <i><FontAwesomeIcon icon={faSquare}/></i>
                                }
                                <span className="pl-2">{result[0]}</span><span className="text-sm text-gray-400">({result[1]})</span>
                           </div>
                           }
                           </div>
                        ))}
                        {/* </>:<>
                        
                        </>} */}
                        
                     </div>
                  </div>
         
    )
}


export default Filter