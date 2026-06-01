import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function MainLayout({ children }) {
    return (
        <div className="d-flex vh-100">

            <Sidebar />

            <div className="flex-grow-1 d-flex flex-column">

                <Header />

                <main
                    className="flex-grow-1 bg-light p-4 overflow-auto"
                >
                    {children}
                </main>

            </div>

        </div>
    );
}

export default MainLayout;

