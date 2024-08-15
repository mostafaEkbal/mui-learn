import { Button } from 'antd';
import { Button as Btn } from '@mui/material'
import DefaultLayout from "@/layouts/DefaultLayout";
import GridWrapper from "@/components/common/GridWrapper/GridWrapper";


const Ant = () => {
    return (
        <DefaultLayout>
                <Btn variant={'contained'}>Contained</Btn>
                <Button type={'primary'} size={'large'} ghost style={{marginLeft: 5}}> Primary </Button>
        </DefaultLayout>
    )
};

export default Ant;