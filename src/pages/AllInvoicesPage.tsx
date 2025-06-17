import React, { useEffect, useState } from "react"
//@ts-ignore
import { getInvoices } from "../api/invoices"
import {
  FileText,
  Calendar,
  ChevronDown,
  Download,
  Eye,
  Loader2,
  AlertCircle
} from "lucide-react"

interface Invoice {
  id: number
  filename: string
  blob_url: string
  created_at: string
  summary?: string
}

export default function AllInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expandedInvoiceId, setExpandedInvoiceId] = useState<number | null>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getInvoices()
        setInvoices(response.data)
      } catch (err) {
        console.error("Error fetching invoices:", err)
        setError("Failed to load invoices.")
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading invoices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Invoice Dashboard</h1>
        <p className="text-xl text-gray-600">Manage and view all your invoices</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Invoice #{invoice.id}</h3>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm truncate">{invoice.filename}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{new Date(invoice.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {invoice.summary && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Summary:</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {expandedInvoiceId === invoice.id
                      ? invoice.summary
                      : invoice.summary.slice(0, 120) +
                        (invoice.summary.length > 120 ? "..." : "")}
                  </p>
                  {invoice.summary.length > 120 && (
                    <button
                      onClick={() =>
                        setExpandedInvoiceId(
                          expandedInvoiceId === invoice.id ? null : invoice.id
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium flex items-center space-x-1 transition-colors"
                    >
                      <span>
                        {expandedInvoiceId === invoice.id ? "Show Less" : "Read More"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedInvoiceId === invoice.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              )}

              <div className="flex space-x-2">
                <a
                  href={invoice.blob_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </a>
                <a
                  href={invoice.blob_url}
                  download
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {invoices.length === 0 && !loading && (
        <div className="text-center py-12">
          <FileText className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No invoices found</h3>
          <p className="text-gray-500">Upload your first invoice to get started</p>
        </div>
      )}
    </div>
  )
}
