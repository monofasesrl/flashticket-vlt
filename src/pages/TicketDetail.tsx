import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dbOps } from '../lib/db';
import type { Ticket } from '../types';
import { format } from 'date-fns';
import { QRCodeSVG } from 'qrcode.react';
import { useI18n } from '../lib/i18n/context';
import { LanguageToggle } from '../components/LanguageToggle';
import { supabase } from '../lib/supabase';

interface TicketWithUser extends Ticket {
  created_by_email: string;
}

interface Settings {
  terms_and_conditions: string;
  logo_url: string;
}

export function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketWithUser | null>(null);
  const [settings, setSettings] = useState<Settings>({ 
    terms_and_conditions: '',
    logo_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('ID ticket non valido');
        setLoading(false);
        return;
      }

      try {
        // Initialize database
        await dbOps.initDb();

        // Get current user email
        const { data } = await supabase.auth.getSession();
        if (data.session?.user?.email) {
          setUserEmail(data.session.user.email);
        }

        // Fetch ticket
        const ticketData = await dbOps.getTicketById(id);
        if (!ticketData) {
          setError('Ticket non trovato');
          setLoading(false);
          return;
        }
        setTicket(ticketData as TicketWithUser);

        // Fetch settings
        const [terms, logoUrl] = await Promise.all([
          dbOps.getSetting('terms_and_conditions'),
          dbOps.getSetting('logo_url')
        ]);

        setSettings({ 
          terms_and_conditions: terms || '',
          logo_url: logoUrl || ''
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Errore durante il caricamento dei dati');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black p-8">
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Errore</h1>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate('/tickets')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Torna alla lista ticket
          </button>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  // Generate the public ticket URL (no login needed)
  const publicTicketUrl = `${window.location.origin}/public/tickets/${ticket.id}`;

  return (
    <div className="min-h-screen bg-white text-black p-8 print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4 print:hidden">
          <LanguageToggle />
        </div>

        {/* Header with Logo and QR Code */}
        <div className="flex justify-between items-start mb-4">
          <div>
            {settings.logo_url && (
              <div className="relative w-48 h-16 mb-2">
                <img 
                  src={settings.logo_url}
                  alt="Company Logo"
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ objectPosition: 'left center' }}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🖥️</text></svg>';
                  }}
                />
              </div>
            )}
            <div className="text-sm">
              <p>MONOFASE srls</p>
              <p>Via Marie Curie 11</p>
              <p>39100 Bolzano</p>
              <p>info@flashmac.com - www.flashmac.com</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <QRCodeSVG value={publicTicketUrl} size={100} />
            <span className="text-xs text-gray-500">{t('common.scanForTicketDetails')}</span>
          </div>
        </div>

        {/* Ticket Info */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-black">{t('tickets.detail.title')}</h1>
            <p className="text-gray-600 print:text-black">{ticket.ticket_number}</p>
            <p className="text-gray-600 print:text-black">{t('tickets.detail.createdBy')}: {userEmail || ticket.created_by_email || 'Unknown'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 print:text-black">
              {t('tickets.detail.created')}: {format(new Date(ticket.created_at), 'PPp')}
            </p>
            <p className="text-sm text-gray-600 print:text-black">
              {t('tickets.detail.lastUpdated')}: {format(new Date(ticket.updated_at), 'PPp')}
            </p>
          </div>
        </div>

        {/* Status and Priority (hidden in print) */}
        <div className="mb-6 print:hidden">
          <p className="font-medium text-black">{t('tickets.detail.status')}: {t(`tickets.status.${ticket.status}`)}</p>
          <p className="font-medium text-black">
            {t('tickets.detail.priority')}: {t(`tickets.priority.${ticket.priority}`)}
          </p>
        </div>

        {/* Customer Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-black">{t('tickets.detail.customerInfo')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 print:text-black">{t('tickets.detail.name')}</p>
              <p className="text-black">{ticket.customer_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 print:text-black">{t('tickets.detail.email')}</p>
              <p className="text-black">{ticket.customer_email}</p>
            </div>
          </div>
        </div>

        {/* Device Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-black">{t('tickets.detail.deviceInfo')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 print:text-black">{t('tickets.detail.deviceType')}</p>
              <p className="text-black">{ticket.device_type}</p>
            </div>
            {ticket.price && (
              <div>
                <p className="text-sm font-medium text-gray-600 print:text-black">{t('tickets.detail.price')}</p>
                <p className="text-black">€{ticket.price.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-black">{t('tickets.detail.description')}</h2>
          <p className="whitespace-pre-wrap text-black">{ticket.description}</p>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-4 print:block hidden">
          <h2 className="text-sm font-semibold mb-1 text-black">{t('tickets.detail.termsAndConditions')}</h2>
          <div className="text-xs text-black whitespace-pre-wrap border p-2 rounded">
            {settings.terms_and_conditions}
          </div>
        </div>

        {/* Customer Signature */}
        <div className="mb-4 print:block hidden">
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-6 print:text-black">{t('tickets.detail.customerSignature')}</p>
              <div className="border-t border-black pt-1">
                <p className="text-xs text-gray-500 print:text-black">{t('tickets.detail.signHere')}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-6 print:text-black">{t('tickets.detail.date')}</p>
              <div className="border-t border-black pt-1">
                <p className="text-xs text-gray-500 print:text-black">{t('tickets.detail.date')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="mt-8 flex justify-center space-x-4 print:hidden">
          <a
            href={`mailto:info@flashmac.com?subject=Ticket ${ticket.ticket_number}`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('tickets.contact.email')}
          </a>
          <a
            href={`https://wa.me/3904711550913?text=Ticket ${ticket.ticket_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {t('tickets.contact.whatsapp')}
          </a>
        </div>
      </div>
    </div>
  );
}
