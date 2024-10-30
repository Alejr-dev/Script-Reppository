"use client";

import DataObjectIcon from "@mui/icons-material/DataObject";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="poppins">
      <Navbar />
      <CTASection />
      <div className="w-full flex justify-center items-center mt-10">
        <Image
          src={"/app.png"}
          alt="dashboard"
          width={900}
          height={400}
          className="shadow-xl aspect-auto sm:w-auto w-[398px] rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        />
      </div>
      <div className="mt-20 mb-4 text-center"> 
        <span className="text-sm text-gray-500">
          © {new Date().getFullYear()} YvagaCore. Todos los derechos reservados.
        </span>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
      <Logo />
      <Buttons />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <div className={`bg-[#0083bb] p-[6px] rounded-md`}>
        <DataObjectIcon sx={{ fontSize: 27, color: "white" }} />
      </div>
      <div className="flex gap-1 text-[19px]">
        <span className={`font-bold text-[#0083bb]`}>Script</span>
        <span className="text-slate-600">Repository</span>
      </div>
    </div>
  );
}

function Buttons() {
  const { userId } = useAuth();
  return (
    <div className="max-sm:w-full">
      {userId ? (
        <Link href="/my-notes">
          <button
            className={`max-sm:w-full bg-[#0083bb] p-[8px] px-6 text-sm text-white rounded-md`}
          >
            Access To The App
          </button>
        </Link>
      ) : (
        <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
          <button
            className={`max-sm:w-full bg-[#0083bb] p-[8px] px-6 text-sm text-white rounded-md`}
          >
            <Link href="/sign-in"> Sign In</Link>
          </button>

          <Link href="/sign-up">
            <button
              className={`max-sm:w-full text-sm border border-[#0083bb] text-[#0083bb] 
      hover:bg-[#0083bb] hover:text-white p-[8px] px-6 rounded-md`}
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

function CTASection() {
  const { userId } = useAuth();

  return (
    <div className="flex flex-col mx-16 items-center mt-[120px] gap-6">
      <h2 className="font-bold text-2xl text-center">
        <span style={{ color: '#7a8b90' }}>Organize Your Code Snippets</span>
        <span className="text-[#0083bb] block text-left"> Organized!</span>
      </h2>

      <p className="text-center text-sm w-[450px] max-sm:w-full text-slate-500">
        Harness the power of our cutting-edge tagging and search capabilities. Effortlessly discover the
        exact snippet you need at the perfect moment. Spend less time hunting for code and more time
        crafting your masterpiece.
      </p>

      {userId ? (
        <Link href="/my-notes">
          <button
            className={`block px-9 py-3 text-sm font-medium text-white transition focus:outline-none rounded-md`}
            style={{ backgroundColor: '#0083bb' }}
            type="button"
          >
            {`Let's get started!`}
          </button>
        </Link>
      ) : (
        <Link href="/sign-in">
          <button
            className={`block px-9 py-3 text-sm font-medium text-white transition focus:outline-none rounded-md`}
            style={{ backgroundColor: '#0083bb' }}
            type="button"
          >
            {`Let's get started!`}
          </button>
        </Link>
      )}
    </div>
  );
}
