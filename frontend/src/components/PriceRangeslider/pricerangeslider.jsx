import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../actions/brand/brandAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import range1 from '../../assets/range/range1.jpg'
import range2 from '../../assets/range/range2.jpg'
import range3 from '../../assets/range/range3.jpg'
import range4 from '../../assets/range/range4.jpg'
import range5 from '../../assets/range/range5.jpg'
import range6 from '../../assets/range/range6.jpg'
import { useNavigate } from "react-router-dom";




const PriceRangeslider=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {brands}=useSelector((state)=>state.brand)
    const sliderRef = useRef(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    // console.log(brands)
    
    const slider=document.querySelector('.slider')
    const slideleft=()=>{
        // console.log(slider.scrollWidth)
        // console.log(slider.scrollLeft)
        // if(slider){
        //     sliderRef.scrollLeft+=300
        // }
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += 100;
            setScrollLeft(sliderRef.current.scrollLeft);
          }
    }
    const slideright=()=>{
        // console.log(slider.scrollWidth)
        // console.log(slider.scrollLeft)
        // if(slider){
        //     slider.scrollLeft-=300
        // }
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= 100;
            setScrollLeft(sliderRef.current.scrollLeft);
          }
    }
    const slideToImage = (index) => {
        if (sliderRef.current) {
          const imageWidth = sliderRef.current.children[0].children[0].offsetWidth; // Assumes all images have the same width
          sliderRef.current.scrollLeft = index * imageWidth;
          setScrollLeft(sliderRef.current.scrollLeft);
        //   console.log(index)
        }
      };

    useEffect(()=>{
       dispatch(fetchBrands())
    },[])

    return(
        <>
        <div className="px-1 lg:px-10 pb-10">
                    <h2 className="text-left text-lg md:text-xl font-semibold pl-3 md:pl-9 pb-3">For Your Budget</h2>
                <div className="slider-container flex ">
                    <button className=" p-2 lg:p-3 rounded" onClick={() => slideToImage(0)}><i><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></i></button>
                    <div 
                        className="slider flex overflow-x-auto "
                        ref={sliderRef}
                    >
                        <div className="flex transition-transform duration-500 ease-in-out transform"
                            style={{ transform: `translateX(-${scrollLeft}px)` }} 
                        >
                                <img src={range1} onClick={()=>{navigate('/search?range=0-5000')}} className="w-[31%] lg:w-[24.5%] mx-1 rounded hover:cursor-pointer" alt="mobile img"/>
                                <img src={range2} onClick={()=>{navigate('/search?range=5001-10000')}} className="w-[31%] lg:w-[24.5%] mx-1 rounded hover:cursor-pointer" alt="mobile img"/>
                                <img src={range3} onClick={()=>{navigate('/search?range=10001-20000')}} className="w-[31%] lg:w-[24.5%] mx-1 rounded hover:cursor-pointer" alt="mobile img"/>
                                <img src={range4} onClick={()=>{navigate('/search?range=20001-30000')}} className="w-[31%] lg:w-[24.5%] mx-1 rounded hover:cursor-pointer" alt="mobile img"/>
                                <img src={range5} onClick={()=>{navigate('/search?range=30001-50000')}} className="w-[31%] lg:w-[24.5%] mx-1 rounded hover:cursor-pointer" alt="mobile img"/>
                                <img src={range6} onClick={()=>{navigate('/search?range=50000')}} className="w-[31%] lg:w-[24.5%] mx-1 rounded" alt="mobile img"/>
                        </div>
                    </div>
                    <button className="p-2 lg:p-3 rounded" onClick={() => slideToImage(brands.length - 1)}><i><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></i></button>
                </div>
                </div>

        </>
    )
}

export default PriceRangeslider