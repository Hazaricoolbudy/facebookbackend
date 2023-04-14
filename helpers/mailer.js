const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_SECRET, REFRESH_TOKEN } = process.env;
console.log(EMAIL, MAILING_ID, MAILING_SECRET, REFRESH_TOKEN);

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, REFRESH_TOKEN, oauth_link);
exports.sendVarificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: OAuth2,
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email varification",
    html: `<body> <div style=" max-width: 700px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-family: Arial, Helvetica, sans-serif; font-weight: 600; color: #3b5998; " > <!-- has to work on image part --> <img src="" alt="facebooklink" style="width: 30px" /> <span>Action requise: Activate your facebook account</span> </div> <div style=" padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: #e5e5e5; color: #141823; font-size: 17px; font-family: serif; " > <span>hello${name}</span> <div style="padding: 20px 0"> <span style="padding: 15rem 0"> You recently created an account on /facebook.To complete your registration , please confirm your account</span > </div> <a style=" width: 200px; padding: 10px 15px; background: #4c649b; color: #fff; text-decoration: none; font-weight: 600; " href=${url} > Confirm your Account</a > <br /> <div style="padding-top: 20px; " > <span style="margin:1.5rem 0 ; color: #898f9c;"> Facebook allows you to stay touch with your friends , once registered on facebook, you can share photos orgnaise event and much more</span > </div> </div> </body>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
