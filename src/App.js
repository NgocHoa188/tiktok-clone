import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/components/Layout/DefaultLayout';
import { UserAuthContextProvider } from '~/context/UserAuthContext';

function App() {
    return (
        <Router>
            <div className="App">
                <UserAuthContextProvider>
                    <Routes>
                        {publicRoutes.map((rou, index) => {
                            let Layout = DefaultLayout;
                            if (rou.layout) {
                                Layout = rou.layout;
                            } else if (rou.layout === null) {
                                Layout = Fragment;
                            }
                            let props = {};
                            if (rou.prop) {
                                props = { isSidebar: false, backgroud: 'rgb(248, 248, 248)' };
                            }
                            const Page = rou.component;
                            return (
                                <Route
                                    key={index}
                                    path={rou.path}
                                    element={
                                        <Layout {...props}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </UserAuthContextProvider>
            </div>
        </Router>
    );
}

export default App;
