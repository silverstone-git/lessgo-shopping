import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarouselDashboard from "../../common/components/Carousel";
import Snacc from "../../common/components/SnackBarComponent";
import Loading from "../../common/components/Loading";
import YourCartButton from "../../common/components/YourCartButton";

export default function DashboardCustomer(props: any) {
    return (
    <div id='dashboard'>

      <div className='flex flex-col items-center pt-24 md:pt-0 bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
        <div className="hidden md:flex">
        <CarouselDashboard {...{"listOfImages": [
          ["https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a1d93b6bc446790d.jpg?q=20", "", ""],
          ["https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a1d93b6bc446790d.jpg?q=20", "", ""],
          ["https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a1d93b6bc446790d.jpg?q=20", "", ""],
          ["https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a1d93b6bc446790d.jpg?q=20", "", ""],
        ], height: 30}} /></div>
        <div className="md:hidden inline mt-14">
        < YourCartButton auth={props.jwt} isVendor={props.isVendor} />
        </div>
        <div className=" bg-slate-100 dark:bg-slate-800 pb-14 w-full flex flex-col items-center justify-center">
          <div className="flex items-center mt-8 mb-16 gap-4">
            <div className=" text-sm sm:text-md md:text-xl">
            {props.newUser ? 'Trending Items': 'Continue where you left off' }
            </div>
            <FontAwesomeIcon icon={icon({name: 'arrow-right', style: 'solid'})} />
          </div>
          <CarouselDashboard {...{"listOfImages": props.carouselArray, height: 30}} />
        </div>
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
            <div>Craft something new with Lessgo</div>
            <CarouselDashboard {...{listOfImages: props.laptopCarousel, height: 30}}/>
          </div>
          <div id="grocery" className="flex flex-col items-center gap-4 p-4 sm:w-1/2 lg:w-1/3 w-full mt-14">
            <div>Craft something new with Lessgo</div>
            <CarouselDashboard {...{listOfImages: props.groceryCarousel, height: 30}}/>
          </div>
        </div>
      </div>

      <Snacc {...{"message": props.snackBarMessage}} />
      <Loading {...{"isLoading": props.isLoading}} />
    </div>
    )
}