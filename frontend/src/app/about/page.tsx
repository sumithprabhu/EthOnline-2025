'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    {
      title: "On-Chain Proof of Authorship",
      description: "Each registered project generates file-level SHA-256 hashes, aggregated into a Merkle root and stored on-chain as an immutable timestamped authorship record.",
      icon: "🔗"
    },
    {
      title: "Multi-Layer Plagiarism Detection",
      description: "Our backend performs multi-stage similarity analysis using file hashes, abstract syntax trees (AST), and semantic embeddings to detect exact, structural, and logical code reuse.",
      icon: "🔍"
    },
    {
      title: "Plagiarism Scoring System",
      description: "Combines structural and semantic similarity metrics with repository metadata (commits, contributors, dependencies) to produce a normalized plagiarism probability score.",
      icon: "📊"
    },
    {
      title: "Dispute Resolution Module",
      description: "Supports on-chain dispute claims. When plagiarism is suspected, both parties can submit verification proofs, and community validators or judges vote to finalize resolution.",
      icon: "⚖️"
    },
    {
      title: "Proof Dashboard",
      description: "A front-end interface to visualize verified projects, disputed cases, and similarity reports. Enables transparency across all hackathon submissions.",
      icon: "📈"
    },
    {
      title: "Integration API",
      description: "Provides an SDK or REST API for platforms like Devfolio, ETHGlobal, or DoraHacks to integrate automatic originality checks during project submission.",
      icon: "🔌"
    }
  ];

  const techStack = [
    { name: "Ethereum", description: "On-chain attestations and dispute resolution" },
    { name: "IPFS", description: "Decentralized file storage" },
    { name: "Merkle Trees", description: "Cryptographic fingerprinting" },
    { name: "AST Analysis", description: "Code structure analysis" },
    { name: "Semantic Embeddings", description: "AI-powered similarity detection" },
    { name: "Web3 Integration", description: "Wallet connectivity and smart contracts" }
  ];

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
        <Link href="/api-docs" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          API Docs
        </Link>
        <Link href="/disputes" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          Disputes
        </Link>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-[#8B7355] mb-6">About Proof of Build</h1>
            <p className="text-xl text-black/80 max-w-3xl mx-auto leading-relaxed">
              Proof of Build is a decentralized authorship and plagiarism verification protocol designed to safeguard originality in hackathon and open-source projects. We generate cryptographic fingerprints of codebases, anchor them on-chain as immutable Proof-of-Build attestations, and enable structured dispute resolution through verifiable attestations.
            </p>
          </div>

          {/* Problem Statement */}
          <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl mb-16">
            <h2 className="text-3xl font-black text-[#8B7355] mb-6">The Problem We Solve</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-black mb-4">Current Challenges</h3>
                <ul className="space-y-3 text-black/80">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">❌</span>
                    <span>No standardized way to verify code originality in hackathons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">❌</span>
                    <span>Plagiarism detection relies on manual review</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">❌</span>
                    <span>Disputes lack transparent resolution mechanisms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">❌</span>
                    <span>Authorship claims cannot be cryptographically verified</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-4">Our Solution</h3>
                <ul className="space-y-3 text-black/80">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✅</span>
                    <span>Cryptographic fingerprints for immutable authorship proof</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✅</span>
                    <span>AI-powered multi-layer plagiarism detection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✅</span>
                    <span>On-chain dispute resolution with community governance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✅</span>
                    <span>Universal integration API for hackathon platforms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Core Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-[#8B7355] mb-8 text-center">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 rounded-2xl"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-[#8B7355] mb-3">{feature.title}</h3>
                  <p className="text-sm text-black/80 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-[#8B7355] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl mb-16">
            <h2 className="text-3xl font-black text-white mb-8 text-center">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-[#8B7355] mb-2">{tech.name}</h3>
                  <p className="text-sm text-black/80">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl mb-16">
            <h2 className="text-3xl font-black text-[#8B7355] mb-8 text-center">Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-black mb-4">For Hackathon Organizers</h3>
                <ul className="space-y-2 text-black/80">
                  <li>• Automatic originality verification during submission</li>
                  <li>• Transparent dispute resolution process</li>
                  <li>• Integration with existing platforms (Devfolio, ETHGlobal)</li>
                  <li>• Community-driven validation system</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-4">For Developers</h3>
                <ul className="space-y-2 text-black/80">
                  <li>• Immutable proof of code authorship</li>
                  <li>• Protection against plagiarism claims</li>
                  <li>• Transparent verification process</li>
                  <li>• Integration with existing development workflows</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-[#8B7355] mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-black/80 mb-8">Join the future of decentralized code verification</p>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard">
                <button className="bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-xl font-bold text-white hover:bg-[#8B7355]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                  Verify Your Project
                </button>
              </Link>
              <Link href="/api-docs">
                <button className="bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-xl font-bold text-[#8B7355] hover:bg-gray-50 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                  View API Docs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
