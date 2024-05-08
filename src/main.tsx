import React, { Suspense, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import axios, { AxiosContext } from "./api/axios";

import "./index.css";
import App from "./App";
import SuspendFallbackLoading from "./pages/layout/suspendFallbackLoading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  },
});

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => {
    return axios;
  }, []);

  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <AxiosProvider>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Suspense fallback={<SuspendFallbackLoading />}>
          <App />
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  </AxiosProvider>
);
