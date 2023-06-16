import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarouselDashboard from "../common/components/Carousel";
import Snacc from "../common/components/SnackBarComponent";
import Loading from "../common/components/Loading";
import YourCartButton from "./YourCartButton";

export default function DashboardCustomer(props: any) {
    return (
    <div id='dashboard'>

      <div className='flex flex-col pt-[20vh] items-center bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
        <div className='font-bold text-xl md:text-3xl text-green-600 dark:text-green-300'>
          Welcome back <div className=" inline font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">{props.username.split(' ')[0]}</div>
        </div>
        <div className="md:hidden block">
        < YourCartButton auth={props.jwt} isVendor={props.isVendor} />
        </div>
        <div className=" bg-slate-100 dark:bg-slate-800 pb-14 w-full flex flex-col items-center justify-center">
          <div className="flex items-center mt-8 mb-16 gap-4"><div className=" text-sm sm:text-md md:text-xl">Continue where you left off</div><FontAwesomeIcon icon={icon({name: 'arrow-right', style: 'solid'})} /></div>
          <CarouselDashboard {...{"listOfImages": props.carouselArray, height: 40}} />
        </div>
        <div id="offers" className="flex-wrap flex bg-slate-100 dark:bg-slate-800 w-full font-lg font-bold pb-14">
          <div id="electronics" className="flex flex-col items-center gap-4 p-4 md:w-1/2 w-full mt-14">
            <div>Electronics for your home</div>
            <CarouselDashboard {...{listOfImages: props.electronicsCarousel, height: 40}}/>
          </div>
          <div id="fmcg" className="flex flex-col items-center gap-4 p-4 md:w-1/2 w-full mt-14">
            <div>Fresh Home Products from Lessgo</div>
            <CarouselDashboard {...{listOfImages: props.fmcgCarousel, height: 40}}/>
          </div>
          <div id="vehicles" className="flex flex-col items-center gap-4 p-4 md:w-1/2 w-full mt-14">
            <div>Hot Wheels for long rides</div>
            <CarouselDashboard {...{listOfImages: props.vehiclesCarousel, height: 40}}/>
          </div>
          <div id="material" className="flex flex-col items-center gap-4 p-4 md:w-1/2 w-full mt-14">
            <div>Craft something new with Lessgo</div>
            <CarouselDashboard {...{listOfImages: props.materialCarousel, height: 40}}/>
          </div>
        </div>
      </div>

      <Snacc {...{"message": props.snackBarMessage}} />
      <Loading {...{"isLoading": props.isLoading}} />
    </div>
    )
}