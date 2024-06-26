import React from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Grid } from '@mui/material';

const Hosting = () => {
    return (
        <DefaultLayout>
            <Grid item xs={8}>
                This is hosting page.
            </Grid>
        </DefaultLayout>
    );
};

export default Hosting;
