import React from 'react';
import { useMutation } from '@apollo/client';

import Heading1 from "../common/Heading1/Heading1";
import "./Signup-form.scss";
import {CREATE_USER} from "../../data/apollo/mutations/create-user";
import UserContext from '../../data/context/User-context';
import setAuth from '../../data/context/action-creators/set-auth';
import { CHECK_USERNAME_AVAILABILITY } from '../../data/apollo/mutations/check-username-availability';
import UserName from './Input-fields/User-name';
import AvatarUpload from './Input-fields/Avatar-upload';

import filer from '../../helpers/filer';

const SignupForm = () => {
    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isUserNameAvailable, setIsUserNameAvailable] = React.useState(true);
    const [uploadedFileName, setUploadedFileName] = React.useState(null);
            
    const [createUser, {loading}] = useMutation(CREATE_USER);
    const [checkUserName, {loading: userNameCheckLoading}] = useMutation(CHECK_USERNAME_AVAILABILITY);

    const {state, dispatch} = React.useContext<any>(UserContext);

    const [croppedImageFile, setCroppedImageFile] = React.useState(null);

    const handleSubmit = async (e) => {
        console.log("ANYTHING?", croppedImageFile);
        
        //await filer.uploadCroppedImage(croppedImageFile);
        const {data} = await createUser({ variables: { fullName, userName,  email, password, avatarBase64String: croppedImageFile} });
        dispatch(setAuth(data.createUser.id, data.createUser.authTokens[0], true, data.createUser.avatar));
    };

    const handleUserNameChange = React.useCallback(async (e) => {
        setUserName(e.target.value);
        const {data} = await checkUserName({variables: {userName: e.target.value}});
        userName.length > 2  && setIsUserNameAvailable(data.checkUserNameAvailability);
    }, [userNameCheckLoading]);

    const isEmailValid = !(!email.includes('@') && email.length > 4);
    const isPasswordValid = !(password.length > 1 && password.length < 6);

    return (
        <React.Fragment>
            <Heading1>Sign up</Heading1>
            <div className="field">
                <label className="label">Full Name</label>
                <div className="control has-icons-left">
                    <input className="input" type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                </div>
            </div>

            <UserName 
                handleUserNameChange={handleUserNameChange} 
                userNameCheckLoading={userNameCheckLoading} 
                userName={userName}
                isUserNameAvailable={isUserNameAvailable}
            />

            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input className={isEmailValid ? "input" : "input is-danger"} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                {(!isEmailValid) && <p className="help is-danger">This email is invalid</p>}
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input className={isPasswordValid ? "input" : "input is-danger"} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-key"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                {(!isPasswordValid) && <p className="help is-danger">This password is not good enough</p>}
            </div>

            <AvatarUpload 
                uploadedFileName={uploadedFileName} 
                setUploadedFileName={React.useCallback(setUploadedFileName, [])}
                setCroppedImageFile={setCroppedImageFile}
            />

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" />
                        I agree to the <a href="#">terms and conditions</a>
                    </label>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button 
                        className={`button is-success${loading ? " is-loading" : ""}`} 
                        onClick={handleSubmit} 
                        disabled={loading || !croppedImageFile}>
                        Submit
                    </button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Cancel</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignupForm;