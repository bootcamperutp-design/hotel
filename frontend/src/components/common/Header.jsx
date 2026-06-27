function Header({
    title 
}) {
    return (
        <header
            className="bg-white border-bottom px-4 py-3"
        >
            <h4 className="m-0">
                {title}
            </h4>
        </header>
    );
}

export default Header;

