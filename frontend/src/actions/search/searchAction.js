import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL=import.meta.env.VITE_BASE_URL
const TOKEN=import.meta.env.VITE_TOKEN

export const fetchResults=createAsyncThunk('search/fetchResults',async(query)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/Product/search?${query}`,{
            method:'GET',
            headers:{
                "Authorization":`${TOKEN}`,
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        return data
    }catch(err){
        throw err
    }
})

// export const createBrand=createAsyncThunk('brand/createBrand',async(body)=>{
//     try{
//         const response=await fetch(`${API_BASE_URL}/brand`,{
//             method:'POST',
//             headers:{
//                 "Authorization":`${TOKEN}`,
//                 'Accept':'application/json',
//             },
//             body:body
//         })
//         const data=await response.json()
//         return data.data
//     }catch(err){
//         throw err
//     }
// })

// export const updateBrand=createAsyncThunk('brand/updatebrand',async(body)=>{
//     try{
//         const response=await fetch(`${API_BASE_URL}/brand`,{
//             method:'PUT',
//             headers:{
//                 "Authorization":`${TOKEN}`,
//                 'Accept':'application/json',
//             },
//             body:body
//         })
//         const data=await response.json()
//         return data.data
//     }catch(err){
//         throw err
//     }
// })

// export const deleteBrand=createAsyncThunk('brand/deleteBrand',async(id)=>{
//     try{
//         const response=await fetch(`${API_BASE_URL}/brand/${id}`,{
//             method:'DELETE',
//             headers:{
//                 "Authorization":`${TOKEN}`,
//                 'Accept':'application/json',
//             },
//         })
//         const data=await response.json()
//         return data.data
//     }catch(err){
//         throw err
//     }
// })

// export const fetchJointBrands=createAsyncThunk('brand/fetchJointBrands',async()=>{
//     try{
//         const response=await fetch(`${API_BASE_URL}/brand/joint`,{
//             method:'GET',
//             headers:{
//                 'Accept':'application/json',
//                 'Content-Type':'application/json'
//             }
//         })
//         const data=await response.json()
//         return data.data
//     }catch(err){
//         throw err
//     }
// })

// export const fetchSingleAlbum=createAsyncThunk('album/fetchSingleAlbum',async(Id)=>{
//     try{
//         const response=await fetch(`${API_BASE_URL}/album/single/${Id}`,{
//             method:'GET',
//             headers:{
//                 'Accept':'application/json',
//                 'Content-Type':'application/json'
//             }

//         })
//         const data=await response.json()
//         return data.data
//     }catch(err){
//         throw err
//     }
// })

