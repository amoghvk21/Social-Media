import { useEffect, useState } from "react";

function Feed() {
    const [response, setResponse] = useState([
        { username: "", content: "", time: "", img: "", name: "" },
    ]); // could add an error post

    // Fetching the posts using getposts api backend
    useEffect(() => {
        fetch("http://localhost:8000/api/getposts/", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {setResponse(res); console.log(res)});
    }, []);


    return (
        <>
            <h1 id='feed-title' className='page-title'>{localStorage.getItem('name')}'s Feed</h1>
            {response.map((item, index) => (
                <div className="card mb-3 container" key={index}>
                    <img
                        src={item.img}
                        className="card-img-top images"
                        alt={item.img}
                    />
                    <div className="card-body text">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.content}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                Posted at {item.time}
                            </small>
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Feed;
