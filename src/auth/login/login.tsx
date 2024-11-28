import { memo, useContext } from "react";
import { useFormik } from 'formik';
import axios from "../../service/http.server";
import coreApiEndPoints from "../../service/core.api.end.points";
import { API_RESPONSE } from "../../core/interface/user.interface";
import envirolment from "../../envirolments/envirolment";
import { createItem } from "../../service/local.storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../core/store/app.reducer";

function Login() {
    const dispatch = useDispatch();

    // @ts-ignore
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = 'Required';
            } 
            else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            }

            return errors;

        },
        onSubmit: values => {
            axios.post(coreApiEndPoints.auth.login, values).then((result:API_RESPONSE) => {

                // TO DO ALERT
                if(result.settings.success){
                    createItem(envirolment.TOKEN_KEY, result.settings.access_token);
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
        
                            result?.settings?.success == 1 && dispatch(setUser(payLoad)) ;
                        }
                    })
                } else {
                    alert(result.settings.message)
                }
            })
        },
    });
    return (<>
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                        <div className="d-flex justify-content-center py-4">
                            <a href="index.html" className="logo d-flex align-items-center w-auto">
                                <img src="assets/img/logo.png" alt="" />
                                <span className="d-none d-lg-block">NiceAdmin</span>
                            </a>
                        </div>

                        <div className="card mb-3">

                            <div className="card-body">

                                <div className="pt-4 pb-2">
                                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                    <p className="text-center small">Enter your username & password to login</p>
                                </div>

                                <form className="row g-3 needs-validation" noValidate onSubmit={formik.handleSubmit}>

                                    <div className="col-12">
                                        <label htmlFor="yourUsername" className="form-label">Email</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                id="yourUsername"
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                required
                                            />
                                            <div className="invalid-feedback">Please enter your username.</div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="yourPassword" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="yourPassword"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            required
                                        />
                                        <div className="invalid-feedback">Please enter your password!</div>
                                    </div>

                                    {/* <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                        </div>
                                    </div> */}
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100" type="submit">Login</button>
                                    </div>
                                    {/* <div className="col-12">
                                        <p className="small mb-0">Don't have account? <a href="pages-register.html">Create an account</a></p>
                                    </div> */}
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    </>)

}

export default memo(Login)