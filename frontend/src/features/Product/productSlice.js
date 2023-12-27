import {createSlice} from '@reduxjs/toolkit'
import { fetchProducts,createProduct,updateProduct, deleteProductImage, fetchSingleProduct } from '../../actions/product/productAction'

export const productSlice=createSlice({
    name:'product',
    initialState:{
        products:[],
        product:{},
        singleloading:false,
        singleerror:null,
        productsloading:false,
        productserror:null,
        saveloading:false,
        saveerror:null,
        updateloading:false,
        updateerror:null,
        deleteimageloading:false,
        deleteimageerror:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        //products
        .addCase(fetchProducts.pending,(state)=>{
            state.productsloading=true
            state.productserror=null
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.productsloading=false
            state.products=action.payload;
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.productsloading=false
            state.productserror=action.error.message;
        })
        
        //single products
        .addCase(fetchSingleProduct.pending,(state)=>{
            state.singleloading=true
            state.singleerror=null
        })
        .addCase(fetchSingleProduct.fulfilled,(state,action)=>{
            state.singleloading=false
            state.product=action.payload;
        })
        .addCase(fetchSingleProduct.rejected,(state,action)=>{
            state.singleloading=false
            state.singleerror=action.error.message;
        })

        //create products
        .addCase(createProduct.pending,(state)=>{
            state.saveloading=true
            state.saveerror=null
        })
        .addCase(createProduct.fulfilled,(state)=>{
            state.saveloading=false
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.saveloading=false
            state.saveerror=action.error.message;
        })
        
        //updateproduct
        .addCase(updateProduct.pending,(state)=>{
            state.updateloading=true
            state.updateerror=null
        })
        .addCase(updateProduct.fulfilled,(state)=>{
            state.updateloading=false
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.updateloading=false
            state.updateerror=action.error.message;
        })
        
        //deleteproduct
        .addCase(deleteProductImage.pending,(state)=>{
            state.deleteimageloading=true
            state.deleteimageerror=null
        })
        .addCase(deleteProductImage.fulfilled,(state)=>{
            state.deleteimageloading=false
        })
        .addCase(deleteProductImage.rejected,(state,action)=>{
            state.deleteimageloading=false
            state.deleteimageerror=action.error.message;
            console.log(action.error.message)
            // console.log('ended')
        })
    }
}
)

export  const{}=productSlice.actions

export default productSlice.reducer