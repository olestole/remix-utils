"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientOnly = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const use_hydrated_1 = require("./use-hydrated");
/**
 * Render the children only after the JS has loaded client-side. Use an optional
 * fallback component if the JS is not yet loaded.
 *
 * Example: Render a Chart component if JS loads, renders a simple FakeChart
 * component server-side or if there is no JS. The FakeChart can have only the
 * UI without the behavior or be a loading spinner or skeleton.
 * ```tsx
 * return (
 *   <ClientOnly fallback={<FakeChart />}>
 *     {() => <Chart />}
 *   </ClientOnly>
 * );
 * ```
 */
function ClientOnly({ children, fallback = null }) {
    if (typeof children !== "function") {
        console.warn("[remix-utils] ClientOnly: Pass a function as children to avoid issues with client-only imported components");
    }
    const hydrated = use_hydrated_1.useHydrated();
    return hydrated ? (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: typeof children === "function" ? children() : children }, void 0)) : (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: fallback }, void 0));
}
exports.ClientOnly = ClientOnly;
