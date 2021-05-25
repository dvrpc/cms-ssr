import React from "react";
import tw, { css, GlobalStyles } from "twin.macro";
import { Global } from "@emotion/react";

const CustomGlobalStyles = () => (
	<Global
		styles={css`
			body {
				${tw`font-sans bg-white text-gray-900 m-0 leading-normal`}
			}
			a {
				color: inherit;
				text-decoration: underline;
			}
		`}
	/>
);

export default () => {
	return [<GlobalStyles key={0} />, <CustomGlobalStyles key={1} />];
};
