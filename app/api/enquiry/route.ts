import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Mock: In production, integrate with EmailJS, SendGrid, or your backend
    console.log('New Enquiry Received:', {
      timestamp: new Date().toISOString(),
      ...body,
    })

    // Example: Send WhatsApp notification via Twilio/WATI
    // await sendWhatsAppNotification(body)
    
    // Example: Send email via SendGrid
    // await sendEmail({
    //   to: 'hello@vyatri.in',
    //   subject: `New Trip Enquiry: ${body.destination || 'General'}`,
    //   body: formatEmailBody(body),
    // })

    return NextResponse.json(
      { success: true, message: 'Enquiry received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Enquiry API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process enquiry' },
      { status: 500 }
    )
  }
}
