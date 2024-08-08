import Image from 'next/image'
export default function ResponsiveImage({ src, alt = '' }) {
  return (
    <Image
      className="img-ratio"
      width={1920}
      height={1080}
      src={src}
      alt={alt}
    />
  )
}