import React, { useEffect, useState } from 'react';
import { graphql, Link } from 'gatsby';
import favicon from '../../images/favicon.ico';
import LogoBar from '../../components/LogoBar';
import Icon, {
  Bikeped,
  Housing,
  Environment,
  Freight,
  Imagery,
  Planning,
  Tip,
  Region,
  Economy,
  Equity,
  Highways,
  Connections2050,
  Health,
  Transit,
  DvrpcMini,
} from '../../components/Icon';
import ConnectWithUs from '../../components/ConnectWithUs';
import bgImage from '../../images/datacenter.jpg';
import Banner from '../../components/datacenter/Banner';
import AppCard from '../../components/datacenter/AppCard';
import Carousel from '../../components/common/Carousel';

const NewsLoader = () => <div>Loading...</div>;

export const Head = () => {
  return (
    <>
      <link rel="icon" href={favicon} />
      <style>
        {`:root {
      --color-h1: #0f1a3a;
      --color-h2: #0f1a3a;
      --color-h3: #0f1a3a;
      --bg-cover-image: url(${bgImage});
      --height-banner: 25vw;
    }`}
      </style>
    </>
  );
};

const Data = ({ data }) => {
  const location = '/data';
  const title = 'Data Center';
  const staffContact = {
    mail: 'kkorejko@dvrpc.org',
    field_display_name: 'Kim Korejko',
    field_title: 'Manager, Data Coordination',
  };
  const menu = { href: location };

  const [apps, setApps] = useState([]);
  const [cursor, setCursor] = useState(0);
  useEffect(() => {
    fetch('https://www2.dvrpc.org/api/pubs/type/WEB')
      .then((response) => response.json())
      .then((resultData) => setApps(resultData));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white">
        <LogoBar />
        <Banner />
      </header>
      <div className="bg-[#5c4f92] text-white">
        <div className="container mx-auto grid gap-12 px-8 sm:grid-cols-1 md:grid-cols-3">
          <div className="text-center md:col-span-3">
            <ul className="my-3 flex list-none justify-items-stretch">
              <li className="flex-1">
                <Link className="no-underline hover:underline" to="/data/about">
                  About
                </Link>
              </li>
              <li className="flex-1">
                <a
                  className="no-underline hover:underline"
                  href="https://data.dvrpc.org/"
                >
                  Data Catalog
                </a>
              </li>
              <li className="flex-1">
                <Link className="no-underline hover:underline" to="/data/maps">
                  Maps and Apps
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  className="no-underline hover:underline"
                  to="/data/howdoi"
                >
                  How do I?
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  className="no-underline hover:underline"
                  to="/data/stayinformed"
                >
                  Stay Informed
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex p-8">
        <div className="container mx-auto p-8 pl-0">
          DVRPC has developed several interactive mapping applications as part
          of our continuing effort to support planning and improve
          decision-making in our region. Within each application, you can view
          geographic features, query selective data sets, create your own custom
          map and access detailed reports about certain features. These web
          mapping applications allow DVRPC to present geospatial information to
          the public without the need of special GIS software. DVRPC will
          continue to add mapping applications in the future so check back
          frequently. For more information regarding DVRPC's full GIS services
          or to order custom maps, contact the Office of GIS.{' '}
        </div>
        <div className="flex flex-col divide-y divide-[#53a3c7]">
          {apps.slice(0, cursor + 5).map((app) => (
            <div className="p-4">
              <h4 className="text-[#0078ae]">{app.Title}</h4>
              <div className="flex space-x-4">
                <img
                  src={`https://www.dvrpc.org/asp/pubs/201px/${app.PubId}.png`}
                ></img>
                <span className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </span>
              </div>
            </div>
          ))}
          <button
            onClick={() => setCursor(cursor + 5)}
            style={{ display: cursor >= apps.length && 'none' }}
            className="mx-auto rounded-lg bg-[#5c4f92] p-2 text-white"
          >
            Show More
          </button>
        </div>
      </div>

      <div className="mt-auto flex justify-center bg-[#030a18] text-center text-[#99c5c8] md:text-left">
        <div className="container">
          <div className="mt-4 justify-between md:flex">
            <footer className="flow-root md:py-4">
              <a href={`mailto:${staffContact.mail}`} className="font-bold">
                {staffContact.field_display_name}
              </a>{' '}
              <small className="text-sm">{staffContact.field_title}</small>
            </footer>
            <div className="mx-auto w-max md:mx-0">
              <ConnectWithUs
                title={title}
                location={`https://www.dvrpc.org${location}`}
                fillColor="#99c5c8"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="-mt-1 flex justify-center bg-[#030a18] text-center text-[#99c5c8] md:text-left">
        <div className="container md:text-left">
          <div className="mb-4 justify-between md:flex">
            <div className="leading-none">
              <Link to="/" className="no-underline">
                <Icon
                  use={DvrpcMini}
                  className="mx-auto h-8 md:mx-0"
                  fillColor="#99C5C8"
                />
              </Link>
              <small>
                190 N Independence Mall West, 8th Floor
                <br />
                Philadelphia, PA 19106-1520
                <br />
                215.592.1800
              </small>
            </div>
            <small className="mt-4 self-end md:m-0">
              <Link to="/Policies/">Policies</Link> |{' '}
              <a
                href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
                rel="noopener"
              >
                Sign Up for Our Email Lists
              </a>
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Data;

export const query = graphql`
  query {
    allMenuLinkContentMenuLinkContent(
      filter: {
        menu_name: { eq: "data-center-featured-apps" }
        enabled: { eq: true }
      }
      sort: { fields: weight }
    ) {
      edges {
        node {
          entity {
            title
            body {
              processed
            }
            field_product_id
            field_url {
              uri
            }
          }
        }
      }
    }
  }
`;
