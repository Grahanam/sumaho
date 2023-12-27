
import {configureStore} from '@reduxjs/toolkit'


import brandreducer from './features/Brand/brandSlice'
import productreducer from './features/Product/productSlice'
import searchreducer from './features/Search/searchSlice'

const store = configureStore({
    reducer:{
        brand:brandreducer,
        product:productreducer,
        search:searchreducer
    },
})

export default store;