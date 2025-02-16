"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticityTokenInput = exports.useAuthenticityToken = exports.AuthenticityTokenProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
let context = react_1.createContext(null);
/**
 * Save the Authenticity Token into context
 * Example: In the `root` add `<AuthenticityTokenProvider>`
 * ```tsx
 * let { csrf } = useLoaderData<{ csrf: string }>();
 * return (
 *   <AuthenticityTokenProvider token={csrf}>
 *     <Document>
 *       <Outlet />
 *     </Document>
 *   </AuthenticityTokenProvider>
 * )'
 * ```
 */
function AuthenticityTokenProvider({ children, token, }) {
    return jsx_runtime_1.jsx(context.Provider, Object.assign({ value: token }, { children: children }), void 0);
}
exports.AuthenticityTokenProvider = AuthenticityTokenProvider;
/**
 * Get the authenticity token, this should be used to send it in a submit.
 * @example
 * let token = useAuthenticityToken();
 * let submit = useSubmit();
 * function sendFormWithCode() {
 *   submit(
 *     { csrf: token, ...otherData },
 *     { action: "/action", method: "post" },
 *   );
 * }
 */
function useAuthenticityToken() {
    let token = react_1.useContext(context);
    if (!token)
        throw new Error("Missing AuthenticityTokenProvider.");
    return token;
}
exports.useAuthenticityToken = useAuthenticityToken;
/**
 * Render a hidden input with the name csrf and the authenticity token as value.
 * ```tsx
 * return (
 *   <Form action="/login" method="post">
 *     <AuthenticityTokenInput />
 *     <input name="email" type="email" />
 *     <input name="password" type="password" />
 *     <button type="submit">Login</button>
 *   </Form>
 * );
 * ```
 */
function AuthenticityTokenInput({ name = "csrf", }) {
    let token = useAuthenticityToken();
    return jsx_runtime_1.jsx("input", { type: "hidden", value: token, name: name }, void 0);
}
exports.AuthenticityTokenInput = AuthenticityTokenInput;
