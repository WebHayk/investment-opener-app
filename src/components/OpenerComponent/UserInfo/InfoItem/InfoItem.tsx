import {FC, ReactNode} from "react";
import {Box} from "@mui/joy";
import Typography from "@mui/joy/Typography";

interface InfoItemModel {
    label: string,
    value: string,
    icon: ReactNode
}

export const InfoItem: FC<InfoItemModel> = (
    {
        label,
        value,
        icon
    }
) => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px"
            }}>
                {icon}
                <Typography
                    color={"neutral"}
                >
                    {label}
                </Typography>
            </Box>
            <Typography
                fontWeight={"bold"}
            >
                {value}
            </Typography>
        </Box>
    )
}