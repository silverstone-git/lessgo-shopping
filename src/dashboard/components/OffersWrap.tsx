import CarouselDashboard from "../../common/components/Carousel";

function OffersWrap(props: any) {
    return(

        <div id="offers" className="flex-wrap flex bg-slate-100 dark:bg-slate-800 w-full font-lg font-bold pb-14">
          <div id="electronics" className="flex flex-col items-center gap-4 p-4 sm:w-1/2 lg:w-1/3 w-full mt-14">
            <div>Electronics for your home</div>
            <CarouselDashboard {...{listOfImages: props.electronicsCarousel, height: 30}}/>
          </div>
          <div id="packed" className="flex flex-col items-center gap-4 p-4 sm:w-1/2 lg:w-1/3 w-full mt-14">
            <div>Food at Lessgo</div>
            <CarouselDashboard {...{listOfImages: props.pkdCarousel, height: 30}}/>
          </div>
          <div id="vehicles" className="flex flex-col items-center gap-4 p-4 sm:w-1/2 lg:w-1/3 w-full mt-14">
            <div>Hot Wheels for long rides</div>
            <CarouselDashboard {...{listOfImages: props.vehiclesCarousel, height: 30}}/>
          </div>
          <div id="material" className="flex flex-col items-center gap-4 p-4 sm:w-1/2 lg:w-1/3 w-full mt-14">
            <div>Craft something new with Lessgo</div>
            <CarouselDashboard {...{listOfImages: props.materialCarousel, height: 30}}/>
          </div>
          <div id="laptops" className="flex flex-col items-center gap-4 p-4 sm:w-1/2 lg:w-1/3 w-full mt-14">
            <div>Laptops</div>
            <CarouselDashboard {...{listOfImages: props.laptopCarousel, height: 30}}/>
          </div>
          <div id="grocery" className="flex flex-col items-center gap-4 p-4 sm:w-1/2 lg:w-1/3 w-full mt-14">
            <div>Fresh Organic Grocery for home</div>
            <CarouselDashboard {...{listOfImages: props.groceryCarousel, height: 30}}/>
          </div>
        </div>
    )
}

export default OffersWrap;