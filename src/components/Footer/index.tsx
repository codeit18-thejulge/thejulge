import IcEnvelope from "@/assets/svgs/ic_envelope.svg";
import IcFacebook from "@/assets/svgs/ic_facebook.svg";
import IcInstagram from "@/assets/svgs/ic_instagram.svg";
import Link from "next/link";
import { cn } from "@/utils";

const Footer = () => {
  return (
    <footer className={cn("flex w-full justify-center bg-gray-20 text-gray-50")}>
      <div className={cn("w-full max-w-1028 px-20 py-32 tablet:px-3")}>
        <div className="mb-32 text-center tablet:text-left">
          <p className="text-12-regular text-gray-50 tablet:text-14-regular">©codeit - 2023</p>
        </div>

        <div className="mb-32 h-1 bg-gray-30"></div>

        <div className={cn("flex flex-col gap-32 tablet:flex-row tablet:justify-between")}>
          <div className="flex flex-col gap-32 tablet:flex-row">
            <nav aria-label="useful links">
              <h3 className="text-12-bold text-gray-60 mb-12">USEFUL LINKS</h3>
              <ul className="flex flex-col gap-8 text-12-regular">
                <li>
                  <Link href="/#hero-section" className="hover:text-gray-80 text-gray-50 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#howworks" className="hover:text-gray-80 text-gray-50 transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="/#reason" className="hover:text-gray-80 text-gray-50 transition-colors">
                    Why Choose Us
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="hover:text-gray-80 text-gray-50 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-gray-80 text-gray-50 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="footer links">
              <h3 className="text-12-bold text-gray-60 mb-12">SUPPORT</h3>
              <ul className="flex flex-col gap-8 text-12-regular">
                <li>
                  <Link href="" className="hover:text-gray-80 text-gray-50 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <ul className="flex gap-16 text-gray-40 tablet:justify-end">
            <li className="transition-colors hover:text-gray-50">
              <Link href="" aria-label="contact email">
                <IcEnvelope className="h-24 w-24" />
              </Link>
            </li>
            <li className="transition-colors hover:text-gray-50">
              <Link
                href="https://www.facebook.com/"
                aria-label="go to facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IcFacebook className="h-24 w-24" />
              </Link>
            </li>
            <li className="transition-colors hover:text-gray-50">
              <Link
                href="https://www.instagram.com/"
                aria-label="go to instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IcInstagram className="h-24 w-24" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
