import { Route, Routes } from "react-router-dom";


const scripts = [
    '../../assets/js/main.js'
];

import './parent.component.css'
import { memo, useEffect } from "react";

import Header from "./head-footers-404/head.component.js"
import Footer from "./head-footers-404/footer.component.js"
import ProfileComponent from "./profile/profile.component.js";



function loadJavaScriptFiles() {
    // Load JavaScript files dynamically
    scripts.forEach((Script:any) => {
        // @vite-ignore
        import(/* @vite-ignore */ Script)
        
    });
}

function ParentRoutes() {
    useEffect(loadJavaScriptFiles, [])
    return (
        <>
            <Header />
            <main id="main" className="main">
                <Routes>
                    <Route path="profile" Component={() => <ProfileComponent />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default memo(ParentRoutes);
