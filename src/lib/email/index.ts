import { supabase } from '../supabase';
import { dbOps } from '../db';
import type { Ticket } from '../../types';

export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

export const emailService = {
  /**
   * Send an email using Supabase Edge Functions
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // Call Supabase Edge Function for sending emails
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: options.to,
          subject: options.subject,
          body: options.body,
        }
      });

      if (error) {
        console.error('Error sending email:', error);
        return false;
      }

      console.log('Email sent successfully:', data);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  },

  /**
   * Send notification for a new ticket
   */
  async sendNewTicketNotification(ticket: Ticket): Promise<boolean> {
    try {
      // Check if new ticket notifications are enabled
      const emailNewTicket = await dbOps.getSetting('email_new_ticket');
      if (emailNewTicket !== 'true') {
        console.log('New ticket notifications are disabled');
        return false;
      }

      // Get admin email
      const adminEmail = await dbOps.getSetting('email_admin_address');
      if (!adminEmail) {
        console.log('Admin email not configured');
        return false;
      }

      // Prepare email content
      const subject = `New Repair Ticket: ${ticket.ticket_number}`;
      const body = `
        <h2>New Repair Ticket Created</h2>
        <p><strong>Ticket Number:</strong> ${ticket.ticket_number}</p>
        <p><strong>Customer:</strong> ${ticket.customer_name}</p>
        <p><strong>Email:</strong> ${ticket.customer_email}</p>
        <p><strong>Device:</strong> ${ticket.device_type}</p>
        <p><strong>Description:</strong> ${ticket.description}</p>
        <p><strong>Status:</strong> ${ticket.status}</p>
        <p><strong>Priority:</strong> ${ticket.priority}</p>
        <p>View ticket details at: ${window.location.origin}/tickets/${ticket.id}</p>
      `;

      // Send email
      return await this.sendEmail({
        to: adminEmail,
        subject,
        body
      });
    } catch (error) {
      console.error('Failed to send new ticket notification:', error);
      return false;
    }
  },

  /**
   * Send notification for a ticket status change
   */
  async sendStatusChangeNotification(ticket: Ticket, oldStatus: string): Promise<boolean> {
    try {
      // Check if status change notifications are enabled
      const emailStatusChange = await dbOps.getSetting('email_status_change');
      if (emailStatusChange !== 'true') {
        console.log('Status change notifications are disabled');
        return false;
      }

      // Get admin email
      const adminEmail = await dbOps.getSetting('email_admin_address');
      if (!adminEmail) {
        console.log('Admin email not configured');
        return false;
      }

      // Prepare email content
      const subject = `Ticket Status Updated: ${ticket.ticket_number}`;
      const body = `
        <h2>Repair Ticket Status Updated</h2>
        <p><strong>Ticket Number:</strong> ${ticket.ticket_number}</p>
        <p><strong>Customer:</strong> ${ticket.customer_name}</p>
        <p><strong>Status Changed:</strong> ${oldStatus} → ${ticket.status}</p>
        <p><strong>Device:</strong> ${ticket.device_type}</p>
        <p>View ticket details at: ${window.location.origin}/tickets/${ticket.id}</p>
      `;

      // Send email to admin
      const adminEmailSent = await this.sendEmail({
        to: adminEmail,
        subject,
        body
      });

      // Also send email to customer
      const customerEmailSent = await this.sendEmail({
        to: ticket.customer_email,
        subject: `Your repair ticket status has been updated: ${ticket.ticket_number}`,
        body: `
          <h2>Your Repair Ticket Status Has Been Updated</h2>
          <p>Dear ${ticket.customer_name},</p>
          <p>Your repair ticket status has been updated:</p>
          <p><strong>Ticket Number:</strong> ${ticket.ticket_number}</p>
          <p><strong>New Status:</strong> ${ticket.status}</p>
          <p><strong>Device:</strong> ${ticket.device_type}</p>
          <p>You can view your ticket details at: ${window.location.origin}/public/tickets/${ticket.id}</p>
          <p>Thank you for choosing our service.</p>
        `
      });

      return adminEmailSent || customerEmailSent;
    } catch (error) {
      console.error('Failed to send status change notification:', error);
      return false;
    }
  },

  /**
   * Send notification for old tickets
   */
  async sendOldTicketsNotification(): Promise<boolean> {
    try {
      // Check if old tickets notifications are enabled
      const emailOldTickets = await dbOps.getSetting('email_admin_old_tickets');
      if (emailOldTickets !== 'true') {
        console.log('Old tickets notifications are disabled');
        return false;
      }

      // Get admin email
      const adminEmail = await dbOps.getSetting('email_admin_address');
      if (!adminEmail) {
        console.log('Admin email not configured');
        return false;
      }

      // Get days threshold
      const daysStr = await dbOps.getSetting('email_admin_old_tickets_days');
      const days = parseInt(daysStr || '7', 10);

      // Calculate the date threshold
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - days);

      // Get tickets older than the threshold that are not closed
      const { data: tickets, error } = await supabase
        .from('tickets')
        .select('*')
        .lt('created_at', thresholdDate.toISOString())
        .not('status', 'eq', 'Chiuso');

      if (error) {
        console.error('Error fetching old tickets:', error);
        return false;
      }

      if (!tickets || tickets.length === 0) {
        console.log('No old tickets found');
        return false;
      }

      // Prepare email content
      const subject = `${tickets.length} Tickets Pending for More Than ${days} Days`;
      let ticketsHtml = '';
      
      tickets.forEach((ticket: any) => {
        ticketsHtml += `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${ticket.ticket_number}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${ticket.customer_name}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${ticket.status}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date(ticket.created_at).toLocaleDateString()}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <a href="${window.location.origin}/tickets/${ticket.id}">View</a>
            </td>
          </tr>
        `;
      });

      const body = `
        <h2>Tickets Pending for More Than ${days} Days</h2>
        <p>The following tickets have been open for more than ${days} days:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Ticket Number</th>
              <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Customer</th>
              <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Status</th>
              <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Created Date</th>
              <th style="padding: 8px; border: 1px solid #ddd; background-color: #f2f2f2;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${ticketsHtml}
          </tbody>
        </table>
      `;

      // Send email
      return await this.sendEmail({
        to: adminEmail,
        subject,
        body
      });
    } catch (error) {
      console.error('Failed to send old tickets notification:', error);
      return false;
    }
  }
};
