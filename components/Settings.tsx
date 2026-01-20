
import React, { ChangeEvent } from 'react';
import { UserSettings } from '../types';

interface SettingsProps {
  settings: UserSettings;
  onSave: (settings: UserSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onSave }) => {

  const handleChange = (field: keyof UserSettings, value: any) => {
    onSave({ ...settings, [field]: value });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'watermarkUrl' | 'brandWatermarkUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onSave({ ...settings, [field]: url });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-4xl mx-auto border border-gray-300 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Instellingen</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
            
            {/* Subscription Section (Read Only) */}
            <div className="bg-indigo-50 dark:bg-indigo-900/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 border-b border-indigo-200 dark:border-indigo-700 pb-2 mb-4">Mijn Abonnement</h3>
                
                <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">
                        <span className="block text-gray-500 dark:text-gray-400">Huidig Plan</span>
                        <span className={`font-bold text-lg ${settings.activePlan === 'Pro' || settings.activePlan === 'Enterprise' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>
                            {settings.activePlan || 'Basic'}
                        </span>
                    </div>
                     <div className="text-sm text-right">
                        <span className="block text-gray-500 dark:text-gray-400">Status</span>
                         <span className={`font-bold ${settings.planStatus === 'active' ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'}`}>
                            {settings.planStatus === 'active' ? 'Actief' : 'Niet geregistreerd'}
                        </span>
                    </div>
                </div>
                
                {settings.planExpires && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Geldig tot: {settings.planExpires}</p>
                )}
                
                <div className="text-xs text-indigo-800 dark:text-indigo-300 bg-indigo-100/50 dark:bg-indigo-900/40 p-2 rounded mt-2">
                    Uw licentie wordt beheerd door de systeembeheerder.
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Persoonlijk & Bedrijf</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Uw Naam (voor dashboard)</label>
                        <input 
                            type="text" 
                            value={settings.userName || ''}
                            onChange={(e) => handleChange('userName', e.target.value)}
                            className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Bijv. Jan Jansen"
                        />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bedrijfsnaam</label>
                    <input 
                        type="text" 
                        value={settings.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adres</label>
                    <textarea 
                        value={settings.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                    />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">KvK Nummer</label>
                        <input 
                        type="text" 
                        value={settings.kvkNumber}
                        onChange={(e) => handleChange('kvkNumber', e.target.value)}
                        className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">BTW Nummer</label>
                        <input 
                        type="text" 
                        value={settings.vatNumber}
                        onChange={(e) => handleChange('vatNumber', e.target.value)}
                        className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">IBAN</label>
                    <input 
                        type="text" 
                        value={settings.iban}
                        onChange={(e) => handleChange('iban', e.target.value)}
                        className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column (Layout) */}
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Factuur Opmaak</h3>
                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Layout Stijl</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => handleChange('layoutStyle', 'modern')}
                            className={`p-3 border rounded-lg text-center text-sm font-medium transition-colors ${settings.layoutStyle === 'modern' ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                        >
                            Modern Web
                        </button>
                        <button 
                            onClick={() => handleChange('layoutStyle', 'classic')}
                            className={`p-3 border rounded-lg text-center text-sm font-medium transition-colors ${settings.layoutStyle === 'classic' ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                        >
                            Klassiek Excel
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hoofdkleur Factuur</label>
                    <div className="flex items-center gap-3">
                        <input 
                            type="color" 
                            value={settings.primaryColor || '#4F46E5'}
                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                            className="h-10 w-16 p-1 border border-gray-400 dark:border-gray-600 rounded cursor-pointer dark:bg-gray-700 shadow-sm"
                        />
                        <input 
                            type="text"
                            value={settings.primaryColor || '#4F46E5'}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val.startsWith('#') || val.length <= 7) {
                                    handleChange('primaryColor', val);
                                }
                            }}
                            className="text-sm border border-gray-400 dark:border-gray-600 rounded p-2 w-28 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 uppercase font-mono shadow-sm"
                            placeholder="#4F46E5"
                        />
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Gebruik de kleurkiezer of typ een HEX code (bijv. #FF0000).</p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Factuur Voettekst</label>
                    <textarea 
                        value={settings.footerText || ''}
                        onChange={(e) => handleChange('footerText', e.target.value)}
                        className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md shadow-sm p-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                        placeholder={`Standaard tekst: Gelieve het bedrag over te maken binnen 14 dagen op rekening ${settings.iban} t.n.v. ${settings.companyName}.`}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Laat leeg om de standaard betalingstekst te gebruiken.</p>
                </div>

                <div className="mb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bedrijfslogo (Bovenaan)</label>
                    <div className="flex items-center space-x-4">
                        {settings.logoUrl && (
                        <img src={settings.logoUrl} alt="Logo" className="h-16 w-16 object-contain border border-gray-300 dark:border-gray-600 rounded bg-white" />
                        )}
                        <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'logoUrl')}
                        className="text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900/30 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50"
                        />
                    </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Watermerk (Groot Logo op Achtergrond)
                    </label>
                <div className="flex flex-col space-y-2">
                    {settings.brandWatermarkUrl && (
                        <div className="relative w-full h-32 border border-gray-300 dark:border-gray-700 rounded overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                            <img src={settings.brandWatermarkUrl} alt="Watermark" className="w-1/2" style={{opacity: settings.watermarkOpacity}} />
                        </div>
                    )}
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'brandWatermarkUrl')}
                        className="text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900/30 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50"
                    />
                    <div className="mt-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Zichtbaarheid: {Math.round(settings.watermarkOpacity * 100)}%</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05"
                            value={settings.watermarkOpacity}
                            onChange={(e) => handleChange('watermarkOpacity', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-1"
                        />
                    </div>
                </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excel Template Achtergrond
                </label>
                <div className="flex flex-col space-y-2">
                    {settings.watermarkUrl && (
                        <div className="relative w-full h-32 border border-gray-300 dark:border-gray-700 rounded overflow-hidden bg-gray-50 dark:bg-gray-900">
                            <img src={settings.watermarkUrl} alt="Template Background" className="w-full h-full object-contain opacity-80" />
                        </div>
                    )}
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'watermarkUrl')}
                        className="text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900/30 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50"
                    />
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
