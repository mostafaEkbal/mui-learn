import DefaultLayout from '@/layouts/DefaultLayout';
import GridWrapper from '@/components/common/GridWrapper/GridWrapper';
import NestedSearchMenu from '@/components/NestedSearchMenu/NestedSearchMenu';
import { Box, Typography } from '@mui/material';
import { nestedList } from '@/consts/nestedList';

const data = [
    {
        id: 65,
        name: 'Asset type 72',
        createdAt: '2024-06-12T13:53:42.1517194',
        updatedAt: null,
        parentId: null,
        statusId: 1,
        level: 1,
        subCategories: []
    },
    {
        id: 66,
        name: 'Asset type 73',
        createdAt: '2024-06-12T13:53:42.1563426',
        updatedAt: null,
        parentId: null,
        statusId: 1,
        level: 1,
        subCategories: []
    },
    {
        id: 67,
        name: 'Asset type 74',
        createdAt: '2024-06-12T14:03:06.0300471',
        updatedAt: null,
        parentId: null,
        statusId: 1,
        level: 1,
        subCategories: []
    },
    {
        id: 68,
        name: 'Asset type 75',
        createdAt: '2024-06-12T14:03:06.0472343',
        updatedAt: null,
        parentId: null,
        statusId: 1,
        level: 1,
        subCategories: []
    },
    {
        id: 69,
        name: 'Asset type 76',
        createdAt: '2024-06-12T14:03:06.0504814',
        updatedAt: null,
        parentId: null,
        statusId: 1,
        level: 1,
        subCategories: []
    },
    {
        id: 70,
        name: 'Asset type 77',
        createdAt: '2024-06-12T14:03:06.0568494',
        updatedAt: null,
        parentId: null,
        statusId: 1,
        level: 1,
        subCategories: []
    },
    {
        id: 71,
        name: 'Asset type 78',
        createdAt: '2024-06-12T14:03:06.0606202',
        updatedAt: null,
        parentId: null,
        statusId: 1,
        level: 1,
        subCategories: []
    },
    {
        id: 72,
        name: 'Asset type 79',
        createdAt: '2024-06-12T14:03:06.0639957',
        updatedAt: null,
        parentId: null,
        statusId: 1,
        level: 1,
        subCategories: []
    },
    {
        id: 73,
        name: 'Asset type 80',
        createdAt: '2024-06-12T14:03:06.0674803',
        updatedAt: null,
        parentId: null,
        statusId: 1,
        level: 1,
        subCategories: []
    }
];

const searchMenu = () => {
    const onItemSelected = (item: object) => {
        console.log(item);
    };

    return (
        <DefaultLayout>
            <GridWrapper>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        width: 300
                    }}
                >
                    <Typography>Select Assets</Typography>
                    <NestedSearchMenu
                        data={data}
                        onItemSelected={onItemSelected}
                        menuPlaceholder= 'select assets'
                        placeholder='Search assets'
                        renderOption={(props, option) => (
                            <Box>
                                <span>{option.name}</span>
                                <br />
                                <span style={{ color: '#888' }}>
                                    {option.id}
                                </span>
                            </Box>
                        )}
                        getOptionLabel={(option) => option.name}
                    />
                </Box>
            </GridWrapper>
        </DefaultLayout>
    );
};

export default searchMenu;
