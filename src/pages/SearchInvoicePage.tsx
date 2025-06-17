import React, { useState } from "react"
import {
  FileText,
  Calendar,
  Download,
  Eye,
  AlertCircle,
  Search,
  Loader2
} from "lucide-react"
//@ts-ignore
import api from "../api/axios"

interface InvoiceDetail {
  id: number
  filename: string
  blob_url: string
  created_at: string
  summary?: string
  text?: string
}

export default function SearchInvoicePage() {
  const [invoiceId, setInvoiceId] = useState("")
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchInvoice = async () => {
    if (!invoiceId.trim()) return

    setError("")
    setInvoice(null)
    setLoading(true)

    try {
      const response = await api.get(`/invoices/${invoiceId}`)
      setInvoice(response.data)
    } catch (err) {
      console.error("Error fetching invoice:", err)
      setError("Invoice not found. Please check the ID and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchInvoice()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Search Invoice</h1>
        <p className="text-xl text-gray-600">Find invoices by their unique ID</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Invoice ID (e.g., 123)"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
            />
          </div>
          <button
            onClick={fetchInvoice}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Searching...</span>
              </div>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {invoice && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Invoice #{invoice.id}</h2>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Found
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Filename</p>
                    <p className="text-gray-900">{invoice.filename}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Created Date</p>
                    <p className="text-gray-900">
                      {new Date(invoice.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {invoice.summary && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {invoice.summary}
                  </p>
                </div>
              </div>
            )}

            {invoice.text && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">OCR Text</h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                    {invoice.text}
                  </pre>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <a
                href={invoice.blob_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <Eye className="h-5 w-5" />
                <span>Open File</span>
              </a>
              <a
                href={invoice.blob_url}
                download
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
