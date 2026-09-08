import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)', flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)', flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)', flag: '🇬🇧' },
  INR: { code: 'INR', symbol: '₹', rate: 83.5, label: 'INR (₹)', flag: '🇮🇳' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.36, label: 'CAD (C$)', flag: '🇨🇦' },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.0, label: 'JPY (¥)', flag: '🇯🇵' }
};

export function CurrencyProvider({ children }) {
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem('wem_currency');
      return saved && CURRENCIES[saved] ? saved : 'USD';
    } catch {
      return 'USD';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wem_currency', currentCurrency);
    } catch (e) {
      // ignore
    }
  }, [currentCurrency]);

  const currencyData = CURRENCIES[currentCurrency] || CURRENCIES.USD;

  const convertPrice = (usdAmount) => {
    if (usdAmount === undefined || usdAmount === null) return 0;
    return (parseFloat(usdAmount) * currencyData.rate);
  };

  const formatPrice = (usdAmount) => {
    if (usdAmount === undefined || usdAmount === null) return `${currencyData.symbol}0.00`;
    const converted = convertPrice(usdAmount);
    if (currencyData.code === 'JPY') {
      return `${currencyData.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currencyData.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currentCurrency,
      setCurrentCurrency,
      currencyData,
      convertPrice,
      formatPrice,
      availableCurrencies: Object.values(CURRENCIES)
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
