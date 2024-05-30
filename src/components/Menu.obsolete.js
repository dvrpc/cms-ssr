import React from "react";
import Link from "./Link";

const activeClassName =
  "active relative font-bold text-black after:absolute after:left-full after:-rotate-45 after:scale-75 after:not-italic after:text-[#d1d1d1] after:content-['◢']";

const MenuItem = ({ node, activeMenuItem, className }) => {
  if (node === undefined) return;
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
      <Link className={className} to={node.href}>
        {node.link}
      </Link>
      {menuItems.length ? <ul>{menuItems}</ul> : null}
    </li>
  );
};

export default ({ data }) => {
  if (data === undefined) return null;
  const activeNode = <MenuItem node={data} className={activeClassName} />;
  let parentNode;
  if (activeNode.props.node.parent) {
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
    <nav className="text-right text-xl [&_.active+ul>li]:py-0.5 [&_.active+ul]:mb-1 [&_.active+ul]:text-black [&_ul_ul]:text-lg [&_ul_ul]:text-[#6E6E6E] [&_ul_ul_ul]:text-base [&_ul_ul_ul_ul]:text-sm">
      <ul>{parentNode}</ul>
    </nav>
  );
};
