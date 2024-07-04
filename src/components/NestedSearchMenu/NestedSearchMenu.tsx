import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Autocomplete, {
    AutocompleteCloseReason,
    autocompleteClasses
} from '@mui/material/Autocomplete';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;


const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${
        theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'
    }`,
    boxShadow: `0 8px 24px ${
        theme.palette.mode === 'light'
            ? 'rgba(149, 157, 165, 0.2)'
            : 'rgb(1, 4, 9)'
    }`,
    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    marginTop: 8 // Add margin here to move the Popper down
}));

const StyledInput = styled(TextField)(({ theme }) => ({
    padding: 10,
    width: '100%',
    borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
    }`,
    '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontSize: 14
    }
}));

const Button = styled(ButtonBase)(({ theme }) => ({
    fontSize: 13,
    display: 'flex',
    justifyContent: 'end',
    width: '100%',
    textAlign: 'left',
    padding: 8,
    outline: '1px solid #999',
    fontFamily: 'sans-serif',
    borderRadius: 'var(--borderRadius)',
    color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
    fontWeight: 600,
    '& span': {
        fontSize: 18,
        width: '100%'
    },
    '& svg': {
        width: 20,
        height: 20,
        justifySelf: 'end'
    }
}));

interface AutocompleteComponentProps<T> {
    data: T[];
    onItemSelected: (selectedItems: T[]) => void;
    placeholder?: string;
    renderOption: (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: T
    ) => React.ReactNode;
    getOptionLabel: (option: T) => string;
}

export default function AutocompleteComponent<T>({
    data,
    onItemSelected,
    placeholder = 'Filter items',
    renderOption,
    getOptionLabel
}: AutocompleteComponentProps<T>) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const [selectedItems, setSelectedItems] = React.useState<T[]>([]);
    const theme = useTheme();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setMenuIsOpen(!menuIsOpen);
    };

    const handleClose = () => {
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
        setMenuIsOpen(false);
    };

    const handleItemClick = (item: T) => {
        setSelectedItems((prev) => {
            const isSelected = prev.includes(item);
            const newSelectedItems = isSelected
                ? prev.filter((i) => i !== item)
                : [...prev, item];
            onItemSelected(newSelectedItems);
            return newSelectedItems;
        });
    };

    const open = Boolean(anchorEl);
    const id = open ? 'autocomplete-label' : undefined;

    return (
        <React.Fragment>
            <Box sx={{ minWidth: 295, fontSize: 13 }}>
                <Button
                    disableRipple
                    aria-describedby={id}
                    onClick={handleClick}
                >
                    <span>
                        {selectedItems.length > 0
                            ? selectedItems.map(getOptionLabel).join(', ')
                            : 'Select an item'}
                    </span>
                    {menuIsOpen ? <ExpandMore /> : <ExpandLess />}
                </Button>
            </Box>
            <StyledPopper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement='bottom-end'
            >
                <ClickAwayListener
                    onClickAway={() => {
                        handleClose();
                    }}
                >
                    <div>
                        <Autocomplete
                            open
                            multiple
                            disableCloseOnSelect
                            fullWidth
                            forcePopupIcon={false}
                            onClose={(
                                _event: React.ChangeEvent<{}>,
                                reason: AutocompleteCloseReason
                            ) => {
                                if (reason === 'escape') {
                                    handleClose();
                                }
                            }}
                            clearOnEscape
                            disableClearable
                            noOptionsText='No items'
                            renderOption={(props, option) => {
                                const isSelected =
                                    selectedItems.includes(option);
                                return (
                                    <li
                                        {...props}
                                        onClick={() => handleItemClick(option)}
                                    >
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={isSelected}
                                        />
                                        {renderOption(props, option)}
                                    </li>
                                );
                            }}
                            options={data}
                            getOptionLabel={getOptionLabel}
                            renderInput={(params) => (
                                <StyledInput
                                    {...params}
                                    fullWidth
                                    ref={params.InputProps.ref}
                                    inputProps={params.inputProps}
                                    autoFocus
                                    placeholder={placeholder}
                                />
                            )}
                        />
                    </div>
                </ClickAwayListener>
            </StyledPopper>
        </React.Fragment>
    );
}
