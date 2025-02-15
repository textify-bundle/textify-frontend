import React from "react";

interface QuoteProps{
    content: string;
}
 export  const Quote: React.FC<QuoteProps> = ({content}) => {
    return (
        <blockquote style={{ borderLeft: '5px solid rgb(130,130,130)', paddingLeft: '10px', fontStyle: 'italic', fontWeight:'bold', color: 'rgb(130,130,130)' }}>
            {content}
        </blockquote>
    )
 }