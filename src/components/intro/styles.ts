import styled from 'styled-components';
import LogoSource from 'assets/logo.png'
import map1 from 'assets/map1.png'
import map2 from 'assets/map2.png'
import {device} from 'GlobalStyles';
import React from 'react';


export const LocationWrapper = styled.div`

    
    .location_name_title {
        padding-left : 35px;
        margin-bottom :25px;
        background-image : url(${map1});
        background-repeat : no-repeat;
        background-position : top left;
        background-position-y :3px;
        background-size : 16px;
    }

    .location_address_div {
        padding-left : 35px;
        margin-bottom : 25px;
        background-image: url(${map2});
        background-repeat : no-repeat;
        background-position : top left;
        background-position-y : 3px; 
        background-size : 13px;
        &:hover {
            background : black;
        }
        
    }

    .location_address_title{
       list-style : none;
       float : left;
       font-weight : bold;
       margin : 0px; 
       padding : 0px;
    }

    .location_address_body{
        list-style : none;
        margin : 0px;
        padding : 0px;
    }

    .traffic_ul{
        margin-bottom : 70px;
        padding-top : 40px;
        padding-left : 0px;
        border-top-color : #eeeeee;
        border-top-width : 1px;
        border-top-style : solid;
    }

    .traffic_li{
        padding-left : 165px;
        margin-bottom : 60px;
        background-repeat : no-repeat;
        background-position : center left;
        list-style : none;
        background-size : 140px;
        min-height : 140px;
    }


`;
export const PeopleWrapper = styled.div`

    .ant-list-sm .ant-list-item {
    	padding: 2px 0px;
    }
    
`;
