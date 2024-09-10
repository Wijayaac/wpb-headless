'use client'

import Price from '@/components/price'
import { Cart, Product } from '@/lib/shopify/types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

const australianStates = [
  { value: '', label: 'Select a state' },
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' },
]

export default function ProductInquiry({ cart }: { cart: Cart | undefined }) {
  if (!cart) {
    return null
  }

  const router = useRouter()

  const initialValues = {
    email: '',
    name: '',
    address: '',
    state: '',
    zip: '',
    message: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    name: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    state: Yup.string()
      .oneOf(australianStates.map(state => state.value).slice(1), 'Please select a valid state')
      .required('Required'),
    zip: Yup.string().required('Required'),
    message: Yup.string(),
  })

  const handleSubmit = (values: typeof initialValues) => {
    // call api to send email
    fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        products: cart.lines.map(item => ({
          title: item.merchandise.product.title,
          price: item.cost.totalAmount.amount,
        })),
        estimatedTotal: cart.cost.totalAmount.amount,
      }),
    })
    // redirect to thank you page
    router.push('/thank-you')

    // clear the cookies using document.cookie
    document.cookie = 'cartId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="field-input"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="field-input"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Field
              type="text"
              id="address"
              name="address"
              required
              className="field-input"
            />
            <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <Field
                as="select"
                id="state"
                name="state"
                className="field-input"
              >
                {australianStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex-1">
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                ZIP
              </label>
              <Field
                type="text"
                id="zip"
                name="zip"
                className="field-input"
              />
              <ErrorMessage name="zip" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message (Optional)
            </label>
            <Field
              as="textarea"
              id="message"
              name="message"
              rows={4}
              className="field-input"
            />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Products of Interest</h3>
            <ul className="mt-2 divide-y divide-gray-200">
              {cart.lines.map((item, index) => (
                <li key={index} className="flex py-2">
                  <span className="flex-1">{item.merchandise.product.title}</span>
                  <span className="ml-4">
                    <Price
                      amount={item.cost.totalAmount.amount}
                      currencyCode={item.cost.totalAmount.currencyCode}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between">
              <span className="text-base font-medium text-gray-900">Estimated Total</span>
              <Price
                className="text-base font-medium text-gray-900"
                amount={cart.cost.totalAmount.amount}
                currencyCode={cart.cost.totalAmount.currencyCode}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Inquiry
          </button>
        </Form>
      </Formik>
    </>
  )
}
