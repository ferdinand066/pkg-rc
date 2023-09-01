"use client";

import { classJoin } from "@/lib/utils";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { Fragment } from "react";

type NavigationMenu = {
  name: string,
  redirect: string,
};

const navigation: NavigationMenu[] = [
  {
    name: "Home",
    redirect: "/",
  },
  {
    name: "Create Booking",
    redirect: "/booking",
  },
  {
    name: "Confirm Booking",
    redirect: "/confirm-booking",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const queryClient = new QueryClient();

export default function Navbar({ children, title }: any) {
  const pathname = usePathname();
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-start w-full">
        <Disclosure as="nav" className="w-full bg-white shadow">
          {({ open }) => (
            <>
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex items-center flex-shrink-0 text-lg font-bold">
                      PKG RC
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                      {navigation.map((item, index) => (
                        <Link
                          href={item.redirect}
                          key={index}
                          className={classJoin(
                            "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                            pathname === item.redirect
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="w-8 h-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                  <div className="flex items-center -mr-2 sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                  {navigation.map((item, index) => (
                    <Link href={item.redirect} key={index}>
                      <span
                        className={classJoin(
                          "block py-2 pl-3 pr-4 text-base font-medium border-l-4",
                          pathname === item.redirect
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                        )}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        Tom Cook
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        tom@example.com
                      </div>
                    </div>
                    <button className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className="flex flex-col w-full p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
          <div className="text-xl font-semibold">{title}</div>
          {children}
        </div>
      </div>
    </QueryClientProvider>
  );
}
