import React from "react"; 

export const Header = (props) => {
    const {content} = props
    return (
        <div>
            <div className="headerFooter"></div>
                <div>
                    {content}
                </div>
            <div className="headerFooter"></div>
        </div>
    )
}