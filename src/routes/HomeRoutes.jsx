import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';

const HomePageTest = () => (
	<div>
		<h1>This is the Home Page test</h1>
	</div>
);
const HomePage = () => (
	<div>
		<h1>This is the Home Page 2</h1>
	</div>
);

export default function HomeRoutes() {
	return (
		<Routes>
			<Route path='test' element={<HomePageTest />}></Route>
			<Route path='/' element={<HomePage />}></Route>
			<Route path='*' element={<NotFound />}></Route>
		</Routes>
	);
}