import Link from 'next/link'

import FooterMenu from '@/components/layout/footer-menu'
import { getMenu } from '@/lib/shopify'
import ResponsiveImage from '../responsive-image'

const { COMPANY_NAME, SITE_NAME } = process.env

export default async function Footer() {
  const currentYear = new Date().getFullYear()
  const copyrightDate = 2000 + (currentYear > 2023 ? `-${currentYear}` : '')
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200'
  const menu = await getMenu('next-js-frontend-footer-menu')
  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  return (
    <footer className="text-sm text-black bg-pink">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link className="flex items-center gap-2 text-black md:pt-1" href="/">
            <div className="w-[160px]">
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
        <div className="flex flex-col gap-4">
          <p className="h4 font-medium">Find more</p>
          <nav className="flex flex-col gap-2 list-none">
            <li>
              <Link className="menu-link" href="/">Collections</Link>
            </li>
            <li>
              <Link className="menu-link" href="/">Summer Collections</Link>
            </li>
            <li>
              <Link className="menu-link" href="/">Shirt</Link>
            </li>
            <li>
              <Link className="menu-link" href="/">Dresses</Link>
            </li>
            <li>
              <Link className="menu-link" href="/">Top</Link>
            </li>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <p className="h4 font-medium">Supports</p>
          <nav className="flex flex-col gap-2 list-none">
            <li>
              <Link className="menu-link" href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link className="menu-link" href="/">Contact Us</Link>
            </li>
            <li>
              <Link className="menu-link" href="/">Shipping & Returns</Link>
            </li>
          </nav>
        </div>
        <div>
          <p>Phone : <a href="tel:+(0361) 733238">(0361) 733238</a></p>
          <p>Whatsapp : <a href="http://wa.me/6281338743611" target="_blank" rel="noopener noreferrer">+62 813-3874-3611</a></p>
          <p>Monday - Sunday | 9am - 5pm WITA</p>
          <br />
          <p>Kayu Jati No.1X Seminyak - Bali 80361</p>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl justify-center items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p className="text-xs">
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
