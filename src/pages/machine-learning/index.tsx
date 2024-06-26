import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Grid } from '@mui/material';

const MachineLearning = () => {
    return (
        <DefaultLayout>
            <Grid item xs={8}>
                This is machine learning page.
            </Grid>
        </DefaultLayout>
    );
};

export default MachineLearning;
