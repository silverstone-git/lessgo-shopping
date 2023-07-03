// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRef, useState } from "react";
import { getFrontendLocation } from "../scripts/urls";

function CarouselDashboard(props: any) {

    const carouselParentRef = useRef<HTMLDivElement>(null);
    const [curSlide, setCurSlide] = useState(0);

    function slide(slideTo: number) {
        const parent = (carouselParentRef.current as HTMLDivElement)
        const newPos = curSlide + slideTo;
        if(newPos < 0)
        setCurSlide(props.listOfImages.length);
        else if(newPos > props.listOfImages.length-1)
        setCurSlide(0);
        else
        setCurSlide(newPos);
    }

    console.log("carousel index: ");
    console.log(curSlide);

    return (
        /*
        <Carousel interval={3000} autoPlay={true} infiniteLoop={true} showThumbs={props.showThumbs !== undefined ? props.showThumbs : false} showStatus={props.showStatus !== undefined ? props.showStatus : true } showIndicators className='w-full' >
            {props.listOfImages.map((el: any) => {
                return(
                <div key={el[2]} className={`h-[${props.height ? props.height : 60}vh]  w-full cursor-pointer flex justify-center items-center`} onClick={() => {
                    window.location.href = `${getFrontendLocation()}/item/${el[2]}/`
                }}>
                    <img src={el[0]} alt="" className=" object-contain h-full" />
                    {el[1] ? <p className="legend">{el[1]}</p> : null}
                </div>
                )
            }
            )}
        </Carousel>
        */
        <div
    id="carouselExampleCaptions"
    className="relative"
    >
  {/* <!--Carousel indicators--> */}
  <div
    className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
    data-te-carousel-indicators>

    {props.listOfImages.map((el: any) => {
    return <button
    onClick={() => {
        console.log("button carousel clickk");
    }}
      type="button"
      className={` ${el[2] === props.listOfImages[curSlide][2] ? 'opacity-90' : 'opacity-50'} mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none`}
      aria-current="true"
      aria-label="Slide"></button>
    })}
  </div>

  {/* <!--Carousel items--> */}
  <div
  id="carousel-parent"
  ref={carouselParentRef}
    className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
    {/* <!--First item--> */}

    {props.listOfImages.map((el: any) => {
        return (
    <div
    key={el[2]}
    id={el[2]}
      className={`relative ${props.height ? 'h-[' + props.height + 'vh]' : 'h-[60vh]'} ${el[2] === props.listOfImages[curSlide][2] ? 'flex' : 'hidden'} backface-invisible flex flex-col justify-center float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
      >
      <img
    onClick={() => {
        window.location.href = `${getFrontendLocation()}/item/${el[2]}/`
    }}
        src={el[0]}
        className="block w-full cursor-pointer"
        alt="..." />
      <div
        className={` ${el[1] ? 'block' : 'hidden'} absolute inset-x-[15%] -translate-y-4 bottom-5 p-3 rounded-full text-center bg-black bg-opacity-50 text-white `}>
        <p className="text-lg">{el[1]}</p>
      </div>
    </div>)
    })}
  </div>

  {/* <!--Carousel controls - prev item--> */}
  <button
    className="prev absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    onClick={(e) => {
        slide((e.target as HTMLElement).classList[0] === 'prev' ? -1 : 1);
    }}
    
    >
    <span className="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </span>
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >
        Previous</span>
  </button>
  {/* <!--Carousel controls - next item--> */}
  <button
    className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
    type="button"
    onClick={(e) => {
        slide((e.target as HTMLElement).classList[0] === 'prev' ? -1 : 1);
    }}
    >
    <span className="inline-block h-8 w-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-6 w-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </span>
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Next</span
    >
  </button>
</div>
    )
}

export default CarouselDashboard;
