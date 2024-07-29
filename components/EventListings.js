import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function EventListings( props ) {

    const [apiUpcomingEvents, setApiUpcomingEvents] = useState([]);
    useEffect(() => {
        fetch('/api/get/events')
            .then(response => response.json())
            .then(data => {
                setApiUpcomingEvents(data);
            });
    }, []);

    useEffect(() => {
        console.table(apiUpcomingEvents);
    }, [apiUpcomingEvents]);

    return (
        <>
            <div className="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-full mb-8">
                <div className="w-full h-64 bg-top bg-cover rounded-t">
                    <img src="https://images.unsplash.com/photo-1605305812792-6889462a5bfb?q=80&w=3450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="object-cover w-full h-full rounded-t" alt="" />
                </div>
                <div className="flex flex-col w-full md:flex-row">
                    <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                        <div className="md:text-3xl">Jan</div>
                        <div className="md:text-6xl">13</div>
                        <div className="md:text-xl">7 pm</div>
                    </div>
                    <div className="p-4 font-normal text-gray-800 md:w-3/4">
                        <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">2020 National Championship</h1>
                        <p className="leading-normal">The College Football Playoff (CFP) determines the national champion of the top division of college football. The format fits within the academic calendar and preserves the sport’s unique and compelling regular season.</p>
                        <div className="flex flex-row items-center mt-4 text-gray-700">
                            <div className="w-1/2">
                                Mercedes-Benz Superdome
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}