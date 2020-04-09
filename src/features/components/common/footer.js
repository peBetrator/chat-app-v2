import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-5">
      <div className="container text-center">
        <p>&copy; 4atik {year}</p>
      </div>
    </footer>
  );
}

export default Footer;
