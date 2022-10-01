import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function UserProfile() {

    const params = useParams()
    const [profileData, setProfileData] = useState([])

    useEffect(() => {
        async function getUserData() {
            const url = `/user/${params.id.toString()}`
            const response = await axios.get(url)
            setProfileData(response.data)
        }
        getUserData()
    }, [params.id])

    return <>
    <h1>{params.id}</h1>
    <div className="mapdata-userprofile">
    {profileData.map((element, index) => (
      <div id="get-quotes-div" key={index}>
        <p>{element.quote}</p>
    </div>
    ))}
  </div>
    </>
}


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router";

// function Edit() {
//   const [form, setForm] = useState({
//     name: "",
//     position: "",
//     level: "",
//     records: [],
//   });
//   const params = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchData() {
//       const id = params.id.toString();
//       const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

//       if (!response.ok) {
//         const message = `An error has occured: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }

//       const record = await response.json();
//       if (!record) {
//         window.alert(`Record with id ${id} not found`);
//         navigate("/");
//         return;
//       }

//       setForm(record);
//     }

//     fetchData();

//     return;
//   }, [params.id, navigate]);
// }