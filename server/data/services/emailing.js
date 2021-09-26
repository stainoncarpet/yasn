const PS = `
    <hr />
    <p><a href="${process.env.APP_ADDRESS}" target="_blank">YASN | Yet Another Social Network</a></p>
`

const sendPasswordResetSecurityCode = async (email, name, code) => {
    try {
        const mailjet = require('node-mailjet').connect('bd4418bb1fb31d3e9fc19476c735e19b', '46fb8338382bb181a2c7664ab33e9580');

        const emailSendingResult = await mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": `${process.env.EMAILER_EMAIL}`,
                            "Name": `${process.env.EMAILER_NAME}`
                        },
                        "To": [
                            {
                                "Email": `${email}`,
                                "Name": `${name}`
                            }
                        ],
                        "Subject": "Password Reset Security Code",
                        "TextPart": "Password Reset Security Code",
                        "HTMLPart": `
                            <h3>Hello, ${name}!</h3><br />
                            <p>You requested password reset for your account. Here's the code you need paste in order to proceed: <strong>${code}</strong>.</p>
                            <p>The code will expire in ${process.env.PASSWORD_RESET_ACTION_LIFESPAN / 1000} seconds.</p>
                            ${PS}
                        `,
                        "CustomID": "PasswordResetSecurityCode"
                    }
                ]
            });

        console.log("Email successfully sent to ", email);

        return emailSendingResult;
    } catch (error) {
        console.error(error);
    }
};

const sendSuccessfulRegistration = async (email, name) => {
    try {
        const mailjet = require('node-mailjet').connect('bd4418bb1fb31d3e9fc19476c735e19b', '46fb8338382bb181a2c7664ab33e9580');

        const emailSendingResult = await mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": `${process.env.EMAILER_EMAIL}`,
                            "Name": `${process.env.EMAILER_NAME}`
                        },
                        "To": [
                            {
                                "Email": `${email}`,
                                "Name": `${name}`
                            }
                        ],
                        "Subject": "Successful Registration",
                        "TextPart": "YASN Profile Created",
                        "HTMLPart": `
                            <h3>Hello, ${name}!</h3><br />
                            <p>Thank you for creating your profile on YASN. We are really glad to see you!</p>
                            <p>Enjoy!</p>
                            ${PS}
                        `,
                        "CustomID": "SuccessfulRegistration"
                    }
                ]
            });

        console.log("Email successfully sent to ", email);

        return emailSendingResult;
    } catch (error) {
        console.error(error);
    }
};

const sendSuccessfulLogin = async (email, name) => {
    try {
        const mailjet = require('node-mailjet').connect('bd4418bb1fb31d3e9fc19476c735e19b', '46fb8338382bb181a2c7664ab33e9580');

        const emailSendingResult = await mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": `${process.env.EMAILER_EMAIL}`,
                            "Name": `${process.env.EMAILER_NAME}`
                        },
                        "To": [
                            {
                                "Email": `${email}`,
                                "Name": `${name}`
                            }
                        ],
                        "Subject": "Successful Login",
                        "TextPart": "Successful Login",
                        "HTMLPart": `
                            <h3>Hello, ${name}!</h3><br />
                            <p>Somebody just logged in to your YASN profile at <strong>${(new Date()).toUTCString()}</strong>.</p>
                            <p>We hope it was you.</p>
                            ${PS}
                        `,
                        "CustomID": "SuccessfulLogin"
                    }
                ]
            });

        console.log("Email successfully sent to ", email);

        return emailSendingResult;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    sendPasswordResetSecurityCode,
    sendSuccessfulRegistration,
    sendSuccessfulLogin
};