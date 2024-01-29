import {Route, Routes} from "react-router-dom";
import MainPage from "../../pages";
import OpenerPage from "../../pages/opener";

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path={"/"}
                element={<MainPage />}
            />
            <Route
                path={"/opener"}
                element={<OpenerPage />}
            />
        </Routes>
    )
}

export default AppRouter;