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
import Email from './Input-fields/Email';
import Password from './Input-fields/Password';
import Terms from './Input-fields/Terms';
import FullName from './Input-fields/Full-name';
import Buttons from './Input-fields/Buttons';

const SignupForm = () => {
    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isUserNameAvailable, setIsUserNameAvailable] = React.useState(true);
    const [uploadedFileName, setUploadedFileName] = React.useState(null);
    const [croppedImageFile, setCroppedImageFile] = React.useState(null);
            
    const [createUser, {loading}] = useMutation(CREATE_USER);
    const [checkUserName, {loading: userNameCheckLoading}] = useMutation(CHECK_USERNAME_AVAILABILITY);

    const {dispatch} = React.useContext<any>(UserContext);

    const handleSubmit = React.useCallback(async (e) => {
        const {data} = await createUser({ variables: { fullName, userName, email, password, avatarBase64String: croppedImageFile} });
        dispatch(setAuth(data.createUser.id, data.createUser.authTokens[0], true, data.createUser.avatar));
    }, [fullName, userName, email, password, croppedImageFile]);

    const handleUserNameChange = React.useCallback(async (e) => {
        setUserName(e.target.value);
        const {data} = await checkUserName({variables: {userName: e.target.value}});
        userName.length > 2  && setIsUserNameAvailable(data.checkUserNameAvailability);
    }, [userNameCheckLoading]);

    const handleSetEmail = React.useCallback((e) => {setEmail(e.target.value);}, []);

    const handleSetPassword = React.useCallback((e) => {setPassword(e.target.value);}, []);

    const handleSetFullName = React.useCallback((e) => {setFullName(e.target.value);}, []);

    const handleSetUploadedFileName = React.useCallback((fileName) => {setUploadedFileName(fileName);}, []);

    return (
        <React.Fragment>
            <Heading1>Sign up</Heading1>
            <FullName fullName={fullName} setFullName={handleSetFullName} />
            <UserName 
                handleUserNameChange={handleUserNameChange} 
                userNameCheckLoading={userNameCheckLoading} 
                userName={userName} 
                isUserNameAvailable={isUserNameAvailable} 
            />
            <Email email={email} setEmail={handleSetEmail} />
            <Password password={password} setPassword={handleSetPassword} />
            <AvatarUpload 
                uploadedFileName={uploadedFileName} 
                setUploadedFileName={handleSetUploadedFileName}
                setCroppedImageFile={setCroppedImageFile}
            />
            <Terms />
            <Buttons 
                loading={loading} 
                handleSubmit={handleSubmit} 
                croppedImageFile={croppedImageFile}
                userNameCheckLoading={userNameCheckLoading} 
                fullName={fullName}
                userName={userName}
                email={email}
                password={password}
            />
        </React.Fragment>
    );
};

export default SignupForm;