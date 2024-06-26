import { Box, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar: React.FC<{
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ placeholder, onChange }) => {
    return (
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <SearchIcon />
            <Input
                placeholder={placeholder}
                onChange={onChange}
                disableUnderline
                fullWidth
            />
        </Box>
    );
};

export default SearchBar;
