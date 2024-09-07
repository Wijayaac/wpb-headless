
import { DeleteItemButton } from '@/components/cart/delete-item-button'
import { EditItemQuantityButton } from '@/components/cart/edit-item-quantity-button'
import Price from '@/components/price'
import { DEFAULT_OPTION } from '@/lib/constants'
import { getCart } from '@/lib/shopify'
import { Cart } from '@/lib/shopify/types'
import { createUrl } from '@/lib/utils'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import Checkout from '@/components/checkout'

export const runtime = 'edge'

export const metadata = {
  title: 'Card',
  description: 'Card for products in the store.'
}

type MerchandiseSearchParams = {
  [key: string]: string
}

export default async function CardPage() {
  const cartId = cookies().get('cartId')?.value
  let cart

  if (cartId) {
    cart = await getCart(cartId)
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-10 lg:px-10 lg:py-20">
      <div className="flex flex-row gap-10">
        <div className="flex-auto w-1/3">
          <CartList cart={cart} />
        </div>
        <div className="flex-auto w-1/2">
          <Checkout cart={cart} />
        </div>
      </div>
    </section>
  )
}

const CartList = ({ cart }: { cart: Cart | undefined }) => {
  return (
    <>
      {!cart || cart.lines.length === 0 ? (
        <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
          <ShoppingCartIcon className="h-16" />
          <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between overflow-hidden p-1">
          <ul className="flex-grow overflow-auto py-4">
            {cart.lines.map((item, i) => {
              const merchandiseSearchParams = {} as MerchandiseSearchParams

              item.merchandise.selectedOptions.forEach(({ name, value }) => {
                if (value !== DEFAULT_OPTION) {
                  merchandiseSearchParams[name.toLowerCase()] = value
                }
              })

              const merchandiseUrl = createUrl(
                `/product/${item.merchandise.product.handle}`,
                new URLSearchParams(merchandiseSearchParams)
              )

              return (
                <li
                  key={i}
                  className="flex w-full flex-col border-b border-neutral-300"
                >
                  <div className="relative flex w-full flex-row justify-between px-1 py-4">
                    <div className="absolute z-40 -mt-2 ml-[55px]">
                      <DeleteItemButton item={item} />
                    </div>
                    <Link
                      href={merchandiseUrl}
                      className="z-30 flex flex-row space-x-4"
                    >
                      <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                        <Image
                          className="h-full w-full object-cover"
                          width={64}
                          height={64}
                          alt={
                            item.merchandise.product.featuredImage.altText ||
                            item.merchandise.product.title
                          }
                          src={item.merchandise.product.featuredImage.url}
                        />
                      </div>

                      <div className="flex flex-1 flex-col text-base">
                        <span className="leading-tight">
                          {item.merchandise.product.title}
                        </span>
                        {item.merchandise.title !== DEFAULT_OPTION ? (
                          <p className="text-sm text-neutral-500">
                            {item.merchandise.title}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                    <div className="flex h-16 flex-col justify-between">
                      <Price
                        className="flex justify-end space-y-2 text-right text-sm"
                        amount={item.cost.totalAmount.amount}
                        currencyCode={item.cost.totalAmount.currencyCode}
                      />
                      <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
                        <EditItemQuantityButton item={item} type="minus" />
                        <p className="w-6 text-center">
                          <span className="w-full text-sm">{item.quantity}</span>
                        </p>
                        <EditItemQuantityButton item={item} type="plus" />
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

