import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePlaylist from "./pages/playlist/index";
import LoginPage from "./pages/login/index";
import "./App.css";

export default function App() {
	const token = useSelector((state) => state.auth.accessToken);

	return (
		<div className="container">
			<Router>
				<Switch>
					<Route path="/create-playlist">
						{token !== "" ? <CreatePlaylist /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/">
						{token !== "" ? (
							<Redirect to="/create-playlist" />
						) : (
							<LoginPage />
						)}
					</Route>
				</Switch>
			</Router>
		</div>
	);
}