import { NextRequest, NextResponse } from 'next/server'

// Currency code → country mapping (rough)
const COUNTRY_CURRENCY: Record<string, string> = {
  IN: 'INR', // India
  US: 'USD', // United States
  // Eurozone
  DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR', NL: 'EUR', PT: 'EUR',
  AT: 'EUR', BE: 'EUR', FI: 'EUR', IE: 'EUR', GR: 'EUR', SK: 'EUR',
  LU: 'EUR', LV: 'EUR', LT: 'EUR', SI: 'EUR', CY: 'EUR', MT: 'EUR',
  EE: 'EUR', HR: 'EUR',
  GB: 'GBP', // United Kingdom
  CA: 'CAD', // Canada
  AU: 'AUD', // Australia
  NZ: 'NZD', // New Zealand
  CH: 'CHF', // Switzerland
  JP: 'JPY', // Japan
  CN: 'CNY', // China
  BR: 'BRL', // Brazil
  MX: 'MXN', // Mexico
  ZA: 'ZAR', // South Africa
  AE: 'AED', // UAE
  SA: 'SAR', // Saudi Arabia
  SG: 'SGD', // Singapore
  HK: 'HKD', // Hong Kong
}

const COUNTRY_NAMES: Record<string, string> = {
  IN: 'India', US: 'United States',
  DE: 'Germany', FR: 'France', ES: 'Spain', IT: 'Italy', NL: 'Netherlands',
  PT: 'Portugal', AT: 'Austria', BE: 'Belgium', FI: 'Finland', IE: 'Ireland',
  GR: 'Greece', SK: 'Slovakia', LU: 'Luxembourg', LV: 'Latvia', LT: 'Lithuania',
  SI: 'Slovenia', CY: 'Cyprus', MT: 'Malta', EE: 'Estonia', HR: 'Croatia',
  GB: 'United Kingdom', CA: 'Canada', AU: 'Australia', NZ: 'New Zealand',
  CH: 'Switzerland', JP: 'Japan', CN: 'China', BR: 'Brazil', MX: 'Mexico',
  ZA: 'South Africa', AE: 'United Arab Emirates', SA: 'Saudi Arabia',
  SG: 'Singapore', HK: 'Hong Kong',
}

export async function GET(req: NextRequest) {
  // Get country from various headers (Vercel, Cloudflare, etc.)
  const country = (req.headers.get('x-vercel-ip-country') ||
    req.headers.get('x-country-code') ||
    req.headers.get('cf-ipcountry') ||
    req.headers.get('x-geo-country') ||
    '').toUpperCase()

  const currency = COUNTRY_CURRENCY[country] || 'USD'
  const countryName = COUNTRY_NAMES[country] || (country || 'unknown')

  return NextResponse.json({
    country,
    countryName,
    currency,
  })
}
