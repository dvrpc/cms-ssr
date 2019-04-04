import React from "react";

const Layout = ({ title, children }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title} | DVRPC</title>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <header>
          <div>
            <div>
              <img
                src="https://www.dvrpc.org/img/homepage/dvrpclogo70px.png"
                alt="DVRPC"
              />
              <form className="search" action="https://www.dvrpc.org/Search/">
                <div>
                  <svg
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    <path fill="none" d="M0 0h24v24H0z" />
                  </svg>
                </div>
                <input name="q" placeholder="Search..." />
              </form>
            </div>
          </div>
        </header>
        <aside>
          <div className="row full">
            <h2>
              <a href="#">Announcements</a>
            </h2>
            <h2>
              <a href="#">Products</a>
            </h2>
            <h2>
              <a href="#">Events</a>
            </h2>
            <h2>
              <a href="#">Twitter</a>
            </h2>
          </div>
        </aside>
        <div className="row">
          <nav>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Data and Products</a>
              </li>
              <li>
                <a href="#">Long-Range Plan and TIP</a>
              </li>
              <li>
                <a href="#">Transportation</a>
              </li>
              <li>
                <a href="#">Land Use and Environment</a>
              </li>
              <li>
                <a href="#">Planning Assistance Center</a>
              </li>
              <li>
                <a href="#">Commuter Services</a>
              </li>
              <li>
                <a href="#">Get Involved</a>
              </li>
            </ul>
          </nav>
          <div id="root">{children}</div>
        </div>
        <footer>
          <div>
            <div className="footer-left">
              <div>
                <a href="/" className="no-underline" style={{ lineHeight: 1 }}>
                  <img
                    src="https://www.dvrpc.org/img/homepage/logo_small.png"
                    alt="DVRPC"
                    style={{ maxHeight: "40px" }}
                  />
                </a>
                <p>
                  190 N Independence Mall West
                  <br />
                  8th Floor
                  <br />
                  Philadelphia, PA 19106-1520
                  <br />
                  215.592.1800 | fax: 215.592.9125
                </p>
                <p>
                  <a
                    href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
                    rel="noopener"
                    className="btn"
                  >
                    Sign up for our email lists
                  </a>
                </p>
                <p />
              </div>
              <nav>
                <h4>LINKS</h4>
                <ul>
                  <li>
                    <a href="/HumanResources/">Careers</a>
                  </li>
                  <li>
                    <a href="/Consultant/">Consultant Opportunities</a>
                  </li>
                  <li>
                    <a href="">Planning Assistance Center</a>
                  </li>
                  <li>
                    <a href="/DataProducts/">Data and Products</a>
                  </li>
                  <li>
                    <a href="/policies/">Transportation</a>
                  </li>
                  <li>
                    <a href="/policies/">Policies</a>
                  </li>
                  <li>
                    <a href="/Links/">Other Links</a>
                  </li>
                </ul>
              </nav>
              <p>
                <small>
                  DVRPC fully complies with Title VI of the Civil Rights Act of
                  1964, the Civil Rights Restoration Act of 1987, Executive
                  Order 12898 on Environmental Justice, and related
                  nondiscrimination statutes and regulations in all programs and
                  activities. DVRPC's website, www.dvrpc.org, may be translated
                  into multiple languages. Publications and other public
                  documents can be made available in alternative languages and
                  formats, if requested. DVRPC public meetings are always held
                  in ADA-accessible facilities, and in transit-accessible
                  locations when possible. Auxiliary services can be provided to
                  individuals who submit a request at least seven days prior to
                  a public meeting. Requests will be accommodated to the
                  greatest extent possible. Any person who believes they have
                  been aggrieved by an unlawful discriminatory practice by DVRPC
                  under Title VI has a right to file a formal complaint. Any
                  such complaint may be in writing and filed with DVRPC's Title
                  VI Compliance Manager and/or the appropriate state or federal
                  agency within 180 days of the alleged discriminatory
                  occurrence. For more information on DVRPC's Title VI program
                  or to obtain a Title VI Complaint Form, please visit:
                  www.dvrpc.org/GetInvolved/TitleVI, call (215) 592-1800, or
                  email public_affairs@dvrpc.org.
                </small>
              </p>
            </div>
            <div className="ads">
              <div>
                <a href="">
                  <img src="https://www.dvrpc.org/img/LRP_ConnectionsGraphic.png" />
                </a>
                <a href="">
                  <img src="https://www.dvrpc.org/img/AR2018_placard.png" />
                </a>
                <a href="">
                  <img src="https://www.dvrpc.org/img/dvrpcnews.png" />
                </a>
                <a href="">
                  <img src="https://www.dvrpc.org/img/getinvolved.png" />
                </a>
              </div>
            </div>
          </div>
        </footer>
        <script src="main.js" />
      </body>
    </html>
  );
};

export default Layout;
