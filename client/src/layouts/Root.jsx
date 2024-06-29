import { Outlet } from "react-router-dom";
import Footer from './../components/shared/Footer';



const Root = () => {
    return (
        <div className="font-lato">
            
            <div className="container mx-2 md:mx-auto my-6 min-h-[calc(100vh-125px)] flex flex-col gap-6 justify-center items-center">
                <Outlet />
            </div>

            {/* footer */}
            <Footer/>
        </div>
    );
};

export default Root;