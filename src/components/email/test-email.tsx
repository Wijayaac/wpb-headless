interface EmailTemplateProps {
  name: string
  address: string
  state: string
  zip: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  address,
  state,
  zip
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <p>Thank you for joining Acme. We have your address on file as:</p>
    <p>
      {address}<br />
      {state}, {zip}
    </p>
    <p>If this information is incorrect, please let us know.</p>
  </div>
)