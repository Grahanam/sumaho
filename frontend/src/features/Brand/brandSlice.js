import {createSlice} from '@reduxjs/toolkit'
import { fetchBrands ,createBrand,updateBrand,deleteBrand, fetchBrandProducts} from '../../actions/brand/brandAction'

export const brandSlice=createSlice({
    name:'brand',
    initialState:{
        brands:[],
        brandProducts:[],
        brandProductsloading:false,
        brandProductserror:null,
        brandsloading:false,
        brandserror:null,
        saveloading:false,
        saveerror:null,
        updateloading:false,
        updateerror:null
    },
    reducers:{
    
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBrands.pending,(state)=>{
            state.brandsloading=true
            state.brandserror=null
        })
        .addCase(fetchBrands.fulfilled,(state,action)=>{
            state.brandsloading=false
            state.brands=action.payload;
        })
        .addCase(fetchBrands.rejected,(state,action)=>{
            state.brandsloading=false
            state.brandserror=action.error.message;
        })

        .addCase(createBrand.pending,(state)=>{
            state.saveloading=true
            state.saveerror=null
        })
        .addCase(createBrand.fulfilled,(state)=>{
            state.saveloading=false
            // state.tracks=action.payload;
        })
        .addCase(createBrand.rejected,(state,action)=>{
            state.saveloading=false
            state.saveerror=action.error.message;
        })

        .addCase(updateBrand.pending,(state)=>{
            state.updateloading=true
            state.updateerror=null
        })
        .addCase(updateBrand.fulfilled,(state)=>{
            state.updateloading=false
            // state.tracks=action.payload;
        })
        .addCase(updateBrand.rejected,(state,action)=>{
            state.updateloading=false
            state.updateerror=action.error.message;
        })

        .addCase(fetchBrandProducts.pending,(state)=>{
            state.brandProductsloading=true
            state.brandProductserror=null
        })
        .addCase(fetchBrandProducts.fulfilled,(state,action)=>{
            state.brandProductsloading=false
            state.brandProducts=action.payload;
        })
        .addCase(fetchBrandProducts.rejected,(state,action)=>{
            state.brandProductsloading=false
            state.brandProductserror=action.error.message;
        })
        

        // .addCase(fetchSingleAlbum.pending,(state)=>{
        //     state.singleloading=true
        //     state.singleerror=null
        // })
        // .addCase(fetchSingleAlbum.fulfilled,(state,action)=>{
        //     state.singleloading=false

        //     state.album=action.payload;
        // })
        // .addCase(fetchSingleAlbum.rejected,(state,action)=>{
        //     state.singleloading=false
        //     state.singleerror=action.error.message;
        // })
    }
}
)

export  const{}=brandSlice.actions

export default brandSlice.reducer