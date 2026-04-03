export default function App() {
  const active = true;

  return (
    <div
      className={`p-4${active ? "px-2 px-6" : ""}text-lg`}
    >
      Hello
    </div>
  );
}