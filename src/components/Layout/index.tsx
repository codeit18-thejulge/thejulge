import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="m-auto flex-1 px-12 py-40 tablet:px-32 tablet:py-60">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
