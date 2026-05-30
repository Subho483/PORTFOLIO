import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure the email transport using Gmail
    // To make this work, you MUST set EMAIL_USER and EMAIL_PASS in your .env / Vercel Environment Variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // e.g., 'kgec.ee5@gmail.com'
        pass: process.env.EMAIL_PASS, // Your Gmail App Password (NOT your regular password)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kgec.ee5@gmail.com', // Where you want to receive the notifications
      subject: `[PORTFOLIO TRANSMISSION] New message from ${name}`,
      text: `Incoming Transmission from Portfolio Contact Console:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: monospace; background-color: #030303; color: #00F0FF; padding: 20px; border-radius: 5px;">
          <h2 style="color: #BD00FF;">[PORTFOLIO TRANSMISSION DETECTED]</h2>
          <p><strong>Sender:</strong> ${name}</p>
          <p><strong>Return Frequency (Email):</strong> ${email}</p>
          <hr style="border-color: #00F0FF;" />
          <p><strong>Decoded Message:</strong></p>
          <p style="color: #ffffff; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
