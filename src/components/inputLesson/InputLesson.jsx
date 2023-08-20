import React, { useEffect } from 'react';

import st from "./style.module.css";

export default function InputLesson(props) {

    useEffect(()=>{
        console.log("lesson: ", props.lesson);
        // props.changeLesson()
    }, []);

  return (
    <div>InputLesson</div>
  )
}
