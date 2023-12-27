import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "../../actions/brand/brandAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";



const Brandslider=()=>{
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
        }
      };

    useEffect(()=>{
       dispatch(fetchBrands())
    },[])

    return(
        <>
        <div className="px-1 md:px-10 pb-10">
                    <h2 className="text-left text-lg md:text-xl font-semibold pl-3 md:pl-9 pb-3">Pick Your Smartphone Brand</h2>
                <div className="slider-container flex">
                    <button className="p-2 lg:p-3 rounded" onClick={() => slideToImage(0)}><i><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></i></button>
                    <div 
                        className="slider flex overflow-x-auto "
                        ref={sliderRef}
                    >
                        <div className="flex transition-transform duration-500 ease-in-out transform"
                            style={{ transform: `translateX(-${scrollLeft}px)` }} 
                        >
                            {brands.map((brand,index)=>(
                                <img key={index} src={brand.picture.url} onClick={()=>{navigate(`/search?brand=${brand.name}`)}} className="w-[30%] md:w-[24.5%] mx-1 rounded" alt="mobile img"/>
                            ))}
                        </div>
                    </div>
                    <button className="p-2 md:p-3 rounded" onClick={() => slideToImage(brands.length - 1)}><i><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></i></button>
                </div>
                </div>

        </>
    )
}

export default Brandslider