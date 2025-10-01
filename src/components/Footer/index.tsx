import IcEnvelope from "@/assets/svgs/ic_envelope.svg";
import IcFacebook from "@/assets/svgs/ic_facebook.svg";
import IcInstagram from "@/assets/svgs/ic_instagram.svg";
import Link from "next/link";
import { cn } from "@/utils";

const Footer = () => {
  return (
    <footer className={cn("w-full flex justify-center bg-gray-20")}>
      <div
        className={cn(
          "w-full max-w-1028 px-20 pt-32 pb-16 tablet:p-32 grid grid-cols-2 tablet:grid-cols-3 gap-40 items-center",
        )}
      >
        <div
          className={cn(
            "text-12-regular tablet:text-16-regular text-gray-50 col-span-2 tablet:col-span-1 order-last tablet:order-1",
          )}
        >
          ©codeit - 2023
        </div>
        <nav aria-label="footer links" className={cn("col-span-1 tablet:order-2")}>
          <ul
            className={cn(
              "text-gray-50 flex justify-start tablet:justify-center gap-30 text-14-regular tablet:text-16-regular",
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
