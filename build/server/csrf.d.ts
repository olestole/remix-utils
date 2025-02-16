import { Session } from "@remix-run/server-runtime";
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
export declare function createAuthenticityToken(session: Session, sessionKey?: string): string;
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
export declare function verifyAuthenticityToken(request: Request, session: Session, sessionKey?: string): Promise<void>;
