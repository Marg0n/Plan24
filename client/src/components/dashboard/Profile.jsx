import { Tooltip } from 'react-tooltip';
import useAuth from './../../hooks/useAuth';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import logo from '/logo_mediHouse.png';

const Profile = () => {

    const { user } = useAuth();


    return (
        <div
            className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '
            // style={{backgroundImage: `url(${imagePath})`}}
        >
            <Helmet>
                <title>{import.meta.env.VITE_WEBSITE} | Profile</title>
            </Helmet>

            {/* display pic, name and mail */}
            <div className=''>
                <div className="flex flex-col items-center mt-6 -mx-2">

                    <div className='mb-4'>
                        <img
                            data-tooltip-id="name-tooltips"
                            data-tooltip-content={`${user?.displayName || user?.email}`}
                            referrerPolicy="no-referrer"
                            className="object-cover w-24 h-24 mx-2 rounded-full avatar ring ring-primary ring-offset-base-100 ring-offset-2 "
                            src={
                                user?.photoURL ? user?.photoURL
                                    : "https://i.ibb.co/8dJbHdP/No-Photo-Available.webp"
                            }
                            alt="avatar" />
                        <Tooltip id="name-tooltips" />
                    </div>

                    <h4 className="mx-2 mt-2 font-semibold text-blue-500">
                        {user?.displayName}
                    </h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-error">
                        {user?.email}
                    </p>
                </div>
                {/* const { email, name, bloodGroup, district, upazila, status, isAdmin } = userData */}

            </div>

            <div className='flex w-full items-center justify-center gap-16 '>

                <div>
                    <p className='text-base font-serif font-semibold'>Total Tasks :</p>
                    <p className='text-base font-serif font-semibold'>Upcoming Deadlines :</p>
                    <p className='text-base font-serif font-semibold'>Progress :</p>
                </div>

                <div>
                    <p>none</p>
                    <p>none</p>
                    <p>none</p>
                </div>

            </div>

            <div className='flex gap-4'>
                <Link
                    to={`profileEdit`}
                    className='flex gap-4 justify-center items-center btn btn-warning animate-pulse hover:animate-none hover:btn-primary'>
                    Edit Profile  <FiEdit />
                </Link>
                <Link
                    to={`profileEdit/${user?.email}`}
                    className='flex gap-4 justify-center items-center btn btn-warning animate-pulse hover:animate-none hover:btn-primary'>
                    Edit Personal Info  <FiEdit />
                </Link>
            </div>
        </div>
    );
};

export default Profile;