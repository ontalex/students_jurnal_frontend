import React, { useEffect } from 'react'

export const YandexShare = (props) => {

        useEffect(() => {
                window.Ya.share2('ya', {
                        theme: { 
                                services: '',
                                copy: "extraItem",
                                "data-size": "l"
                        },
                        content: { url: props.link }
                });
        }, [])

        return (
                <div id='ya'></div>
        )
}
