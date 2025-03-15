import axios from "axios";

export default function createHttpPlugin() {
    const http = axios.create({
        // baseURL: 'https://faceprog.ru/reactcourseapi'
        baseURL: 'http://localhost:4052/'
    })

    return http;
}

