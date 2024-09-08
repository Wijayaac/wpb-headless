interface EmailTemplateProps {
  name: string
  address: string
  state: string
  zip: string
  message?: string
  products: Array<{ title: string; price: string }>
  estimatedTotal: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  address,
  state,
  zip,
  message,
  products,
  estimatedTotal
}) => (
  <div>
    <h1>New Product Inquiry from {name}</h1>
    <p>Contact Information:</p>
    <p>
      {address}<br />
      {state}, {zip}
    </p>
    {message && (
      <div>
        <h2>Message:</h2>
        <p>{message}</p>
      </div>
    )}
    <h2>Products of Interest:</h2>
    <ul>
      {products.map((product, index) => (
        <li key={index}>{product.title} - {product.price}</li>
      ))}
    </ul>
    <p>Estimated Total: {estimatedTotal}</p>
  </div>
)