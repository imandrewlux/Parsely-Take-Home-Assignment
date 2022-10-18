import React from "react";

function Footer() {
  // all of this was copied/pasted from Ars Technica's footer
  return (
    <footer className="site-footer">
      <nav className="nav-footer">
        <section>
          <ul>
            <li>
              <a href="https://arstechnica.com//store/">Store</a>
            </li>
            <li>
              <a href="https://arstechnica.com//store/product/subscriptions/">
                Subscribe
              </a>
            </li>
            <li>
              <a href="https://arstechnica.com//about-us/">About Us</a>
            </li>
            <li>
              <a href="https://arstechnica.com//rss-feeds/">RSS Feeds</a>
            </li>
            <li>
              <a
                rel="nofollow"
                href="http://arstechnica.com/search/?view=mobile"
              >
                View Mobile Site
              </a>
            </li>
          </ul>
        </section>

        <section>
          <ul>
            <li>
              <a href="https://arstechnica.com//contact-us/">Contact Us</a>
            </li>
            <li>
              <a href="https://arstechnica.com//staff-directory/">Staff</a>
            </li>
            <li>
              <a href="https://www.condenast.com/brands/ars-technica">
                Advertise with us
              </a>
            </li>
            <li>
              <a href="https://arstechnica.com//reprints/">Reprints</a>
            </li>
          </ul>
        </section>

        <section className="footer-newsletter">
          <div className="newsletter-wrapper">
            <h3>
              <a href="https://arstechnica.com//newsletters/">
                Newsletter Signup
              </a>
            </h3>
            <p>
              Join the Ars Orbital Transmission mailing list to get weekly
              updates delivered to your inbox.
            </p>
            <a className="button" href="https://arstechnica.com//newsletters/">
              Sign me up →
            </a>
          </div>
        </section>
      </nav>

      <section className="footer-terms-logo">
        <div className="cn-logo">
          <a
            href="http://condenast.com/"
            className="icon icon-logo-cn-us"
            title="Visit Condé Nast"
          >
            Visit Condé Nast
          </a>
        </div>

        <p id="copyright-terms">
          CNMN Collection
          <br />
          WIRED Media Group
          <br />© 2022 Condé Nast. All rights reserved. Use of and/or
          registration on any portion of this site constitutes acceptance of our{" "}
          <a href="https://www.condenast.com/user-agreement/">
            User Agreement
          </a>{" "}
          (updated 1/1/20) and{" "}
          <a href="https://www.condenast.com/privacy-policy/">
            Privacy Policy and Cookie Statement
          </a>{" "}
          (updated 1/1/20) and{" "}
          <a href="/amendment-to-conde-nast-user-agreement-privacy-policy/">
            Ars Technica Addendum
          </a>{" "}
          (effective 8/21/2018). Ars may earn compensation on sales from links
          on this site.{" "}
          <a href="/affiliate-link-policy/">Read our affiliate link policy</a>.
          <br />
          <a href="https://www.condenast.com/privacy-policy/#california">
            Your California Privacy Rights
          </a>
          <br />
          The material on this site may not be reproduced, distributed,
          transmitted, cached or otherwise used, except with the prior written
          permission of Condé Nast.
          <br />
          <a href="https://www.condenast.com/online-behavioral-advertising-oba-and-how-to-opt-out-of-oba/#clickheretoreadmoreaboutonlinebehavioraladvertising(oba)">
            Ad Choices
          </a>
        </p>
      </section>
    </footer>
  );
}

export default Footer;
