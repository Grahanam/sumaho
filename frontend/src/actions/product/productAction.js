import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL=import.meta.env.VITE_BASE_URL
const TOKEN=import.meta.env.VITE_TOKEN

export const fetchProducts=createAsyncThunk('product/fetchProducts',async()=>{
    try{
        const response=await fetch(`${API_BASE_URL}/product`,{
            method:'GET',
            headers:{
                "Authorization":`${TOKEN}`,
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        return data.data
    }catch(err){
        throw err
    }
})

export const fetchSingleProduct=createAsyncThunk('product/fetchSingleProduct',async(id)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/product/${id}`,{
            method:'GET',
            headers:{
                "Authorization":`${TOKEN}`,
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        return data.data
    }catch(err){
        throw err
    }
})


export const createProduct=createAsyncThunk('product/createProduct',async(body)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/product`,{
            method:'POST',
            headers:{
                "Authorization":`${TOKEN}`,
                'Accept':'application/json',
            },
            body:body
        })
        const data=await response.json()
        return data.data
    }catch(err){
        throw err
    }
})

export const updateProduct=createAsyncThunk('product/updateProduct',async(body)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/product`,{
            method:'PUT',
            headers:{
                "Authorization":`${TOKEN}`,
                'Accept':'application/json',
            },
            body:body
        })
        const data=await response.json()
        return data.data
    }catch(err){
        throw err
    }
})

export const deleteProductImage=createAsyncThunk('product/deleteProductImage',async(body)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/product/pic/${body.id}`,{
            method:'PUT',
            headers:{
                "Authorization":`${TOKEN}`,
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
        const data=await response.json()
        return data.data
    }catch(err){
        throw err
    }
})


export const deleteProduct=createAsyncThunk('product/deleteProduct',async(id)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/product/${id}`,{
            method:'DELETE',
            headers:{
                "Authorization":`${TOKEN}`,
                'Accept':'application/json',
            },
        })
        const data=await response.json()
        return data.data
    }catch(err){
        throw err
    }
})



