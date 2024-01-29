import {FC, lazy, Suspense} from "react";

const OpenerComponent = lazy(() => import("../../components/OpenerComponent"));

const OpenerPage: FC = () => {
    return (
        <Suspense fallback={""}>
            <OpenerComponent />
        </Suspense>
    )
}

export default OpenerPage;