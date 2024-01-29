import {FC, ReactNode} from "react";
import {Box} from "@mui/joy";

interface MainLayoutModel {
    children: ReactNode
}

export const MainLayout: FC<MainLayoutModel> = (
    {
        children
    }
) => {
    return (
        <Box sx={{
            padding: "30px"
        }}>
            {children}
        </Box>
    )
}