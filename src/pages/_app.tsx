import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import useLayout from "@/hooks/useLayout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const hasLayout = useLayout();

  const pageElement = <Component {...pageProps} />;
  const content = hasLayout ? <Layout>{pageElement}</Layout> : pageElement;

  return <QueryClientProvider client={queryClient}>{content}</QueryClientProvider>;
}
