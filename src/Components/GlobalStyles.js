import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Gugi&family=Noto+Sans+KR:wght@400;500;700;900&display=swap');
    
    ${reset};
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body{
        font-family: "Noto Sans KR",-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        font-size: 12px;
        background-color: rgba(30, 30, 30, 1);
        color: white;
        padding-top: 50px;
    }
`;

export default globalStyles;
