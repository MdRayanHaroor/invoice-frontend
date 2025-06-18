// src/context/InvoiceContext.tsx
import React, { createContext, useContext, useState } from 'react'
//@ts-ignore
import { getInvoices } from '../api/invoices'

export interface Invoice {
  id: number
  filename: string
  blob_url: string
  created_at: string
  summary?: string
}

interface InvoiceContextType {
  invoices: Invoice[]
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>
  fetchInvoices: () => Promise<void>
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error('useInvoiceContext must be used within an InvoiceProvider')
  }
  return context
}

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const fetchInvoices = async () => {
    if (invoices.length > 0) return // Avoid refetching if already present
    try {
      const response = await getInvoices()
      setInvoices(response.data)
    } catch (error) {
      console.error('Failed to fetch invoices:', error)
    }
  }

  return (
    <InvoiceContext.Provider value={{ invoices, setInvoices, fetchInvoices }}>
      {children}
    </InvoiceContext.Provider>
  )
}
