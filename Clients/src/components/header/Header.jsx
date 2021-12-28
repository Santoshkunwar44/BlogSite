import React from 'react';
import HeaderImg from "../Img/header.jpg"

export default function Header() {
    return (
     <>
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img src={HeaderImg} alt={HeaderImg} className="headerImg" />
        </div>
     </>
    )
}
