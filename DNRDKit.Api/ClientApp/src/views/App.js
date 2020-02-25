import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Layout from '../layouts/Layout';
//Import toastify styles
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Suspense fallback={<Spinner style={{ width: '3rem', height: '3rem' }} />}>
                <Layout />
            </Suspense>
        </Router>
    );
};

export default App;