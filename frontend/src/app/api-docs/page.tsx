'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState('overview');

  const endpoints = [
    {
      method: 'POST',
      path: '/api/verify',
      description: 'Submit a project for verification',
      parameters: [
        { name: 'files', type: 'File[]', required: true, description: 'Array of source code files' },
        { name: 'metadata', type: 'object', required: false, description: 'Project metadata (name, description, etc.)' }
      ],
      response: {
        projectId: 'string',
        merkleRoot: 'string',
        timestamp: 'string',
        plagiarismScore: 'number',
        status: 'string'
      }
    },
    {
      method: 'GET',
      path: '/api/project/{id}',
      description: 'Get project verification details',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Project ID' }
      ],
      response: {
        projectId: 'string',
        merkleRoot: 'string',
        timestamp: 'string',
        plagiarismScore: 'number',
        status: 'string',
        files: 'File[]'
      }
    },
    {
      method: 'POST',
      path: '/api/dispute',
      description: 'Submit a plagiarism dispute',
      parameters: [
        { name: 'projectId', type: 'string', required: true, description: 'Project ID in dispute' },
        { name: 'evidence', type: 'object', required: true, description: 'Evidence of plagiarism' },
        { name: 'claimant', type: 'string', required: true, description: 'Address of claimant' }
      ],
      response: {
        disputeId: 'string',
        status: 'string',
        timestamp: 'string'
      }
    },
    {
      method: 'GET',
      path: '/api/similarity/{id}',
      description: 'Get similarity analysis for a project',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Project ID' }
      ],
      response: {
        projectId: 'string',
        similarities: [
          {
            targetProjectId: 'string',
            similarityScore: 'number',
            matchType: 'string',
            matchedFiles: 'string[]'
          }
        ]
      }
    }
  ];

  const sdkExamples = {
    javascript: `// Install the SDK
npm install @proofofbuild/sdk

// Initialize the client
import { ProofOfBuild } from '@proofofbuild/sdk';

const client = new ProofOfBuild({
  apiKey: 'your-api-key',
  network: 'mainnet' // or 'testnet'
});

// Verify a project
const result = await client.verifyProject({
  files: ['src/index.js', 'src/utils.js'],
  metadata: {
    name: 'My Hackathon Project',
    description: 'A decentralized app'
  }
});

console.log('Project ID:', result.projectId);
console.log('Merkle Root:', result.merkleRoot);`,

    python: `# Install the SDK
pip install proofofbuild

# Initialize the client
from proofofbuild import ProofOfBuild

client = ProofOfBuild(
    api_key='your-api-key',
    network='mainnet'  # or 'testnet'
)

# Verify a project
result = client.verify_project(
    files=['src/main.py', 'src/utils.py'],
    metadata={
        'name': 'My Hackathon Project',
        'description': 'A decentralized app'
    }
)

print(f"Project ID: {result.project_id}")
print(f"Merkle Root: {result.merkle_root}")`,

    curl: `# Verify a project using cURL
curl -X POST https://api.proofofbuild.io/verify \\
  -H "Content-Type: multipart/form-data" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "files=@src/index.js" \\
  -F "files=@src/utils.js" \\
  -F 'metadata={"name":"My Project","description":"A decentralized app"}'`
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] font-sans tracking-tight relative overflow-x-hidden">
      {/* Header */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/" className="focus:outline-none">
          <div className="bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg cursor-pointer">
            <h1 className="text-2xl font-black text-white">🔐 POBU</h1>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="absolute top-6 right-6 z-10 flex gap-3">
        <Link href="/dashboard" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          Dashboard
        </Link>
        <Link href="/dashboard" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          Dashboard
        </Link>
        <Link href="/disputes" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          Disputes
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-[#8B7355] mb-4">API Documentation</h1>
            <p className="text-lg text-black/80">Integrate POBU into your hackathon platform or application</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 justify-center">
            {['overview', 'endpoints', 'sdk', 'examples'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#8B7355] text-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                    : 'bg-white text-[#8B7355] border-2 border-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
                <h2 className="text-2xl font-black text-[#8B7355] mb-6">Getting Started</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">1. Get API Key</h3>
                    <p className="text-black/80">Sign up for a free API key to start integrating POBU into your platform.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">2. Choose Integration Method</h3>
                    <p className="text-black/80">Use our REST API directly or leverage our SDKs for JavaScript, Python, and other languages.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-2">3. Implement Verification</h3>
                    <p className="text-black/80">Add automatic originality checks to your project submission flow.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#8B7355] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
                <h2 className="text-2xl font-black text-white mb-6">Base URL</h2>
                <div className="bg-black p-4 rounded-lg">
                  <code className="text-green-400 font-mono text-lg">https://api.pobu.io</code>
                </div>
                <p className="text-white/80 mt-4">All API requests should be made to this base URL with appropriate headers and authentication.</p>
              </div>

              <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
                <h2 className="text-2xl font-black text-[#8B7355] mb-6">Authentication</h2>
                <p className="text-black/80 mb-4">Include your API key in the Authorization header:</p>
                <div className="bg-black p-4 rounded-lg">
                  <code className="text-green-400 font-mono">Authorization: Bearer YOUR_API_KEY</code>
                </div>
              </div>
            </div>
          )}

          {/* Endpoints Tab */}
          {activeTab === 'endpoints' && (
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded text-sm font-bold ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono bg-black text-green-400 px-3 py-1 rounded">{endpoint.path}</code>
                  </div>
                  <p className="text-black/80 mb-4">{endpoint.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-black mb-2">Parameters</h4>
                      <div className="space-y-2">
                        {endpoint.parameters.map((param, i) => (
                          <div key={i} className="text-sm">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-black">{param.name}</span>
                            <span className="text-black ml-2">({param.type})</span>
                            {param.required && <span className="text-red-500 ml-1">*</span>}
                            <p className="text-black mt-1">{param.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-[#8B7355] mb-2">Response</h4>
                      <div className="bg-black p-3 rounded text-sm">
                        <pre className="text-green-400 font-mono">{JSON.stringify(endpoint.response, null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SDK Tab */}
          {activeTab === 'sdk' && (
            <div className="space-y-8">
              <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
                <h2 className="text-2xl font-black text-[#8B7355] mb-6">Available SDKs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-[#8B7355]">
                    <h3 className="font-bold text-black mb-2">JavaScript/TypeScript</h3>
                    <code className="text-sm bg-gray-100 p-2 rounded block text-black">npm install @proofofbuild/sdk</code>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-[#8B7355]">
                    <h3 className="font-bold text-black mb-2">Python</h3>
                    <code className="text-sm bg-gray-100 p-2 rounded block text-black">pip install proofofbuild</code>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-[#8B7355]">
                    <h3 className="font-bold text-black mb-2">Go</h3>
                    <code className="text-sm bg-gray-100 p-2 rounded block text-black">go get github.com/proofofbuild/sdk-go</code>
                  </div>
                </div>
              </div>

              <div className="bg-[#8B7355] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
                <h2 className="text-2xl font-black text-white mb-6">SDK Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Core Functions</h3>
                    <ul className="space-y-2 text-white/80">
                      <li>• Project verification</li>
                      <li>• Similarity analysis</li>
                      <li>• Dispute submission</li>
                      <li>• Status checking</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Advanced Features</h3>
                    <ul className="space-y-2 text-white/80">
                      <li>• Batch processing</li>
                      <li>• Webhook support</li>
                      <li>• Rate limiting</li>
                      <li>• Error handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Examples Tab */}
          {activeTab === 'examples' && (
            <div className="space-y-6">
              <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-2xl">
                <h2 className="text-2xl font-black text-[#8B7355] mb-6">Code Examples</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-3">JavaScript/TypeScript</h3>
                    <div className="bg-black p-4 rounded-lg">
                      <pre className="text-green-400 font-mono text-sm overflow-x-auto">{sdkExamples.javascript}</pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-black mb-3">Python</h3>
                    <div className="bg-black p-4 rounded-lg">
                      <pre className="text-green-400 font-mono text-sm overflow-x-auto">{sdkExamples.python}</pre>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-black mb-3">cURL</h3>
                    <div className="bg-black p-4 rounded-lg">
                      <pre className="text-green-400 font-mono text-sm overflow-x-auto">{sdkExamples.curl}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 bg-[#8B7355] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-white">🔐 POBU</h2>
              </div>
              <div className="flex gap-4">
                <a href="https://twitter.com/pobu" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFF8E7] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://t.me/pobu" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFF8E7] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
