import React, { useState } from 'react';
import "./LoginPage.css";
import "./util.css";
// import { login } from './utilities/api';

import { useHistory, Link } from "react-router-dom";
// import Safe from "react-safe";
import 'font-awesome/css/font-awesome.min.css';
import Tilt from 'react-tilt'


function LoginPage({ onLogin }) {

    // const [error, setError] = useState(null);
    // const history = useHistory();

    return (
        <div>
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <Tilt class="login100-pic js-tilt Tilt" options={{ max: 40 }} style={{ height: 250, width: 250 }} >
                            <div className="Tilt-inner"><img src='images/img-01.png' alt="IMG" /></div>
                        </Tilt>

                        <form class="login100-form validate-form">
                            <span class="login100-form-title">
                                Member Login
					</span>

                            <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input class="input100" type="text" name="email" placeholder="Email" />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">

                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="wrap-input100 validate-input" data-validate="Password is required">
                                <input class="input100" type="password" name="pass" placeholder="Password" />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="container-login100-form-btn">
                                <button class="login100-form-btn">
                                    Login
						</button>
                            </div>

                            <div class="text-center p-t-12">
                                <span class="txt1">
                                    Forgot 
						</span>
                                <a class="txt2" href="">
                                     Username / Password?
						</a>
                            </div>

                            <div class="text-center p-t-136">
                               <Link to="/register"><a class="txt2" href="">
                                    Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;