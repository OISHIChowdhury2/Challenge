const { Resend } = require("resend");
const { env } = require("../config");
const { ApiError } = require("./api-error");
const fetch = require('node-fetch');

global.Headers = fetch.Headers;      // Assign Headers globally
const resend = new Resend(env.RESEND_API_KEY);
const sendMail = async (mailOptions) => {
  const { error } = await resend.emails.send(mailOptions);
  if (error) {
    throw new ApiError(500, "Unable to send email");
  }
};

module.exports = {
  sendMail,
};
