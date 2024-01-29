import {FC, lazy, Suspense} from "react";

const MainComponent = lazy(() => import("../components/MainComponent"));

const MainPage: FC = () => {
    return (
        <Suspense fallback={""}>
            <MainComponent />
        </Suspense>
    )
}

export default MainPage;