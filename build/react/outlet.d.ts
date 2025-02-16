/// <reference types="react" />
declare type OutletProps<Data> = {
    data?: Data;
};
/**
 * Wrapper of the React Router Outlet component. This Outlet receives an
 * optional `data` prop and wraps the Remix Outlet in a React Context passing
 * this data as value.
 *
 * ```tsx
 * let data = useLoaderData(); // get data from the current route
 * return <Outlet data={data} /> // pass data to the Outlet
 * ```
 *
 * @deprecated Use the Outlet component from Remix.
 */
export declare function Outlet<Data = unknown>({ data }: OutletProps<Data>): JSX.Element;
/**
 * Get the data from the parent data. This needs to be rendered in a route with
 * a parent router rendering the Outlet component of Remix Utils.
 * ```tsx
 * let loaderData = useLoaderData(); // get data from the loader
 * let parentData = useParentData(); // get data from the parent
 * ```
 * @deprecated Use the useOutletContext Hook from Remix.
 */
export declare function useParentData<ParentData>(): ParentData;
export {};
