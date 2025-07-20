import { Link } from "react-router-dom";

export default function ResultCard({
  title,
  description,
  imageSrc,
}) {
  const primaryColor = "#ef427c";
  const primaryHover = "#d3366a";

  return (
    <div
      className="w-full h-72 rounded-xl overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col justify-end h-full">
        <h2
          className="text-4xl font-extrabold font-['Lexend'] mb-2"
          style={{
            color: primaryColor,
            textShadow: "0 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </h2>
        <p
          className="text-lg font-medium font-['Lexend'] mb-4"
          style={{
            color: "#f5f5f5",
            textShadow: "0 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          {description}
        </p>
    
      </div>
    </div>
  );
}
