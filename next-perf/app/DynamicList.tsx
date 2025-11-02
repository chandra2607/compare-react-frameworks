'use client';
import { useEffect, useState } from "react";

type Item = { id: number; name: string; value: number };

export default function DynamicList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // simulate API delay
    const timer = setTimeout(() => {
      const data = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.round(Math.random() * 1000),
      }));
      setItems(data);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h3>Dynamic List (200 items)</h3>
      {items.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}: {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
