import {ChangeEvent, FC, useCallback, useContext, useEffect, useState} from "react";
import {Alert, Box, Snackbar} from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/joy/Typography";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import {LicenseKeysService} from "../../../core/services/LicenseKeysService";
import {LicenseKeyModel} from "../../../core/models/interfaces";
import {STORAGE_KEYS} from "../../../core/models/enums";
import {MainUserContext} from "../../../core/context";

export const ActivationForm: FC = () => {

    const {setActivated} = useContext(MainUserContext);

    const [licenseKeys, setLicenseKeys] = useState<LicenseKeyModel[]>([]);

    const [isSnackbarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const [isLoading, setLoading] = useState<boolean>(false);
    const [activationKey, setActivationKey] = useState<string>("");

    const handleSnackbarClose = () => setSnackBarOpen(false);

    const handleActivationKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        setActivationKey(value);
    }

    const getAllLicenseKeys = useCallback(async () => {
        let response = await LicenseKeysService.getAllLicenseKeys();
        setLicenseKeys(response);
    }, []);

    const handleActivationKeyCheck = async () => {

        if (!licenseKeys.length) return;

        setLoading(true);

        const licenseKey = licenseKeys.find(licenseKey => licenseKey.key === activationKey);

        setLoading(false);

        if (!licenseKey) {
            setMessage("Բանալին չի գտնվել");
            return setSnackBarOpen(true);
        }

        const {key, id} = licenseKey;

        localStorage.setItem(STORAGE_KEYS.LICENSE_KEY, key);

        await LicenseKeysService.deleteLicenseKey(id);

        setActivated(true);
    }

    useEffect(() => {
        getAllLicenseKeys();
    }, [getAllLicenseKeys]);

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
                <Alert
                    sx={{
                        alignItems: 'flex-start'
                    }}
                    startDecorator={<CheckCircleIcon/>}
                    variant="soft"
                    color={"success"}
                >
                    <div>
                        <div>Բարի գալուստ</div>
                        <Typography
                            level="body-sm"
                            color={"success"}
                        >
                            Այս ծրագիրը նախատեսված է <strong>BTMAIN</strong> կայքում սարքավորումների կոճակի ավտոմատացված
                            միացման համար
                        </Typography>
                    </div>
                </Alert>
                <FormControl>
                    <FormLabel>Բանալի</FormLabel>
                    <Input
                        value={activationKey}
                        onChange={handleActivationKeyChange}
                    />
                    <FormHelperText>Մուտքագրեք ադմինիստրատորի կողմից ուղարկված բանալին այստեղ</FormHelperText>
                </FormControl>
                <Button
                    loading={isLoading}
                    onClick={handleActivationKeyCheck}
                    disabled={activationKey.length !== 32}
                    sx={{
                        marginRight: "auto"
                    }}
                    color={"success"}
                    size="md"
                >
                    Ակտիվացնել
                </Button>
            </Box>
        </>
    )
}