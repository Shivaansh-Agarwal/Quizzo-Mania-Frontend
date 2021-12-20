import { SocialMediaBar } from "./SocialMediaBar.jsx";

export function Footer({ minHeight, maxHeight }) {
  return (
    <footer
      className="flex flex-col justify-center items-center bg-blue-100"
      style={{ minHeight, maxHeight }}
    >
      <div className="font-cursive text-3xl sm:text-4xl">Shivaansh Agarwal</div>
      <SocialMediaBar />
    </footer>
  );
}
