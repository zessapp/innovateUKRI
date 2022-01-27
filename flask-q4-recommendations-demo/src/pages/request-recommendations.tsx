import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import React, { useState, useContext } from "react"
import useSWR from "swr"
import { useRouter, withRouter } from "next/router"
import AppContext, { useUserContext } from "../components/AppContext"
const axios = require("axios").default

const Button1 = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 400px;
    cursor: pointer;
`

const Button2 = Button1
const Button3 = Button1
const Button4 = Button1
const Button5 = Button1
const Button6 = Button1

const Button7 = styled.button`
    background-color: green;
    color: white;
    font-size: 20px;
    padding: 10px 30px;
    border-radius: 500px;
    margin: 60px 1000px;
    cursor: pointer;
`

export default function Home() {
    const userContext = useUserContext()
    const allergy = userContext.userData.allergy
    const diet = userContext.userData.diet
    const router = useRouter()

    function request_recommendations({ diet, allergy }) {
        const user_params = {
            diet: diet,
            allergies: allergy,
        }

        fetch(`http://localhost:5000/recommendations`, {
            method: "POST",
            withCredentials: true,
            credentials: "include",
            body: JSON.stringify({
                diet: userContext.userData.diet,
                allergies: userContext.userData.allergy,
            }),
            cache: "no-cache",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "text/html",
            }),
        })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log(
                        `Looks like there was a problem. Status code: ${response.status}`
                    )
                    return
                }
                response.json().then((data) => {
                    console.log(data)
                    userContext.setUserData({
                        ...userContext.userData,
                        meals: data,
                    })
                    router.push("http://localhost:8080/demo-recommendations")
                })
            })
            .catch(function (error) {
                console.log("Fetch error: " + error)
            })
    }

    return (
        <h2 className="title">
            <div>
                <p> Diet: You have selected {diet}.</p>
                <p> Allergens: You have selected {allergy}.</p>
                <Button1 onClick={() => request_recommendations(diet, allergy)}>
                    Recommend me Meals!
                </Button1>
            </div>
            <style jsx global>
                {`
                    .container {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }
                `}
            </style>
            Click <a href="http://localhost:8080">here </a> to go to back
        </h2>
    )
}
