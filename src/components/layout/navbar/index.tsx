import Cart from '@/components/cart'
import OpenCart from '@/components/cart/open-cart'
import LogoSquare from '@/components/logo-square'
import { getMenu } from '@/lib/shopify'
import { Menu } from '@/lib/shopify/types'
import Link from 'next/link'
import { Suspense } from 'react'
import MobileMenu from '@/components/layout/navbar/mobile-menu'
import Search from '@/components/layout/navbar/search'
import ResponsiveImage from '@/components/responsive-image'
const { SITE_NAME } = process.env

export default async function Navbar() {
  const menu = await getMenu('main-menu')

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="flex p-1 items-center justify-center text-center shadow-small">
        <p className='body-small font-normal'>Free shipping available on all orders!</p>
      </div>
      <nav className="relative flex gap-4 items-center md:flex-col justify-between py-2 px-4 lg:px-6 shadow-small">
        <div className="block flex-none md:hidden">
          <Suspense>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/4">
            <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
              <div className="w-[50px]">
                <div className="square-ratio">
                  <ResponsiveImage
                    src="/logo.png"
                    isContain={true}
                    alt="White Peacock Logo"
                  />
                </div>
              </div>
            </Link>

          </div>
          <div className="hidden justify-center md:flex md:w-2/4">
            {menu.length ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="flex justify-end md:w-1/4">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </div>
  )
}
