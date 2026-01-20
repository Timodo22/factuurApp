import { LineItem } from '../types';

// We verwijderen de GoogleGenAI import en de 'process.env' aanroep volledig.
// Hierdoor verdwijnt de "process is not defined" foutmelding.

export const parseWorkDescriptionToItems = async (rawText: string): Promise<LineItem[]> => {
  console.log("AI-functie is lokaal uitgeschakeld. Ontvangen tekst:", rawText);
  
  // We geven een lege lijst terug zodat de rest van de applicatie (App.tsx) 
  // niet crasht en gewoon het inlogscherm kan tonen.
  return []; 
};