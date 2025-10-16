'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Disputes() {
  const [activeTab, setActiveTab] = useState('browse');
  const [newDispute, setNewDispute] = useState({
    projectId: '',
    evidence: '',
    description: ''
  });

  const disputes = [
    {
      id: 'D-001',
      projectId: '0x1234...5678',
      claimant: '0xabcd...efgh',
      defendant: '0x9876...5432',
      status: 'active',
      createdAt: '2024-01-15',
      description: 'Alleged code plagiarism in hackathon submission',
      evidence: 'Similarity score: 85%',
      votes: { for: 12, against: 8 }
    },
    {
      id: 'D-002',
      projectId: '0x2468...1357',
      claimant: '0x1357...2468',
      defendant: '0x8642...9753',
      status: 'resolved',
      createdAt: '2024-01-10',
      description: 'Disputed authorship of smart contract',
      evidence: 'Git commit timestamps',
      votes: { for: 15, against: 5 }
    },
    {
      id: 'D-003',
      projectId: '0x3691...4702',
      claimant: '0x2580...3691',
      defendant: '0x7410...8520',
      status: 'pending',
      createdAt: '2024-01-20',
      description: 'Suspected template code reuse',
      evidence: 'Code structure analysis',
      votes: { for: 3, against: 1 }
    }
  ];

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle dispute submission
    console.log('Submitting dispute:', newDispute);
    setNewDispute({ projectId: '', evidence: '', description: '' });
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
        <Link href="/dashboard" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          Dashboard
        </Link>
        <Link href="/about" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          About
        </Link>
        <Link href="/api-docs" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          API Docs
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-[#8B7355] mb-4">Dispute Resolution Center</h1>
            <p className="text-lg text-black/80">Transparent, community-driven resolution of plagiarism disputes</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 justify-center">
            {['browse', 'submit', 'my-disputes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#8B7355] text-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                    : 'bg-white text-[#8B7355] border-2 border-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Browse Disputes Tab */}
          {activeTab === 'browse' && (
            <div className="space-y-6">
              <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-2xl">
                <h2 className="text-2xl font-black text-[#8B7355] mb-6">Active Disputes</h2>
                
                <div className="space-y-4">
                  {disputes.map((dispute, index) => (
                    <motion.div
                      key={dispute.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border-2 border-[#8B7355] p-6 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-[#8B7355]">Dispute #{dispute.id}</h3>
                          <p className="text-sm text-black/60">Project: {dispute.projectId}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-xs font-bold ${
                          dispute.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                          dispute.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {dispute.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-black mb-4">{dispute.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="font-bold text-black mb-1">Claimant</h4>
                          <p className="text-sm font-mono text-black">{dispute.claimant}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-black mb-1">Defendant</h4>
                          <p className="text-sm font-mono text-black">{dispute.defendant}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-black mb-1">Evidence</h4>
                          <p className="text-sm text-black">{dispute.evidence}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                          <span className="text-sm text-green-600 font-bold">✅ {dispute.votes.for} votes for</span>
                          <span className="text-sm text-red-600 font-bold">❌ {dispute.votes.against} votes against</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-600 transition-colors">
                            Vote For
                          </button>
                          <button className="bg-red-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-600 transition-colors">
                            Vote Against
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Submit Dispute Tab */}
          {activeTab === 'submit' && (
            <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
              <h2 className="text-2xl font-black text-[#8B7355] mb-6">Submit New Dispute</h2>
              
              <form onSubmit={handleSubmitDispute} className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-black mb-2">Project ID</label>
                  <input
                    type="text"
                    value={newDispute.projectId}
                    onChange={(e) => setNewDispute({...newDispute, projectId: e.target.value})}
                    placeholder="0x1234...5678"
                    className="w-full p-4 border-2 border-[#8B7355] rounded-lg focus:outline-none focus:border-[#8B7355] text-black"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-black mb-2">Dispute Description</label>
                  <textarea
                    value={newDispute.description}
                    onChange={(e) => setNewDispute({...newDispute, description: e.target.value})}
                    placeholder="Describe the alleged plagiarism or code reuse..."
                    rows={4}
                    className="w-full p-4 border-2 border-[#8B7355] rounded-lg focus:outline-none focus:border-[#8B7355] text-black"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-black mb-2">Evidence</label>
                  <textarea
                    value={newDispute.evidence}
                    onChange={(e) => setNewDispute({...newDispute, evidence: e.target.value})}
                    placeholder="Provide evidence of plagiarism (similarity scores, code snippets, timestamps, etc.)"
                    rows={6}
                    className="w-full p-4 border-2 border-[#8B7355] rounded-lg focus:outline-none focus:border-[#8B7355] text-black"
                    required
                  />
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800 mb-2">⚠️ Important Notice</h3>
                  <p className="text-sm text-yellow-700">
                    Submitting false disputes may result in penalties. Ensure you have substantial evidence before proceeding.
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-xl font-bold text-white hover:bg-[#8B7355]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                >
                  Submit Dispute
                </button>
              </form>
            </div>
          )}

          {/* My Disputes Tab */}
          {activeTab === 'my-disputes' && (
            <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
              <h2 className="text-2xl font-black text-[#8B7355] mb-6">My Disputes</h2>
              
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-black mb-2">No disputes found</h3>
                <p className="text-black/60 mb-6">You haven't submitted any disputes yet.</p>
                <button
                  onClick={() => setActiveTab('submit')}
                  className="bg-[#8B7355] border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-lg font-bold text-white hover:bg-[#8B7355]/90 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
                >
                  Submit Your First Dispute
                </button>
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mt-16 bg-[#8B7355] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl">
            <h2 className="text-2xl font-black text-white mb-6 text-center">How Dispute Resolution Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="text-lg font-bold text-white mb-2">Submit Evidence</h3>
                <p className="text-white/80 text-sm">Anyone can submit a dispute with evidence of alleged plagiarism</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="text-lg font-bold text-white mb-2">Community Review</h3>
                <p className="text-white/80 text-sm">Community validators review evidence and vote on the dispute</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="text-lg font-bold text-white mb-2">Final Resolution</h3>
                <p className="text-white/80 text-sm">Dispute is resolved based on majority vote and recorded on-chain</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
