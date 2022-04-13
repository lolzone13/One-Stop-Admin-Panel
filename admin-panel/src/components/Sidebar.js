import React, { useState } from "react";
import { Link } from "react-router-dom";



const Sidebar = () => {
  let loginBool = true;
  const [hamburger, setHamburger] = useState(false);

  const linkSidebar =
    "flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item";

  const linkDropdown =
    "flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item";


  return (
    <>
      <aside className="relative bg-sidebar  w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <Link
            to="index.html"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            SA ADMIN
          </Link>
        </div>
        {loginBool && (
          <nav className="text-white text-base font-semibold pt-3">
            <Link to={`https://intranet.iitg.ac.in/sa/admin/about`} className={linkSidebar}>
              About
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/announcements`} className={linkSidebar}>
              Announcements
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/achievements`} className={linkSidebar}>
              Achievements
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/forms`} className={linkSidebar}>
              Forms
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/gallery`} className={linkSidebar}>
              Gallery
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/sac`} className={linkSidebar}>
              SAC
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/events`} className={linkSidebar}>
              Events
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/navigation`} className={linkSidebar}>
              Navigation
            </Link>
            <Link
              to={`https://intranet.iitg.ac.in/sa/admin/scholarshipEditor`}
              className={linkSidebar}
            >
              Scholarships{`(R&O)`}
            </Link>
            <Link
              to={`https://intranet.iitg.ac.in/sa/admin/scholarshipLinks`}
              className={linkSidebar}
            >
              Scholarship Links{`(PDFs)`}
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/rules`} className={linkSidebar}>
              Rules
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/courses`} className={linkSidebar}>
              SA Courses
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/utilities`} className={linkSidebar}>
              Utilities
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/team`} className={linkSidebar}>
              Team
            </Link>
            <Link to={`https://intranet.iitg.ac.in/sa/admin/users`} className={linkSidebar}>
              Users
            </Link>
          </nav>
        )}
      </aside>

      <div className="relative w-full flex flex-col overflow-y-hidden">
        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2"></div>
          <div className="relative w-1/2 flex justify-end">
           
          </div>
        </header>

        <header className="w-full bg-sidebar py-5 px-6 sm:hidden">
          <div className="flex items-center justify-between">
            <Link
              to={`https://intranet.iitg.ac.in/sa/admin/`}
              className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            >
              Admin
            </Link>
            <button
              onClick={() => setHamburger(!hamburger)}
              className="text-white text-3xl focus:outline-none"
            >
              {hamburger ? "X" : "O"}
            </button>
          </div>

          <nav
            className={
              hamburger
                ? "flex flex flex-col pt-4"
                : "hidden flex flex-col pt-4"
            }
          >
            {loginBool && (
              <>
                <Link to={`https://intranet.iitg.ac.in/sa/admin/about`} className={linkDropdown}>
                  About
                </Link>
                <Link
                  to={`https://intranet.iitg.ac.in/sa/admin/announcements`}
                  className={linkDropdown}
                >
                  Announcements
                </Link>
                <Link
                  to={`https://intranet.iitg.ac.in/sa/admin/achievements`}
                  className={linkDropdown}
                >
                  Achievements
                </Link>
                <Link to={`https://intranet.iitg.ac.in/sa/admin/forms`} className={linkDropdown}>
                  Forms
                </Link>
                <Link to={`https://intranet.iitg.ac.in/sa/admin/gallery`} className={linkDropdown}>
                  Gallery
                </Link>
                <Link to={`https://intranet.iitg.ac.in/sa/admin/events`} className={linkDropdown}>
                  Events
                </Link>
                <Link
                  to={`https://intranet.iitg.ac.in/sa/admin/navigation`}
                  className={linkDropdown}
                >
                  Navigation
                </Link>
                <Link to={`https://intranet.iitg.ac.in/sa/admin/courses`} className={linkDropdown}>
                  SA Courses
                </Link>
                <Link
                  to={`https://intranet.iitg.ac.in/sa/admin/scholarshipEditor`}
                  className={linkDropdown}
                >
                  Scholarships{`(R&O)`}
                </Link>
                <Link
                  to={`https://intranet.iitg.ac.in/sa/admin/scholarshipLinks`}
                  className={linkDropdown}
                >
                  Scholarship Links{`(PDFs)`}
                </Link>
                <Link to={`https://intranet.iitg.ac.in/sa/admin/rules`} className={linkDropdown}>
                  Rules
                </Link>
                <Link
                  to={`https://intranet.iitg.ac.in/sa/admin/utilities`}
                  className={linkDropdown}
                >
                  Utilities
                </Link>
                <Link to={`https://intranet.iitg.ac.in/sa/admin/team`} className={linkDropdown}>
                  Teams
                </Link>
                <Link to={`https://intranet.iitg.ac.in/sa/admin/users`} className={linkDropdown}>
                  Users
                </Link>
              </>
            )}
            
          </nav>
        </header>
        <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow p-6">Hello</main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;