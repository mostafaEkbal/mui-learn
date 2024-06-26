import React, { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { Theme } from '@emotion/react';
import { SxProps } from '@mui/system';

interface CommonButtonProps extends ButtonProps {
    children: ReactNode;
    sx?: SxProps<Theme>;
}

const CommonButton: React.FC<CommonButtonProps> = ({
    children,
    color,
    disabled,
    size,
    sx,
    variant,
    onClick
}) => {
    return (
        <Button
            color={color}
            disabled={disabled}
            size={size}
            sx={sx}
            variant={variant}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default CommonButton;
