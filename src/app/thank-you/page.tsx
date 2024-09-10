import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          Thank You for Your Order!
        </h1>
        <p className="text-sm text-gray-600">
          We appreciate your inquiry and are excited to help you with your order.
        </p>
        <p className=" text-sm text-gray-600">
          You will receive a confirmation email shortly with your order details.
        </p>
        <div className="mt-8">
          <Link href="/" className="button">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
