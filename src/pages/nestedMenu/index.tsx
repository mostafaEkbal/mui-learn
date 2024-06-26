import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import DefaultLayout from '@/layouts/DefaultLayout';
import { nestedList } from '@/consts/nestedList';
import NestedList from '@/components/NestedList/NestedList';
import { Button } from '@mui/material';
import GridWrapper from '@/components/common/GridWrapper/GridWrapper';

const Authentication = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <DefaultLayout>
            <GridWrapper>
                <Button
                    sx={{ mb: '5px' }}
                    variant='contained'
                    onClick={() => handleClick()}
                >
                    {' '}
                    {isExpanded ? 'Collapse All' : 'Expand All'}
                </Button>
                <NestedList nestedList={nestedList} isExpanded={isExpanded} />
            </GridWrapper>
        </DefaultLayout>
    );
};

export default Authentication;
