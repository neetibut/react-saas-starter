import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { JSX } from "react";

export default function RootLayout(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
