import { memo, useEffect, useMemo, useState } from "react"
import { LoadBreadCrumb } from "../../core/genaral/genaral.methos"
import { Formik } from "formik";
import axiosInstance from "../../service/http.server";
import API_END_POINTS from "../../service/core.api.end.points";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// {
//     "users_id": 2,
//     "name": "Charan Ghanta",
//     "email": "charanDeepGhanta@yopmail.com",
//     "phoneno": "9553378461",
//     "address": "Satyavolu",
//     "added_date": "2024-12-05 18:57:30",
//     "modified_date": "",
//     "status": "Active"
// }
function Add(prop: any) {
    const navigate = useNavigate();
    const routerParams = useParams();
    const locationParams = useLocation();
    let [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        console.log(locationParams.state)
        if (locationParams.state) {
            setUserInfo(locationParams.state);
        } else if (routerParams.id && !initialValues.fullName) {
            axiosInstance.get(`${API_END_POINTS.users.details}/${routerParams.id}`).then(res => {
                setUserInfo(res)
                
            })
        }
    }, [routerParams.id])

    const initialValues = useMemo(() => ({
        fullName: userInfo?.data?.name,
        email: userInfo?.data?.email,
        phone: userInfo?.data?.phoneno,
        status: userInfo?.data?.status == "Active" ? true : false,
    }), [userInfo]);


    return (
        <>
            {LoadBreadCrumb("Users", [{ name: 'Users', path: '/users' }, { name: routerParams.id ? "Update" : 'Add', }])}

            <Formik
                initialValues={initialValues}
                enableReinitialize
                validate={values => {
                    const errors: any = {};
                    if (!values.fullName) {
                        errors.fullName = 'Please enter a Full Name';
                    }

                    if (!values.phone) {
                        errors.phone = 'Please enter your Phone Number';
                    }

                    if (!values.email) {
                        errors.email = 'Please enter your Email';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid Email address';
                    }
                    return errors;
                }}

                onSubmit={(values: any, { setSubmitting, resetForm, }) => {
                    setSubmitting(true);

                    const params = {
                        'name': values.fullName,
                        'email': values.email,
                        'phoneno': values.phone,
                        'status': values.status ? "Active" : "Inactive",
                    }

                    // Send form data using axios
                    let method = 'post'
                    let url = API_END_POINTS.users.add;
                    if (routerParams.id) {
                        method = "put";
                        url = API_END_POINTS.users.update + `/${routerParams.id}`;
                    }

                    axiosInstance[method](url, params)
                        .then((response: any) => {
                            console.log(response)
                            if (response.settings.success) {
                                resetForm();
                                navigate('/users', { state: "teja" })
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error.response ? error.response.data : error.message);
                        })
                        .finally(() => {
                            // setSubmitting(false);
                        });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (

                    <form onSubmit={handleSubmit} encType='multipart/form-data'>

                        <div className="row mb-3">
                            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                            <div className="col-md-8 col-lg-9">
                                <input
                                    name="fullName"
                                    type="text"
                                    className="form-control"
                                    id="fullName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName} />
                                <div className='text-danger'>{errors.fullName && touched.fullName && errors.fullName}</div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                            <div className="col-md-8 col-lg-9">
                                <input
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <div className='text-danger'>{errors.email && touched.email && errors.email}</div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                            <div className="col-md-8 col-lg-9">
                                <input
                                    name="phone"
                                    type="text"
                                    className="form-control "
                                    id="Phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                />
                                <div className='text-danger'>{errors.phone && touched.phone && errors.phone}</div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label ">Status</label>
                            <div className="form-check form-switch col-md-8 col-lg-9 p-0">
                                <input
                                    name="status"
                                    className="form-check-input fs-2 ms-2"
                                    type="checkbox" id="statusSwitch"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.status}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <Link type="submit" className="btn btn-secondary me-3" to={"/users"} >Back</Link>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{routerParams.id ? "Update" : "Add"}</button>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    )
}


export default memo(Add)