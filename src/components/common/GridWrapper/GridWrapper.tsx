import { Grid } from '@mui/material';
import { ReactNode } from 'react';
import { gridWrapperStyles } from './styles';

const GridWrapper: React.FC<{ children: ReactNode, color: string }> = ({ children, color }) => {
    return (
        <Grid sx={{...gridWrapperStyles, bgcolor: color}} item xs={12}>
            {children}
        </Grid>
    );
};

export default GridWrapper;
