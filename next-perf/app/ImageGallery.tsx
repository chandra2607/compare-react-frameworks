export default function ImageGallery() {
  const images = Array.from({ length: 25 }).map(
    (_, i) => `https://picsum.photos/seed/${i}/400/300`
  );

  return (
    <div>
      <h3>Image Gallery (25 Lazy Images)</h3>
      <div>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            loading="lazy"
            alt={`Image ${i}`}
            width={400}
            height={300}
          />
        ))}
      </div>
    </div>
  );
}
