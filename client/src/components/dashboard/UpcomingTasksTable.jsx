import { PropTypes } from 'prop-types';

const UpcomingTasksTable = ({task, idx}) => {

    const { _id, title, description, due_date, priority, category, status, addedByEmail } = task;

    return (
        <>
        <tr>

            <td>
                {idx+1}
            </td>
            <td>{title}</td>
            <td>
                {description}
            </td>
            <td>{due_date}</td>
            <td>{priority}</td>
            <td>{category}</td>
            <td>{status}</td>
            <td>{}</td>
            <td>{addedByEmail}</td>
            <td>{}</td>


            {/* <td className='flex flex-col items-center gap-4 justify-center'>

                <div>
                    <button
                        onClick={() => handleDelete(_id)}
                        data-tooltip-id="delete-tooltip"
                        data-tooltip-content="Delete"
                        className='btn btn-neutral hover:btn-error btn-xs  animate__animated animate__tada animate__infinite hover:animate-none'>

                        <MdDeleteForever size={20}
                            className='text-primary group-hover:text-secondary' />

                    </button>
                    <Tooltip id="delete-tooltip" />
                </div>

                <br />

                <div>
                    <button
                        onClick={() => handlePDF()}
                        data-tooltip-id="update-tooltip"
                        data-tooltip-content="Download"
                        className='btn btn-neutral hover:btn-info btn-xs animate__animated  animate__jello animate__infinite hover:animate-none'>
                        <FaDownload
                            size={20}
                            className='text-primary group-hover:text-secondary'
                        />
                    </button>
                    <Tooltip id="update-tooltip" />
                </div>

                <br />

                <Link
                    to={`testEdit/${_id}`}
                    className='flex flex-col gap-2 justify-center items-center'>

                    <button
                        // onClick={() => handleChangeActive(_id, !isActive)}
                        data-tooltip-id="Update-tooltip"
                        data-tooltip-content='Update'
                        className='btn btn-neutral hover:btn-info btn-xs btn-circle animate__infinite hover:animate-none animate-spin'
                    >
                        <MdOutlineChangeCircle
                            size={20}
                            className='text-primary group-hover:text-secondary'
                        />
                    </button>
                    <Tooltip id="Update-tooltip" />

                </Link>

            </td> */}
        </tr>
    </>
    );
};


UpcomingTasksTable.propTypes = {
    task: PropTypes.object,
    idx: PropTypes.number,
    // handleDelete: PropTypes.func,
}

export default UpcomingTasksTable;