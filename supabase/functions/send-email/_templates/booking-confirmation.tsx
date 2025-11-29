import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Hr,
} from 'https://esm.sh/@react-email/components@0.0.22'
import * as React from 'https://esm.sh/react@18.3.1'

interface BookingConfirmationProps {
  firstName: string;
  lastName: string;
  roomType: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  specialRequests?: string;
  paymentReference?: string;
  bookingId: string;
}

export const BookingConfirmation = ({
  firstName,
  roomName,
  checkIn,
  checkOut,
  guests,
  totalAmount,
  specialRequests,
  paymentReference,
  bookingId,
}: BookingConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Your booking at Paradasia Hideway is confirmed!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerTitle}>🌴 Paradasia Hideway</Heading>
          <Text style={headerSubtitle}>Your Booking is Confirmed!</Text>
        </Section>
        
        <Section style={content}>
          <Text style={greeting}>Dear {firstName},</Text>
          <Text style={paragraph}>
            Thank you for choosing Paradasia Hideway. We're thrilled to confirm your reservation!
          </Text>
          
          <Section style={bookingDetails}>
            <Row style={detailRow}>
              <Column style={detailLabel}>Room</Column>
              <Column style={detailValue}>{roomName}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Check-in</Column>
              <Column style={detailValue}>{checkIn}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Check-out</Column>
              <Column style={detailValue}>{checkOut}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Guests</Column>
              <Column style={detailValue}>{guests}</Column>
            </Row>
            <Row style={detailRowLast}>
              <Column style={detailLabel}>Reference</Column>
              <Column style={detailValue}>{paymentReference || bookingId}</Column>
            </Row>
          </Section>
          
          <Section style={totalSection}>
            <Text style={totalText}>Total: GH₵{totalAmount.toLocaleString()}</Text>
          </Section>
          
          {specialRequests && (
            <Section style={specialRequestsSection}>
              <Text style={specialRequestsLabel}>Special Requests:</Text>
              <Text style={specialRequestsText}>{specialRequests}</Text>
            </Section>
          )}
          
          <Text style={paragraph}>
            We look forward to welcoming you to our paradise island getaway!
          </Text>
          <Text style={signature}>
            Warm regards,<br />
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

export default BookingConfirmation

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

const headerSubtitle = {
  color: '#7db4d8',
  marginTop: '10px',
  fontSize: '16px',
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

const bookingDetails = {
  backgroundColor: '#0a1628',
  borderRadius: '12px',
  padding: '24px',
  margin: '20px 0',
}

const detailRow = {
  borderBottom: '1px solid #1e4a6d',
  padding: '12px 0',
}

const detailRowLast = {
  padding: '12px 0',
}

const detailLabel = {
  color: '#7db4d8',
  fontSize: '14px',
  width: '50%',
}

const detailValue = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'right' as const,
  width: '50%',
}

const totalSection = {
  textAlign: 'center' as const,
  margin: '20px 0',
}

const totalText = {
  color: '#f5a623',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
}

const specialRequestsSection = {
  backgroundColor: '#1e4a6d',
  borderRadius: '8px',
  padding: '16px',
  margin: '20px 0',
}

const specialRequestsLabel = {
  color: '#f5a623',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
}

const specialRequestsText = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '0',
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
