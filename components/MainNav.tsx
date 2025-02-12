'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: '/grupos',
      label: 'Grupos',
      active: pathname === '/grupos',
    },
    {
      href: '/misioneros',
      label: 'Misioneros',
      active: pathname === '/misioneros',
    },
    {
      href: '/salidas',
      label: 'Salidas',
      active: pathname === '/salidas',
    },
    {
      href: '/usuarios',
      label: 'Usuarios',
      active: pathname === '/usuarios',
    },
  ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
