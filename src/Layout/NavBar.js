/**
 * When given a route that is one level from Home,
 * renders Home with a link and CurrentPage without (active).
 * When given a route that is two levels from home,
 * renders the level before CurrentPage with a link.
 */
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ currentPage, pastPage = {} }) {
  const renderPastPage = () => {
    return (
      pastPage.url && (
        <li className="breadcrumb-item">
          <Link to={pastPage.url}>{pastPage.name}</Link>
        </li>
      )
    );
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {renderPastPage()}
        <li className="breadcrumb-item active" aria-current="page">
          {currentPage}
        </li>
      </ol>
    </nav>
  );
}
