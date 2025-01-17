export function Stats({ icon, alt, data, name }) {
  return (
    <div className="flex items-center gap-1">
      <img src={icon} alt={alt} />
      <p>
        {data} {name}
      </p>
    </div>
  );
}
