export default function List({ items }) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">No items yet</p>;
  }

  return (
    <ul className="mt-4 w-full max-w-sm space-y-2">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="rounded-md bg-white px-4 py-2 shadow-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

