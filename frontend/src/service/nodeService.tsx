import React from "react";
import { IGroup, IShop, IItem, IGroupShop } from '../types/objectTypes'


const axios = require('axios').default;

export class nodeServiceImplement {

    async getGroups() : Promise<Array<IGroup>> {
        const data = axios.get('/groups').then(
            (res: { data: any; }) => {
                return res.data.groups
            }
        )
        return data
    }

    async getGroupItems( selectedGroupId : string) : Promise<Array<IItem>> {
        const data = axios.get(`/items?groupId=${selectedGroupId}`).then(
            (res: { data: any; }) => {
                return res.data.items
            }
        )
        return data
    }

    getShops() {
        axios.get('/shops').then(
            (res: { data: any; }) => {
                return res.data.shops
            }
        )
    }
}