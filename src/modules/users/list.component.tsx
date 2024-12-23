import { memo, Suspense, useDeferredValue, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LoadBreadCrumb } from "../../core/genaral/genaral.methos"
import { DataTable } from "simple-datatables"
import axiosInstance from "../../service/http.server";
import API_END_POINTS from "../../service/core.api.end.points";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react"
import './list.component.css';
import { ColDef } from "ag-grid-community"
import { useDebounce } from 'use-debounce';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';


function List(prop: any) {

    const [users, setUser] = useState([]);
    const [settings, setSettings] = useState({});
    const [limit, setLimit] = useState(50);
    const [sort, setSort] = useState([]);
    const [keyword, setKeyword] = useState(null);
    const key = useDebounce(keyword, 500);
    const navigator = useNavigate()

    const apiPayload = {
        limit: limit,
        page: 1,
        keyword: key[0],
        sort: sort
    };

    const callListApi = (params = null) => {
        axiosInstance.post(API_END_POINTS.users.list, apiPayload).then(e => {
            setUser(e.data);
            setSettings(e.settings);
            apiPayload.page = e.settings.curr_page;
            console.log(apiPayload)
        })

    }
    const delActionBtn = (prop) => {
        const deleteUser = () => {
            const id = prop.data.users_id;
            axiosInstance.delete(API_END_POINTS.users.delete + '/' + id).then(e => {
                if (e.settings.success) {
                    callListApi()
                }
            })
        }

        const getUser = () => {
            axiosInstance.get(API_END_POINTS.users.details + '/' + prop.data.users_id).then(e => {
                if (e.settings.success) {
                    navigator('/users/'+ prop.data.users_id, {state: e})
                }
            })
        }
        return <>
            {/* <Link className="btn btn-success me-1" to={"/users/" + prop.data.users_id} state={}> <i className="bi bi-pencil-fill"></i></Link> */}
            <button className="btn btn-success me-1" onClick={getUser}> <i className="bi bi-pencil-fill"></i> </button>
            <button className="btn btn-danger" onClick={deleteUser}> <i className="bi bi-trash"></i></button>

        </>
    }

    const onPageChange = (page) => {
        console.log(apiPayload.page, page)
        if (settings.curr_page != page) {
            apiPayload.page = page;
            callListApi()
        }
    }

    const countChange = (limit) => {
        apiPayload.limit = limit;
        callListApi();
    }

    const sortChange = ({ columns }) => {
        const tableSort = [];
        columns.forEach(element => {
            if (element.colId && element.sort) {
                tableSort.push({
                    prop: element.colId,
                    dir: element.sort
                })
            }
        });
        setSort(tableSort)
    }

    useEffect(() => {
        callListApi()
    }, [key[0], limit, sort]);

    const colDefs: ColDef = [
        // {
        //     // field: 'users_id', 
        //     headerName: "#",
        //     flex: 1,
        //     checkboxSelection: true,
        //     sortable: false,

        // },
        {
            headerName: "Name",
            field: 'name',
            flex: 1,
            minWidth: 250,
            sortable: true,
        },
        {
            headerName: 'Email',
            field: "email",
            headerClass: "ag-header-center",
            minWidth: 250,
            flex: 1,
            sortable: true,
        },
        {
            headerName: 'Phone Number',
            field: "phoneno",
            headerClass: "ag-header-center",
            cellClass: "text-center",
            minWidth: 250,
            flex: 1,
            sortable: true,
        },
        {
            headerName: 'Added Date',
            field: "added_date",
            headerClass: "ag-header-center",
            cellClass: "text-center",
            minWidth: 100,
            flex: 1,
            sortable: true,
            type: "datecolumn"
        },
        {
            headerName: 'Status',
            field: "status",
            headerClass: "ag-header-center",
            cellClass: "text-center",
            minWidth: 100,
            flex: 1,
            sortable: true,
        },
        {
            headerName: 'Action',
            minWidth: 10,
            headerClass: "ag-header-center",
            cellClass: "text-center",
            flex: 1,
            sortable: false,
            cellRenderer: delActionBtn
        },
    ];

    return (
        <>
            {LoadBreadCrumb("Users", [{ name: 'Users' }])}
            <div className="row">
                <div className="col-lg-12">

                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="card-title">Users List</h5>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={keyword}
                                            onChange={e => setKeyword(e.target.value)}
                                            placeholder="Search"
                                        />

                                        {keyword ?
                                            <button className="input-group-text" onClick={() => setKeyword('')}><i className="bi bi-x-circle"></i></button> :
                                            <button className="input-group-text"><i className="bi bi-search"></i></button>
                                        }
                                    </div>

                                    <button className="btn btn-secondary ms-2 " onClick={callListApi} title="Refresh">
                                        <i className="bi bi-arrow-clockwise "></i>
                                    </button>
                                    <Link className="btn btn-secondary ms-2 " onClick={callListApi} title="Add User" to={"/users/add"}>
                                        <i className="bi bi-file-earmark-plus "></i>
                                    </Link>
                                </div>

                            </div>
                            <div
                                className="ag-theme-quartz" // applying the Data Grid theme
                                style={{ height: 500 }} // the Data Grid will fill the size of the parent container
                            >
                                <AgGridReact
                                    rowData={users}
                                    columnDefs={colDefs}
                                    rowHeight='55'
                                    onSortChanged={sortChange}
                                />
                            </div>
                            {settings.per_page && <div className="d-flex justify-content-end mt-3">
                                <select className="page-select-class me-1" value={limit} onChange={e => setLimit(Number(e.target.value))}>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                    <option value={500}>500</option>
                                </select>
                                <ResponsivePagination
                                    maxWidth={500}
                                    current={settings.curr_page || 1}
                                    total={Math.ceil(settings.count / settings.per_page)}
                                    onPageChange={onPageChange}
                                />
                            </div>}

                        </div>
                    </div>

                </div>
            </div>
            <script type="module">
            </script>
        </>
    )
}



export default memo(List)
