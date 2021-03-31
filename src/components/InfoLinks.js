import React from "react";
import tw, { css } from "twin.macro";
import Icon from "./Icon";

export default InfoLinks = () => {
	return (
		<aside
			css={css`
				border-top-width: 2px;
				border-image: linear-gradient(to left, #aaa, #fff) 1;
			`}
			tw="pt-4"
		>
			<div tw="grid grid-flow-col auto-cols-fr">
				<a href="https://www.dvrpc.org/Calendar/" tw="block text-center">
					<Icon
						css={css`
							background-position: -296.6px 0;
							width: 37px;
							height: 36px;
							display: block;
							margin: 0 auto 0.25rem;
						`}
					/>
					Events
				</a>
				<a href="https://www.dvrpc.org/News/" tw="block text-center">
					<Icon
						css={css`
							background-position: -259.6px 0;
							width: 37px;
							height: 36px;
							display: block;
							margin: 0 auto 0.25rem;
						`}
					/>
					News
				</a>
				<a href="https://www.dvrpc.org/Data/" tw="block text-center">
					<Icon
						css={css`
							background-position: -223.2px 0;
							width: 36.5px;
							height: 36px;
							display: block;
							margin: 0 auto 0.25rem;
						`}
					/>
					Releases
				</a>
			</div>
		</aside>
	);
};
