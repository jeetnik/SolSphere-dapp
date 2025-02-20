import Link from "next/link";
import React from "react";
import { SiSolana } from "react-icons/si";

export default function Footer() {
  return (
    <footer className=" bottom-0 w-full text-white flex justify-center items-center py-4">
      <Link href={"https://github.com/jeetnik"}><SiSolana size={30} /></Link>
    </footer>
  );
}
