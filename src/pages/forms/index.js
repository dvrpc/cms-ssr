import React, {useState} from "react";
import { graphql, Link } from "gatsby";
import LogoBar from "../../components/LogoBar";
import ConnectWithUs from "../../components/ConnectWithUs";
import Icon, {
  DvrpcMini,
} from "../../components/Icon";
import HeadTemplate from "../../components/HeadTemplate";
import Body from "../../components/Body";



const title = "Major Regional Project Intake";
const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer";
const labelClass = "block mb-2 pb-0 text-sm font-medium text-gray-900 dark:text-white peer";



const mrpForm = ({
  data: { userUser: staffContact },
  location,
}) => {
  return (
    <>
     <div className="container mx-auto my-4 grid gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:grid-cols-3">
      <h1 className="mt-1 max-w-[80ch] px-4 text-4xl font-bold text-[color:var(--color-h1)] print:max-w-full print:p-0 md:col-span-2 md:col-start-1 md:p-0">
        {title}
      </h1>
      <div className="px-4 pt-0 print:p-0 md:col-span-2 md:col-start-1 md:row-start-2 md:p-0">
        <main className="max-w-[80ch] print:max-w-full">
          <p>Any introduction text that team feels appropriate/helpful</p>
          <form class="max-w-sm ">
            <div class="mb-2">
              <label for="sponsor" class={labelClass}>Project Sponsor</label>
              <input type="text" id="sponsor" placeholder=" " pattern=".{2,}" class={inputClass} required />
              <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Project sponsor is required
              </span>
            </div>
            <div class="mb-2">
              <label for="applicant" class={labelClass}>Applicant Name</label>
              <input type="text" id="applicant" class={inputClass} required />
            </div>
            <div class="mb-2">
              <label for="state" class={labelClass}>Location of Project</label>
              <select id="state" placeholder="Select state(s)" class={inputClass}>
                <option value="" disabled selected hidden>Select state(s)</option>
                <option value="PA">Pennsylvania</option>
                <option value="NJ">New Jersey</option>
              </select>
            </div>
            <div class="mb-2">
              <label for="existing_mrp" class={labelClass}>Is your project an existing Major Regional Project (MRP) per the current DVRPC Long-Range Plan?</label>
              <select id="existing_mrp" 
                class={inputClass} 
                placeholder=" " 
                required
                onChange={(e) => {
                  const mrpinput = document.getElementById("mrp-id-group")
                  if(e.target.value = 'yes'){
                    mrpinput.classList.remove("hidden")
                  } else {
                    mrpinput.classList.add("hidden")
                  }
                }}>
                <option value="yes">Yes</option>
                <option value="no" selected>No</option>
                <option value="unsure">Unsure</option>
              </select>
            </div>
            <div id="mrp-id-group" class="mb-2 hidden">
              <label for="mrp_id" class={labelClass}>MRP ID</label>
              <input type="text" id="mrp_id" class={inputClass}  />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
              <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
              <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>

            </div>
            
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>

        </main>
      </div>
      
    </div>
      {/* <div className="bg-[#5c4f92] text-white">
        <div className="container mx-auto grid gap-12 px-8 sm:grid-cols-1 md:grid-cols-3">
          <div className="text-left md:col-span-3">
          </div>
        </div>
      </div>
      <div className="bg-[#def6ff] text-[#0078ae]">
        <div className="container mx-auto grid gap-12 p-8 text-sm font-bold sm:grid-cols-2 md:grid-cols-3">
          <div className="col-span-3 text-center"></div>
        </div>
      </div>
      
      <div className="color-[#030a18] flex flex-col bg-gray-200">
        <div className="container mx-auto p-8 pt-0 md:pt-8">
          <h3 className="text-2xl font-bold text-[#0078ae]">
            About the Data Center
          </h3>
          <p className="max-w-2xl">
            The DVRPC Data Center centralizes access to data and applications
            published by DVRPC for planning purposes. Watch this space for
            future content and enhancements as we continue to develop this site.
            If you have suggestions for ways to improve our Data Center, please
            reach out at <a href="mailto:data@dvrpc.org">data@dvrpc.org</a>.
          </p>
        </div>
      </div> */}

      <div className="flex justify-center bg-[#030a18] text-center text-[#99c5c8] md:text-left">
        <div className="container">
          <div className="mt-4 justify-between md:flex">
            <footer className="flow-root md:py-4">
              <a href={`mailto:${staffContact.mail}`} className="font-bold">
                {staffContact.name}
              </a>{" "}
              <small className="text-sm">{staffContact.title}</small>
            </footer>
            <div className="mx-auto w-max md:mx-0">
              <ConnectWithUs
                title={title}
                location={location.pathname}
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
              <Link to="/Policies/">Policies</Link> |{" "}
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
    </>
  );
};

export const Head = () =>
  HeadTemplate({
    title,
    summary:
      "The DVRPC Data Center centralizes access to data and applications published by DVRPC for planning purposes. Watch this space for future content and enhancements as we continue to develop this site.",
    css: `:root {
      --color-h1: #0f1a3a;
      --color-h2: #0f1a3a;
      --color-h3: #0f1a3a;
      --bg-cover-image: url(${bgImage});
      --height-banner: 20vw;
    }`,
  });


export const query = graphql`
  query {
    userUser(mail: { eq: "mruane@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    navItem(href: { regex: "/data/i" }) {
      ...navitem
      links {
        ...navitem
      }
      parent {
        ...navitem
        ... on NavItem {
          links {
            ...navitem
          }
        }
      }
    }
  }
  fragment navitem on NavItem {
    href
    link
    style
    class
  }
`;


export default mrpForm;