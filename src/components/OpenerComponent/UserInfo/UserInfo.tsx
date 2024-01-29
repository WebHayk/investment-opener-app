import {FC, useCallback, useContext, useEffect, useState} from "react";
import {Box} from "@mui/joy";
import InfoItem from "./InfoItem";
import {DecodeService} from "../../../core/services/DecodeService";
import {MainUserContext} from "../../../core/context";
import {BTMAIN_LANGUAGES} from "../../../core/models/enums";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LanguageIcon from "@mui/icons-material/Language";

export const UserInfo: FC = () => {

    const {
        session
    } = useContext(MainUserContext);

    const [username, setUsername] = useState<string>("");

    const setUsernameHandler = useCallback(async () => {
        if (!session) return;
        let {token} = session;
        const parsedToken = DecodeService.parseJwtToken(token);
        if (!parsedToken) return;
        let {username} = parsedToken.data;
        setUsername(username);
    }, [session]);

    useEffect(() => {
        setUsernameHandler();
    }, [setUsernameHandler]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        }}>
            <InfoItem
                icon={
                    <PersonIcon
                        color={"warning"}
                        fontSize={"small"}
                    />
                }
                label={"Օգտանուն"}
                value={username}
            />
            <InfoItem
                icon={
                    <AccountBalanceIcon
                        color={"warning"}
                        fontSize={"small"}
                    />
                }
                label={"Տարադրամ"}
                value={session?.currency || ""}
            />
            <InfoItem
                icon={
                    <LanguageIcon
                        color={"warning"}
                        fontSize={"small"}
                    />
                }
                label={"Լեզու"}
                value={languageLabelHelper(session?.lang as BTMAIN_LANGUAGES) || ""}
            />
        </Box>
    )
}

const languageLabelHelper = (language: BTMAIN_LANGUAGES) => {
    switch (language) {
        case BTMAIN_LANGUAGES.AM:
            return "Հայերեն";
        case BTMAIN_LANGUAGES.RU:
            return "Ռուսերեն";
        case BTMAIN_LANGUAGES.EN:
            return "Անգլերեն";
    }
}