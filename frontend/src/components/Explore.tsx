import { useEffect, useState } from "react";

function Explore() {
    const [response, setResponse] = useState([
        { username: "", content: "", time: "", img: "", name: "" },
    ]); // could add an error post

    // Fetching the posts using getposts api backend
    useEffect(() => {
        fetch("http://localhost:8000/api/getexplore/", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                setResponse(res);
                console.log(res);
            });
    }, []);

    function toggleFollow(event) {
        let data = new FormData();
        data.append("username1", localStorage.getItem("email"));
        data.append("username2", event.target.value);

        fetch("http://localhost:8000/api/togglefollowing/", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((res) => alert(res.message));
    }

    return (
        <>
            <h1 id="feed-title" className="page-title">
                Explore
            </h1>
            <h5 className="page-title">Discover new accounts to follow!</h5>
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
                        <div className="col-12">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                value={item.username}
                                onClick={toggleFollow}
                            >
                                Toggle Follow
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Explore;
