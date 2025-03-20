"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const YouTubeSearch = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPageToken, setNextPageToken] = useState(null);
    const { search } = useParams();
    const router = useRouter();

    const fetchResults = async (pageToken = "") => {
        if (!search) return;
        try {
            const API_KEY = process.env.NEXT_PUBLIC_MY_API;
            if (!API_KEY) throw new Error("API Key is missing!");

            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=50&type=video&key=${API_KEY}&pageToken=${pageToken}`
            );

            if (!response.ok) throw new Error("Failed to fetch results");

            const data = await response.json();
            setResults((prev) => [...prev, ...data.items]); 
            setNextPageToken(data.nextPageToken || null);
        } catch (err) {
            console.error("Error fetching YouTube data:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setResults([]); 
        fetchResults();
    }, [search]);

    return (
        <div style={{ 
            width: "100vw", 
            minHeight: "100vh",
            backgroundColor: "#0f0f0f",
            color: "#fff", 
            padding: "16px" 
        }}>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "16px"
            }}>
                {results.map((video, index) => (
                    <div 
                        key={`${video.id.videoId}-${index}`} 
                        style={{ 
                            background: "#181818",
                            padding: "8px", 
                            borderRadius: "8px",
                            cursor: "pointer"
                        }} 
                        onClick={() => router.push(`/watch/${video.id.videoId}`)}
                    >
                        <img 
                            src={video.snippet.thumbnails.medium.url} 
                            alt={video.snippet.title} 
                            style={{ width: "100%", borderRadius: "8px" }} 
                        />
                        <h3 style={{ fontSize: "16px", marginTop: "8px", color: "#fff" }}>{video.snippet.title}</h3>
                        <p style={{ fontSize: "14px", color: "#aaa" }}>{video.snippet.channelTitle}</p>
                    </div>
                ))}
            </div>

            {nextPageToken && (
                <button 
                    onClick={() => fetchResults(nextPageToken)}
                    style={{
                        marginTop: "16px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        background: "#ff0000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default YouTubeSearch;