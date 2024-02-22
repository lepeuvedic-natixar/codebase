import { FunctionComponent, memo } from "react";
import Stack from '@mui/material/Stack';
import { Box, Typography } from "@mui/material";
import { getColorByCategory } from "utils/CategoryColors";

interface CategoryLabelProps {
    name: string,
    color: string
}

const CategoryLabel: FunctionComponent<CategoryLabelProps> = ({ name, color }) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing="10px">
            <Box
                component="span"
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: color
                }}
            />
            <Typography>{name}</Typography>
        </Stack>
    )
}


const CategoriesLegend: FunctionComponent = () => {
    const categoryLabels = ["Operation", "Upstream", "Downstream"].map(category =>
        <CategoryLabel name={category} color={getColorByCategory(category)} />
    )

    return <Stack
        direction="row"
        alignItems="center"
        spacing="24px">
        {categoryLabels}
    </Stack>
}

export default memo(CategoriesLegend)
