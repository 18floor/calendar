import './App.css';
import Calendar from "./components/Calendar";

function App() {
    const now = new Date(2022, 3, 2);
    return (
        <Calendar date={now}/>
    );
}

export default App;
