import React from "react";
import A from "../A";

export default function SharePage({ location, title }) {
  return (
    <>
      <span className="ml-1 hidden md:block">Share this story</span>
      <div className="flex">
        <A
          key="facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}
          aria-label="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="35"
            height="35"
            viewBox="0,0,256,256"
          >
            <g>
              <g transform="scale(5.33333,5.33333)">
                <path
                  d="M24,5c-10.49341,0 -19,8.50659 -19,19c0,10.49341 8.50659,19 19,19c10.49341,0 19,-8.50659 19,-19c0,-10.49341 -8.50659,-19 -19,-19z"
                  fill="#4267b1"
                ></path>
                <path
                  d="M26.572,29.036h4.917l0.772,-4.995h-5.69v-2.73c0,-2.075 0.678,-3.915 2.619,-3.915h3.119v-4.359c-0.548,-0.074 -1.707,-0.236 -3.897,-0.236c-4.573,0 -7.254,2.415 -7.254,7.917v3.323h-4.701v4.995h4.701v13.729c0.931,0.14 1.874,0.235 2.842,0.235c0.875,0 1.729,-0.08 2.572,-0.194z"
                  fill="#ffffff"
                ></path>
              </g>
            </g>
          </svg>
        </A>
        <A
          key="twitter"
          href={`https://twitter.com/intent/tweet?text=${title}&via=DVRPC&url=${location}`}
          aria-label="Twitter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="35"
            height="35"
            viewBox="0 0 48 48"
          >
            <path
              fill="#03a9f4"
              d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
            ></path>
            <path
              fill="#fff"
              d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3 c-0.951,0.559-2.671,1.156-3.793,1.372C31.311,15.422,30.033,15,28.617,15C25.897,15,24,17.305,24,20v2c-4,0-7.9-3.047-10.327-6 c-0.427,0.721-0.667,1.565-0.667,2.457c0,1.819,1.671,3.665,2.994,4.543c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057 c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27c0.626,1.935,3.773,2.958,5.928,3c-1.686,1.307-4.692,2-7,2 c-0.399,0-0.615,0.022-1-0.023C14.178,33.357,17.22,34,20,34c9.057,0,14-6.918,14-13.37c0-0.212-0.007-0.922-0.018-1.13 C34.95,18.818,35.342,18.104,36,17.12"
            ></path>
          </svg>
        </A>
        <A
          key="linkedin"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}&amp;title=${title}`}
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="35"
            height="35"
            viewBox="0 0 48 48"
          >
            <path
              fill="#0288d1"
              d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
            ></path>
            <path
              fill="#fff"
              d="M14 19H18V34H14zM15.988 17h-.022C14.772 17 14 16.11 14 14.999 14 13.864 14.796 13 16.011 13c1.217 0 1.966.864 1.989 1.999C18 16.11 17.228 17 15.988 17zM35 24.5c0-3.038-2.462-5.5-5.5-5.5-1.862 0-3.505.928-4.5 2.344V19h-4v15h4v-8c0-1.657 1.343-3 3-3s3 1.343 3 3v8h4C35 34 35 24.921 35 24.5z"
            ></path>
          </svg>
        </A>
        <a
          target="_blank"
          href={`mailto:?to=&subject=${title}&body=I think you may find this resource interesting: ${location}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="35"
            viewBox="0 0 24 24"
            width="35"
          >
            <path
              clip-rule="evenodd"
              d="m22 12c0 5.5228-4.4772 10-10 10-5.52285 0-10-4.4772-10-10 0-5.52285 4.47715-10 10-10 5.5228 0 10 4.47715 10 10zm-14.995-3c0-.55.445-1 .995-1h8c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-8c-.55 0-1-.45-1-1zm4.995 3.5-3.99999-2.50003v5.00003h7.99999v-5.00003zm0-1-3.99999-2.49999h7.99999z"
              fill="#929292"
              fill-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </>
  );
}
