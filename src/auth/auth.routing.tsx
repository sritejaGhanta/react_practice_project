import { Route, Routes } from "react-router-dom";
import Login from "./login/login";
import { memo } from "react";

function AuthRoutes() {

    return (<>
        <Routes>
            <Route path="/" Component={Login} />
        </Routes>
    </>)
}

export default memo(AuthRoutes);