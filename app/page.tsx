// app/page.tsx
'use client';

import { componentDemos } from '@/components';
import type { ComponentDemo } from '@/components';
import type { ComponentType } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">MLUI</h1>
        <p className="text-gray-600 mb-8">组件库展示 - 共 {componentDemos.length} 个组件</p>
        
        <div className="space-y-8">
          {componentDemos.map((demo, index) => {
            // 使用类型断言，因为 demo.component 可能是任何组件
            const Component = demo.component as ComponentType<any>;
            
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-2">{demo.title}</h2>
                <p className="text-gray-500 text-sm mb-4">{demo.description}</p>
                
                <div className="space-y-4">
                  {demo.examples.map((example, idx) => (
                    <div key={idx} className="border-t pt-4 first:border-t-0 first:pt-0">
                      <p className="text-sm text-gray-400 mb-2">{example.label}</p>
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