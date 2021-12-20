export function Header({ minHeight, maxHeight }) {
  return (
    <header
      className="bg-blue-100 pl-4 flex flex-row justify-between items-center w-full"
      style={{ minHeight, maxHeight }}
    >
      <div className="font-permanentmarker text-5xl">Quizzo Mania</div>
    </header>
  );
}
