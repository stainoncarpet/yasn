import React from 'react';
import { useDispatch } from 'react-redux';

import "./Signup-form.scss";

import Heading1 from "../common/Heading1/Heading1";
import UserName from './Input-fields/User-name';
import AvatarUpload from './Input-fields/Avatar-upload';
import Email from './Input-fields/Email';
import Password from './Input-fields/Password';
import Terms from './Input-fields/Terms';
import FullName from './Input-fields/Full-name';
import Buttons from './Input-fields/Buttons';
import validator from '../../helpers/validator';
import { signUp } from '../../data/redux/slices/user/thunks';

const SignupForm = () => {
    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isUserNameAvailable, setIsUserNameAvailable] = React.useState(true);
    const [isEmailAvailable, setIsEmailAvailable] = React.useState(true);
    const [uploadedFileName, setUploadedFileName] = React.useState(null);
    const [croppedImageFile, setCroppedImageFile] = React.useState(null);
    const [areTermsAccepted, setAreTermsAccepted] = React.useState(false);

    const dispatch = useDispatch();

    const handleSubmit = React.useCallback(async (e) => {
        dispatch(signUp({fullName, userName, email, password, avatarBase64String: croppedImageFile}));
    }, [fullName, userName, email, password, croppedImageFile]);

    const handleUserNameChange = React.useCallback(async (e) => {
        setUserName(e.target.value);
        const {userName} = await validator.checkUserCredAvailability(null, e.target.value);
        setIsUserNameAvailable(userName);
    }, []);

    const handleSetEmail = React.useCallback(async (e) => {
        setEmail(e.target.value);
        const {email} = await validator.checkUserCredAvailability(e.target.value, null);
        setIsEmailAvailable(email);
    }, []);

    const handleSetPassword = React.useCallback((e) => {setPassword(e.target.value);}, []);

    const handleSetFullName = React.useCallback((e) => {setFullName(e.target.value);}, []);

    const handleSetAreTermsAccepted = React.useCallback((e) => {setAreTermsAccepted(e.target.checked);}, []);

    const handleSetUploadedFileName = React.useCallback((fileName) => {setUploadedFileName(fileName);}, []);

    return (
        <section className="section">
            <Heading1>Sign up</Heading1>
            <FullName fullName={fullName} setFullName={handleSetFullName} />
            <UserName 
                handleUserNameChange={handleUserNameChange} 
                userNameCheckLoading={"userNameCheckLoading"} 
                userName={userName} 
                isUserNameAvailable={isUserNameAvailable} 
            />
            <Email email={email} setEmail={handleSetEmail} isEmailAvailable={isEmailAvailable} />
            <Password password={password} setPassword={handleSetPassword} />
            <AvatarUpload 
                uploadedFileName={uploadedFileName} 
                setUploadedFileName={handleSetUploadedFileName}
                setCroppedImageFile={setCroppedImageFile}
            />
            <Terms areTermsAccepted={areTermsAccepted} setAreTermsAccepted={handleSetAreTermsAccepted} />
            <Buttons 
                loading={false} 
                handleSubmit={handleSubmit} 
                croppedImageFile={croppedImageFile}
                userNameCheckLoading={"userNameCheckLoading"} 
                fullName={fullName}
                userName={userName}
                email={email}
                password={password}
                areTermsAccepted={areTermsAccepted}
            />
        </section>
    );
};

export default SignupForm;