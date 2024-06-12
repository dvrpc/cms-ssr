import React from "react";
import Link from "./Link";

const activeClassName = "active text-black";

const MenuItem = ({ activeMenuItem, canonicalUrl, className, node }) => {
  if (!node) return;

  const menuItems =
    node.links?.map((child) => {
      if (activeMenuItem && child.href === activeMenuItem.props.node.href) {
        return (
          <MenuItem
            key={activeMenuItem.props.node.href}
            {...activeMenuItem.props}
            className={activeClassName}
          />
        );
      }
      return <MenuItem key={child.href} node={child} />;
    }) ?? [];

  return (
    <li>
      <Link
        to={node.href}
        className={
          node.href === canonicalUrl
            ? `relative font-bold after:absolute after:left-full after:-rotate-45 after:scale-75 after:not-italic after:text-[#d1d1d1] after:content-['◢'] ${className}`
            : className
        }
      >
        {node.link}
      </Link>
      {menuItems.length ? <ul>{menuItems}</ul> : null}
    </li>
  );
};

export default ({ data }) => {
  if (data === undefined) return null;

  const canonicalUrl = data.href;
  const activeNode = (
    <MenuItem
      canonicalUrl={canonicalUrl}
      node={data}
      className={activeClassName}
    />
  );
  let parentNode;
  if (activeNode.props.node?.parent) {
    parentNode = (
      <MenuItem
        node={activeNode.props.node.parent}
        activeMenuItem={activeNode}
      />
    );

    while (parentNode.props.node.parent) {
      parentNode = (
        <MenuItem
          node={parentNode.props.node.parent}
          activeMenuItem={parentNode}
        />
      );
    }
  } else {
    parentNode = activeNode;
  }

  return (
    <nav className="mb-4 text-right text-lg leading-none [&_.active+ul]:text-black [&_li]:py-0.5 [&_ul_ul]:pt-1 [&_ul_ul]:text-base [&_ul_ul]:text-[#6e6e6e] [&_ul_ul_ul]:text-sm [&_ul_ul_ul_ul]:text-xs">
      <ul>{parentNode}</ul>
    </nav>
  );
};
