import { Carousel } from "@/components/carousel";
import { GridTileImage } from "@/components/grid/tile";
import { getCollectionProducts } from "@/lib/shopify";
import Link from "next/link";
import { Suspense } from "react";

function HomeCollection({ item, size, priority }) {
  return (
    <div className={size === "full" ? "md:col-span-4 md:row-span-2" : "md:col-span-2 md:row-span-1"}>
      <Link className='relative block aspect-square h-full w-full' href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          fill
          alt={item.title}
          priority={priority}
          sizes={size === "full" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          label={{
            position: size === "full" ? "center" : "top",
            title: item.title,
            amount: item.priceRange.maxVariantPrice.amount,
            currency: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export default async function Home() {
  const homepageItems = await getCollectionProducts({ collection: "selected-collection" });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) {
    return null;
  }

  const [firstItem, secondItem, thirdItem] = homepageItems;

  return (
    <>
      <section className='mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2'>
        {/* TODO: sale product collection refactor */}
        <HomeCollection item={firstItem} size='full' priority={true} />
        <HomeCollection item={secondItem} size='half' priority={true} />
        <HomeCollection item={thirdItem} size='half' />
      </section>
      <Suspense>
        <Carousel />
      </Suspense>
    </>
  );
}
