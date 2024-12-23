import { Link, Route, Routes, useRoutes } from "react-router-dom";
import API_END_POINTS from "../service/core.api.end.points";


const scripts = [
    '../../assets/js/main.js'
];

import './parent.component.css'
import { memo, useEffect, useState } from "react";

import Header from "./head-footers-404/head.component"
import Footer from "./head-footers-404/footer.component"
import ProfileComponent from "./profile/profile.component";

import List from './users/list.component';
import Add from './users/add.component';
import Update from './users/update.component';
import { LoadBreadCrumb } from "../core/genaral/genaral.methos";
import Dashbord from "./dashboard/dashbord";
import axiosInstance from "../service/http.server";



function loadJavaScriptFiles() {
    // Load JavaScript files dynamically
    scripts.forEach((Script: any) => {
        // @vite-ignore
        import(/* @vite-ignore */ Script)

    });
}

function ParentRoutes() {
    useEffect(loadJavaScriptFiles, []);
    let apiData = {}
    const [state, setState] = useState([])

    return <>
        <Header />
        <main id="main" className="main">
            {
                useRoutes([
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                id: 'name',
                                element: <Dashbord /> ,
                            },
                            {
                                path: 'profile',
                                element: <ProfileComponent />,
                            },
                            {
                                path: 'users',
                                children: [
                                    { path: '', element: <List name="teja" /> },
                                    { path: 'add', element: <Add /> },
                                    { path: ':id', element: <Add /> },
                                ]
                            }
                        ]
                    },
                    

                ])
            }
        </main>
        <Footer />

    </>
}
export default memo(ParentRoutes);
