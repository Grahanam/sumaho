import { useEffect, useState } from "react"
import { createProduct, fetchProducts } from "../actions/product/productAction"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import Select from 'react-select'
import { fetchBrands } from "../actions/brand/brandAction"
import Button from "../components/Button/button"




const Addproduct=()=>{
    const dispatch=useDispatch()
    const {brands}=useSelector((state)=>state.brand)
    const {products,productserror,productsloading,updateloading,saveloading}=useSelector((state)=>state.product)
    const [title,settitle]=useState('')
    const [model,setmodel]=useState('')
    const [series,setseries]=useState('')
    const [price,setprice]=useState('')
    const [OS,setOS]=useState('')
    const [storage,setstorage]=useState('')
    const [type,settype]=useState('')
    const [dimensions,setdimensions]=useState('')
    const [processor,setprocessor]=useState('')
    const [description,setdescription]=useState('')
    const [formdata,setformdata]=useState({
        title:'',
        model:'',
        series:'',
        price:'',
        OS:'',
        storage:'',
        type:null,
        dimensions:'',
        processor:'',
        description:'',
        picture:[]
    })

    const typeoption=[
        { value: 'ios', label: 'IOS' },
        { value: 'android', label: 'Android' },
        { value: 'feature', label: 'Feature' }
    ]
    

    const [productId,setproductId]=useState('')
    const [brand,setbrand]=useState(null)
    const [category,setcategory]=useState(null)
    const [picture,setpicture]=useState([])
    const [edit,setedit]=useState(false)
    const [specification,setspecification]=useState([''])
    const [selectedFiles,setSelectedFiles]=useState([])
    const [inputKey,setInputKey]=useState(0)
    const [search,setsearch]=useState('')
    const [searchResult,setSearchResult]=useState([])

    const startupdate=(data)=>{
        if(!edit){
            setedit(!edit)
        }
        if(selectedFiles.length>0){
            setSelectedFiles([])
            setInputKey(inputKey+1)
        }
        setproductId(data._id)
        setname(data.name)
        setpicture(data.picture)
        setspecification(data.specification)
        setcategory(data.category)
        setbrand(data.brand)
    }

    const deleteproduct=async(data)=>{
        const confirmation=window.confirm('Confirm Deletion')
        if(confirmation){
        await dispatch(deleteProduct(data._id))
        await dispatch(fetchProducts())
    }else{

    }
    }

    const updateproduct=async()=>{
        const body=new FormData()
            if(selectedFiles.length>0){
                body.append('file',selectedFiles[0])
             }
             for (let i=0;i<specification.length;i++){
                 body.append('specification',specification[i])
             }
             body.append('title',formdata.title)
             body.append('model',formdata.model)
             body.append('series',formdata.series)
             body.append('price',formdata.price)
             body.append('OS',formdata.OS)
             body.append('storage',formdata.storage)
             body.append('type',formdata.type.value)
             body.append('dimensions',formdata.dimensions)
             body.append('processor',formdata.processor)
             body.append('description',formdata.description)
             body.append('brand',brand._id)

             await dispatch(updateProduct(body))
     
             await dispatch(fetchProducts())
             setbrand(null)
             setformdata({
                title:'',
                model:'',
                series:'',
                price:'',
                OS:'',
                storage:'',
                type:null,
                dimensions:'',
                processor:'',
                description:'',
                picture:[]
             })
             if(selectedFiles.length>0){
                 setSelectedFiles([])
                 setInputKey(inputKey+1)
             }
        

    }
    

    const saveProduct=async(e)=>{
        e.preventDefault()
        const body=new FormData()
            for (let i = 0; i < selectedFiles.length; i++) {
                body.append('files', selectedFiles[i]);
            }
            body.append('title',formdata.title)
            body.append('model',formdata.model)
            body.append('series',formdata.series)
            body.append('price',formdata.price)
            body.append('OS',formdata.OS)
            body.append('storage',formdata.storage)
            body.append('type',formdata.type.value)
            body.append('dimensions',formdata.dimensions)
            body.append('processor',formdata.processor)
            body.append('description',formdata.description)
            body.append('brand',brand._id)
            
            await dispatch(createProduct(body))
            await dispatch(fetchProducts())
            setbrand(null)
            setformdata({
                title:'',
                model:'',
                series:'',
                price:'',
                OS:'',
                storage:'',
                type:null,
                dimensions:'',
                processor:'',
                description:'',
                picture:[]
             })
             if(selectedFiles.length>0){
                setSelectedFiles([])
                setInputKey(inputKey+1)
            }

    }
    const handleFileChange=(e)=>{
        setSelectedFiles(e.target.files)

    }

    const handleChange=(e)=>{
         setformdata((prevformdata)=>({
            ...prevformdata,
            [e.target.name]:e.target.value,
         }))
    }

  const deleteimage=async(url,id)=>{
      let body={
          url:url,
          id:id
      }
      const confirmation=window.confirm('Confirm deletion?')
      if(confirmation){
          await dispatch(deleteProductImage(body))
          const arr=[...picture]
          for(let i=0;i<arr.length;i++){
              if(arr[i].url==url){
                  arr.splice(i,1)
                  i--
              }
          }
          setpicture(arr)
          await dispatch(fetchProducts())
      }else{

      }
   
  }
  useEffect(()=>{
    dispatch(fetchProducts())
    dispatch(fetchBrands())
},[])
    return(
        <>
        <div className="mt-3 text-navy-700 dark:text-white text-left flex items-center justify-center">
            <div className="w-[90%] md:w-[70%] lg:w-[50%]  flex">
            <form onSubmit={saveProduct} className="flex flex-col w-full">
                <label>title</label> 
                <input 
                    className="m-1 p-1 dark:text-navy-700 rounded w-60 p-2" 
                    name="title" 
                    value={formdata.title} 
                    onChange={handleChange} 
                    placeholder="Title"
                    required
                />
           
                <label>Model</label> 
                <input 
                    className="m-1 p-1 dark:text-navy-700 rounded w-60 p-2" 
                    name="model" 
                    value={formdata.model} 
                    onChange={handleChange} 
                    placeholder="Model"
                    required
                />
            
                <label>Series</label> 
                <input 
                    className="m-1 p-1 dark:text-navy-700 rounded w-60 p-2" 
                    name="series" 
                    value={formdata.series} 
                    onChange={handleChange} 
                    placeholder="Series"
                    required
                />
            
                <label>Price</label> 
                <input 
                    className="m-1 p-1 dark:text-navy-700 rounded w-60 p-2" 
                    name="price" 
                    value={formdata.price} 
                    onChange={handleChange} 
                    placeholder="Price"
                    required
                />
          
                <label>OS</label> 
                <input 
                    className="m-1 p-1 dark:text-navy-700 rounded w-60 p-2" 
                    name="OS" 
                    value={formdata.OS} 
                    onChange={handleChange} 
                    placeholder="OS"
                    required
                />
               
                <label>Storage</label> 
                <input 
                    className="m-1 p-1 dark:text-navy-700 rounded w-60 p-2" 
                    name="storage" 
                    value={formdata.storage} 
                    onChange={handleChange} 
                    placeholder="Storage"
                    required
                />
           
                <label>Dimensions</label> 
                <input 
                    className="m-1 p-1 dark:text-navy-700 rounded w-60 p-2" 
                    name="dimensions" 
                    value={formdata.dimensions} 
                    onChange={handleChange} 
                    placeholder="Dimensions"
                    required
                />
               
                <label>Processor</label> 
                <input 
                    className="m-1 p-1 dark:text-navy-700 rounded w-60 p-2" 
                    name="processor" 
                    value={formdata.processor} 
                    onChange={handleChange} 
                    placeholder="Processor"
                    required
                />
              
                <label>Description</label> 
                <textarea 
                    className="m-1 p-1 dark:text-navy-700 rounded w-60 p-2" 
                    name="description" 
                    value={formdata.description} 
                    onChange={handleChange} 
                    placeholder="Description"
                    required
                />

                <br/>
                <label>Type</label>
                <div className="m-1 flex items-center">
                  <Select 
                   className="dark:text-black w-56"
                   value={formdata.type}
                   onChange={(option)=>{
                       setformdata((prevformdata)=>({
                          ...prevformdata,
                          ['type']:option
                       }))
                   }}
                   options={typeoption}
                   getOptionLabel={option=>`${option.label}`}
                   getOptionValue={option=>`${option.value}`}
                //    isSearchable={true}
                   isClearable={true}
                   placeholder={'Select Brand'}
                   required
                  />    
                </div>  

                <br/>
                <label>Brand</label>
                <div className="m-1 flex items-center">
                  <Select 
                   className="dark:text-black w-56"
                   value={brand}
                   onChange={(option)=>setbrand(option)}
                   options={brands}
                   getOptionLabel={option=>`${option.name}`}
                   getOptionValue={option=>`${option}`}
                   isSearchable={true}
                   isClearable={true}
                   placeholder={'Select Brand'}
                   required
                  />    
                </div>  

                <br/>

                <label>Image</label>
                <div className="flex flex-row items-center justify-start">
                {formdata.picture.length>0?<>
                    {formdata.picture.map((data,index)=>(
                        <div key={index}>
                            <div className="w-24 h-24  border flex items-center justify-center">
                                {data.url?<>
                                    <img className="w-full" src={`${data.url}`} alt='category img'/>
                                </>:<>
                                    Image
                                </>}
                            </div>
                            <div className="flex items-center justify-end p-1">
                                <i className="text-red-500" onClick={()=>deleteimage(data.url,productId)}><FontAwesomeIcon icon={faTrash}/></i>
                            </div>
                        </div>
                    ))}
                    
                </>:
                <>
                <div className="flex flex-col">
                    <div className="w-24 h-24 border flex items-center justify-center">Image</div>
                    <div className="flex items-center justify-end p-1">
                        <i className=""><FontAwesomeIcon icon={faImage}/></i>
                    </div>
                </div>
                   
                </>}
                <input key={inputKey} onChange={handleFileChange} className="pl-4" type='file' multiple required/>
                </div>
                <div>
                <br/>
                  </div>
                <div>
                </div>
            
            <div className="flex items-end  justify-end">
            {edit?<>
                <button className="border mr-2 rounded border-navy-700 dark:border-white p-1 dark:text-white w-20" onClick={()=>{
                    setedit(!edit)
                    if(selectedFiles.length>0){
                        setSelectedFiles([])
                        setInputKey(inputKey+1)
                    }
                    setname('')
                    setpicture([])
                    setspecification([''])
                    setproductId('')
                    setcategory(null)
                    setbrand(null)
                }}>Cancel</button>
                <Button onSubmit={updateproduct} text='Update' loading={updateloading}/>
            </>:<>
                <Button onSubmit={saveProduct} text='Save' loading={saveloading}/>
            </>}
            </div>
            </form>
            </div>
            {/* <Common 
                heading={'Your Product'}
                searchbar={
                <div className="flex h-full py-2 items-center rounded-full bg-white text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
                    <p className="pl-3 pr-2 text-xl">
                        <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
                    </p>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search Product..."
                    className="block h-full w-full rounded-full bg-white text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white border-none focus:ring-transparent sm:w-fit"
                />
                </div>
                }
                body={
                    <>
                       {productsloading?<>
                        <li class="py-3 sm:py-4 flex items-center justify-center">
                            <div class="flex items-center jusitfy-center">Loading...<Loader/></div>
                        </li>
                        </>:<>
                    {products.length>0?<>
                        {products.map((data,index)=>(
                            // <CommonCard data={data} key={index} update={startupdate} deletedata={deleteproduct}/>
                        ))}
                    </>:<li class="py-3 sm:py-4 flex items-center justify-center">
                            <div class="flex items-center ">No Products created</div>
                        </li>}
                </>}
                    </>
                } 
            /> */}
           
            </div>
           
        </>
    )
}

export default Addproduct