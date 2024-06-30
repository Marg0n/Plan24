import { PropTypes } from 'prop-types';
import { Chart } from 'react-google-charts';
import Loader from '../shared/Loader';

const ProgressPieChart = ({ data, title }) => {

    const options = {
        // title: 'Sales Over Time',
        title: `${title}`,
        subtitle: "To-Do, In-Progress, and Complete ratio",
        is3D: true,
        curveType: 'function',
        legend: { position: 'bottom' },
        series: [{ color: '#F43F5E' }],
    }

    return (
        <>
            {
                data.length > 1 ? <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
                    : <>
                        <Loader />
                        <p>Not Enough Data</p>
                    </>
            }
        </>
    );
};



ProgressPieChart.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
}

export default ProgressPieChart;