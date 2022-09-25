import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AdminLayout from 'layouts/Admin/Admin.js';

import 'assets/scss/black-dashboard-react.scss';
import 'assets/demo/demo.css';
import 'assets/css/nucleo-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ThemeContextWrapper from './components/ThemeWrapper/ThemeWrapper';
import BackgroundColorWrapper from './components/BackgroundColorWrapper/BackgroundColorWrapper';
import LandingLayout from 'layouts/Landing/Landing';
import UserAndRecordsWrapper from 'components/UserAndRecordsWrapper/UserAndRecordsWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ThemeContextWrapper>
		<BackgroundColorWrapper>
			<UserAndRecordsWrapper>
				<BrowserRouter>
					<Switch>
						<Route
							path='/'
							exact
							render={(props) => <LandingLayout {...props} />}
						/>
						<Route
							path='/black-dashboard-react'
							exact
							render={(props) => <LandingLayout {...props} />}
						/>
						<Route
							path='/admin'
							render={(props) => <AdminLayout {...props} />}
						/>
					</Switch>
				</BrowserRouter>
			</UserAndRecordsWrapper>
		</BackgroundColorWrapper>
	</ThemeContextWrapper>
);
