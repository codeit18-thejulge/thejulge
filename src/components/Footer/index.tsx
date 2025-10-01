import IcEnvelope from "@/assets/svgs/ic_envelope.svg";
import IcFacebook from "@/assets/svgs/ic_facebook.svg";
import IcInstagram from "@/assets/svgs/ic_instagram.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer w-full flex justify-center">
      <div className="footer-container w-full desktop:max-w-1028 px-20 pt-32 pb-16 tablet:p-32 bg-gray-20 grid grid-cols-2 tablet:grid-cols-3 gap-40 items-center">
        <div className="copyright text-12-regular tablet:text-16-regular text-gray-50 col-span-2 tablet:col-span-1 order-last tablet:order-1">
          ©codeit - 2023
        </div>
        <div className="links col-span-1 tablet:order-2">
          <ul className="flex gap-30 text-14-regular tablet:text-16-regular text-gray-50">
            <li>
              <Link href="" aria-label="Privacy Policy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="" aria-label="FAQ">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="socials col-span-1 tablet:order-3">
          <ul className="flex items-center justify-end gap-10 text-gray-40">
            <li className="hover:text-gray-50">
              <Link href="" aria-label="email">
                <IcEnvelope className="w-24" />
              </Link>
            </li>
            <li className="hover:text-gray-50">
              <Link href="https://www.facebook.com/" target="_blank" aria-label="facebook">
                <IcFacebook className="w-24" />
              </Link>
            </li>
            <li className="hover:text-gray-50">
              <Link href="https://www.instagram.com/" target="_blank" aria-label="instagram">
                <IcInstagram className="w-24" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
