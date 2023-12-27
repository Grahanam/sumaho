import { useEffect, useState } from "react"
import { useParams,useSearchParams,useLocation } from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { fetchResults } from "../actions/search/searchAction"
import Productcard from "../components/Card/productCard"
import { clearbrandresult, getbrandresult } from "../features/Search/searchSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox, faChevronDown, faFilter, faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons"
import Filter from "../components/Filter/Filter"
import Selectedresult from "../components/Selectedresult/selectedresult"

const Search=()=>{
   
   const {results,brandresult,rangeresult,typeresult,processorresult,ramresult}=useSelector((state)=>state.search)
   const [selectbrand,setselectbrand]=useState('')
   const [selectrange,setselectrange]=useState('')
   const [selecttype,setselecttype]=useState('')
   const [selectprocessor,setselectprocessor]=useState('')
   const [selectram,setselectram]=useState('')
   const [showfilter,setshowfilter]=useState(false)
   const [queryvalue,setqueryvalue]=useState('')
   const [firstcall,setfirstcall]=useState(false)
   const [queryObj, setQueryObj] = useState({ brand:'',query:'',range:'' });


   // console.log(brandresult)
   const dispatch=useDispatch()
    function useQuery(){
      return new URLSearchParams(useLocation().search)
    }
    
    const query=useQuery()
    let displayquery=''
    let querystr=''
    let queryobj={
      query:'',
      brand:'',
      range:'',
    }
    
    if(query.get('query')){
      let search=query.get('query')
      queryobj['query']=search
      displayquery+='"'+search+'" '
      querystr+=`query=${search}`
    }if(query.get('range')){
      let range=query.get('range')
      queryobj['range']=range
      displayquery+=`Price(${range})`
      if(querystr.length>0){
         querystr+='&'
      }
      querystr+=`range=${range}`
    }if(query.get('brand')){
      
      let brand=query.get('brand')
      queryobj['brand']=brand
      displayquery+=` ${brand}`
      if(querystr.length>0){
         querystr+='&'
      }
      querystr+=`brand=${brand}`
    }
   //  setqueryvalue(querystr)
    
   //  const searchParams=useSearchParams()
   //  console.log(searchParams)
   //  const query=searchParams.get('query')
   //  console.log(query)
   useEffect(()=>{
      
        if(selectbrand!==''&&query.get('brand')!=selectbrand){
          querystr+='&brand='+selectbrand 
        }
        if(selectrange!==''&&query.get('range')!=selectrange){
         querystr+='&range='+selectrange 
         // setqueryvalue(querystr)
         }
         if(selecttype!==''&&query.get('type')!=selecttype){
            querystr+='&type='+selecttype
            // setqueryvalue(querystr)
            }
            if(selectram!==''){
               querystr+='&ram='+selectram
               // setqueryvalue(querystr)
            }
            if(selectprocessor!==''){
               querystr+='&processor='+selectprocessor
               // setqueryvalue(querystr)
            }
      //  setqueryvalue(querystr)
        setqueryvalue(querystr)
        
     },[selectbrand,selectrange,selecttype,selectprocessor,selectram])

   //   useEffect(()=>{

   //      if(selectrange!==''&&query.get('range')!=selectrange){
   //        querystr+='&range='+selectrange 
   //        setqueryvalue(querystr)
   //      }
   //      setqueryvalue(querystr)
        
   //   },[selectrange])

     useEffect(()=>{
      setqueryvalue(querystr)
     },[querystr])
     
     useEffect(()=>{
        if(queryvalue!==''){
           dispatch(fetchResults(queryvalue))
           .then(()=>{
            // if(firstcall==false){s
            //    dispatch(getbrandresult())
            //    setfirstcall(!firstcall)
            // }
            dispatch(getbrandresult())
            
           }) 
        }
     },[queryvalue])


   //   useEffect(()=>{
   //    if(results.length>0){
   //       dispatch(getbrandresult())
   //    }
      
   //   },[results])
     return(
        <> 
            <div className="px-3 md:px-10">
               <div className="text-left pb-5 items-end flex">
                  <h2 className="text-xl md:text-4xl font-bold">Results for {displayquery}</h2>
                  <span className="text-lg">({results.length})</span>
               </div>
               <button onClick={()=>{setshowfilter(!showfilter)}} className="border bg-black p-1 rounded">Filter<i className="pl-2"><FontAwesomeIcon icon={faFilter}/></i></button>
               <div className={`${showfilter?'flex':'hidden'}  md:flex flex-col  md:flex-row pb-3`}>
                  {brandresult.length>0?
                     <Filter title={'Brand'} results={brandresult} select={selectbrand} setselect={setselectbrand}/>
                      :
                      <></>
                   }
                   {rangeresult.length>0?
                     <Filter title={'Price'} results={rangeresult} select={selectrange} setselect={setselectrange}/>
                      :
                      <></>
                   }
                   {typeresult.length>0?
                     <Filter title={'Type'} results={typeresult} select={selecttype} setselect={setselecttype}/>
                      :
                      <></>
                   }
                   {processorresult.length>0?
                     <Filter title={'Processor'} results={processorresult} select={selectprocessor} setselect={setselectprocessor}/>
                      :
                      <></>
                   }
                   {ramresult.length>0?
                     <Filter title={'Ram'} results={ramresult} select={selectram} setselect={setselectram}/>
                      :
                      <></>
                   }
                   
               </div>
               <div className="px-10 flex flex-wrap mb-5  min-h-10">
                  <Selectedresult select={selectbrand} setselect={setselectbrand}/>
                  <Selectedresult select={selectrange} setselect={setselectrange}/>
                  <Selectedresult select={selecttype} setselect={setselecttype}/>
                  <Selectedresult select={selectprocessor} setselect={setselectprocessor}/>
                  <Selectedresult select={selectram} setselect={setselectram}/>
               </div>
               
            
            <div className=" md:px-10 grid grid-cols-1 md:grid-cols-3  md:gap-4 lg:gap-6">
            {results.map((product,index)=>(
               <div key={index}>
                  <Productcard product={product} index={index}/>
              </div>
            ))}
            </div>
            </div>
           
        </>
     )
}

export default Search