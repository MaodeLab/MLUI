export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-4">MLUI 组件库</h1>
        <p className="text-secondary mb-8">基于 Tailwind CSS 4 + Next.js 16</p>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">按钮组件</h2>
          <div className="flex flex-wrap gap-4">
            {/* ✅ 带内边距的按钮 */}
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              主要按钮
            </button>
            
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
              次要按钮
            </button>
            
            <button className="border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              边框按钮
            </button>
            
            {/* 不同尺寸的按钮 */}
            <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
              小按钮
            </button>
            
            <button className="bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
              大按钮
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}