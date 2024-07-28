import { FaGoogle } from "react-icons/fa6";


function Home({handleLogin}) {
  return (
    <div className="body">
      <div className="home"></div>
      <h1>Welcome to ArWallet!</h1>
        <div>
          <button className="google" onClick={handleLogin}>
            <FaGoogle /> Login with Google
          </button>
        </div>
    </div>
  );
}


export default Home