import { AddToCart } from "@/components/cart/add-to-cart";
import VariantButton from "@/components/ui/variant-button";
import { shopifyFetch } from "@/lib/shopify";
import Image from "next/image";

export async function getProduct(handle) {
  return shopifyFetch({
    query: `{
			product(handle: "${handle}") {
				id
				title
				handle
				description
				images(first: 10) {
					edges {
						node {
							originalSrc
							altText
						}
					}
				}
				priceRange {
					minVariantPrice {
						amount
						currencyCode
					}
				}
				variants(first: 10) {
					edges {
						node {
							title
							id
							availableForSale
							selectedOptions {
								name
								value
							}
							price {
								amount
								currencyCode
							}
						}
					}
				}
			}
		}
		`,
  });
}
export default async function Page({ params }) {
  const {
    body: {
      data: { product },
    },
  } = await getProduct(params.handle);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between md:px-8 px-4'>
      {product ? (
        <div className='md:my-10'>
          <div className='flex md:flex-row flex-col'>
            {/* TODO: create gallery */}
            {/* TODO: convert this into next Image, since we need to create a wrapper for this to work on */}
            <div className='flex md:basis-2/3 w-full overflow-x-scroll'>
              {product.images.edges.map((image) => (
                <img key={image.node?.originalSrc} src={image.node?.originalSrc} alt={image.node?.altText} width={1080} height={1080} />
              ))}
            </div>
            <div className='md:basis-1/3 flex w-full flex-col md:pl-8'>
              <h1 className='text-3xl font-bold mb-2'>{product.title}</h1>
              <p className='my-4'>
                <span className='inline-flex items-center font-medium p-2 bg-blue-400 rounded-full'>
                  {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                </span>
              </p>
              {/* TODO: Create variant selector */}
              {product.variants.edges.length > 1 && (
                <div className='my-2'>
                  <p>Stock Type</p>
                  <div className='flex gap-2 my-2'>
                    {/* TODO: handle not available stock variant */}
                    {product.variants &&
                      product.variants.edges.map((variant) => (
                        <VariantButton key={variant.node.id} variant={variant}>
                          {variant.node.title}
                        </VariantButton>
                      ))}
                  </div>
                </div>
              )}
              {/* TODO: add to cart function */}
              <AddToCart variants={product.variants?.edges} availableForSale={true} />
              <p className='mt-8'>{product.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1>No product found</h1>
      )}
    </main>
  );
}
