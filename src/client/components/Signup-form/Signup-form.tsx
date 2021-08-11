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
import FinishSignupButtons from './Input-fields/Finish-signup-buttons';
import validator from '../../helpers/validator';
import { signUp } from '../../data/redux/slices/auth/thunks';
import Location from './Input-fields/Location';
import DateOfBirthPicker from './Input-fields/Date-of-birth-picker';

import useLocationOptions from '../../custom-hooks/use-location-options';

const SignupForm = () => {
    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [selectedCountry, setSelectedCountry] = React.useState("Country");
    const [selectedState, setSelectedState] = React.useState("State/Province/Region");
    const [selectedCity, setSelectedCity] = React.useState("City/Town");
    const [dateOfBirth, setDateOfBirth] = React.useState<any>(null);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isUserNameAvailable, setIsUserNameAvailable] = React.useState(true);
    const [isEmailAvailable, setIsEmailAvailable] = React.useState(true);
    const [uploadedFileName, setUploadedFileName] = React.useState(null);
    const [croppedImageFile, setCroppedImageFile] = React.useState(null);
    const [areTermsAccepted, setAreTermsAccepted] = React.useState(false);
    const [isCheckingUsername, setIsCheckingUsername] = React.useState(false);
    const [isCheckingEmail, setIsCheckingEmail] = React.useState(false);

    const countryRef = React.useRef<any>(null);
    const stateRef = React.useRef<any>(null);
    const cityRef = React.useRef<any>(null);

    const [countryOptions, stateOptions, cityOptions, isCountryOptionsLoading, isStateOptionsLoading, isCityOptionsLoading] = useLocationOptions(selectedCountry, selectedState, selectedCity);

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

    const handleCountrySelect = React.useCallback(() => { setSelectedCountry(countryRef.current?.selectedOptions[0].value); }, []);

    const handleStateSelect = React.useCallback((e) => { setSelectedState(stateRef.current?.selectedOptions[0].value); }, []);

    const handleCitySelect = React.useCallback((e) => { setSelectedCity(cityRef.current?.selectedOptions[0].value); }, []);

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

    React.useEffect(() => {
        /*console.log(fullName.length > 2, (isUserNameAvailable && userName.length > 2), selectedCountry !== "Country", selectedState !== "State/Province/Region", selectedCity !== "City/Town", !!dateOfBirth, 
        (isEmailAvailable && validator.validateEmail(email) && email.length > 6), (validator.validatePassword(password) && password.length >= 8) , !!croppedImageFile, areTermsAccepted);*/
    })

    return (
        <section className="section">
            <Heading1>Sign Up</Heading1>
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
                isEmailTooShort={email.length < 3}
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
        </section>
    );
};

export default SignupForm;