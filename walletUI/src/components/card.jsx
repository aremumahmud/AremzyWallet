import { FaCaretRight, FaUser } from "react-icons/fa6"

function Card({amount}){
    return <div className="card">
        <div>
             <p className="top"><FaUser /> Your Portfolio</p>
        <div>
            <p className="balance">${parseInt(amount|| '0')?.toPrecision(3) ||"0.00"}</p>
            <p className="blockchain">USDC</p>
        </div>
        </div>
       <div>
        <FaCaretRight />
       </div>
    </div>
}

export default Card