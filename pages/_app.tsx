import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import Layout from "@/components/TabLayout/TabLayout";
import { theme } from "@/ui";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  </Layout>
);

export default App;
