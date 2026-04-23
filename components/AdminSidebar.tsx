"use client";

import { useState } from "react";
import Link from "next/link";

interface AdminSidebarProps {
  children: React.ReactNode;
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:flex block">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <span className="font-bold">Admin Panel</span>
        <button onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-white z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-red-800 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-4 text-lg font-bold border-b border-white">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/admin/dashboard" className="block p-2 rounded hover:bg-black">
            Dashboard
          </Link>
          <Link href="/admin/service" className="block p-2 rounded hover:bg-black">
            Service
          </Link>
          <Link href="/admin/customer" className="block p-2 rounded hover:bg-black">
            Customer
          </Link>
          <Link href="/admin/settings" className="block p-2 rounded hover:bg-black">
            Settings
          </Link>
          <Link href="/admin/bills" className="block p-2 rounded hover:bg-black">
            Bills
          </Link>
        </nav>
      </aside>
      <div className="md:ml-64 flex-1 p-4">
        {children}
      </div>
    </div>
  );
}