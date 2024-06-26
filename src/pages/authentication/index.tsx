import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import BasicCard from '@/components/common/BasicCard/BasicCard';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import CommonButton from '@/components/common/CommonButton/CommonButton';
import ReplayIcon from '@mui/icons-material/Replay';
import GridWrapper from '@/components/common/GridWrapper/GridWrapper';
import BasicModal from '@/components/common/BasicModal/BasicModal';
import NewUserModal, {
    IModalInputValues
} from '@/components/Modals/NewUserModal/NewUserModal';

const Authentication = () => {
    const [openAddUser, setOpenAddUser] = useState<boolean>(false);
    const [users, setUsers] = useState<Array<IModalInputValues>>([]);
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(users); // Ensure filteredUsers is updated whenever users changes
    }, [users]);

    const addUserClick = () => {
        setOpenAddUser(true);
    };

    const addNewUser = (data: IModalInputValues) => {
        setUsers((prevUsers) => [...prevUsers, data]);
        setOpenAddUser(false);
    };

    const getHeader = () => {
        const handleSearch = (value: string) => {
            filterData(value);
        };

        const filterData = (value: string) => {
            const lowercasedValue = value.toLowerCase().trim();
            if (lowercasedValue === '') {
                setFilteredUsers(users);
                return;
            }
            const filteredData = users.filter((item) => {
                return Object.keys(item).some((key: string) =>
                    item[key as keyof IModalInputValues]
                        .toString()
                        .toLowerCase()
                        .includes(lowercasedValue)
                );
            });
            setFilteredUsers(filteredData);
        };

        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '20px',
                    alignItems: 'center',
                    bgcolor: '#eee',
                    padding: '10px 20px'
                }}
            >
                <Box sx={{ flex: '1' }}>
                    <SearchBar
                        placeholder='Search by email address, phone number, or user UID'
                        onChange={(event) =>
                            handleSearch(event.currentTarget.value)
                        }
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <CommonButton
                        variant='contained'
                        size='large'
                        onClick={addUserClick}
                    >
                        Add user
                    </CommonButton>
                    <Tooltip
                        title='reload'
                        onClick={() => setFilteredUsers(users)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <IconButton>
                            <ReplayIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        );
    };

    const getContent = () => {
        return (
            <>
                {filteredUsers.length ? (
                    filteredUsers.map((user) => (
                        <Box key={user.userId} sx={{ marginBottom: '20px' }}>
                            <Typography>User ID: {user.userId}</Typography>
                            <Typography>Email: {user.email}</Typography>
                            <Typography>
                                Phone Number: {user.phoneNumber}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography
                        align='center'
                        sx={{
                            margin: '40px 16px',
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontSize: '1.3rem'
                        }}
                    >
                        No users for this project yet
                    </Typography>
                )}
            </>
        );
    };

    return (
        <DefaultLayout>
            <GridWrapper>
                <BasicCard header={getHeader()} content={getContent()} />
                <NewUserModal
                    open={openAddUser}
                    onClose={() => setOpenAddUser(false)}
                    addNewUser={addNewUser}
                />
            </GridWrapper>
        </DefaultLayout>
    );
};

export default Authentication;
