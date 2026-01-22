import React from 'react';
import { Invoice, UserSettings } from '../types';

interface InvoicePreviewProps {
  invoice: Invoice;
  settings: UserSettings;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice, settings }) => {
  const isQuote = invoice.type === 'quote';
  const title = isQuote ? 'OFFERTE' : 'FACTUUR';
  const primaryColor = settings.primaryColor || '#4F46E5';

  const subtotal = invoice.items.reduce((acc, item) => acc + item.amount, 0);
  const discountAmount = invoice.discountAmount || 0;
  const subtotalAfterDiscount = subtotal - discountAmount;

  const vatBreakdown: { [key: number]: number } = {};
  invoice.items.forEach(item => {
    const vat = item.amount * (item.vatRate / 100);
    vatBreakdown[item.vatRate] = (vatBreakdown[item.vatRate] || 0) + vat;
  });

  if (discountAmount > 0) {
    const discountVat = discountAmount * ((invoice.discountVatRate || 21) / 100);
    const rate = invoice.discountVatRate || 21;
    vatBreakdown[rate] = (vatBreakdown[rate] || 0) - discountVat;
  }

  const totalVat = Object.values(vatBreakdown).reduce((a, b) => a + b, 0);
  const total = subtotalAfterDiscount + totalVat;

  const footerText = settings.footerText ? (
      <p className="whitespace-pre-line">{settings.footerText}</p>
  ) : (
      <>
        <p>Gelieve het bedrag over te maken binnen 14 dagen op rekening <span className="font-semibold">{settings.iban}</span> t.n.v. {settings.companyName}.</p>
        <p className="mt-1">Onder vermelding van nummer {invoice.number}.</p>
      </>
  );

  // Watermerk transformatie stijl
  const watermarkTransformStyle = {
    opacity: settings.watermarkOpacity,
    transform: `translate(${settings.watermarkX || 0}px, ${settings.watermarkY || 0}px) scale(${settings.watermarkSize || 1}) ${settings.layoutStyle === 'classic' ? '' : 'rotate(-12deg)'}`,
  };

  // --- Classic Layout ---
  if (settings.layoutStyle === 'classic') {
    return (
      <div className="w-full max-w-[210mm] mx-auto bg-white shadow-lg min-h-[297mm] relative overflow-hidden print:shadow-none print:w-full flex flex-col font-sans text-sm text-gray-900">
        {settings.watermarkUrl && (
          <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
              <img src={settings.watermarkUrl} alt="Background" className="w-full h-full object-cover"/>
          </div>
        )}
        {settings.brandWatermarkUrl && (
             <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <img src={settings.brandWatermarkUrl} alt="Watermark" className="max-w-none object-contain" style={watermarkTransformStyle}/>
             </div>
        )}
        <div className="relative z-10 p-8 flex-grow flex flex-col">
           <div className="h-32 flex justify-center items-center mb-4">
                {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo" className="h-24 mx-auto mb-2 object-contain" />
                ) : (
                    <h1 className="text-3xl font-black uppercase italic text-center">{settings.companyName}</h1>
                )}
           </div>
           <div className="flex justify-between items-start mb-8 px-2">
              <div className="bg-white/80 p-2 rounded">
                  <p className="font-bold text-lg">{invoice.clientName}</p>
                  <p className="whitespace-pre-line">{invoice.clientAddress}</p>
              </div>
              <div className="border-2 p-2 min-w-[200px] bg-white/90" style={{ borderColor: primaryColor }}>
                  <div className="flex justify-between mb-1"><span className="font-bold">Datum:</span><span>{invoice.date}</span></div>
                  <div className="flex justify-between"><span className="font-bold">Nummer:</span><span>{invoice.number}</span></div>
              </div>
           </div>
           <div className="mb-1 border-b-2 border-black pb-1">
              <span className="font-bold text-lg uppercase">{title}: {invoice.project}</span>
           </div>
           <div className="flex-grow bg-white/60 relative mb-4">
              <table className="w-full border-collapse border-2 border-black relative z-10">
                  <thead>
                      <tr className="bg-transparent"><th className="border border-black px-2 py-1 font-bold w-3/5">Omschrijving</th><th className="border border-black px-2 py-1 font-bold w-1/5">BTW</th><th className="border border-black px-2 py-1 font-bold w-1/5">Bedrag</th></tr>
                  </thead>
                  <tbody>
                      {invoice.items.map((item, idx) => (
                          <tr key={idx}>
                              <td className="border border-black px-2 py-1 align-top"><div className="font-semibold">{item.description}</div><div className="text-xs text-gray-600 pl-2">{item.quantity} x € {Number(item.price).toFixed(2)}</div></td>
                              <td className="border border-black px-2 py-1 text-center align-top">{item.vatRate}%</td>
                              <td className="border border-black px-2 py-1 text-right align-top">€ {item.amount.toFixed(2)}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
           </div>
           <div className="mt-auto relative z-10">
              <table className="w-full border-collapse border-2 border-black">
                  <tfoot>
                      <tr><td colSpan={2} className="border border-black px-2 py-1 text-right font-bold">Totaal excl. BTW</td><td className="border border-black px-2 py-1 text-right font-bold w-1/5">€ {subtotal.toFixed(2)}</td></tr>
                      <tr className="bg-gray-100"><td colSpan={2} className="border border-black px-2 py-2 text-right font-black text-lg">Totaal incl. BTW</td><td className="border border-black px-2 py-2 text-right font-black text-lg">€ {total.toFixed(2)}</td></tr>
                  </tfoot>
              </table>
              <div className="mt-4 border-2 p-2 text-center text-xs bg-white/90" style={{ borderColor: primaryColor }}>{settings.footerText || 'Betalingstermijn: 14 dagen.'}</div>
              <div className="pt-8 text-center text-xs font-bold">{settings.companyName} | {settings.iban}</div>
           </div>
        </div>
      </div>
    );
  }

  // --- Modern Layout ---
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white shadow-lg min-h-[297mm] relative overflow-hidden flex flex-col print:shadow-none print:w-full">
      {settings.watermarkUrl && (
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
            <img src={settings.watermarkUrl} alt="Background" className="w-full h-full object-cover"/>
        </div>
      )}
       {settings.brandWatermarkUrl && (
             <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <img src={settings.brandWatermarkUrl} alt="Watermark" className="max-w-none transform" style={watermarkTransformStyle}/>
             </div>
        )}
      <div className="relative z-10 p-12 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-12">
          <div>
            {settings.logoUrl ? (
               <img src={settings.logoUrl} alt="Logo" className="h-16 object-contain mb-4" />
            ) : (
              <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>{settings.companyName}</h1>
            )}
            <div className="text-sm text-gray-600"><p className="whitespace-pre-line">{settings.address}</p><p>KvK: {settings.kvkNumber}</p><p>BTW: {settings.vatNumber}</p></div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold uppercase tracking-wide opacity-40" style={{ color: primaryColor }}>{title}</h2>
            <div className="mt-4 text-sm text-gray-600 space-y-1"><p><span className="font-semibold w-24 inline-block">Nummer:</span> {invoice.number}</p><p><span className="font-semibold w-24 inline-block">Datum:</span> {invoice.date}</p></div>
          </div>
        </div>
        <div className="mb-12 bg-white/50 backdrop-blur-sm p-4 rounded border-l-4" style={{ borderColor: primaryColor }}>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Factureren aan</h3>
          <p className="font-bold text-lg text-gray-800">{invoice.clientName}</p>
          <p className="text-gray-600 whitespace-pre-line">{invoice.clientAddress}</p>
        </div>
        <div className="mb-8 flex-grow">
          <table className="w-full">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#E5E7EB' }}>
                <th className="text-left py-3 text-sm font-bold" style={{ color: primaryColor }}>Omschrijving</th>
                <th className="text-right py-3 text-sm font-bold" style={{ color: primaryColor }}>Aantal</th>
                <th className="text-right py-3 text-sm font-bold" style={{ color: primaryColor }}>Totaal</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 text-sm text-gray-800">{item.description}</td>
                  <td className="py-4 text-right text-sm text-gray-600">{item.quantity}</td>
                  <td className="py-4 text-right text-sm font-medium text-gray-800">€ {item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-auto">
          <div className="flex justify-end mb-12">
            <div className="w-64 space-y-3 bg-white/80 p-4 rounded shadow-sm border border-gray-100">
              <div className="flex justify-between text-gray-600 text-sm"><span>Totaal excl. BTW</span><span>€ {subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200" style={{ color: primaryColor }}><span>Totaal incl. BTW</span><span>€ {total.toFixed(2)}</span></div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 border-t border-gray-100 pt-8">{footerText}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;