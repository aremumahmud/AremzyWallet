import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import axios from 'axios';
import { FaCopy, FaMoneyBillTransfer, FaUser } from 'react-icons/fa6';
import Card from './card';
import QRCodeGenerator from './qrcode';
import usdc from '../assets/usdc.png'
import sol from '../assets/sol.jfif'
import TransferModal from './transferModal';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [token , setTokens] = useState(null)
    const [wallet , setWallet] = useState(0)
    const [modal , setModal] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get('http://localhost:5000/api/current_user', { withCredentials: true });
            console.log(response.data)
            setUser(response.data);
        };

        fetchUser();
    }, []);


    useEffect(()=>{
        const fetchTokens = async () => {
            const response = await axios.get(`http://localhost:5000/api/tokens/${user?user.wallets[wallet].id:''}`, { withCredentials: true });
            console.log(response.data)
            setTokens(response.data);
        };

        user && fetchTokens();
    }, [user , wallet])


    const makeTransfer = async(amount, destination)=>{
        const response = await axios.get(`http://localhost:5000/api/transfer?amount=${amount}&wallet=${user?user.wallets[wallet].id:''}&destination=${destination}`, { withCredentials: true })
        return response.data
    }


    return (
        <div>
            {
                modal && <TransferModal makeTransfer={makeTransfer} amount={token && token[1]?.amount} close={()=>setModal(false)} />
            }
           
           <div className="left">
            <img src={logo} alt="" />
            <FaMoneyBillTransfer onClick={()=>setModal(true)} />
           </div>
           <br />
           <div className="input">
            <select name="" id="" onChange={(e)=>{
                let value = parseInt(e.target.value)
                setWallet(value)
            }}>
                <option value="0">Wallet 1</option>
                <option value="1">Wallet 2</option>
            </select>
           </div>
           <div className="right">
             <div className="left_1">
 {user ? (
                <div>
                  
                    <h2>Welcome, {user.displayName}</h2>
                    <br />
                    {/* <p>Email: {user.email}</p> */}
                    <Card amount={token && token[1]?.amount} />

<br /><br />
                    <p className='title'>Tokens</p>
                    {
                        !token?.length && <div className='empty'>
                            you have no tokens yet
                        </div>
                    }{
                        token?.length && <div className="tokens">
                            {
                                token.map(tk=>{
                                    return <div className="token">
                                <div className="info">
                                    <img src={tk.token.symbol==='USDC'?usdc:sol} alt="d" />
                                    <p>{tk.token.symbol.split('-')[0]}</p>
                                </div>
                                <div className="amount">{tk.amount}</div>
                            </div>
                                })
                            }
                            
                        </div>
                    }
                </div>
            ) : (
                <p>Loading...</p>
            )}
             </div>
             <div className="right_">
              User Wallet Address

              <QRCodeGenerator address={user?.wallets[wallet].address} />

              <div className='copyme'>
                <p>{user?.wallets[wallet].address}</p>
                <FaCopy />
              </div>
             </div>
           
           </div>
            
        </div>
    );
};

export default Dashboard;
