import { memo, useEffect, useState } from "react";
import "./notification.css";
import { useSelector } from "react-redux";

function PushNotification(prop) {
    let [notice, setNotis] = useState(false);
    const notify = useSelector((state: any) => state.notification);
    useEffect(() => {
        setNotis(true);
        setTimeout(() => {
            setNotis(false);
        }, 5000)
    }, [notify])
    return (<>
        {(notice && notify?.message) && 
            <div className={`custom-alert  alert ${notify?.success ? "alert-success": "alert-danger"} w-25`} role="alert">
                {notify.message}
            </div>
        }
    </>)
}

export default memo(PushNotification)