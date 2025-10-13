import { useRouter } from "next/router";

const useLayout = () => {
  const router = useRouter();

  const noLayoutRoutes = ["/", "/signup", "/signin"];
  const hasLayout = !noLayoutRoutes.includes(router.pathname);

  return hasLayout;
};

export default useLayout;
