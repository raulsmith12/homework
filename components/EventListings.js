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
            {apiUpcomingEvents.map(i => {
                const eventDate = new Date(i.event_dates[0]).toUTCString();
                const dateBreakdown = eventDate.split(" ");

                return (
                    <div className="flex flex-col w-full bg-white rounded-md shadow-inner sm:w-3/4 md:w-1/2 lg:w-full mb-8 border-double border-2 border-red-600" key={i.uuid}>
                        <div className={"w-full h-64 bg-top bg-cover rounded-t"}>
                            <img src={i.image_url} alt={i.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col w-full md:flex-row">
                            <div className="flex flex-row justify-around p-4 font-bold leading-none text-slate-50 uppercase bg-slate-500 md:flex-col md:items-center md:justify-center md:w-1/6">
                                <div className="md:text-4xl">{dateBreakdown[2]}</div>
                                <div className="md:text-9xl">{dateBreakdown[1]}</div>
                                <div className="md:text-2xl">{dateBreakdown[3]}</div>
                            </div>
                            <div className="p-4 font-normal text-gray-800 md:w-3/4">
                                <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{i.name}</h1>
                                <p className="leading-normal">{i.description}</p>
                                <div className="flex flex-row items-center mt-4 text-gray-700">
                                    <div className="w-1/2">
                                        <h4 className="md:text-sm">
                                            {i.venue.name}<br />
                                            {i.venue.address_1}<br />
                                            {i.venue.address_2 && (<>{i.venue.address_2}<br /></>)}
                                            {i.venue.city}, {i.venue.state}&nbsp;&nbsp;{i.venue.postal_code}
                                        </h4>
                                    </div>
                                    <div className="w-1/2">
                                        <Link href={i.source_url} target="_blank" rel="nofollow" type="button" className="bg-red-950 hover:bg-red-700 border-2 border-orange-200 hover:border-orange-500 text-white font-semibold p-3 rounded-full">More Info/Buy Tickets</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            )}
        </>
    )
}