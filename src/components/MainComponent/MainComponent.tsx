import {FC, useContext} from "react";
import ActivationForm from "./ActivationForm";
import MainLayout from "../../layouts/MainLayout";
import {MainUserContext} from "../../core/context";
import AccountConnectorForm from "./AccountConnectorForm";
import OpenerComponent from "../OpenerComponent";

export const MainComponent: FC = () => {

    const {
        session,
        isActivated
    } = useContext(MainUserContext);

    const viewConfigHandler = () => {
        if (!isActivated) {
            return <ActivationForm />
        }

        if (!session) {
            return <AccountConnectorForm />
        }

        return <OpenerComponent />
    }

    return (
        <MainLayout>
            {viewConfigHandler()}
        </MainLayout>
    )
}