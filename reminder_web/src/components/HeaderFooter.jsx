import React from "react"; 
import { Header } from "./Header";
import { Footer } from "./Footer"

export const HeaderFooter = (props) => {
    return (
        <div className="container">
            <Header/>
            <div className="content">
                {props.children}
            </div>
            <Footer/>
        </div>
    )
} 