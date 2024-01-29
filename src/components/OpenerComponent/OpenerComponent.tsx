import {FC, useContext, useEffect} from "react";
import Typography from "@mui/joy/Typography";
import {Box, Card, CardContent, IconButton, Tooltip} from "@mui/joy";
import {MainUserContext} from "../../core/context";
import UserInfo from "./UserInfo";
import LogoutIcon from "@mui/icons-material/Logout";
import AboutInfo from "./AboutInfo";
import {STORAGE_KEYS} from "../../core/models/enums";
import {Helpers} from "../../core/helpers";

export const OpenerComponent: FC = () => {

    const {
        starterDate,
        session,
        setSession,
        setStarterDate,
        setActivated
    } = useContext(MainUserContext);

    const handleCheckStartMiningDate = async () => {
        if (!session) return;

        let startMiningInterval = setInterval(async () => {
            let currentTime = new Date().getTime();
            let startMiningTime = new Date(starterDate as any).getTime();
            if (currentTime > startMiningTime) {
                clearInterval(startMiningInterval);
                // @ts-ignore
                await window.api.send("startMining", session.token);

                // @ts-ignore
                window.api.receive("startMining", (
                    session: any,
                    date: string
                ) => {
                    let starterDate = Helpers.dateStarterFormatter(date);
                    localStorage.setItem(STORAGE_KEYS.SESSION, session);
                    localStorage.setItem(STORAGE_KEYS.STARTER_DATE, starterDate.toString());
                    setStarterDate(starterDate);
                    setSession(JSON.parse(session));
                });
            }
        }, 5000);
    }

    const handleLogout = () => {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
        localStorage.removeItem(STORAGE_KEYS.STARTER_DATE);
        setSession(null);
        setStarterDate(null);
    }

    useEffect(() => {
        handleCheckStartMiningDate();
    }, []);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography
                    color={"warning"}
                    level={"title-lg"}
                >
                    Անձնական հաշիվ
                </Typography>
                <Tooltip title={"Դուրս գալ"}>
                    <IconButton
                        onClick={handleLogout}
                        color={"danger"}
                    >
                        <LogoutIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Card
                variant="solid"
                color="warning"
                invertedColors
            >
                <CardContent>
                    <Typography level="body-md">Մոտակա միացման ժամանակը</Typography>
                    <Typography level="h2">
                        {starterDate?.toLocaleDateString()} {starterDate?.toLocaleTimeString()}
                    </Typography>
                </CardContent>
            </Card>
            <Card
                invertedColors
                variant="outlined"
            >
                <CardContent>
                    <Typography
                        sx={{
                            marginBottom: "5px"
                        }}
                        fontWeight={"bold"}
                        level={"body-md"}
                    >
                        Հաշվի տվյալներ
                    </Typography>
                    <UserInfo/>
                </CardContent>
            </Card>
            <AboutInfo/>
        </Box>
    )
}