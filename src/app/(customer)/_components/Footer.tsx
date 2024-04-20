import Link from "next/link";
import {
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
  FaFileContract,
  FaQuestion,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdPrivacyTip, MdPlace } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="flex flex-col p-12 items-center gap-y-12 bg-primary text-primary-foreground/75 text-sm">
      <div className="flex justify-evenly w-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Customer</h3>
          <div className="flex flex-col gap-y-2">
            <Link href={"/payment-method"}>Payment Method</Link>
            <Link href={"/terms-and-conditions"}>Terms and Conditions</Link>
            <Link href={"/privacy-policy"}>Privacy Policy</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Company</h3>
          <div className="flex flex-col gap-y-2">
            <Link href={"/about-us"}>About Us</Link>
            <Link href={"/contact-us"}>Contact Us</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Social Network</h3>
          <div className="flex gap-x-2">
            <Link
              href={"/https://www.instagram.com/ares_gym27/"}
              target="_blank"
            >
              <FaInstagram size={30} />
            </Link>
            {/* <Link href={"/terms-and-conditions"}>Contact Us</Link> */}
          </div>
        </div>
      </div>

      <p>
        © 2024 Ares Nutrition. All rights reserved. Made with pride in Algeria.
      </p>
    </footer>
  );
}
