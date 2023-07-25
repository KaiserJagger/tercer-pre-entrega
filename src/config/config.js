import dotenv from "dotenv";

dotenv.config();

export default {
    MONGO_URL:
        "mongodb+srv://" +
        process.env.MONGO_USER +
        ":" +
        process.env.MONGO_PASS +
        "@cluster0.ruduqnx.mongodb.net/JaggerStore",
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SESSION_SECRET: process.env.SESSION_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_COOKIE: process.env.JWT_COOKIE,
    ADMIN_EMAIL: process.env.ADMIN_MAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASS,
    PERSISTANCE: process.env.PERSISTANCE,
    MAIL_APP_PASS: process.env.MAIL_APP_PASS,
    MAIL_APP_USER: process.env.MAIL_APP_USER,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_AT: process.env.TWILIO_AT,
    TWILIO_PH: process.env.TWILIO_PH,

};
