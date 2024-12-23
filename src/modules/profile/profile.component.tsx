import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APP_SORE } from "../../core/interface/user.interface";
import { Formik } from 'formik';
import axiosInstance from "../../service/http.server";
import API_END_POINTS from "../../service/core.api.end.points"
import { setUser, updateUser } from "../../core/store/app.reducer";
import { LoadBreadCrumb } from "../../core/genaral/genaral.methos";
import { compose } from "redux";


function ProfileComponent() {
    const dispatch = useDispatch();
    const userInfo = useSelector((store: APP_SORE) => store.user);
    const [profile, setProfile] = useState('');



    return (
        <>
            {LoadBreadCrumb("Profile", [{name: 'Profile'}])} 

            <section className="section profile">
                <div className="row">
                    <div className="col-xl-4">

                        <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                <img src={userInfo.profile_image} alt={userInfo.full_name} className="rounded-circle" />
                                <h2>{userInfo.full_name}</h2>
                                {/* <h3>Web Designer</h3> */}
                                <div className="social-links mt-2">
                                    <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                    <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">

                                    <li className="nav-item">
                                        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                    </li>

                                </ul>
                                <div className="tab-content pt-2">
                                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                        <h5 className="card-title">About</h5>
                                        <p className="small fst-italic">{userInfo.about}</p>

                                        <h5 className="card-title">Profile Details</h5>

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label ">Full Name</div>
                                            <div className="col-lg-9 col-md-8">{userInfo.full_name}</div>
                                        </div>

                                        {/* <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Company</div>
                                            <div className="col-lg-9 col-md-8">Lueilwitz, Wisoky and Leuschke</div>
                                        </div> */}

                                        {/* <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Job</div>
                                            <div className="col-lg-9 col-md-8">Web Designer</div>
                                        </div> */}

                                        {/* <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Country</div>
                                            <div className="col-lg-9 col-md-8">India</div>
                                        </div> */}

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Address</div>
                                            <div className="col-lg-9 col-md-8">{userInfo.address}</div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Phone</div>
                                            <div className="col-lg-9 col-md-8">{userInfo.phone_number}</div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Email</div>
                                            <div className="col-lg-9 col-md-8">{userInfo.email}</div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                                        <Formik
                                            initialValues={{
                                                fullName: userInfo.full_name,
                                                about: userInfo.about,
                                                address: userInfo.address,
                                                phone: userInfo.phone_number,
                                                email: userInfo.email,
                                            }}

                                            validate={values => {
                                                const errors: any = {};
                                                if (!values.fullName) {
                                                    errors.fullName = 'Please enter a Full Name';
                                                }

                                                if (!values.about) {
                                                    errors.about = 'Please Describe Your Self';
                                                }

                                                if (!values.address) {
                                                    errors.address = 'Please enter your Address';
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

                                            // onSubmit={(values, { setSubmitting }) => {
                                            //     setSubmitting(false);
                                            //     const form:FormData = new FormData();
                                            //     form.append('fullName', values.fullName);
                                            //     form.append('about', values.about);
                                            //     //@ts-ignore
                                            //     form.append('address', values.address);
                                            //     form.append('phone', values.phone);
                                            //     form.append('email', values.email);
                                            //     //@ts-ignore
                                            //     form.append('profileImage', values.profileImage);

                                            //     console.log(form.getAll)
                                            //     axiosInstance.post(API_END_POINTS.customer.update, form).then(e => console.log(e))
                                            // }}
                                            onSubmit={(values: any, { setSubmitting }) => {
                                                setSubmitting(true);

                                                // Create FormData object
                                                const form = new FormData();
                                                form.append('fullName', values.fullName);
                                                form.append('about', values.about);
                                                form.append('address', values.address); // No need for ts-ignore here if values.address exists
                                                form.append('phone', values.phone);
                                                form.append('email', values.email);

                                                console.log(profile, Object.keys(profile))

                                                if (profile) {
                                                    //@ts-ignore
                                                    form.append('profileImage', profile); // Ensure this is a File object
                                                } 

                                                // Log the FormData content (optional, for debugging)
                                                for (let [key, value] of form.entries()) {
                                                    console.log(`${key}:`, value);
                                                }

                                                // Send form data using axios
                                                axiosInstance.post(API_END_POINTS.customer.update, form, {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data', // Explicitly specify the content type
                                                        'Custom-Header': 'CustomHeaderValue',    // Add any additional custom headers
                                                    }
                                                })
                                                    .then((response: any) => {
                                                        let payLoad: any = {
                                                            full_name: response.data.full_name,
                                                            phone_number: response.data.phonenumber,
                                                            profile_image: response.data.profile_image,
                                                            profile_images_name: response.data.profile_image_name,
                                                            about: response.data.about,
                                                            address: response.data.address
                                                        }
                                                        response?.settings?.success == 1 && dispatch(updateUser(payLoad));
                                                    })
                                                    .catch(error => {
                                                        console.error('Error:', error.response ? error.response.data : error.message);
                                                    })
                                                    .finally(() => {
                                                        setSubmitting(false);
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
                                                        <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            {/* <img src="assets/img/profile-img.jpg" alt="Profile" />
                                                            <div className="pt-2">
                                                                <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></a>
                                                                <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></a>
                                                            </div> */}
                                                            {/* <input
                                                                id="profileImage"
                                                                name="profileImage"
                                                                type="file"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            /> */}
                                                            <input
                                                                id="profileImage"
                                                                name="profileImage"
                                                                type="file"
                                                                onChange={(event) => {
                                                                    setProfile(event.currentTarget.files[0])
                                                                }}
                                                                onBlur={handleBlur}
                                                            />
                                                        </div>
                                                    </div>

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
                                                        <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <textarea
                                                                name="about"
                                                                className="form-control"
                                                                id="about"
                                                                style={{ "height": "100px" }}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.about}
                                                            ></textarea>
                                                            <div className='text-danger'>{errors.about && touched.about && errors.about}</div>
                                                        </div>
                                                    </div>


                                                    <div className="row mb-3">
                                                        <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input
                                                                name="address"
                                                                type="text"
                                                                className="form-control"
                                                                id="Address"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.address}
                                                            />
                                                            <div className='text-danger'>{errors.address && touched.address && errors.address}</div>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input
                                                                name="phone"
                                                                type="text"
                                                                className="form-control"
                                                                id="Phone"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.phone}
                                                            />
                                                            <div className='text-danger'>{errors.phone && touched.phone && errors.phone}</div>

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
                                                                readOnly
                                                                disabled
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                            />
                                                            <div className='text-danger'>{errors.email && touched.email && errors.email}</div>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Save Changes</button>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>

                                    </div>

                                    <div className="tab-pane fade pt-3" id="profile-change-password">
                                        <Formik
                                            initialValues={{
                                                password: '',
                                                newPassword: '',
                                                confPassword: '',
                                                passMissmatch: ''
                                            }}
                                            onSubmit={(values) => {
                                                if (values.newPassword !== values.confPassword) {
                                                    // TO DO add notification
                                                    alert("pass and conf pass not matched ")
                                                } else {
                                                    console.log(values)
                                                    axiosInstance.post(API_END_POINTS.customer.update_password, values).then(e => {
                                                        console.log(e)
                                                    })
                                                }

                                            }}
                                            validate={values => {
                                                const errors: any = {};
                                                if (!values.password) {
                                                    errors.password = 'Please enter Old Password';
                                                }

                                                if (!values.newPassword) {
                                                    errors.newPassword = 'Please enter New Password ';
                                                }

                                                if (!values.confPassword) {
                                                    errors.confPassword = 'Please enter Conform Password';
                                                }

                                                if (values.newPassword !== values.confPassword) {
                                                    errors.passMissmatch = 'Password and conform password is not same';
                                                }
                                                return errors;
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
                                                <form onSubmit={handleSubmit} >

                                                    <div className="row mb-3">
                                                        <label htmlFor="password" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input
                                                                name="password"
                                                                type="password"
                                                                className="form-control"
                                                                id="password"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                            />
                                                            <div className='text-danger'>{errors.password && touched.password && errors.password}</div>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label ">New Password</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input
                                                                name="newPassword"
                                                                type="password"
                                                                className="form-control"
                                                                id="newPassword"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.newPassword}
                                                            />
                                                            <div className='text-danger'>{errors.newPassword && touched.newPassword && errors.newPassword}</div>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <input
                                                                name="confPassword"
                                                                type="password"
                                                                className="form-control"
                                                                id="confPassword"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.confPassword}
                                                            />
                                                            <div className='text-danger'>{errors.confPassword && touched.confPassword && errors.confPassword}</div>
                                                            {!errors.confPassword && <div className='text-danger'>{errors.passMissmatch && touched.passMissmatch && errors.passMissmatch}</div>}
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Change Password</button>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>



        </>
    )

}

export default memo(ProfileComponent)