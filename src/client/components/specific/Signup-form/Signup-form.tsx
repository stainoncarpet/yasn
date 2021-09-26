import React from 'react';
import { useDispatch } from 'react-redux';

import "./Signup-form.scss";

import Heading from "../../common/Heading/Heading";
import UserName from './Input-fields/User-name';
import AvatarUpload from './Input-fields/Avatar-upload';
import Email from './Input-fields/Email';
import Password from './Input-fields/Password';
import Terms from './Input-fields/Terms';
import FullName from './Input-fields/Full-name';
import FinishSignupButtons from './Input-fields/Finish-signup-buttons';
import validator from '../../../helpers/validator';
import { signUp } from '../../../redux/slices/auth/thunks';
import Location from './Input-fields/Location';
import DateOfBirthPicker from './Input-fields/Date-of-birth-picker';

import useLocationOptions from '../../../custom-hooks/use-location-options';
import useAccountData from '../../../custom-hooks/use-account-data';

const SignupForm = () => {
    const [fullName, setFullName, 
        userName, setUserName,
        dateOfBirth, setDateOfBirth,
        email, setEmail,
        password, setPassword,
        isUserNameAvailable, setIsUserNameAvailable,
        isEmailAvailable, setIsEmailAvailable,
        uploadedFileName, setUploadedFileName,
        croppedImageFile, setCroppedImageFile,
        areTermsAccepted, setAreTermsAccepted,
        isCheckingUsername, setIsCheckingUsername,
        isCheckingEmail, setIsCheckingEmail,
        countryRef, stateRef, cityRef
    ] = useAccountData();

    const [countryOptions, 
        stateOptions, 
        cityOptions, 
        isCountryOptionsLoading, 
        isStateOptionsLoading, 
        isCityOptionsLoading, 
        setSelectedCountry, 
        setSelectedState, 
        setSelectedCity, 
        selectedCountry,
        selectedState, 
        selectedCity,
        handleCountrySelect,
        handleStateSelect,
        handleCitySelect
    ] = useLocationOptions(countryRef, stateRef, cityRef);

    const dispatch = useDispatch();

    const handleUserNameChange = React.useCallback(async (e) => {
        setIsCheckingUsername(true);
        setUserName(e.target.value);
        const { userName } = await validator.checkUserCredAvailability(null, e.target.value);
        setIsUserNameAvailable(userName);
        setIsCheckingUsername(false)
    }, []);

    const handleSetEmail = React.useCallback(async (e) => {
        setIsCheckingEmail(true)
        setEmail(e.target.value);
        const { email } = await validator.checkUserCredAvailability(e.target.value, null);
        setIsEmailAvailable(email);
        setIsCheckingEmail(false);
    }, []);

    const handleSetPassword = React.useCallback((e) => { setPassword(e.target.value); }, []);

    const handleSetFullName = React.useCallback((e) => {
        validator.validateFullName(e.target.value);
        setFullName(e.target.value);
    }, []);

    const handleSetAreTermsAccepted = React.useCallback((e) => { setAreTermsAccepted(e.target.checked); }, []);

    const handleSetUploadedFileName = React.useCallback((fileName) => { setUploadedFileName(fileName); }, []);

    const handleSubmit = React.useCallback(async (e) => {
        dispatch(signUp({ fullName, userName, country: selectedCountry, state: selectedState, city: selectedCity, dateOfBirth, email, password, avatarBase64String: croppedImageFile }));
    }, [fullName, userName, email, password, croppedImageFile, selectedCountry, selectedState, selectedCity, dateOfBirth]);

    const isSubmittable = fullName.length > 2
        && (isUserNameAvailable && userName.length > 2)
        && selectedCountry !== "Country"
        && selectedState !== "State/Province/Region"
        && selectedCity !== "City/Town"
        && dateOfBirth
        && (isEmailAvailable && validator.validateEmail(email) && email.length > 6)
        && (validator.validatePassword(password) && password.length >= 8)
        && !!croppedImageFile && areTermsAccepted
        ;

    return (<section className="section signup">
            <Heading type={1}>Sign Up</Heading>
            <FullName
                fullName={fullName}
                setFullName={handleSetFullName}
            />
            <UserName
                userName={userName}
                handleUserNameChange={handleUserNameChange}
                userNameCheckLoading={isCheckingUsername}
                isUserNameAvailable={isUserNameAvailable}
                isUsernameTooShort={userName.length < 3}
            />
            <Location
                countryOptions={countryOptions}
                stateOptions={stateOptions}
                cityOptions={cityOptions}
                countryRef={countryRef}
                stateRef={stateRef}
                cityRef={cityRef}
                handleCountrySelect={handleCountrySelect}
                handleStateSelect={handleStateSelect}
                handleCitySelect={handleCitySelect}
                selectedCountry={selectedCountry}
                selectedState={selectedState}
                selectedCity={selectedCity}
                isCountryOptionsLoading={isCountryOptionsLoading}
                isStateOptionsLoading={isStateOptionsLoading}
                isCityOptionsLoading={isCityOptionsLoading}
            />
            <DateOfBirthPicker
                date={dateOfBirth}
                setDate={setDateOfBirth}
            />
            <Email
                email={email}
                setEmail={handleSetEmail}
                isCheckingEmailLoading={isCheckingEmail}
                isEmailAvailable={isEmailAvailable}
                isEmailValid={validator.validateEmail(email)}
                isEmailTooShort={email.length < 6}
            />
            <Password
                password={password}
                setPassword={handleSetPassword}
                isPasswordValid={validator.validatePassword(password)}
                isPasswordLongEnough={password.length >= 8}
            />
            <AvatarUpload
                uploadedFileName={uploadedFileName}
                setUploadedFileName={handleSetUploadedFileName}
                setCroppedImageFile={setCroppedImageFile}
            />
            <Terms
                areTermsAccepted={areTermsAccepted}
                setAreTermsAccepted={handleSetAreTermsAccepted}
            />
            <FinishSignupButtons
                handleSubmit={handleSubmit}
                isSubmittable={isSubmittable}
            />
        </section>);
};

export default SignupForm;