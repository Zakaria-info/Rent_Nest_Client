"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Footer navigation links structured logically
  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "Long Term Rentals", href: "/properties?type=long" },
        { label: "Short Term Stays", href: "/properties?type=short" },
        { label: "Property Management", href: "/services" },
        { label: "Verified Owners Panel", href: "/trusted-owners" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Our Nest", href: "/about" },
        { label: "Meet the Team", href: "/team" },
        { label: "Latest Blogs", href: "/blog" },
        { label: "Rental Statistics", href: "/stats" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { label: "Contact Support", href: "/contact" },
        { label: "FAQs", href: "/faq" },
        { label: "Live Chat Assistance", href: "/chat" },
        { label: "Platform Guide", href: "/guide" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Accessibility Status", href: "/accessibility" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Guarantee", href: "/refund-policy" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Upper Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand/Information Block (Occupies 2 columns on wide screens) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-white">
                Rent<span className="font-extrabold text-teal-400">Nest</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Connecting property owners and verified tenants across Bangladesh. Discover, book, and secure your next home with instant transparent digital workflows.
            </p>
            
            {/* Social Media Branding Wrapper (Includes Rebranded X Logo) */}
            <div className="flex items-center gap-3 mt-2">
              <Button isIconOnly size="sm" variant="flat" className="bg-slate-800 text-white hover:bg-teal-500 hover:text-white transition-colors rounded-lg" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </Button>
              {/* Mandatory Rebranded X Logo */}
              <Button isIconOnly size="sm" variant="flat" className="bg-slate-800 text-white hover:bg-teal-500 hover:text-white transition-colors rounded-lg" aria-label="X (formerly Twitter)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </Button>
              <Button isIconOnly size="sm" variant="flat" className="bg-slate-800 text-white hover:bg-teal-500 hover:text-white transition-colors rounded-lg" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </Button>
            </div>
          </div>

          {/* Dynamic Link Mapping Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-teal-400 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="w-full bg-slate-950 py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {currentYear} RentNest Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/terms" className="hover:text-slate-400">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-400">Privacy</Link>
            <Link href="/cookies" className="hover:text-slate-400">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}