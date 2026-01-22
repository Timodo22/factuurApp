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
        <div className="space-y-8">
            {/* Abonnement Sectie behouden */}
            <div className="bg-indigo-50 dark:bg-indigo-900/40 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 border-b border-indigo-200 dark:border-indigo-700 pb-2 mb-4">Mijn Abonnement</h3>
                <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">
                        <span className="block text-gray-500 dark:text-gray-400">Huidig Plan</span>
                        <span className={`font-bold text-lg ${settings.activePlan === 'Pro' || settings.activePlan === 'Enterprise' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>
                            {settings.activePlan || 'Basic'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Persoonlijk & Bedrijf behouden */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Persoonlijk & Bedrijf</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Uw Naam (voor dashboard)</label>
                        <input type="text" value={settings.userName || ''} onChange={(e) => handleChange('userName', e.target.value)} className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bedrijfsnaam</label>
                        <input type="text" value={settings.companyName} onChange={(e) => handleChange('companyName', e.target.value)} className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adres</label>
                        <textarea value={settings.address} onChange={(e) => handleChange('address', e.target.value)} className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">KvK</label>
                            <input type="text" value={settings.kvkNumber} onChange={(e) => handleChange('kvkNumber', e.target.value)} className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">BTW</label>
                            <input type="text" value={settings.vatNumber} onChange={(e) => handleChange('vatNumber', e.target.value)} className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">IBAN</label>
                        <input type="text" value={settings.iban} onChange={(e) => handleChange('iban', e.target.value)} className="mt-1 block w-full border border-gray-400 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white" />
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            {/* Factuur Opmaak behouden */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Factuur Opmaak</h3>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Layout Stijl</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleChange('layoutStyle', 'modern')} className={`p-3 border rounded-lg text-sm font-medium ${settings.layoutStyle === 'modern' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 text-gray-700'}`}>Modern Web</button>
                        <button onClick={() => handleChange('layoutStyle', 'classic')} className={`p-3 border rounded-lg text-sm font-medium ${settings.layoutStyle === 'classic' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 text-gray-700'}`}>Klassiek Excel</button>
                    </div>
                </div>

                <div className="mb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bedrijfslogo</label>
                    <div className="flex items-center space-x-4">
                        {settings.logoUrl && <img src={settings.logoUrl} alt="Logo" className="h-16 w-16 object-contain border rounded bg-white" />}
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logoUrl')} className="text-xs text-gray-500" />
                    </div>
                </div>

                {/* WATERMERK SECTIE MET NIEUWE CONTROLS */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Watermerk</label>
                    <div className="flex flex-col space-y-4">
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'brandWatermarkUrl')} className="text-xs text-gray-500" />
                        
                        {/* Nieuwe Schuifregelaars */}
                        <div className="grid grid-cols-1 gap-3 bg-gray-50 dark:bg-gray-750 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div>
                                <label className="block text-xs font-medium text-gray-500">Zichtbaarheid: {Math.round(settings.watermarkOpacity * 100)}%</label>
                                <input type="range" min="0" max="1" step="0.05" value={settings.watermarkOpacity} onChange={(e) => handleChange('watermarkOpacity', parseFloat(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500">Grootte: {Math.round((settings.watermarkSize || 1) * 100)}%</label>
                                <input type="range" min="0.1" max="3" step="0.05" value={settings.watermarkSize || 1} onChange={(e) => handleChange('watermarkSize', parseFloat(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">Horizontaal (X)</label>
                                    <input type="range" min="-400" max="400" step="1" value={settings.watermarkX || 0} onChange={(e) => handleChange('watermarkX', parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500">Verticaal (Y)</label>
                                    <input type="range" min="-600" max="600" step="1" value={settings.watermarkY || 0} onChange={(e) => handleChange('watermarkY', parseInt(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excel Template Achtergrond</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'watermarkUrl')} className="text-xs text-gray-500" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;