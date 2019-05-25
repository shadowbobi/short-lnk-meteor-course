import React from 'react';
import { Link } from "react-router";

export default () => {
    return (
        <div className={"box-view"}>
            <div className={"box-view__box"}>
                <h1>NotFound component here</h1>
                <p>Hmm, we'are unable to find that page</p>
                <Link className={"button button--link"} to={"/"}>HEAD HOME</Link>
            </div>
        </div>
    );
};