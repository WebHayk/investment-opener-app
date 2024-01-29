import {createContext} from "react";
import {MainUserContextModel} from "../models/interfaces/context";

export const MainUserContext = createContext<MainUserContextModel>({} as MainUserContextModel);