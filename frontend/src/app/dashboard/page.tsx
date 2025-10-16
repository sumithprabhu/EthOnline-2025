'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleVerification = async () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setVerificationResult({
        projectId: '0x1234...5678',
        merkleRoot: '0xabcd...efgh',
        timestamp: new Date().toISOString(),
        plagiarismScore: 0.02,
        status: 'verified'
      });
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] font-sans tracking-tight relative overflow-x-hidden">
      {/* Header */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/" className="focus:outline-none">
          <div className="bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg cursor-pointer">
            <h1 className="text-2xl font-black text-white">🔐 Proof of Build</h1>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="absolute top-6 right-6 z-10 flex gap-3">
        <Link href="/about" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold">
          About
        </Link>
        <Link href="/api-docs" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold">
          API Docs
        </Link>
        <Link href="/disputes" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold">
          Disputes
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-[#8B7355] mb-4">Project Verification Dashboard</h1>
            <p className="text-lg text-black/80">Upload your codebase to generate cryptographic fingerprints and verify authorship</p>
          </div>

          {/* Upload Section */}
          <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-black mb-6 text-[#8B7355]">Upload Your Project</h2>
            
            <div className="border-2 border-dashed border-[#8B7355] rounded-lg p-8 text-center mb-6">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.sol"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-6xl mb-4">📁</div>
                <p className="text-lg font-bold text-[#8B7355] mb-2">Drop your files here or click to browse</p>
                <p className="text-sm text-black/60">Supports: JS, TS, Python, Java, C++, Solidity, and more</p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Uploaded Files ({uploadedFiles.length})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#8B7355]">
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-black/60">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleVerification}
              disabled={uploadedFiles.length === 0 || isProcessing}
              className="w-full bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-xl font-bold text-white hover:bg-[#8B7355]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Generate Proof of Build'}
            </button>
          </div>

          {/* Results Section */}
          {verificationResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-black mb-6 text-[#8B7355]">Verification Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-[#8B7355]">
                  <h3 className="font-bold text-[#8B7355] mb-2">Project ID</h3>
                  <p className="text-sm font-mono">{verificationResult.projectId}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#8B7355]">
                  <h3 className="font-bold text-[#8B7355] mb-2">Merkle Root</h3>
                  <p className="text-sm font-mono">{verificationResult.merkleRoot}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#8B7355]">
                  <h3 className="font-bold text-[#8B7355] mb-2">Timestamp</h3>
                  <p className="text-sm">{new Date(verificationResult.timestamp).toLocaleString()}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#8B7355]">
                  <h3 className="font-bold text-[#8B7355] mb-2">Plagiarism Score</h3>
                  <p className="text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      verificationResult.plagiarismScore < 0.1 ? 'bg-green-100 text-green-800' : 
                      verificationResult.plagiarismScore < 0.3 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {(verificationResult.plagiarismScore * 100).toFixed(1)}%
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-green-600 text-xl mr-2">✅</span>
                  <span className="font-bold text-green-800">Project Successfully Verified!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">Your project has been anchored on-chain as an immutable attestation.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
