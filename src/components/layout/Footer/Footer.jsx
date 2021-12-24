import { SocialMediaBar } from "../../common";

export const Footer = ({ minHeight, maxHeight }) => {
  return (
    <footer
      className="flex flex-col justify-center items-center bg-sky-900"
      style={{ minHeight, maxHeight }}
    >
      <div className="font-cursive text-2xl sm:text-3xl text-gray-100">
        Shivaansh Agarwal
      </div>
      <SocialMediaBar />
    </footer>
  );
};
