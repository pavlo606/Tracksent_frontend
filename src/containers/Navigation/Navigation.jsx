import React, { useEffect, useState } from "react";
import axios from 'axios';
import Fields from "../Fields/Fields";
import MapPage from "../MapPage/MapPage";
import Layout from "../App/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom"
import Home from "../Home/Home";
import { StyledNav } from "./Navigation.styled";
import { fieldContext } from "../../context/fields";


const Navigation = () => {
    const [fields, setFields] = useState([]);

    useEffect(() => {
        const apiUrl = 'https://pavlodykyi.pythonanywhere.com/field';
        axios.get(apiUrl, {
            params: {

            }
        }).then((resp) => {
            const data = resp.data;
            console.log(data);
            setFields(data);
        });
    }, [])

    return (
        <StyledNav>
            <Layout />
            <fieldContext.Provider value={fields}>
                <Routes>
                    {/* <Route path="/login" element={<Login/>}/> */}
                    <Route path="/fields" element={<Fields/>}/>
                    <Route path="/map/:fieldId" element={<MapPage/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </fieldContext.Provider>
        </StyledNav>
    );
};

export default Navigation