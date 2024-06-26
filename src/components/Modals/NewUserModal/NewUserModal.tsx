import React, { useState, useEffect } from 'react';
import { Box, Input, TextField } from '@mui/material';
import BasicModal from '@/components/common/BasicModal/BasicModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export interface IModalInputValues {
    userId: string;
    email: string;
    phoneNumber: string;
}

const defaultInputValues = {
    userId: '',
    email: '',
    phoneNumber: ''
};

const NewUserModal: React.FC<{
    open: boolean;
    onClose: () => void;
    addNewUser: (data: IModalInputValues) => void;
}> = ({ open, onClose, addNewUser }) => {
    const [values, setValues] = useState<IModalInputValues>(defaultInputValues);

    const modalStyles = {
        inputFields: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiTextField-root': {
                marginBottom: '20px'
            }
        }
    };

    const validationSchema = Yup.object().shape({
        userId: Yup.string()
            .required()
            .min(6, 'User ID must be at least 6 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phoneNumber: Yup.string().matches(
            phoneRegExp,
            'phone number is not valid'
        )
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const addUser = (data: IModalInputValues) => {
        addNewUser(data);
        open;
    };

    const handleChange = (value: IModalInputValues) => {
        setValues(value);
        console.log(values);
    };

    useEffect(() => {
        if (open) setValues(defaultInputValues);
    }, [open]);

    const getModalContent = () => {
        return (
            <Box sx={modalStyles.inputFields}>
                <TextField
                    placeholder='User ID'
                    label='User ID'
                    required
                    {...register('userId')}
                    onChange={(event) =>
                        handleChange({ ...values, userId: event.target.value })
                    }
                    value={values.userId}
                    error={errors.userId ? true : false}
                    helperText={errors.userId?.message}
                />
                <TextField
                    placeholder='Email'
                    label='Email'
                    required
                    {...register('email')}
                    onChange={(event) =>
                        handleChange({ ...values, email: event.target.value })
                    }
                    value={values.email}
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                />
                <TextField
                    placeholder='Phone Number'
                    label='Phone Number'
                    required
                    {...register('phoneNumber')}
                    onChange={(event) =>
                        handleChange({
                            ...values,
                            phoneNumber: event.target.value
                        })
                    }
                    value={values.phoneNumber}
                    error={errors.phoneNumber ? true : false}
                    helperText={errors.phoneNumber?.message}
                />
            </Box>
        );
    };
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title='New user'
            subTitle="Fill out inputs and hit 'sumbit' button"
            modalContent={getModalContent()}
            validate={() => {}}
            onSubmit={handleSubmit(addUser)}
        ></BasicModal>
    );
};

export default NewUserModal;
