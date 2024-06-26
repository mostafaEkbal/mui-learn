import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal, { ModalProps } from '@mui/material/Modal';
import { ReactNode, useState } from 'react';
import { modalStyles } from '@/components/common/BasicModal/styles';
import { Input } from '@mui/material';
import CommonButton from '../CommonButton/CommonButton';

interface CommonModalProps extends Omit<ModalProps, 'children'> {
    title?: string;
    subTitle?: string;
    modalContent?: ReactNode;
    validate?: () => any;
    onSubmit?: () => any;
}

const BasicModal: React.FC<CommonModalProps> = ({
    open,
    onClose,
    title,
    subTitle,
    modalContent,
    validate,
    onSubmit
}) => {
    const handleClose = (
        event: {},
        reason: 'backdropClick' | 'escapeKeyDown'
    ) => {
        if (onClose) {
            onClose(event, reason);
        }
    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles.wrapper}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                    {title}
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                    {subTitle}
                </Typography>
                {modalContent}
                <Box sx={modalStyles.buttons}>
                    <CommonButton variant='contained' onClick={onSubmit}>
                        Sumbit
                    </CommonButton>
                    <CommonButton
                        onClick={() => handleClose({}, 'backdropClick')}
                    >
                        Cancel
                    </CommonButton>
                </Box>
            </Box>
        </Modal>
    );
};

export default BasicModal;
