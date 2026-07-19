// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { componentDemos, SegmentedControl } from '@/components';
import type { ComponentType } from 'react';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = systemDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }
  }, []);

  const handleThemeChange = (value: string) => {
    const newTheme = value as 'light' | 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <main className="min-h-screen p-8 bg-[var(--color-bg-secondary)] text-[var(--color-text)] transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">MLUI</h1>
            <p className="text-[var(--color-text-secondary)]">
              组件库展示 - 共 {componentDemos.length} 个组件
            </p>
          </div>
          
          <SegmentedControl
            options={[
              { label: '亮色', value: 'light' },
              { label: '暗色', value: 'dark' },
            ]}
            value={theme}
            onChange={handleThemeChange}
          />
        </div>
        
        <div className="space-y-8">
          {componentDemos.map((demo, index) => {
            const Component = demo.component as ComponentType<any>;
            
            return (
              <div 
                key={index} 
                className="bg-[var(--color-bg-card)] p-6 rounded-xl shadow-[0_1px_3px_var(--color-shadow)] border border-[var(--color-border)] transition-colors duration-300"
              >
                <h2 className="text-xl font-semibold mb-2 text-[var(--color-text)]">
                  {demo.title}
                </h2>
                <p className="text-[var(--color-text-secondary)] text-sm mb-4">
                  {demo.description}
                </p>
                
                <div className="space-y-4">
                  {demo.examples.map((example, idx) => (
                    <div key={idx} className="border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0 transition-colors duration-300">
                      <p className="text-[var(--color-text-muted)] text-sm mb-2">
                        {example.label}
                      </p>
                      <Component key={`${index}-${idx}`} {...example.props} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}