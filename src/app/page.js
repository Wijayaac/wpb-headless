import { Carousel } from "@/components/carousel";
import { GridTileImage } from "@/components/grid/tile";
import { getCollectionProducts } from "@/lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import ImagePlaceholder from "@/components/image-placeholder";
import ResponsiveImage from "@/components/responsive-image";

function HomeCollection({ item, size, priority }) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          alt={item.title}
          priority={priority}
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
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

function BannerLogo() {
  return (
    <section className="container py-10">
      <div className="flex h-full items-center justify-center gap-4">
        <p className="text-3xl">White</p>
        <div className="w-[150px]">
          <div className="square-ratio">
            <ResponsiveImage src="/logo.png" alt="White Peacock Logo" />
          </div>
        </div>
        <p className="text-3xl">Peacock</p>
      </div>
    </section>
  );
}

function BannerHero() {
  return (
    <section className="relative flex w-full h-full min-h-[400px] md:h-min-[640px] items-center justify-center">
      <ImagePlaceholder />
      <div className="bg-black w-full h-full absolute inset-0 opacity-50"></div>
      <div className="flex flex-col h-full-w-full items-center justify-center text-center gap-2.5 relative z-20 px-8 text-white">
        <h1 className="h0">Industrial design meets fashion</h1>
        <p>Atypical leather goods</p>
        <Link
          href="/products"
          title="Product page"
          className="button button-outline"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

function FullImage({ src, alt }) {
  return (
    <div className="normal-ratio">
      <ResponsiveImage src={src} alt={alt} />
    </div>
  );
}

function MediaText({ src, alt, link, children }) {
  return (
    <section className="container py-10 md:py-20">
      <div className="grid md:grid-cols-3 grid-cols-2">
        <div className="md:col-span-2">
          <div className="square-ratio">
            <ResponsiveImage src={src} alt={alt} />
          </div>
        </div>
        <div className="flex flex-col w-full h-full items-center justify-center px-6 md:px-20 gap-4 border border-black">
          <p className="text-base text-center">{children}</p>
          <Link href={link} title="Product page" className="link-outline">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeProductGrid(collection) {
  const { products } = collection;

  return (
    <section className="container py-10 md:py-20">
      <div className="text-center mb-10">
        <h2 className="font-bold text-2xl">Featured Collection</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products &&
          products.map((product) => (
            <Link
              key={product.id}
              className="relative block aspect-square h-full w-full"
              href={`/product/${product.handle}`}
            >
              <GridTileImage
                src={product.featuredImage.url}
                fill
                alt={product.title}
                sizes="(min-width: 768px) 33vw, 100vw"
                label={{
                  position: "top",
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currency: product.priceRange.maxVariantPrice.currencyCode,
                }}
              />
            </Link>
          ))}
      </div>
    </section>
  );
}

export default async function Home() {
  const homepageItems = await getCollectionProducts({
    collection: "frontpage",
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) {
    return null;
  }

  const [firstItem, secondItem, thirdItem] = homepageItems;

  return (
    <>
      <BannerLogo />
      <FullImage src="/full-img-1.jpg" alt="Banner 1" />
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
        {/* TODO: sale product collection refactor */}
        <HomeCollection item={firstItem} size="full" priority={true} />
        <HomeCollection item={secondItem} size="half" priority={true} />
        <HomeCollection item={thirdItem} size="half" />
      </section>
      <MediaText src="/text-media-1.jpg" alt="Text media 1" link="/shirt">
        Pair text with an image to focus on your chosen product, collection, or
        blog post. Add details on availability, style, or even provide a review.
      </MediaText>
      <Suspense>
        <HomeProductGrid products={homepageItems} />
      </Suspense>
      <section>
        <Suspense>
          <Carousel />
        </Suspense>
      </section>
    </>
  );
}
