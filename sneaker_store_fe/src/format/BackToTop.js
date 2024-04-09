import { useState } from "react";
import React from "react";
import { useEffect } from "react";
export const ScrollBackToTop = ()=>{
        const [showsScrolBtn, setShowScrolBtn] = useState(false);
        useEffect(() => {
          window.scrollTo(0,0)
          const handleButtonVisibility = () => {
            window.pageYOffset > 300 ? setShowScrolBtn(true) : setShowScrolBtn(false);
          };
      
          window.addEventListener("scroll", handleButtonVisibility);
          return () => {
            window.addEventListener("scroll", handleButtonVisibility);
          };
        }, []);
}