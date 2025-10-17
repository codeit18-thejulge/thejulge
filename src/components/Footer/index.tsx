import IcEnvelope from "@/assets/svgs/ic_envelope.svg";
import IcFacebook from "@/assets/svgs/ic_facebook.svg";
import IcInstagram from "@/assets/svgs/ic_instagram.svg";
import Link from "next/link";
import { cn } from "@/utils";

const Footer = () => {
  return (
    <footer className={cn("flex w-full justify-center bg-gray-20")}>
      <div
        className={cn(
          "grid w-full max-w-1028 grid-cols-2 items-center gap-40 px-20 pb-16 pt-32 tablet:grid-cols-3 tablet:p-32",
        )}
      >
        <div
          className={cn(
            "order-last col-span-2 text-12-regular text-gray-50 tablet:order-1 tablet:col-span-1 tablet:text-16-regular",
          )}
        >
          ©codeit - 2023
        </div>
        <nav aria-label="footer links" className={cn("col-span-1 tablet:order-2")}>
          <ul
            className={cn(
              "flex justify-start gap-30 text-14-regular text-gray-50 tablet:justify-center tablet:text-16-regular",
            )}
          >
            <li>
              <Link href="">Privacy Policy</Link>
            </li>
            <li>
              <Link href="">FAQ</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="social links" className={cn("col-span-1 tablet:order-3")}>
          <ul className={cn("flex items-center justify-end gap-10 text-gray-40")}>
            <li className="hover:text-gray-50">
              <Link href="" aria-label="contact email">
                <IcEnvelope className="w-24" />
              </Link>
            </li>
            <li className="hover:text-gray-50">
              <Link
                href="https://www.facebook.com/"
                aria-label="go to facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IcFacebook className="w-24" />
              </Link>
            </li>
            <li className="hover:text-gray-50">
              <Link
                href="https://www.instagram.com/"
                aria-label="go to instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IcInstagram className="w-24" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
