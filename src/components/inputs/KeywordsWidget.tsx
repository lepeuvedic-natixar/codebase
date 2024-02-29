import { Chip, Stack } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

const KeywordsWidget = (props: GridRenderCellParams) => {
    const keywords = props.value as string[]
    if (keywords == null || keywords.length == 0) {
        return null
    }
    return (
        <Stack direction="row"
            gap={1}
            overflow={"hidden"}
            sx={{
                width: '100%',
                p: 1,
                m: 0
            }}
        >
            {keywords.map((keyword, index) => (
                <Chip
                    color="success"
                    key={index}
                    label={keyword}
                />
            ))}
        </Stack>
    );
};

export default KeywordsWidget