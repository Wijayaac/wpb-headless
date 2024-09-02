import Image from 'next/image'
export default function ResponsiveImage({ isContain, src, alt = '' }) {
  return (
    <Image
      className={`img-ratio ${isContain ? 'object-contain' : 'object-cover'}`}
      width={1920}
      height={1080}
      src={src}
      alt={alt}
    />
  )
}