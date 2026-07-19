'use client';

import { Button, SegmentedControl } from '@/components';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">MLUI</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">分段滑块</h2>
          <SegmentedControl
            options={[
              { label: '每日', value: 'daily' },
              { label: '每周', value: 'weekly' },
              { label: '每月', value: 'monthly' },
            ]}
            defaultValue="daily"
            onChange={(value) => console.log('选中:', value)}
          />
        </div>
      </div>
    </main>
  );
}