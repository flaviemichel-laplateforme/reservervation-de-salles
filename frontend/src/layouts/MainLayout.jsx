// layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import PageTransition from '../components/PageTransition/PageTransition.jsx';

function MainLayout() {
    return (
        <>
            <Header />
            <main>
                <PageTransition>
                    <Outlet />
                </PageTransition>
            </main>
            <Footer />
        </>
    );
}
export default MainLayout;