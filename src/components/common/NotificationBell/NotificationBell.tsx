import React from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BasicMenu from '../BasicMenu/BasicMenu';

// Define the shape of the notification object
interface Notification {
    id: number;
    label: string;
}

// Define the props for the NotificationBell component
interface NotificationBellProps {
    iconColor:
        | 'inherit'
        | 'default'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning';
}

// Sample notifications array
const notifications: Notification[] = [
    {
        id: 0,
        label: 'First notification'
    },
    {
        id: 1,
        label: 'Second notification'
    }
];

const NotificationBell: React.FC<NotificationBellProps> = ({ iconColor }) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const newNotifications = `You have ${notifications.length} new notifications!`;
    const noNotifications = 'No new notifications';

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip
                title={
                    notifications.length ? newNotifications : noNotifications
                }
            >
                <IconButton
                    color={iconColor}
                    onClick={notifications.length ? handleOpen : undefined}
                >
                    <Badge badgeContent={notifications.length} color='error'>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={notifications}
            />
        </div>
    );
};

export default NotificationBell;
