import React from "react";

function Header() {
  // copied and pasted from the Ars Technica website.
  return (
    <header className="site-header">
      <div className="header-left">
        <a
          href="https://arstechnica.com"
          id="header-logo"
          title="Ars Technica Homepage"
        >
          <span className="icon icon-logo-ars-us"></span>
        </a>
      </div>
    </header>
  );
}

export default Header;
