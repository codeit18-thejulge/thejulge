import { useRouter } from "next/router";

const useLayout = () => {
  const router = useRouter();

  const noLayoutRoutes = ["/signup", "/signin"];
  const hasLayout = !noLayoutRoutes.some((path) => router.pathname.startsWith(path));

  return hasLayout;
};

export default useLayout;
