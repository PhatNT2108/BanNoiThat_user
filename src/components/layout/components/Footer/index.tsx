import { memo } from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Trần Tuấn Anh và Nguyễn Tấn Phát.</p>
        <nav className="mt-4">
          <a href="/about" className="mx-2 hover:underline">
            About
          </a>
          <a href="/contact" className="mx-2 hover:underline">
            Contact
          </a>
          <a href="/privacy" className="mx-2 hover:underline">
            Privacy Policy
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default memo(Footer);
