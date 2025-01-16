"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { GithubSvg } from "~/components/Atoms/GithubSvg";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function ContactModal({ open, setOpen }: Readonly<Props>) {
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-[10000] cursor-auto"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:size-10">
                <EnvelopeIcon
                  aria-hidden="true"
                  className="size-6 text-black"
                />
              </div>
              <div className="mt-3 flex flex-col items-center justify-center text-center sm:ml-4 sm:mt-0 sm:items-start sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Email
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    For any enquires you can reach me here:
                  </p>
                  <a
                    href="mailto:daniel.sadler123@gmail.com"
                    className="text-sm font-semibold text-gray-900"
                  >
                    daniel.sadler123@gmail.com
                  </a>
                </div>
                <div className="flex w-1/2 flex-col items-center justify-center gap-2 pt-2 sm:w-full sm:flex-row">
                  <a
                    href="https://github.com/DanielJSadler"
                    className="flex w-full flex-row items-center justify-start gap-1 text-sm font-semibold text-gray-900"
                  >
                    <GithubSvg />
                    Personal Github
                  </a>
                  <a
                    href="https://github.com/DanielSadler"
                    className="flex w-full flex-row items-center justify-start gap-1 text-sm font-semibold text-gray-900"
                  >
                    <GithubSvg />
                    Work Github
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
