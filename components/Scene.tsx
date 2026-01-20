type SceneProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export function Scene({ children, style = {}, className = "" }: SceneProps) {
  return (
    <section
      style={style} className={`w-full overflow-hidden ${className}`}
    >
      <div className="top-0">
        {children}
      </div>
    </section>
  );
}