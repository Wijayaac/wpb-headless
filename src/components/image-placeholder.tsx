import Image from 'next/image'
export default function ImagePlaceholder() {
  return (
    <Image
      className="img-ratio"
      width={1920}
      height={1080}
      src="https://cdn.shopify.com/s/files/1/0720/9651/4343/files/asian-chicken-rub-100g-170744.jpg?v=1712092900"
      alt='Asian Chicken Rub 100g'
    />
  )
}