"use client";
import { HomeScreen} from "@/components/Home";
import React, { PropsWithChildren } from "react";
import { QueryClientProvider, Hydrate, QueryClient } from "react-query";

interface AppProps {
  Component: React.FC<any>;
  pageProps: any;
}

export default function page() {
  return (
    <div>
       <QueryClientProvider client={queryClient}>
        <HomeScreen/>
    </QueryClientProvider>
    </div>
  );
}
const queryClient = new QueryClient();

