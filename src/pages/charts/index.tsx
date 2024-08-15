import AreaChartComponent from '@/components/Charts/AreaChart';
import DefaultLayout from '@/layouts/DefaultLayout';

const index = () => {
    return (
        <DefaultLayout>
            <div style={{ display: 'flex', gap: 10 }}>
                <div
                    style={{
                        height: 400,
                        width: 500,
                        backgroundColor: '#2e485f'
                    }}
                >
                    <AreaChartComponent></AreaChartComponent>
                </div>
                <div
                    style={{
                        height: 400,
                        width: 500,
                        backgroundColor: '#2e485f'
                    }}
                ></div>
                <div
                    style={{
                        height: 400,
                        width: 500,
                        backgroundColor: '#2e485f'
                    }}
                ></div>
            </div>
        </DefaultLayout>
    );
};

export default index;
