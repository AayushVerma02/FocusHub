"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const WatchPage = () => {
    const { videoId } = useParams();
    const playerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); 
        const enterFullScreen = () => {
            if (playerRef.current) {
                const playerContainer = playerRef.current.getInternalPlayer();
                if (playerContainer?.requestFullscreen) {
                    playerContainer.requestFullscreen();
                } else if (playerContainer?.webkitRequestFullscreen) {
                    playerContainer.webkitRequestFullscreen(); // Safari
                } else if (playerContainer?.msRequestFullscreen) {
                    playerContainer.msRequestFullscreen(); // IE/Edge
                }
            }
        };

        enterFullScreen();
    }, []);

    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center">
            {isMounted && (
                <ReactPlayer
                    ref={playerRef}
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    playing={true}
                    controls={true}
                    width="100vw"
                    height="100vh"
                />
            )}
        </div>
    );
};

export default WatchPage;