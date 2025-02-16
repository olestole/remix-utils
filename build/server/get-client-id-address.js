"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientIPAddress = void 0;
const is_ip_1 = __importDefault(require("is-ip"));
/**
 * This is the list of headers, in order of preference, that will be used to
 * determine the client's IP address.
 */
const headerNames = Object.freeze([
    "X-Client-IP",
    "X-Forwarded-For",
    "Fly-Client-IP",
    "CF-Connecting-IP",
    "Fastly-Client-Ip",
    "True-Client-Ip",
    "X-Real-IP",
    "X-Cluster-Client-IP",
    "X-Forwarded",
    "Forwarded-For",
    "Forwarded",
]);
function getClientIPAddress(requestOrHeaders) {
    let headers = requestOrHeaders instanceof Headers
        ? requestOrHeaders
        : requestOrHeaders.headers;
    let ipAddress = headerNames
        .flatMap((headerName) => {
        let value = headers.get(headerName);
        if (headerName === "Forwarded") {
            return parseForwardedHeader(value);
        }
        if (!(value === null || value === void 0 ? void 0 : value.includes(", ")))
            return value;
        return value.split(", ");
    })
        .find((ip) => {
        if (ip === null)
            return false;
        return is_ip_1.default(ip);
    });
    return ipAddress !== null && ipAddress !== void 0 ? ipAddress : null;
}
exports.getClientIPAddress = getClientIPAddress;
function parseForwardedHeader(value) {
    if (!value)
        return null;
    for (let part of value.split(";")) {
        if (part.startsWith("for="))
            return part.slice(4);
        continue;
    }
    return null;
}
