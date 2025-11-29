import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'https://esm.sh/@react-email/components@0.0.22'
import * as React from 'https://esm.sh/react@18.3.1'

interface AdminCancellationProps {
  firstName: string;
  lastName: string;
  email: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  paymentReference?: string;
  bookingId: string;
}

export const AdminCancellation = ({
  firstName,
  lastName,
  email,
  roomName,
  checkIn,
  checkOut,
  totalAmount,
  paymentReference,
  bookingId,
}: AdminCancellationProps) => (
  <Html>
    <Head />
    <Preview>Booking Cancellation Alert - {firstName} {lastName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={title}>⚠️ Booking Cancellation Alert</Heading>
        <Text style={intro}>A booking has been cancelled:</Text>
        
        <Section style={detailsSection}>
          <Text style={detail}>
            <span style={label}>Guest:</span> {firstName} {lastName}
          </Text>
          <Text style={detail}>
            <span style={label}>Email:</span> {email}
          </Text>
          <Text style={detail}>
            <span style={label}>Room:</span> {roomName}
          </Text>
          <Text style={detail}>
            <span style={label}>Check-in:</span> {checkIn}
          </Text>
          <Text style={detail}>
            <span style={label}>Check-out:</span> {checkOut}
          </Text>
          <Text style={detail}>
            <span style={label}>Amount:</span> GH₵{totalAmount.toLocaleString()}
          </Text>
          <Text style={detail}>
            <span style={label}>Reference:</span> {paymentReference || bookingId}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default AdminCancellation

const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '30px',
}

const title = {
  color: '#8b0000',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '16px',
}

const intro = {
  color: '#333333',
  fontSize: '14px',
  marginBottom: '20px',
}

const detailsSection = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '20px',
}

const detail = {
  color: '#333333',
  fontSize: '14px',
  margin: '10px 0',
}

const label = {
  fontWeight: 'bold',
  color: '#666666',
  marginRight: '8px',
}
