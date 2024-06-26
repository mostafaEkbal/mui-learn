import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ReactNode } from 'react';

const BasicCard: React.FC<{ header: React.ReactNode; content: ReactNode }> = ({
    header,
    content
}) => {
    return (
        <Card>
            {header}
            <CardContent
                sx={{
                    minHeight: '180px',
                    paddingTop: '70px',
                    textAlign: 'center'
                }}
            >
                {content}
            </CardContent>
        </Card>
    );
};

export default BasicCard;
