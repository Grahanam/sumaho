import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSingleProduct } from "../actions/product/productAction"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIndianRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons"




const Singleproduct=()=>{
    const {id}=useParams()
    const {product}=useSelector((state)=>state.product)
    const [selectedImage,setselectedImage]=useState(0)
    const [osdata,setosdata]=useState([])
    const [storagedata,setstoragedata]=useState([])
    const [processordata,setprocessordata]=useState([])
    const dispatch=useDispatch()

    

    useEffect(()=>{
        dispatch(fetchSingleProduct(id))
        .then(()=>{
         if(product.OS){
         setosdata(product.OS.split('|'))
         setstoragedata(product.storage.split('|'))
         
         }
         if(product.processor){
            setprocessordata(product.processor.split('|'))
         } 
        })
    },[id,osdata,storagedata,processordata])
    return(
        <div className="px-1 md:px-5 lg:px-24">
            {product.title?<>
                <div href="#" class="lg:p-10 flex flex-col md:flex-row items-top border border-gray-200 mb-6 rounded-lg shadow md:flex-row  ">
                <div className="w-full md:w-[50%] flex flex-col ">
                    
                    <div className="m-2 px-5">              
                    <img class=" rounded-lg w-full h-auto " src={`${product.picture[selectedImage].url}`} alt=""/>
                    </div>
                    <div class="grid grid-cols-4 gap-1 m-2">
                        
                    {product.picture.map((pic,index)=>(
                        <div key={index} onClick={()=>setselectedImage(index)}>
                             <img class={`h-auto max-w-full rounded-lg ${index==selectedImage?'border-2 md:border-4 border-cyan-300':''}`} src={pic.url} alt=""/>
                        </div>
                    ))} 
                    </div>
                </div>
                <div class="w-full md:w-[50%]  p-4 leading-normal text-left">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">4.4 <i><FontAwesomeIcon icon={faStar}/></i>(4)</p>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><i><FontAwesomeIcon icon={faIndianRupeeSign}/></i>{product.price}</h5>

                </div>
            </div>
            <div className="md:mx-2 md:mx-5 lg:mx-10">
            <div className="border p-4 text-left mb-5 rounded-lg ">
                <h2 className="font-medium text-lg">Specifications</h2>
                <div className="py-2 border-b-2 border-gray-600">
                    <h2 className="font-semibold text-xl">MOBILE CATEGORY</h2>
                    <div className="grid grid-cols-3 py-2">
                        <div className="text-sm md:text-md">
                            <h3>Mobile Type</h3>
                            <h3 className="font-bold capitalize">{product.type}</h3>
                        </div>
                        <div className="text-sm md:text-md">
                            <h3>Condition</h3>
                            <h3 className="font-bold">New</h3>
                        </div>
                    </div>
                </div>
               
                <div className="py-2 border-b-2 border-gray-600">
                    <h2 className="font-semibold text-xl">MANUFACTURER DETAILS</h2>
                    <div className="grid grid-cols-3 py-2">
                        <div className="text-sm md:text-md">
                            <h3>Brand</h3>
                            <h3 className="font-bold">{product.brand.name}</h3>
                        </div>
                        <div className="text-sm md:text-md">
                            <h3>Model Series</h3>
                            <h3 className="font-bold">{product.series}</h3>
                        </div>
                        <div className="text-sm md:text-md">
                            <h3>Model Number</h3>
                            <h3 className="font-bold">{product.model}</h3>
                        </div>
                    </div>
                </div>

                <div className="py-2 border-b-2 border-gray-600">
                    <h2 className="font-semibold text-xl">OPERATING SYSTEM</h2>
                    <div className="grid grid-cols-3 py-2">
                        <div className="text-sm md:text-md">
                            <h3>OS Type</h3>
                            
                            {osdata.length>0?
                            <h3 className="font-bold">{osdata[0]}</h3>
                            :<></>}
                        </div>
                        <div className="text-sm md:text-md">
                            <h3>OS NAME & Version</h3>
                            {osdata.length>0?
                            <h3 className="font-bold">{osdata[1]}</h3>
                           :<></>} 
                        </div>
                    </div>
                </div>

                <div className="py-2 border-b-2 border-gray-600">
                    <h2 className="font-semibold text-xl">PROCESSOR DETAILS</h2>
                    <div className="grid grid-cols-3 py-2">
                        <div className="text-sm md:text-md">
                            <h3>Brand</h3>
                            
                            {processordata.length>0?
                            
                            <h3 className="font-bold">{processordata[0]}</h3>
                            :<></>}
                        </div>
                        <div className="text-sm md:text-md">
                            <h3>Name</h3>
                            {processordata.length>0?
                            <h3 className="font-bold">{processordata[1]}</h3>
                            :<></>}
                            
                        </div>
                        <div className="text-sm md:text-md">
                            <h3>Variant</h3>
                            {processordata.length>0?
                            <h3 className="font-bold">{processordata[2]}</h3>
                            :<></>}
                            
                        </div>
                    </div>
                </div>


                <div className="py-2 border-b-2 border-gray-600">
                    <h2 className="font-semibold text-xl">STORAGE SPECIFICATION</h2>
                    <div className="grid grid-cols-3 py-2">
                        <div className="text-sm md:text-md">
                            <h3>Internal Storage</h3>
                            
                            {storagedata.length>0?
                            
                            <h3 className="font-bold">{storagedata[0]}</h3>
                            :<></>}
                        </div>
                        <div className="text-sm md:text-md">
                            <h3>Ram</h3>
                            {storagedata.length>0?
                            <h3 className="font-bold">{storagedata[1]}</h3>
                            :<></>}
                            
                        </div>
                    </div>
                </div>
                
                <div className="py-2 border-b-2 border-gray-600">
                    <h2 className="font-semibold text-xl">PRODUCT DIMENSIONS(OPEN)</h2>
                    <div className="grid grid-cols-3 py-2">
                        <div className="col-span-2 md:col-span-1 text-sm md:text-md">
                            <h3>Dimensions in CM(WxDxH)</h3>
                            <h3 className="font-bold">{product.dimensions}</h3>
                        </div>
                        <div className="text-sm md:text-md">
                            <h3>Weight</h3>
                            <h3 className="font-bold">171</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border p-4 text-left mb-5 rounded-lg">
                <h2 className="font-medium text-lg">Overview</h2>
                <p className="px-4 py-2"> {product.description}</p>
            </div>

            </div>
            </>:<>
            
            </>}
            
            
        </div>
        
    )
}

export default Singleproduct
