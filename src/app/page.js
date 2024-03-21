import { shopifyFetch } from "@/utils/shopify";
import Image from "next/image";

// TODO refactor to query utils
export async function getAllProducts() {
  return shopifyFetch({
    query: `{
			products(first: 12) {
				edges {
					node {
						id
						title
						handle
						description
						images(first: 1) {
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
					}
				}
			}
		}
		`,
  });
}

// TODO: refactor to query utils
export async function getHomeCollection() {
  return shopifyFetch({
    query: `{
			collectionByHandle(handle: "sale") {
				products(first: 3) {
					edges {
						node {
							id
							title
							handle
							images(first: 1) {
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
						}
					}
				}
			}
		}
		`,
  });
}

export default async function Home() {
  const {
    body: {
      data: { products },
    },
  } = await getAllProducts();

  const {
    body: {
      data: {
        collectionByHandle: { products: homeCollection },
      },
    },
  } = await getHomeCollection();
  console.log(homeCollection);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between px-8'>
      <div className='grid md:grid-cols-5 md:grid-rows-4 gap-4 md:my-10'>
        {/* TODO: sale product collection refactor */}
        {homeCollection &&
          homeCollection.edges.map(({ node }, idx) => (
            <div
              key={node.id}
              className={`relative group overflow-hidden rounded-xl ${idx === 0 ? "md:col-span-3 md:row-span-4" : "md:col-span-2 md:row-span-2 md:col-start-4"} ${
                idx === homeCollection.length - 1 ? "md:row-start-3" : ""
              } transition duration-300 ease-in-out border dark:border-black hover:border-blue-300`}>
              <Image className='relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105' src={node.images?.edges[0]?.node?.originalSrc} alt={node.images?.edges[0]?.node.altText} width={1080} height={1080} />
              <div className={`absolute ml-2 p-2 bottom-0 left-0 dark:bg-black rounded-full ${idx === 0 ? "md:mb-[50%]" : "md:mb-10"} mb-4`}>
                <div className='flex md:gap-2 items-center'>
                  <p className='text-xs md:text-sm pl-2'>{node.title}</p>
                  <p className='flex items-center justify-center gap-1 bg-blue-500 rounded-full px-2 py-1 min-w-[80px] md:text-sm'>
                    {node.priceRange.minVariantPrice.amount} <span className='text-[10px]'>{node.priceRange.minVariantPrice.currencyCode}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* TODO: refactor to component */}
      <div className='flex flex-wrap flex md:my-20 my-10'>
        {products &&
          products.edges.map(({ node }) => (
            <div key={node.id} className='md:basis-1/3 my-2 px-2'>
              <div className='relative group rounded-xl overflow-hidden border border-black hover:border-blue-400'>
                <Image
                  className='w-full h-full relative object-cover transition duration-300 ease-in-out group-hover:scale-105 group'
                  src={node.images?.edges[0]?.node?.originalSrc}
                  alt={node.images?.edges[0]?.node.altText}
                  width={480}
                  height={480}
                />
                <div className='absolute mb-4 mx-2 bottom-0 left-0 dark:bg-black rounded-full'>
                  <div className='flex items-center gap-2 p-2'>
                    <p className='text-xs md:text-sm pl-2'>{node.title}</p>
                    <p className='flex items-center justify-center gap-1 md:text-sm h-full bg-blue-500 px-2 py-1 rounded-full min-w-[80px] grow'>
                      {node.priceRange.minVariantPrice.amount} <span className='text text-[10px]'>{node.priceRange.minVariantPrice.currencyCode}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
