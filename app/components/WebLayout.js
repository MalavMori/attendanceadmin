"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

const WebLayout = ({ children }) => {
  const { status, data } = useSession();
  const [alertbox, setAlertbox] = useState("");
  const [showNavbar, setshowNavbar] = useState(false);
  const router = useRouter();

  const isstatus = async () => {
    let chlocation = location.pathname;
    if (status === "authenticated") {
      setshowNavbar(true);

      if (chlocation == "/login") {
        router.replace("/");
      } else {
        router.replace(chlocation);
      }
      return true;
    } else {
      setshowNavbar(false);
      if (status === "unauthenticated") {
        router.replace("/login");
      }
      return false;
    }
  };
  useEffect(() => {
    isstatus();
  }, [status]);
  return (
    <>
      <div style={{ minHeight: "100vh", background: "rgb(238 238 238)" }}>
        {showNavbar && <Navbar />}
        <div style={{padding:"10px"}}>
        {children}
        </div>
      </div>
    </>
  );
};

export default WebLayout;
