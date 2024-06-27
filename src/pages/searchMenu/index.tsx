import DefaultLayout from '@/layouts/DefaultLayout';
import GridWrapper from '@/components/common/GridWrapper/GridWrapper';
import NestedSearchMenu from '@/components/NestedSearchMenu/NestedSearchMenu';
import { Box } from '@mui/material';

const data = [
    {
        id: 1,
        name: 'Customer Name 1',
        description: 'Customer.name@gmail.com 1'
    },
    {
        id: 2,
        name: 'Customer Name 2',
        description: 'Customer.name@gmail.com 2'
    },
    {
        id: 3,
        name: 'Customer Name 3',
        description: 'Customer.name@gmail.com 3'
    },
    {
        id: 4,
        name: 'Customer Name 4',
        description: 'Customer.name@gmail.com 4'
    },
    { id: 5, name: 'Customer Name 5', description: 'Customer.name@gmail.com 4' }
];

const searchMenu = () => {
    const onItemSelected = (item: object) => {
        console.log(item);
    };

    // const renderOption = (
    //     props: React.HTMLAttributes<HTMLLIElement>,
    //     option: data
    // ) => (
    //     <div {...props}>
    //         <strong>{option.name}</strong>
    //         <br />
    //         <span>{option.description}</span>
    //     </div>
    // );

    return (
        <DefaultLayout>
            <GridWrapper>
                <NestedSearchMenu
                    data={data}
                    onItemSelected={onItemSelected}
                    placeholder='Search items'
                    renderOption={(props, option) => (
                        <Box>
                            <span>{option.name}</span>
                            <br />
                            <span>{option.description}</span>
                        </Box>
                    )}
                />
            </GridWrapper>
        </DefaultLayout>
    );
};

export default searchMenu;
