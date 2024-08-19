function Navbar() {

    function logout(event) {
        localStorage.setItem('email', '');
        localStorage.setItem('name', '');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Social Media
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                            >
                                Feed
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/create"
                            >
                                Create Post
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                                onClick={logout}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
    
}

export default Navbar;
