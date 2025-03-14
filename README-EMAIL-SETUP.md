# Setting up Email Notifications for FlashTicket

This guide will help you set up email notifications for your FlashTicket application using Supabase Edge Functions.

## Prerequisites

- A Supabase account with access to your project
- An email service provider account (MailerSend, Resend, Mailgun, or SendGrid)

## Step 1: Create the Edge Function in Supabase

1. Log in to your Supabase dashboard
2. Navigate to your project
3. Go to "Edge Functions" in the left sidebar
4. Click "Create a new function"
5. Name the function `send-email`
6. Copy the code below and paste it into the function editor:

```typescript
// Follow this setup guide to integrate the Deno runtime into your Supabase project:
// https://supabase.com/docs/guides/functions/deno-runtime

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY');
const MAILGUN_DOMAIN = Deno.env.get('MAILGUN_DOMAIN');
const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
const MAILERSEND_API_KEY = Deno.env.get('MAILERSEND_API_KEY');
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@flashmac.com';

interface EmailRequest {
  to: string;
  subject: string;
  body: string;
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      status: 204,
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 405,
    });
  }

  try {
    // Parse request body
    const { to, subject, body } = await req.json() as EmailRequest;

    // Validate required fields
    if (!to || !subject || !body) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, body' }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Try to send email using available service
    let sent = false;
    let error = null;

    // Try MailerSend if API key is available
    if (MAILERSEND_API_KEY && !sent) {
      try {
        const response = await fetch('https://api.mailersend.com/v1/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MAILERSEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: {
              email: FROM_EMAIL,
            },
            to: [
              {
                email: to,
              },
            ],
            subject: subject,
            html: body,
          }),
        });

        const result = await response.json();
        
        if (response.ok) {
          sent = true;
          console.log('Email sent via MailerSend');
        } else {
          error = `MailerSend error: ${JSON.stringify(result)}`;
          console.error(error);
        }
      } catch (e) {
        error = `MailerSend exception: ${e.message}`;
        console.error(error);
      }
    }

    // Try Resend if API key is available and MailerSend failed
    if (RESEND_API_KEY && !sent) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to,
            subject,
            html: body,
          }),
        });

        const result = await response.json();
        
        if (response.ok && result.id) {
          sent = true;
          console.log('Email sent via Resend:', result.id);
        } else {
          error = `Resend error: ${JSON.stringify(result)}`;
          console.error(error);
        }
      } catch (e) {
        error = `Resend exception: ${e.message}`;
        console.error(error);
      }
    }

    // Try Mailgun if API key is available and other methods failed
    if (MAILGUN_API_KEY && MAILGUN_DOMAIN && !sent) {
      try {
        const response = await fetch(
          `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              from: FROM_EMAIL,
              to,
              subject,
              html: body,
            }).toString(),
          }
        );

        const result = await response.json();
        
        if (response.ok && result.id) {
          sent = true;
          console.log('Email sent via Mailgun:', result.id);
        } else {
          error = `Mailgun error: ${JSON.stringify(result)}`;
          console.error(error);
        }
      } catch (e) {
        error = `Mailgun exception: ${e.message}`;
        console.error(error);
      }
    }

    // Try SendGrid if API key is available and other methods failed
    if (SENDGRID_API_KEY && !sent) {
      try {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: to }] }],
            from: { email: FROM_EMAIL },
            subject,
            content: [{ type: 'text/html', value: body }],
          }),
        });
        
        if (response.ok) {
          sent = true;
          console.log('Email sent via SendGrid');
        } else {
          const result = await response.text();
          error = `SendGrid error: ${result}`;
          console.error(error);
        }
      } catch (e) {
        error = `SendGrid exception: ${e.message}`;
        console.error(error);
      }
    }

    // Return response based on whether email was sent
    if (sent) {
      return new Response(
        JSON.stringify({ success: true, message: 'Email sent successfully' }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Failed to send email', 
          error: error || 'No email service configured' 
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
```

7. Click "Deploy Function"

## Step 2: Set Environment Variables

1. In the Supabase dashboard, go to "Edge Functions"
2. Click on the "send-email" function
3. Click on "Secrets" in the sidebar
4. Add the following secrets:

```
FROM_EMAIL=noreply@yourcompany.com
```

And at least one of these email service API keys:

```
MAILERSEND_API_KEY=your_mailersend_api_key
RESEND_API_KEY=your_resend_api_key
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
SENDGRID_API_KEY=your_sendgrid_api_key
```

## Step 3: Configure FlashTicket

1. In your FlashTicket application, go to the Settings page
2. Under "Email Notifications", enter your admin email address
3. Enable the notification types you want to receive
4. Click "Save Settings"
5. Click "Send Test Email" to verify that everything is working

## Troubleshooting

If you encounter issues:

1. Check the Edge Function logs in the Supabase dashboard
2. Verify your API keys are correct
3. Make sure the FROM_EMAIL is properly configured
4. Check that your email service account is active and properly set up

## Email Service Recommendations

We recommend using MailerSend as it has a generous free tier and is reliable. Alternatives include:

- Resend.com
- Mailgun
- SendGrid

Each service has its own setup requirements, so refer to their documentation for specific details.
