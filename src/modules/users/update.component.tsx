import { memo } from "react"
import { LoadBreadCrumb } from "../../core/genaral/genaral.methos"

function Update(prop: any) {


    return (
        <>
            {LoadBreadCrumb("Users", [{ name: 'Users', path: '/users' }, { name: 'Update', }])}
            Update working
        </>
    )
}


export default memo(Update)