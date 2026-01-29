'use client';

import { Home, FileText, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/home', label: 'Início', icon: Home },
  { href: '#', label: 'Contratos', icon: FileText },
  { href: '#', label: 'Conta', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      <nav className="mx-auto flex h-16 max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 text-xs"
            >
              <Icon
                className={cn(
                  'h-6 w-6',
                  isActive ? 'text-primary' : 'text-gray-500'
                )}
              />
              <span
                className={cn(
                  'font-medium',
                  isActive ? 'text-primary' : 'text-gray-600'
                )}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
