import React, { useState } from "react"
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
//@ts-ignore
import { uploadInvoice } from "../api/invoices"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<"" | "success" | "error">("")
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0])
      setMessage("")
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
      setMessage("")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleUpload = async () => {
    if (!file) return
    try {
      setUploading(true)
      await uploadInvoice(file)
      setMessage("success")
      setFile(null)
    } catch (error) {
      setMessage("error")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Upload Your Invoice</h1>
          <p className="text-xl text-gray-600">Drag and drop your PDF files or click to browse</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragOver
                ? "border-blue-500 bg-blue-50 scale-105"
                : file
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <div className="flex flex-col items-center space-y-4">
              {file ? (
                <>
                  <div className="bg-green-100 rounded-full p-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-green-700">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-blue-100 rounded-full p-4">
                    <Upload className="h-12 w-12 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      {isDragOver ? "Drop your file here" : "Drag & drop your PDF file here"}
                    </p>
                    <p className="text-gray-500">or click to select from your computer</p>
                  </div>
                </>
              )}
            </div>
            <input
              id="fileInput"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
              !file || uploading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            }`}
          >
            {uploading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Uploading...</span>
              </div>
            ) : (
              "Upload Invoice"
            )}
          </button>

          {message && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                message === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                {message === "success" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span className="font-medium">
                  {message === "success" ? "Upload successful!" : "Upload failed. Please try again."}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
