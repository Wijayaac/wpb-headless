'use client'

import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

import { Bars3Icon, XMarkIcon, ArrowRightIcon, UserIcon } from '@heroicons/react/24/outline'
import { Menu } from '@/lib/shopify/types'
import LogoFacebook from '@/components/icons/facebook'
import LogoTwitter from '@/components/icons/twitter'
import LogoInstagram from '@/components/icons/instagram'
import LogoTiktok from '@/components/icons/tiktok'
import LogoYoutube from '@/components/icons/youtube'

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const openMobileMenu = () => setIsOpen(true)
  const closeMobileMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  // useEffect(() => {
  //   setIsOpen(false)
  // }, [pathname, searchParams])

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden"
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex justify-between h-full w-full flex-col bg-white">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>
                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu) => (
                      <li
                        className="py-2 mb-2 relative text-xl text-black transition-colors hover:text-neutral-500"
                        key={item.title}
                      >
                        <Link href={item.path} onClick={closeMobileMenu}>
                          {item.title}
                        </Link>
                        {item.submenu?.length ? (
                          <SubMenuMobile item={item} />
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="bg-slate-100 p-4 gap-6 flex flex-col justify-between">
                <Link href="/account/login" className="inline-flex">
                  <UserIcon className="h-6 text-body" />
                  <span className="ml-2 body text-body">Log in</span>
                </Link>
                <ul className="flex gap-2">
                  <li>
                    <Link href="/account/register" className="text-body">
                      <LogoTwitter className='w-10 h-auto' />
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/register" className="text-body">
                      <LogoFacebook className='w-10 h-auto' />
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/register" className="text-body">
                      <LogoInstagram className='w-10 h-auto' />
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/register" className="text-body">
                      <LogoTiktok className='w-10 h-auto' />
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/register" className="text-body">
                      <LogoYoutube className='w-10 h-auto' />
                    </Link>
                  </li>
                </ul>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog >
      </Transition >
    </>
  )
}

function SubMenuMobile({ item }: { item: Menu }) {
  const [isOpen, setIsOpen] = useState(false)
  const openSubMenu = () => setIsOpen(true)
  const closeSubMenu = () => setIsOpen(false)
  return (
    <>
      <button
        aria-label="Open sub menu"
        className="flex h-11 w-11 absolute right-2 top-0 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden"
        onClick={openSubMenu}>
        <ArrowRightIcon className="h-5 text-slate-500" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeSubMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
                  onClick={closeSubMenu}
                  aria-label="Close sub menu"
                >
                  <XMarkIcon className="h-6" />
                </button>
                <ul className="flex flex-col">
                  {item.submenu.map((subitem: Menu) => (
                    <li
                      className="py-2 px-4 text-sm text-black transition-colors hover:text-neutral-500"
                      key={subitem.title}
                    >
                      <Link href={subitem.path}>{subitem.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog >
      </Transition >
    </>
  )
}
