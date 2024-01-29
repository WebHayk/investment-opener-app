import AppRouter from "./core/router";
import {useEffect, useState} from "react";
import {STORAGE_KEYS} from "./core/models/enums";
import {MainUserContext} from "./core/context";
import {SessionModel} from "./core/models/interfaces";

function App() {

    const [isActivated, setActivated] = useState<boolean | null>(null);
    const [session, setSession] = useState<SessionModel | null>(null);
    const [starterDate, setStarterDate] = useState<Date | null>(null);

    const setStarterDateHandler = () => {
        let starterDate = localStorage.getItem(STORAGE_KEYS.STARTER_DATE);
        if (!starterDate) return;
        setStarterDate(new Date(starterDate));
    }

    const handleCheckActivation = () => {
        if (localStorage.getItem(STORAGE_KEYS.LICENSE_KEY)) {
            return setActivated(true);
        }

        setActivated(false);
    }

    const handleCheckSession = () => {
        let session = localStorage.getItem(STORAGE_KEYS.SESSION);
        if (session) {
            return setSession(JSON.parse(session));
        }

        setSession(null);
    }

    useEffect(() => {
        setStarterDateHandler();
        handleCheckActivation();
        handleCheckSession();
    }, []);

    return (
        <>
            {
                isActivated !== null
                    ?
                    <MainUserContext.Provider value={{
                        isActivated,
                        setActivated,
                        setSession,
                        session,
                        starterDate,
                        setStarterDate
                    }}>
                        <AppRouter/>
                    </MainUserContext.Provider>
                    :
                    null
            }
        </>
    );
}

export default App;
