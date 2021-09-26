import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Heading from '../../common/Heading/Heading';
import Location from '../Signup-form/Input-fields/Location';
import useLocationOptions from '../../../custom-hooks/use-location-options';
import fetcher from '../../../helpers/fetcher';
import { IStoreState } from '../../../interfaces/state/i-store-state';
import UserName from '../Signup-form/Input-fields/User-name';
import FullName from '../Signup-form/Input-fields/Full-name';
import validator from '../../../helpers/validator';
import Email from '../Signup-form/Input-fields/Email';
import DateOfBirthPicker from '../Signup-form/Input-fields/Date-of-birth-picker';
import Spinner from '../../common/Spinner/Spinner';
import { updateAccountData } from '../../../redux/slices/auth/thunks';
import useAccountData from '../../../custom-hooks/use-account-data';

const AccountSettings = () => {
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
    const auth = useSelector((state: IStoreState) => state.auth);

    // component-specific state
    const [isLoading, setIsloading] = React.useState(true);
    const [alreadyUsedUserName, setAlreadyUsedUserName] = React.useState("");
    const [alreadyUsedEmail, setAlreadyUsedEmail] = React.useState("");

    const handleUserNameChange = React.useCallback(async (e) => {
        setIsCheckingUsername(true);
        setUserName(e.target.value);
        const { userName } = await validator.checkUserCredAvailability(null, e.target.value);
        setIsUserNameAvailable(userName);
        setIsCheckingUsername(false);
    }, []);

    const handleSetFullName = React.useCallback((e) => {
        validator.validateFullName(e.target.value);
        setFullName(e.target.value);
    }, []);

    const handleSetEmail = React.useCallback(async (e) => {
        setIsCheckingEmail(true)
        setEmail(e.target.value);
        const { email } = await validator.checkUserCredAvailability(e.target.value, null);
        setIsEmailAvailable(email);
        setIsCheckingEmail(false);
    }, []);

    React.useEffect(() => {
        fetcher.fetchAccountSettingsData()
            .then((data) => {
                setAlreadyUsedUserName(data.user.userName);
                setAlreadyUsedEmail(data.user.email);

                console.log(data.user);
                setIsloading(false);

                setSelectedCountry(data.user.location.country);
                setSelectedState(data.user.location.state);
                setSelectedCity(data.user.location.city);

                setFullName(data.user.fullName);
                setUserName(data.user.userName);

                setDateOfBirth(new Date(data.user.dateOfBirth));
                setEmail(data.user.email)
            })
            .catch((err) => console.log("error fetching account settings data ", err));
    }, []);

    const handleSave = async () => {
        setIsloading(true);
        const updatedData = { fullName, userName, location: { country: selectedCountry, state: selectedState, city: selectedCity }, dateOfBirth, email };
        const result: any = await dispatch(updateAccountData({ updatedData }));
        setIsloading(false);
    };

    const handleDelete = () => {
        console.error("handle delete")
    };

    return (
        <section className="section">
            <Heading type={1}>Account Settings</Heading>
            {(isLoading && !alreadyUsedEmail) ? <Spinner /> : <React.Fragment>
                <FullName
                    fullName={fullName}
                    setFullName={handleSetFullName}
                />
                <UserName
                    userName={userName}
                    alreadyUsedUserName={alreadyUsedUserName}
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
                    alreadyUsedEmail={alreadyUsedEmail}
                />
                <div className="field is-grouped">
                    <div className="control">
                        <button className={isLoading ? "button is-info mr-2 is-loading" : "button is-info mr-2"} onClick={handleSave}>
                            Save
                        </button>
                        <button className={"button is-danger"} onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </React.Fragment>}
        </section>
    );
};

export default AccountSettings;