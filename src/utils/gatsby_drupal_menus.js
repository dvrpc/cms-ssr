/**
 * MIT License
 *
 * Copyright (c) 2020 Xavier Mirabelli-Montan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import PropTypes from "prop-types";

function createMenuHierarchy(menuData, menuName) {
  let tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0, len = menuData.length; i < len; i++) {
    arrElem = menuData[i].node;
    if (arrElem.menu_name === menuName && arrElem.enabled === true) {
      mappedArr[arrElem.drupal_id] = arrElem;
      if (
        arrElem.drupal_parent_menu_item != null &&
        arrElem.drupal_parent_menu_item.includes(arrElem.bundle)
      ) {
        let stripped_drupal_id = arrElem.drupal_parent_menu_item.replace(
          arrElem.bundle + ":",
          ""
        );
        mappedArr[
          arrElem.drupal_id
        ].drupal_parent_menu_item = stripped_drupal_id;
      }
      mappedArr[arrElem.drupal_id]["children"] = [];
    }
  }

  for (let id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (
        mappedElem.drupal_parent_menu_item &&
        mappedArr[mappedElem.drupal_parent_menu_item] !== undefined
      ) {
        mappedArr[mappedElem.drupal_parent_menu_item]["children"].push(
          mappedElem
        );
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

function buildLink(link) {
  if (/^\/(?!\/)/.test(link.link.url)) {
    return (
      <Link activeClassName="active" to={link.link.url}>
        {link.title}
      </Link>
    );
  } else {
    return (
      <a href={link.link.url} className={"external"}>
        {link.title}
      </a>
    );
  }
}

function buildMenu(menuArray) {
  if (!menuArray) {
    return;
  }
  let menu = [];
  for (let item in menuArray) {
    if (menuArray[item].children.length !== 0) {
      menu.push(
        <li key={menuArray[item].drupal_id}>
          {buildLink(menuArray[item])}
          <ul className="submenu">{buildMenu(menuArray[item].children)}</ul>
        </li>
      );
    } else {
      menu.push(
        <li key={menuArray[item].drupal_id}>{buildLink(menuArray[item])}</li>
      );
    }
  }

  return menu;
}

function generateMenu(menuLinks, menuName) {
  let menu;

  menu = createMenuHierarchy(
    menuLinks.allMenuLinkContentMenuLinkContent.edges,
    menuName
  );
  menu = buildMenu(menu);

  return menu;
}

const Menu = ({ menuName }) => (
  <StaticQuery
    query={graphql`
      query MenuQuery {
        allMenuLinkContentMenuLinkContent(
          sort: { order: ASC, fields: weight }
        ) {
          edges {
            node {
              enabled
              title
              expanded
              external
              langcode
              weight
              link {
                title
                url
              }
              drupal_parent_menu_item
              bundle
              drupal_id
              menu_name
            }
          }
        }
      }
    `}
    render={(data) => (
      <nav className={menuName}>
        <ul>{generateMenu(data, menuName)}</ul>
      </nav>
    )}
  />
);

Menu.propTypes = {
  menuName: PropTypes.string,
};

Menu.defaultProps = {
  menuName: `main`,
};

export default Menu;
