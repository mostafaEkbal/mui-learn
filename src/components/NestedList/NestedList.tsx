import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface SubCategory {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string | null;
    parentId: number | null;
    statusId: number;
    level: number;
    subCategories: SubCategory[];
}

export interface DataItem {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string | null;
    parentId: number | null;
    statusId: number;
    level: number;
    subCategories: SubCategory[];
}

interface NestedListProps {
    nestedList: DataItem[];
    isExpanded: boolean;
}

const NestedList: React.FC<NestedListProps> = ({ nestedList, isExpanded }) => {
    const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

    const handleClick = (id: number) => {
        setOpenItems((prevOpenItems) => ({
            ...prevOpenItems,
            [id]: !prevOpenItems[id]
        }));
        console.log(id, 'nested');
    };

    useEffect(() => {
        nestedList.forEach((item) => {
            setOpenItems((prevOpenItems) => ({
                ...prevOpenItems,
                [item.id]: isExpanded
            }));
        });
    }, [nestedList, isExpanded]);

    const renderList = (items: DataItem[], depth: number = 1) => {
        return items.map((item) => {
            const hasNestedChildren = item.subCategories.length > 0;

            return (
                <div key={item.id}>
                    <ListItemButton
                        onClick={() => {
                            hasNestedChildren && handleClick(item.id);
                            console.log(item);
                        }}
                        sx={{ pl: depth * 4 }}
                    >
                        <ListItemText primary={item.name} />
                        {hasNestedChildren &&
                            (openItems[item.id] ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            ))}
                    </ListItemButton>
                    {hasNestedChildren && (
                        <Collapse
                            in={openItems[item.id]}
                            timeout='auto'
                            unmountOnExit
                        >
                            <List component='div' disablePadding>
                                {renderList(item.subCategories, depth + 1)}
                            </List>
                        </Collapse>
                    )}
                </div>
            );
        });
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 500,
                bgcolor: 'background.paper',
                color: '#000'
            }}
            component='nav'
            aria-labelledby='nested-list-subheader'
        >
            {renderList(nestedList)}
        </List>
    );
};

export default NestedList;
