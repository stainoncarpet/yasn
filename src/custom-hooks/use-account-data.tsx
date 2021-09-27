import React from 'react';

const useAccountData = () => {
    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");

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

    return [fullName, setFullName, 
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
    ];
};

export default useAccountData;
