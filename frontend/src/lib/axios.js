import axios from "axios"

import React from 'react'

const api = axios.create({
    baseURL: "http://localhost:5001/api"
});

export default api;