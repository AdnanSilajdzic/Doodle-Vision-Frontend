import Canvas from './components/Canvas';
function App() {
	return (
		<div className="flex flex-col items-center bg-gray-200 p-3">
			<h1>Doodle Vision</h1>
			<p>Draw a picture and see what the AI thinks it is!</p>
			<Canvas />
		</div>
	);
}

export default App;
