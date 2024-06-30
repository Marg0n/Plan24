import { PropTypes } from 'prop-types';
import { MdDeleteForever, MdOutlineChangeCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const UpcomingTasksTable = ({ task, idx, handleDelete }) => {

    const { _id, title, description, due_date, priority, category, status, addedByEmail } = task;

    return (
        <>
            <tr>

                <td>
                    {idx + 1}
                </td>
                <td>{title}</td>
                <td>
                    {description}
                </td>
                <td>{due_date}</td>
                <td>
                    {
                        priority === 3 ? 'Low' : (priority === 1 ? 'Mid' : 'High')
                    }
                </td>
                <td>{category}</td>
                <td>
                    {status}
                    <br />

                </td>
                <td>{ }</td>
                <td>{addedByEmail}</td>


                <td className='flex flex-col items-center gap-4 justify-center'>

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

                    <Link
                        to={`/dashboard/updateTasks/${_id}`}
                        className='flex flex-col gap-2 justify-center items-center'>

                        <button
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

                </td>
                
            </tr>
        </>
    );
};


UpcomingTasksTable.propTypes = {
    task: PropTypes.object,
    idx: PropTypes.number,
    handleDelete: PropTypes.func,
}

export default UpcomingTasksTable;