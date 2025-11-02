export default function LongTextContent() {
  const paragraph =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(1000);

  return (
    <div>
      <h3>Long Static Content (~200KB)</h3>
      <p>{paragraph}</p>
    </div>
  );
}
