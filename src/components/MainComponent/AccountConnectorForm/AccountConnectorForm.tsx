import {FC, useContext, useState} from "react";
import {Alert, Box, Snackbar} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import WarningIcon from "@mui/icons-material/Warning";
import Button from "@mui/joy/Button";
import {STORAGE_KEYS} from "../../../core/models/enums";
import {MainUserContext} from "../../../core/context";
import {Helpers} from "../../../core/helpers";
import LockIcon from "@mui/icons-material/Lock";

export const AccountConnectorForm: FC = () => {

    const [message, setMessage] = useState<string>("");
    const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const {setSession, setStarterDate} = useContext(MainUserContext);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setMessage("");
    };

    const handleConnect = async () => {
        setLoading(true);
        // @ts-ignore
        await window.api.send("accountConnect", "some");

        // @ts-ignore
        await window.api.receive("accountConnect", (
            session: any,
            date: string,
            errorMessage?: string
        ) => {
            setLoading(false);
            if (errorMessage) {
                setSnackbarOpen(true);
                return setMessage(errorMessage);
            }
            let starterDate = Helpers.dateStarterFormatter(date);
            localStorage.setItem(STORAGE_KEYS.SESSION, session);
            localStorage.setItem(STORAGE_KEYS.STARTER_DATE, starterDate.toString());
            setStarterDate(starterDate);
            setSession(JSON.parse(session));
        });
    }

    return (
        <>
            <Snackbar
                variant={"solid"}
                autoHideDuration={10000}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                color={"danger"}
                open={isSnackbarOpen}
                onClose={handleSnackbarClose}
            >
                {message}
            </Snackbar>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
            }}>
                <Typography
                    color={"warning"}
                    level={"title-lg"}
                >
                    Միացրեք Ձեր BTMAIN-ի հաշիվը
                </Typography>
                <Alert
                    sx={{
                        alignItems: 'flex-start'
                    }}
                    startDecorator={<WarningIcon/>}
                    variant="soft"
                    color={"warning"}
                >
                    <div>
                        <div>Ուշադրություն</div>
                        <Typography
                            level="body-sm"
                            color={"warning"}
                        >
                            Մուտքագրվող տվյալները <strong>BTMAIN</strong> կայքի սեփականությունն են: Ծրագիրը
                            հնարավորություն չունի դրանք օգտագործելու։
                        </Typography>
                    </div>
                </Alert>
                <Typography
                    level={"title-md"}
                >
                    Այս քայլը անհրաժեշտ է Ձեր հաշիվը ծրագրին միացնելու և հետագայում կոճակի ավտոմատ միացման համար։
                </Typography>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <Button
                        color={"warning"}
                        loading={isLoading}
                        onClick={handleConnect}
                        size={"lg"}
                    >
                        Մուտք
                    </Button>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px"
                    }}>
                        <LockIcon
                            color={"success"}
                            fontSize={"small"}
                        />
                        <Typography
                            color={"success"}
                            level={"body-sm"}
                        >
                            Կապը պաշտպանված է
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}