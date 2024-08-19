import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    //const [username, setUsername] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [img, setImg] = useState(null);
    const navigate = useNavigate();

    function submit(event) {
        event.preventDefault();
        const data = new FormData();
        //data.append("username", username);
        data.append("username", localStorage.getItem("email"));
        data.append("content", content);
        data.append("img", img);
        fetch("http://localhost:8000/api/createpost/", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.message === "offensive") {
                    alert(res.reason);
                }
            })
            .then(() => navigate("/"));
    }

    return (
        <form id="create-post-form" target="/">
            <h1 className="page-title">Create</h1>
            {/*
            <div className="mb-3">
                <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                >
                    Username
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            */}
            <div className="mb-3">
                <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                >
                    Content
                </label>
                <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows={3}
                    required
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                    Image
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    required
                    onChange={(e) => setImg(e.target.files[0])}
                />
            </div>
            <div className="col-12">
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={submit}
                >
                    Post
                </button>
            </div>
        </form>
    );
}

export default CreatePost;
