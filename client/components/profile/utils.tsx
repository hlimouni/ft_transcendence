import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from '../../context/AppContext'
import Router from 'next/router'

export async function fetchMainUser(cntx: any) {

    axios
        .get(`${process.env.SERVER_HOST}/users/me`, {
            withCredentials: true,
        })
        .then((res) => {
            if (res.status === 200) {
                cntx.setMainUser({ ...res.data });
            }
        })
        .catch(() => {
            Router.push("/");
        });
}

export async function fetchFriends(cntx: any) {
    if (!cntx.state.mainUser) {
        fetchMainUser(cntx);
        return;
    }
    try {
        axios
            .get(
                `${process.env.SERVER_HOST}/users/id/${cntx.state.mainUser.id}/friends`,
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log("all users :", res.data);
                cntx.setFriends([...res.data]);
            });
    } catch {
        console.log("main user state :", cntx.state.mainUser);
        console.log("CANT GET ALL USERS");
    }
}
