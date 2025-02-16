"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHydrated = void 0;
const react_1 = require("react");
let hydrating = true;
/**
 * Return a boolean indicating if the JS has been hydrated already.
 * When doing Server-Side Rendering, the result will always be false.
 * When doing Client-Side Rendering, the result will always be false on the
 * first render and true from then on. Even if a new component renders it will
 * always start with true.
 *
 * Example: Disable a button that needs JS to work.
 * ```tsx
 * let hydrated = useHydrated();
 * return (
 *   <button type="button" disabled={!hydrated} onClick={doSomethingCustom}>
 *     Click me
 *   </button>
 * );
 * ```
 */
function useHydrated() {
    let [hydrated, setHydrated] = react_1.useState(() => !hydrating);
    react_1.useEffect(() => {
        hydrating = false;
        setHydrated(true);
    }, []);
    return hydrated;
}
exports.useHydrated = useHydrated;
