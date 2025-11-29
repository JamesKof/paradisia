import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from 'https://esm.sh/@react-email/components@0.0.22'
import * as React from 'https://esm.sh/react@18.3.1'

interface InquiryReceivedProps {
  name: string;
  subject: string;
}

export const InquiryReceived = ({
  name,
  subject,
}: InquiryReceivedProps) => (
  <Html>
    <Head />
    <Preview>We received your message - Paradasia Hideway</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>🌴 Paradasia Hideway</Heading>
        </Section>
        
        <Section style={content}>
          <Text style={greeting}>Dear {name},</Text>
          <Text style={paragraph}>
            Thank you for reaching out to us. We have received your message regarding "{subject}" and will respond within 24 hours.
          </Text>
          <Text style={paragraph}>
            In the meantime, feel free to explore our accommodations and plan your island getaway.
          </Text>
          <Text style={signature}>
            Best regards,<br />
            The Paradasia Hideway Team
          </Text>
        </Section>
        
        <Hr style={divider} />
        
        <Section style={footer}>
          <Text style={footerText}>Big Ada Island, near Aqua Safari</Text>
          <Text style={footerText}>Greater Accra Region, Ghana</Text>
          <Text style={footerText}>📧 hello@paradasiahideway.com</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default InquiryReceived

const main = {
  backgroundColor: '#0a1628',
  fontFamily: 'Georgia, serif',
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#132033',
}

const header = {
  background: 'linear-gradient(135deg, #1e4a6d, #0a1628)',
  padding: '40px',
  textAlign: 'center' as const,
}

const headerTitle = {
  color: '#f5a623',
  margin: '0',
  fontSize: '32px',
  fontWeight: 'bold',
}

const content = {
  padding: '40px',
}

const greeting = {
  color: '#ffffff',
  fontSize: '16px',
  marginBottom: '16px',
}

const paragraph = {
  color: '#ffffff',
  fontSize: '14px',
  lineHeight: '24px',
  marginBottom: '16px',
}

const signature = {
  color: '#ffffff',
  fontSize: '14px',
  lineHeight: '24px',
}

const divider = {
  borderColor: '#1e4a6d',
  margin: '0',
}

const footer = {
  backgroundColor: '#0a1628',
  padding: '30px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#7db4d8',
  fontSize: '14px',
  margin: '5px 0',
}
