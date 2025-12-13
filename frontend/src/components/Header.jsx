import React from 'react';

export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200 mb-6 flex-wrap">
            {/* Logo izquierdo */}
            <img src="logo1.jpg" alt="Logo 1" className="h-12 mb-2 sm:mb-0" />

            {/* Logo derecho */}
            <img src="/logo2.png" alt="Logo 2" className="h-12" />
        </header>
    );
}
