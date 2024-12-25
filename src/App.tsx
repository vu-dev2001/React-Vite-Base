import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Suspense, useMemo } from "react";
import { useRoutes } from "react-router-dom";

import routes from "~react-pages";

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);

  const dehydratedState = dehydrate(queryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default App;
