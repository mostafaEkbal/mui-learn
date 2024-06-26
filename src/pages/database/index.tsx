import React from 'react';
import Grid from '@mui/material/Grid';
import DefaultLayout from '@/layouts/DefaultLayout';

const Database = () => {
    return (
        <DefaultLayout>
            <Grid item xs={8}>
                This is database page.
            </Grid>
        </DefaultLayout>
    );
};

export default Database;
