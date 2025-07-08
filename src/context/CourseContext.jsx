import { createContext, useState } from "react";


export const CourseContext = createContext();

export const CourseContextProvider = ({children})=>{

    const getNumber = (key) => {
        const val = localStorage.getItem(key);
        const num = Number(val);
        return isNaN(num) ? null : num;
    };

    const [course,setCourse] = useState(localStorage.getItem("course")?JSON.parse(localStorage.getItem("course")):null);
    const [subSection,setSubSection] = useState(localStorage.getItem("subSection")?JSON.parse(localStorage.getItem("subSection")):null);
    const [points,setPoints] = useState(getNumber("points"));

    return(
        <CourseContext.Provider value={{course,setCourse,subSection,setSubSection,points,setPoints}}>
            {children}
        </CourseContext.Provider>
    )
}