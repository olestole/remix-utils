"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthenticityToken = exports.createAuthenticityToken = void 0;
const uuid_1 = require("uuid");
const responses_1 = require("./responses");
/**
 * Create a random string in Base64 to be used as an authenticity token for
 * CSRF protection. You should run this on the `root.tsx` loader only.
 * @example
 * let token = createAuthenticityToken(session); // create and set in session
 * return json({ ...otherData, csrf: token }); // return the token in the data
 * @example
 * // create and set in session with the key `csrf-token`
 * let token = createAuthenticityToken(session, "csrfToken");
 * return json({ ...otherData, csrf: token }); // return the token in the data
 */
function createAuthenticityToken(session, sessionKey = "csrf") {
    let token = uuid_1.v4();
    session.set(sessionKey, token);
    return token;
}
exports.createAuthenticityToken = createAuthenticityToken;
/**
 * Verify if a request and session has a valid CSRF token.
 * @example
 * let action: ActionFunction = async ({ request }) => {
 *   let session = await getSession(request.headers.get("Cookie"));
 *   await verifyAuthenticityToken(request, session);
 *   // the request is authenticated and you can do anything here
 * }
 * @example
 * let action: ActionFunction = async ({ request }) => {
 *   let session = await getSession(request.headers.get("Cookie"));
 *   await verifyAuthenticityToken(request, session, "csrfToken");
 *   // the request is authenticated and you can do anything here
 * }
 */
async function verifyAuthenticityToken(request, session, sessionKey = "csrf") {
    // We clone the request to ensure we don't modify the original request.
    // This allow us to parse the body of the request and let the original request
    // still be used and parsed without errors.
    let formData = await request.clone().formData();
    // if the session doesn't have a csrf token, throw an error
    if (!session.has(sessionKey)) {
        throw responses_1.unprocessableEntity({
            message: "Can't find CSRF token in session.",
        });
    }
    // if the body doesn't have a csrf token, throw an error
    if (!formData.get(sessionKey)) {
        throw responses_1.unprocessableEntity({
            message: "Can't find CSRF token in body.",
        });
    }
    // if the body csrf token doesn't match the session csrf token, throw an
    // error
    if (formData.get(sessionKey) !== session.get(sessionKey)) {
        throw responses_1.unprocessableEntity({
            message: "Can't verify CSRF token authenticity.",
        });
    }
}
exports.verifyAuthenticityToken = verifyAuthenticityToken;
