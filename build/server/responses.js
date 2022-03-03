"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = exports.pdf = exports.stylesheet = exports.javascript = exports.notModified = exports.serverError = exports.unprocessableEntity = exports.notFound = exports.forbidden = exports.unauthorized = exports.badRequest = exports.redirectBack = exports.json = void 0;
const server_runtime_1 = require("@remix-run/server-runtime");
/**
 * @deprecated Use the `json` function from Remix directly.
 *
 * @description
 * A wrapper of the `json` function from `remix` which accepts a generic for the
 * data to be serialized. This allows you to use the same type for `json` and
 * on `useLoaderData` to ensure the type is always in sync.
 *
 * The type must extend the JsonValue from type-fest, this means only JSON
 * compatible types are allowed inside the data which will help you avoid trying
 * to send functions or class instances.
 *
 * @example
 * type LoaderData = { user: { name: string } };
 * export let action: ActionFunction = async ({ request }) => {
 *   let user = await getUser(request);
 *   return json<LoaderData>({ user });
 * }
 * export function Screen() {
 *   let { user } = useLoaderData<LoaderData>();
 *   return <UserProfile user={user} />;
 * }
 */
function json(data, init) {
    return server_runtime_1.json(data, init);
}
exports.json = json;
/**
 * Create a new Response with a redirect set to the URL the user was before.
 * It uses the Referer header to detect the previous URL. It asks for a fallback
 * URL in case the Referer couldn't be found, this fallback should be a URL you
 * may be ok the user to land to after an action even if it's not the same.
 * @example
 * export let action: ActionFunction = async ({ request }) => {
 *   await doSomething(request);
 *   // If the user was on `/search?query=something` we redirect to that URL
 *   // but if we couldn't we redirect to `/search`, which is an good enough
 *   // fallback
 *   return redirectBack(request, { fallback: "/search" });
 * }
 */
function redirectBack(request, { fallback, ...init }) {
    var _a;
    return server_runtime_1.redirect((_a = request.headers.get("Referer")) !== null && _a !== void 0 ? _a : fallback, init);
}
exports.redirectBack = redirectBack;
/**
 * Create a response receiving a JSON object with the status code 400.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   let user = await getUser(request);
 *   throw badRequest<BoundaryData>({ user });
 * }
 */
function badRequest(data, init) {
    return json(data, { ...init, status: 400 });
}
exports.badRequest = badRequest;
/**
 * Create a response receiving a JSON object with the status code 401.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   let user = await getUser(request);
 *   throw unauthorized<BoundaryData>({ user });
 * }
 */
function unauthorized(data, init) {
    return json(data, { ...init, status: 401 });
}
exports.unauthorized = unauthorized;
/**
 * Create a response receiving a JSON object with the status code 403.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   let user = await getUser(request);
 *   if (!user.idAdmin) throw forbidden<BoundaryData>({ user });
 * }
 */
function forbidden(data, init) {
    return json(data, { ...init, status: 403 });
}
exports.forbidden = forbidden;
/**
 * Create a response receiving a JSON object with the status code 404.
 * @example
 * export let loader: LoaderFunction = async ({ request, params }) => {
 *   let user = await getUser(request);
 *   if (!db.exists(params.id)) throw notFound<BoundaryData>({ user });
 * }
 */
function notFound(data, init) {
    return json(data, { ...init, status: 404 });
}
exports.notFound = notFound;
/**
 * Create a response receiving a JSON object with the status code 422.
 * @example
 * export let loader: LoaderFunction = async ({ request, params }) => {
 *   let user = await getUser(request);
 *   throw unprocessableEntity<BoundaryData>({ user });
 * }
 */
function unprocessableEntity(data, init) {
    return json(data, { ...init, status: 422 });
}
exports.unprocessableEntity = unprocessableEntity;
/**
 * Create a response receiving a JSON object with the status code 500.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   let user = await getUser(request);
 *   throw serverError<BoundaryData>({ user });
 * }
 */
function serverError(data, init) {
    return json(data, { ...init, status: 500 });
}
exports.serverError = serverError;
/**
 * Create a response with only the status 304 and optional headers.
 * This is useful when trying to implement conditional responses based on Etags.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   return notModified();
 * }
 */
function notModified(init) {
    return new Response("", { ...init, status: 304 });
}
exports.notModified = notModified;
/**
 * Create a response with a JavaScript file response.
 * It receives a string with the JavaScript content and set the Content-Type
 * header to `application/javascript; charset=utf-8` always.
 *
 * This is useful to dynamically create a JS file from a Resource Route.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   return javascript("console.log('Hello World')");
 * }
 */
function javascript(content, init = {}) {
    let responseInit = typeof init === "number" ? { status: init } : init;
    let headers = new Headers(responseInit.headers);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/javascript; charset=utf-8");
    }
    return new Response(content, {
        ...responseInit,
        headers,
    });
}
exports.javascript = javascript;
/**
 * Create a response with a CSS file response.
 * It receives a string with the CSS content and set the Content-Type header to
 * `text/css; charset=utf-8` always.
 *
 * This is useful to dynamically create a CSS file from a Resource Route.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   return css("body { color: red; }");
 * }
 */
function stylesheet(content, init = {}) {
    let responseInit = typeof init === "number" ? { status: init } : init;
    let headers = new Headers(responseInit.headers);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "text/css; charset=utf-8");
    }
    return new Response(content, {
        ...responseInit,
        headers,
    });
}
exports.stylesheet = stylesheet;
/**
 * Create a response with a PDF file response.
 * It receives a string with the PDF content and set the Content-Type header to
 * `application/pdf; charset=utf-8` always.
 *
 * This is useful to dynamically create a PDF file from a Resource Route.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   return pdf(await generatePDF(request.formData()));
 * }
 */
function pdf(content, init = {}) {
    let responseInit = typeof init === "number" ? { status: init } : init;
    let headers = new Headers(responseInit.headers);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/pdf");
    }
    return new Response(content, {
        ...responseInit,
        headers,
    });
}
exports.pdf = pdf;
/**
 * Create a response with a HTML file response.
 * It receives a string with the HTML content and set the Content-Type header to
 * `text/html; charset=utf-8` always.
 *
 * This is useful to dynamically create a HTML file from a Resource Route.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   return html("<h1>Hello World</h1>");
 * }
 */
function html(content, init = {}) {
    let responseInit = typeof init === "number" ? { status: init } : init;
    let headers = new Headers(responseInit.headers);
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "text/html; charset=utf-8");
    }
    return new Response(content, {
        ...responseInit,
        headers,
    });
}
exports.html = html;
