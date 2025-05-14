import "./App.css";
import Users from "./Components/Users";
const usersPromise = fetch("http://localhost:3000/users").then((res) =>
  res.json()
);
function App() {
  return (
    <div className="w-11/12 mx-auto">
      
      <Users usersPromise={usersPromise}></Users>
    </div>
  );
}

export default App;
