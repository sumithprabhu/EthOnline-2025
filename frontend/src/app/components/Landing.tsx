'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'What is Proof of Build?',
    a: 'Proof of Build is a decentralized authorship and plagiarism verification protocol designed to safeguard originality in hackathon and open-source projects. It generates cryptographic fingerprints of codebases and anchors them on-chain as immutable attestations.'
  },
  {
    q: 'How does plagiarism detection work?',
    a: 'Our multi-layer detection engine performs similarity analysis using file hashes, abstract syntax trees (AST), and semantic embeddings to detect exact, structural, and logical code reuse across projects.'
  },
  {
    q: 'How do I integrate with hackathon platforms?',
    a: 'We provide an SDK and REST API for platforms like Devfolio, ETHGlobal, and DoraHacks to integrate automatic originality checks during project submission. Contact us for integration details.'
  },
  {
    q: 'What happens in dispute resolution?',
    a: 'When plagiarism is suspected, both parties can submit verification proofs, and community validators or judges vote to finalize resolution through our on-chain dispute resolution module.'
  },
];

export default function Landing() {
  // Only 2 circles on each side, with cream/brown colors
  const backgroundCircles = [
    // Left corners
    { className: 'fixed left-[-40px] top-[-40px] w-40 h-40', color: 'bg-[#8B7355]/70', blur: 'blur-sm', delay: 0 },
    { className: 'fixed left-[-32px] bottom-[-32px] w-32 h-32', color: 'bg-[#D4A574]/70', blur: 'blur', delay: 0.2 },
    // Right corners
    { className: 'fixed right-[-40px] top-[-40px] w-40 h-40', color: 'bg-[#8B7355]/70', blur: 'blur-sm', delay: 0.4 },
    { className: 'fixed right-[-32px] bottom-[-32px] w-32 h-32', color: 'bg-[#D4A574]/70', blur: 'blur', delay: 0.6 },
  ];

  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FFFBF0] font-sans tracking-tight relative overflow-x-hidden">
      {/* Animated cream/brown background circles */}
      {backgroundCircles.map((circle, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 10, repeat: Infinity, delay: circle.delay, ease: 'easeInOut' }}
          className={`${circle.className} ${circle.color} ${circle.blur} rounded-full border-2 border-[#D4A574]/30 pointer-events-none z-0`}
        />
      ))}

      {/* HEADER */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/" className="focus:outline-none">
          <div className="bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg cursor-pointer">
            <h1 className="text-2xl font-black text-white">🔐 Proof of Build</h1>
          </div>
        </Link>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="absolute top-6 right-6 z-10 flex gap-3">
        <Link href="/about" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          About
        </Link>
        <Link href="/api-docs" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          API Docs
        </Link>
        <Link href="/disputes" className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 text-sm font-bold text-black">
          Disputes
        </Link>
      </div>
     

      {/* HERO */}
      <div className="relative pt-24 pb-8 px-4 mb-8">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-5xl bg-gradient-to-r from-[#D4A574] via-[#B8936F] to-[#8B7355] shadow-2xl flex items-center justify-center py-12 px-8 rounded-[3rem]" style={{ clipPath: 'polygon(5% 20%, 15% 5%, 35% 0%, 65% 0%, 85% 5%, 95% 20%, 100% 50%, 95% 80%, 85% 95%, 65% 100%, 35% 100%, 15% 95%, 5% 80%, 0% 50%)' }}>
            <div className="text-center">
              <p className="text-sm font-black mb-8 text-white bg-black px-3 py-2 rounded-lg inline-block">Decentralized Authorship & Plagiarism Verification</p>
              <h3 className="text-5xl font-bold font-black text-white italic mb-2">
                PROOF OF BUILD Protocol
              </h3>
              <h2 className="text-5xl font-black mb-2 text-[#8B7355] bg-[#FFF8E7] px-3 py-2 rounded-lg inline-block italic">for Hackathons & Open Source</h2>
            </div>
          </div>
        </div>
      </div>


      <div className="text-center mb-6">
        <Link href="/dashboard">
          <button className="bg-[#8B7355] border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-12 py-4 rounded-lg text-xl font-bold text-white hover:bg-[#8B7355]/90 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">
            Verify Your Project
          </button>
        </Link>
      </div>

      {/* MAIN CONTENT - BENTO GRID */}
      <div className="max-w-5xl mx-auto px-4 pb-20 mt-16">
        <div className="grid grid-cols-12 gap-6 auto-rows-[180px]">
          {/* Why Proof of Build */}
          <div className="col-span-12 md:col-span-6 row-span-2 bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h2 className="text-xl font-black mb-4 text-white bg-[#8B7355] px-3 py-2 rounded-lg inline-block">Why Proof of Build</h2>
            <p className="text-sm text-black leading-relaxed">Proof of Build safeguards originality in hackathon and open-source projects by generating cryptographic fingerprints of codebases and anchoring them on-chain as immutable attestations. This ensures transparent project verification and protects against plagiarism.</p>
          </div>
          {/* Core Features */}
          <div className="col-span-12 md:col-span-6 row-span-2 bg-[#8B7355] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h2 className="text-xl font-black mb-4 text-white bg-black px-3 py-2 rounded-lg inline-block">Core Features</h2>
            <p className="text-sm text-white mb-4 leading-relaxed">Comprehensive plagiarism detection and verification:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#FFF8E7]"></span><span className="text-white font-semibold">On-chain authorship attestations</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#FFF8E7]"></span><span className="text-white font-semibold">Multi-layer plagiarism detection</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#FFF8E7]"></span><span className="text-white font-semibold">Dispute resolution module</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-[#FFF8E7]"></span><span className="text-white font-semibold">Hackathon platform integration</span></li>
            </ul>
          </div>
          {/* How It Works */}
          <div className="col-span-12 md:col-span-8 row-span-2 bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h2 className="text-xl font-black mb-4 text-white bg-[#8B7355] px-3 py-2 rounded-lg inline-block">How It Works</h2>
            <p className="text-sm text-black mb-4 leading-relaxed">Verify authorship and detect plagiarism in three simple steps:</p>
            <div className="space-y-3">
              <div className="flex items-start"><span className="text-lg font-extrabold text-[#8B7355] mr-3">1</span><div><div className="font-bold text-black mb-1 text-sm">Generate Cryptographic Fingerprint</div><div className="text-xs text-black">Upload your codebase to generate file-level SHA-256 hashes, aggregated into a Merkle root for immutable authorship proof.</div></div></div>
              <div className="flex items-start"><span className="text-lg font-extrabold text-[#8B7355] mr-3">2</span><div><div className="font-bold text-black mb-1 text-sm">Anchor On-Chain Attestation</div><div className="text-xs text-black">Your project's fingerprint is stored on-chain as a timestamped attestation, creating an immutable record of authorship.</div></div></div>
              <div className="flex items-start"><span className="text-lg font-extrabold text-[#8B7355] mr-3">3</span><div><div className="font-bold text-black mb-1 text-sm">Multi-Layer Detection</div><div className="text-xs text-black">Our engine performs similarity analysis using AST and semantic embeddings to detect plagiarism across the ecosystem.</div></div></div>
            </div>
          </div>
          {/* Dispute Resolution */}
          <div className="col-span-12 md:col-span-4 row-span-1 bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h3 className="text-lg font-black mb-2 text-white bg-[#8B7355] px-3 py-1 rounded-lg inline-block">Dispute Resolution</h3>
            <p className="text-black text-sm mt-2">When plagiarism is suspected, both parties can submit verification proofs, and community validators vote to finalize resolution.</p>
          </div>
          {/* Platform Integration */}
          <div className="col-span-12 md:col-span-4 row-span-1 bg-[#FFF8E7] border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h4 className="text-lg font-bold text-white bg-[#D4A574] px-3 py-1 rounded-lg inline-block">Platform Integration</h4>
            <p className="text-black text-sm mt-2">SDK and REST API for platforms like Devfolio, ETHGlobal, and DoraHacks to integrate automatic originality checks.</p>
          </div>
        </div>

        {/* FAQ SECTION - moved up */}
        <section className="relative z-10 px-4 py-16 border-t border-[#8B7355]/20 mt-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl text-black font-black mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-2 border-[#8B7355] rounded-2xl overflow-hidden bg-[#FFF8E7]">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between text-black hover:bg-[#8B7355] hover:text-white transition-all duration-300 focus:outline-none"
                  >
                    <span className="font-medium text-lg">{faq.q}</span>
                    <span className="text-2xl">{expandedFaq === index ? '−' : '+'}</span>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 text-black/80 animate-fade-in bg-[#FFF8E7]">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

    
       
      </div>
    </div>
  );
}