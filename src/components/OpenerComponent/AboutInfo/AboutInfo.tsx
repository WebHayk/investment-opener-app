import {FC} from "react";
import {Box} from "@mui/joy";
import Typography from "@mui/joy/Typography";

export const AboutInfo: FC = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        }}>
            <Typography
                level={"title-lg"}
            >
                Ինչպես է ծրագիրը աշխատում
            </Typography>
            <Typography
                level={"body-md"}
            >
                Ծրագիրը աշխատում է ֆոնային ռեժիմում։ Անհրաժեշտություն չկա ծրագրի պատուհանը ակտիվ պահել։ Կարող եք զբաղվել այլ գործերով, ծրագիրը ժամանակին կմիացնի կոճակը և կթարմացնի տվյալները։
            </Typography>
        </Box>
    )
}