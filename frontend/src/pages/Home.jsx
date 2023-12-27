import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBrands } from "../actions/brand/brandAction"
import {FontAwesomeIcon}  from "@fortawesome/react-fontawesome"
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons"
import PriceRangeslider from "../components/PriceRangeslider/pricerangeslider"
import gaming from "../assets/gaming.jpg"
import bingewatching from '../assets/Bingewatching.jpg'
import network from '../assets/5GNetwork.jpg'
import productivity from '../assets/Productivity.jpg'
import Brandslider from '../components/Brandslider/brandslider'




const Home=()=>{
    const dispatch=useDispatch()
    const {brands}=useSelector((state)=>state.brand)
    // const sliderRef = useRef(null);
    // const [scrollLeft, setScrollLeft] = useState(0);
    // console.log(brands)
    
    // const slider=document.querySelector('.slider')
    // const slideleft=()=>{
    //     // console.log(slider.scrollWidth)
    //     // console.log(slider.scrollLeft)
    //     // if(slider){
    //     //     sliderRef.scrollLeft+=300
    //     // }
    //     if (sliderRef.current) {
    //         sliderRef.current.scrollLeft += 100;
    //         setScrollLeft(sliderRef.current.scrollLeft);
    //       }
    // }
    // const slideright=()=>{
    //     // console.log(slider.scrollWidth)
    //     // console.log(slider.scrollLeft)
    //     // if(slider){
    //     //     slider.scrollLeft-=300
    //     // }
    //     if (sliderRef.current) {
    //         sliderRef.current.scrollLeft -= 100;
    //         setScrollLeft(sliderRef.current.scrollLeft);
    //       }
    // }
    // const slideToImage = (index) => {
    //     if (sliderRef.current) {
    //       const imageWidth = sliderRef.current.children[0].children[0].offsetWidth; // Assumes all images have the same width
    //       sliderRef.current.scrollLeft = index * imageWidth;
    //       setScrollLeft(sliderRef.current.scrollLeft);
    //     }
    //   };

    useEffect(()=>{
       dispatch(fetchBrands())
    },[])
    return(
        <>
            <div className="w-full">
                {/* 3D Banner */}
                <div>

                </div>

                {/* Brand Slider */}
                <Brandslider/>
                
                {/* PriceRange Slider */}
                <PriceRangeslider/>

                {/* Your smartphone your use */}
                <div className="px-2 lg:px-10 py-5  w-[100%] bg-gray-800">
                    <h2 className="text-left text-lg md:text-xl font-semibold pl-3 md:pl-9 pb-3">Your Smartphone, Your Use</h2>
                <div className="slider-container grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-4 items-top px-5">
                    <div className="text-left"> 
                        <img src={productivity} className=" rounded-lg" alt="mobile img"/>
                        <div className="p-3">
                            <h2 className="text-sm md:text-lg font-bold" >Productivity</h2>
                            <p className="text-sm md:text-lg">Multi-tasking made easy</p>
                        </div>
                    </div> 
                    <div className="text-left">  
                        <img src={network} className="rounded-lg" alt="mobile img"/>
                        <div className="p-3">
                            <h2 className="text-sm md:text-lg font-bold" >5G Network</h2>
                            <p className="text-sm md:text-lg">Be future-ready</p>
                        </div>
                    </div>
                    <div className="text-left"> 
                        <img src={bingewatching} className="rounded-lg" alt="mobile img"/>
                        <div className="p-3">
                            <h2 className="text-sm md:text-lg font-bold" >Binge-watching</h2>
                            <p className="text-sm md:text-lg">Big screens with high resolutions</p>
                        </div>
                    </div>
                    <div className="text-left"> 
                        <img src={gaming} className="rounded-lg" alt="mobile img"/>
                        <div className="p-3">
                            <h2 className="text-sm md:text-lg font-bold" >Gaming</h2>
                            <p className="text-sm md:text-lg">Specs to support heavy-duty apps</p>
                        </div>
                    </div>                        
                </div>
                </div>
            </div>
        </>
    )
}

export default Home