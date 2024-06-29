import { useState } from "react";
import { AttentionSeeker } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../components/shared/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const AddTask = () => {

    // custom loader for update
    const [customLoader, setCustomLoader] = useState(false);

    const axiosSecure = useAxiosSecure();

    const {user} = useAuth()

    // extra information for adding in DB
    const addedByEmail = user?.email

    // react form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    // Submit button for updating
    const onSubmit = async (data) => {

        const { title, description, due_date, priority: weight, category, status } = data;

        const priority = parseInt(weight);


        try {
            setCustomLoader(true);



            const task = { title, description, due_date, priority, category, status, addedByEmail };

            // update user data in mongo DB
            const { data: addTest } = await axiosSecure.post(`/addTask`, task)
            // console.log(addTest)

            if (addTest) {
                Swal.fire({
                    title: `Successfully added the ${title}!`,
                    text: `Added the ${title}! 🎉`,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then(() => {
                    // loader
                    setCustomLoader(false)
                    reset(); // Reset the form fields
                    // navigate(whereTo)
                });
            } else {
                toast.error('Something went Wrong!', { autoClose: 2000, theme: "colored" })
                // loader
                setCustomLoader(false)
                // navigate(whereTo)
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
            setCustomLoader(false)
        }

    }

    if (customLoader) {
        <Loader />
    }

    return (
        <div className='flex flex-col gap-7 justify-center items-center min-h-[calc(100vh-50px)] overflow-x-auto w-11/12 mx-auto rounded-lg glass shadow-2xl text-primary bg-cover bg-no-repeat bg-center '>
            <Helmet>
                <title>{import.meta.env.VITE_WEBSITE} | Add a Task</title>
            </Helmet>

            <AttentionSeeker effect='heartBeat' >
                <h3 className="text-3xl mt-4 font-serif text-center">
                    Add a Task!
                </h3>
            </AttentionSeeker>

            <div className='flex w-full mx-auto overflow-hidden lg:max-w-4xl justify-center items-center my-4'>

                <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 ">

                    {/* title */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='title'
                        >
                            Task title
                        </label>
                        <input
                            id='title'
                            autoComplete='title'
                            name='title'
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            {...register("title", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.title && <span className="text-red-500">Please fill up Title field</span>}
                        </div>
                    </div>


                    {/* description */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='description'
                        >
                            Description
                        </label>
                        <textarea
                            id='description'
                            autoComplete='description'
                            name='description'
                            className='block w-full px-4 py-2 textarea textarea-bordered h-24 border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            {...register("description", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.description && <span className="text-red-500">Please fill up Description field</span>}
                        </div>
                    </div>

                    {/* date */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='date'
                        >
                            Due Date
                        </label>
                        <input
                            id='due_date'
                            autoComplete='due_date'
                            name='due_date'
                            // value={today}
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='date'
                            {...register("due_date", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.due_date && <span className="text-red-500">Please fill up Date field</span>}
                        </div>
                    </div>

                    {/* priority */}
                    <div className='mt-4 form-control w-full'>
                        <label
                            className='block mb-2 text-sm font-medium label '
                            htmlFor='priority'
                        >
                            Priority Level
                        </label>
                        <select
                            id='priority'
                            name='priority'
                            className="select select-bordered block w-full px-4 py-2  border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                            {...register("priority", { required: true })}
                        >
                            <option value="0">Low</option>
                            <option value="1">Mid</option>
                            <option value="2">High</option>
                        </select>
                        <div className="mt-1 animate-pulse">
                            {errors.priority && <span className="text-red-500">Please Select the Priority field</span>}
                        </div>
                    </div>

                    {/* category */}
                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium  '
                            htmlFor='category'
                        >
                            Task Category
                        </label>
                        <input
                            id='category'
                            autoComplete='category'
                            name='category'
                            className='block w-full px-4 py-2  border rounded-lg input input-bordered focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                            type='text'
                            {...register("category", { required: true })}
                        />
                        <div className="mt-1 animate-pulse">
                            {errors.category && <span className="text-red-500">Please fill up Category field</span>}
                        </div>
                    </div>

                    {/* status */}
                    <div className='mt-4 form-control w-full'>
                        <label
                            className='block mb-2 text-sm font-medium label '
                            htmlFor='status'
                        >
                            Task Status
                        </label>
                        <select
                            id='status'
                            name='status'
                            className="select select-bordered block w-full px-4 py-2  border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                            {...register("status", { required: true })}
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <div className="mt-1 animate-pulse">
                            {errors.status && <span className="text-red-500">Please Select the Status field</span>}
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className='mt-6'>
                        <button
                            type='submit'
                            className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
                        >
                            Add the Task
                        </button>
                    </div>

                </form>



            </div>


        </div>
    );
};

export default AddTask;