import io from "socket.io-client";
import config from "../config/app.config";

const apiURL:any = config.apiURL;
const apiURLBOT:any = config.apiURLBOT;
// const apiURLBOTDEPs:any = config.apiURLBOTDEP;
// const apiURLNOTIFLY:any = config.apiURL;
export const socket = io(apiURL);
// export const socketDashboard = io(apiURLBOT);
// export const socketNotify = io(apiURLNOTIFLY);
// export const socketNotifydep = io(apiURLBOT);