"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyParser = void 0;
exports.bodyParser = {
    /**
     * Parse the body of a Request to an string.
     * @example
     * async function action({ request }: ActionArgs): Promise<ActionReturn> {
     *  const body = await bodyParser.toString(request);
     *  await doSomething(body);
     *  return redirect("/target");
     * }
     */
    async toString(request) {
        return request.text();
    },
    /**
     * Parse the body of a Request to an URLSearchParams instance.
     * @deprecated Use `request.formData()`
     * @example
     * async function action({ request }: ActionArgs): Promise<ActionReturn> {
     *  const body = await bodyParser.toSearchParams(request);
     *  await doSomething(body);
     *  return redirect("/target");
     * }
     */
    async toSearchParams(request) {
        let body = await this.toString(request);
        return new URLSearchParams(body);
    },
    /**
     * Parse the body of a Request to a JSON object.
     *
     * The result is an unknown type since it's not possible to know the type of
     * the object and the properties it will have after parsed from the body.
     *
     * You are encouraged to validate the result before using it.
     * @example
     * async function action({ request }: ActionArgs): Promise<ActionReturn> {
     *   const params = await bodyParser.toJSON(request);
     *   await doSomething(params);
     *   return redirect("/target");
     * }
     */
    async toJSON(request) {
        if (request.headers.get("Content-Type") === "application/json") {
            return request.json();
        }
        let params = await this.toSearchParams(request);
        return Object.fromEntries(params.entries());
    },
};
