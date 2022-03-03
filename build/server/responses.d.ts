/// <reference types="node" />
import { JsonValue } from "type-fest";
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
export declare function json<Data extends JsonValue>(data: Data, init?: number | ResponseInit): Response;
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
export declare function redirectBack(request: Request, { fallback, ...init }: ResponseInit & {
    fallback: string;
}): Response;
/**
 * Create a response receiving a JSON object with the status code 400.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   let user = await getUser(request);
 *   throw badRequest<BoundaryData>({ user });
 * }
 */
export declare function badRequest<Data = unknown>(data: Data, init?: Omit<ResponseInit, "status">): Response;
/**
 * Create a response receiving a JSON object with the status code 401.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   let user = await getUser(request);
 *   throw unauthorized<BoundaryData>({ user });
 * }
 */
export declare function unauthorized<Data = unknown>(data: Data, init?: Omit<ResponseInit, "status">): Response;
/**
 * Create a response receiving a JSON object with the status code 403.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   let user = await getUser(request);
 *   if (!user.idAdmin) throw forbidden<BoundaryData>({ user });
 * }
 */
export declare function forbidden<Data = unknown>(data: Data, init?: Omit<ResponseInit, "status">): Response;
/**
 * Create a response receiving a JSON object with the status code 404.
 * @example
 * export let loader: LoaderFunction = async ({ request, params }) => {
 *   let user = await getUser(request);
 *   if (!db.exists(params.id)) throw notFound<BoundaryData>({ user });
 * }
 */
export declare function notFound<Data = unknown>(data: Data, init?: Omit<ResponseInit, "status">): Response;
/**
 * Create a response receiving a JSON object with the status code 422.
 * @example
 * export let loader: LoaderFunction = async ({ request, params }) => {
 *   let user = await getUser(request);
 *   throw unprocessableEntity<BoundaryData>({ user });
 * }
 */
export declare function unprocessableEntity<Data = unknown>(data: Data, init?: Omit<ResponseInit, "status">): Response;
/**
 * Create a response receiving a JSON object with the status code 500.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   let user = await getUser(request);
 *   throw serverError<BoundaryData>({ user });
 * }
 */
export declare function serverError<Data = unknown>(data: Data, init?: Omit<ResponseInit, "status">): Response;
/**
 * Create a response with only the status 304 and optional headers.
 * This is useful when trying to implement conditional responses based on Etags.
 * @example
 * export let loader: LoaderFunction = async ({ request }) => {
 *   return notModified();
 * }
 */
export declare function notModified(init?: Omit<ResponseInit, "status">): Response;
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
export declare function javascript(content: string, init?: number | ResponseInit): Response;
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
export declare function stylesheet(content: string, init?: number | ResponseInit): Response;
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
export declare function pdf(content: Blob | Buffer | ArrayBuffer, init?: number | ResponseInit): Response;
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
export declare function html(content: string, init?: number | ResponseInit): Response;
