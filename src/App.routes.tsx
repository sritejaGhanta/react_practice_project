import {  memo } from "react";
import { BrowserRouter } from "react-router-dom";

import AuthRoutes from "./auth/auth.routing";
import ParentRoutes from "./modules/parent.routing";

// import common styles
import 'bootstrap/dist/css/bootstrap.css';
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/quill/quill.snow.css";
import "../assets/vendor/quill/quill.bubble.css";
import "../assets/vendor/remixicon/remixicon.css";
import "../assets/vendor/simple-datatables/style.css";
import "../assets/css/style.css";

// import common js files
import "../assets/vendor/apexcharts/apexcharts.min.js";
import "../assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
import "../assets/vendor/chart.js/chart.umd.js";
import "../assets/vendor/echarts/echarts.min.js";
import "../assets/vendor/quill/quill.js";
import "../assets/vendor/simple-datatables/simple-datatables.js";
import "../assets/vendor/tinymce/tinymce.min.js";
import "../assets/vendor/php-email-form/validate.js";

import { useDispatch, useSelector } from "react-redux";
import { API_RESPONSE, USER_INTERFACE } from "./core/interface/user.interface.js";
import { clearStorage, readItem } from "./service/local.storage.js";
import envirolment from "./envirolments/envirolment.js";
import coreApiEndPoints from "./service/core.api.end.points.js";
import { clearUser, setUser } from "./core/store/app.reducer.js";
import axios from "./service/http.server";
import { startLoader, stopLoader } from "./core/store/loder.reducer.js";


function AppRoutes() {
    const dispatch = useDispatch()

    const logout = () => {
        clearStorage()
        dispatch(clearUser());
        // sss.history

    }

    axios.interceptors.request.use(
        (config) => {
            dispatch(startLoader())

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response: any) => {
            dispatch(stopLoader())

            return { ...response };
        },
        (error) => {
            dispatch(stopLoader())

            return Promise.reject(error);
        }
    );

    const userInfo: USER_INTERFACE = useSelector((state: any) => state.user);
    let loading = true;

    if (!userInfo.customer_id && readItem(envirolment.TOKEN_KEY)) {
        try {
            axios.get(coreApiEndPoints.customer.identity).then((result: API_RESPONSE) => {
                if (result?.settings?.success) {
                    let payLoad:any = {
                        customer_id: result.data.customer_id,
                        full_name: result.data.full_name,
                        email: result.data.email,
                        phone_number: result.data.phonenumber,
                        profile_image: result.data.profile_image,
                        profile_images_name: result.data.profile_image_name,
                        about: result.data.about,
                        address: result.data.address
                    }
                    result?.settings?.success == 1 ? dispatch(setUser(payLoad)) : logout();
                } else { 
                    alert()
                    logout()
                }
                loading = false
            })

        } catch (error) {
            loading = false
            logout();
        }
    } else {
        loading = false

    }

    return (<>
        <BrowserRouter>
            {userInfo.customer_id && <ParentRoutes />}
            {(!loading && !userInfo.customer_id) && <AuthRoutes />}
            {/* <Routes>
                <Route path="*" Component={() => <PageNotFound />}> </Route>
            </Routes> */}
            {/* <Routes>
                <Route path="/" element={userInfo.customer_id ? <ParentRoutes /> : <AuthRoutes />} />
            </Routes> */}
        </BrowserRouter >

    </>)
}

export default memo(AppRoutes)