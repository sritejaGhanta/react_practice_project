import { memo } from "react";
import { LoadBreadCrumb } from "../../core/genaral/genaral.methos";
import { useLocation } from "react-router-dom";

function Dashbord(prop) {
    const location = useLocation();
    console.log(prop, location)
    return <>
        {LoadBreadCrumb('Dashboard', [])}
    </>
}

export default memo(Dashbord)