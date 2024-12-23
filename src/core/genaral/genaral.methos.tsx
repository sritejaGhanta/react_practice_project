import { Link } from "react-router-dom";

export function LoadBreadCrumb(name: string, childern: { name: string, path?: string }[]) {
    return <div className="pagetitle">
        <h1>{name}</h1>
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                {childern?.length > 0 && childern.map((e, key) => {
                    if (e.path) {
                        return <li className="breadcrumb-item" key={key}> <Link to={e.path}>{e.name} </Link> </li>
                    } else {
                        return <li className="breadcrumb-item" key={key}>{e.name}</li>
                    }
                })}

            </ol>
        </nav>
    </div>

}