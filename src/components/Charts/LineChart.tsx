import {
    Tooltip,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    TooltipProps
} from 'recharts';
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];
const LineChartComponent = () => {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart
                width={500}
                height={400}
                data={data}
                margin={{ right: 30, top: 30 }}
            >
                <YAxis />
                <XAxis dataKey={'name'} />
                <CartesianGrid strokeDasharray='3 3' />
                <Tooltip />
                <Legend />
                <Line
                    dataKey='uv'
                    type={'monotone'}
                    stroke='#2563eb'
                    fill='#3b83f6'
                    activeDot={{ r: 8 }}
                />
                <Line
                    dataKey='amt'
                    type={'monotone'}
                    fill='#2563eb'
                    stroke='#3b83f6'
                />
                <Line
                    dataKey='pv'
                    type={'monotone'}
                    fill='#2563aa'
                    stroke='#3b83f6'
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = (o: TooltipProps<number, string>) => {
    const { active, payload, label } = o;
    if (active) {
        return (
            <div
                className='custom-tooltip'
                style={{
                    backgroundColor: '#2563eb',
                    padding: 10,
                    borderRadius: 5,
                    color: '#fff'
                }}
            >
                <p className='label'>{label}</p>
                <div>
                    <span className='value'>{`${payload?.[0]?.name} : ${payload?.[0]?.value}`}</span>
                </div>
                <div className=''>
                    <span className='value'>{`${payload?.[1]?.name} : ${payload?.[1]?.value}`}</span>
                </div>
            </div>
        );
    }
    return null;
};

export default LineChartComponent;
