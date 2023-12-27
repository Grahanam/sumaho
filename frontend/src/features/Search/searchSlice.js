import {createSlice} from '@reduxjs/toolkit'
import { fetchResults} from '../../actions/search/searchAction'

export const searchSlice=createSlice({
    name:'search',
    initialState:{
        results:[],
        brandresult:[],
        typeresult:[],
        rangeresult:[],
        ramresult:[],
        processorresult:[],
        resultloading:false,
        resulterror:null,
    },
    reducers:{
        getbrandresult:(state)=>{
            let arr=[...state.results]
            let updatebrandresult=new Map()
            let range=[
                ['0-10000',0],
                ['10001-20000',0],
                ['20001-30000',0],
                ['30001-50000',0],
                ['50001-999999',0]
            ]
            let rangevalue=[
                [0,10000],[10001,20000],[20001,30000],[30001,50000],[50001,Infinity]
            ]
            for(let product of arr){
                if(updatebrandresult.has(product.brand.name)){
                    let value=updatebrandresult.get(product.brand.name)
                    updatebrandresult.set(product.brand.name,value+1)
                }else{
                    updatebrandresult.set(product.brand.name,1)
                }
                for(let i=0;i<rangevalue.length;i++){
                    if(product.price>=rangevalue[i][0]&&product.price<=rangevalue[i][1] ){
                        let value=range[i][1]
                        value+=1
                        range[i][1]=value
                    }
                }
            }
            // state.brandresult=Array.from(updatebrandresult)
            return {
                ...state,
                brandresult:Array.from(updatebrandresult),
                rangeresult:range
            }
        },
        clearbrandresult:(state)=>{
            state.brandresult=[]
            return {
                ...state,
                brandresult:[]
            }
        }
    
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchResults.pending,(state)=>{
            state.resultloading=true
            state.resulterror=null
        })
        .addCase(fetchResults.fulfilled,(state,action)=>{
            state.resultloading=false
            let payload=action.payload
            // console.log(payload)
            if(payload.data){
                state.results=payload.data;
            }
            if(payload.typeresult){
                state.typeresult=payload.typeresult
            }
            if(payload.ramresult){
                state.ramresult=payload.ramresult
            }
            if(payload.processorresult){
                state.processorresult=payload.processorresult
            }

            
        })
        .addCase(fetchResults.rejected,(state,action)=>{
            state.resultloading=false
            state.resulterror=action.error.message;
        })

        // .addCase(createBrand.pending,(state)=>{
        //     state.saveloading=true
        //     state.saveerror=null
        // })
        // .addCase(createBrand.fulfilled,(state)=>{
        //     state.saveloading=false
        //     // state.tracks=action.payload;
        // })
        // .addCase(createBrand.rejected,(state,action)=>{
        //     state.saveloading=false
        //     state.saveerror=action.error.message;
        // })

        // .addCase(updateBrand.pending,(state)=>{
        //     state.updateloading=true
        //     state.updateerror=null
        // })
        // .addCase(updateBrand.fulfilled,(state)=>{
        //     state.updateloading=false
        //     // state.tracks=action.payload;
        // })
        // .addCase(updateBrand.rejected,(state,action)=>{
        //     state.updateloading=false
        //     state.updateerror=action.error.message;
        // })
        

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

export  const{getbrandresult,clearbrandresult}=searchSlice.actions

export default searchSlice.reducer