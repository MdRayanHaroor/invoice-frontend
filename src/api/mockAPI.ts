export const mockAPI = {
    uploadInvoice: async (file: File) => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      return { success: true, id: Math.floor(Math.random() * 1000) + 1 }
    },
  
    getAllInvoices: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return [
        {
          id: 1,
          filename: "invoice_001.pdf",
          blob_url: "#",
          created_at: new Date().toISOString(),
          summary: "Monthly service charges for cloud hosting and database management. Total amount: $2,450.00. Due date: 2025-07-15. Vendor: CloudTech Solutions."
        },
        {
          id: 2,
          filename: "invoice_002.pdf",
          blob_url: "#",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          summary: "Office supplies and equipment purchase..."
        },
        {
          id: 3,
          filename: "invoice_003.pdf",
          blob_url: "#",
          created_at: new Date(Date.now() - 172800000).toISOString(),
          summary: "Software licensing fees for annual subscription..."
        }
      ]
    },
  
    getInvoiceById: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 800))
      if (Math.random() > 0.7) throw new Error('Invoice not found')
      return {
        id: parseInt(id),
        filename: `invoice_${id.toString().padStart(3, '0')}.pdf`,
        blob_url: "#",
        created_at: new Date().toISOString(),
        summary: "Detailed invoice summary...",
        text: "Invoice text with line items and totals"
      }
    }
  }
  