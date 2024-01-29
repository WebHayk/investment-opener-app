import {Dispatch, SetStateAction} from "react";
import {SessionModel} from "../index";

export interface MainUserContextModel {
    session: SessionModel | null,
    isActivated: boolean,
    setSession: Dispatch<SetStateAction<SessionModel | null>>,
    setActivated: Dispatch<boolean>,
    starterDate: Date | null,
    setStarterDate: Dispatch<SetStateAction<Date | null>>
}