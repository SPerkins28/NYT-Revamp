import React from 'react';

const NytDisplay = (props: any) => {
    
    return(
        <div>
            {props.results.length > 0 && props.results.map((article: any, index: number) => {
                let image; 
            
                {if(article.multimedia.length > 0){
                    image=`http://www.nytimes.com/${article.multimedia[0].url}`
                }}
                // console.log(article);
                return (
                    <div key={index}>
                        <h3><a href={article.web_url}>{article.headline.main}</a></h3>
                        <img src={image} style={{width: '300px', height: '300px'}} alt={article.headline.main}/>

                        {article.keywords.length > 0 && article.keywords.map((keyword: any, index: number) => {
                            return(
                                <div key={index}>
                                    <p>{keyword.value}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })} 
        </div>
    )
}

export default NytDisplay;