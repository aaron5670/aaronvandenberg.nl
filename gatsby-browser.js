
import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider

export const onServiceWorkerUpdateReady = () => window.location.reload(true);
