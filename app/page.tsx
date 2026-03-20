export default function GuaranteedRays() {
  return (
    <div className="h-screen w-full bg-black flex flex-col">
      <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
        <h1 className="text-white font-bold tracking-tighter uppercase text-sm">Project: Guaranteed Rays</h1>
        <a href="/" className="text-zinc-500 hover:text-white text-xs transition-colors font-mono">/back_to_lab</a>
      </div>
      <iframe src="http://localhost:3002" className="flex-grow w-full border-0" title="Guaranteed Rays" />
    </div>
  );
}
