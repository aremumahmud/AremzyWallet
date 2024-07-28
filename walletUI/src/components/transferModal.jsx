import { useRef, useState } from "react";
import { FaX } from "react-icons/fa6";

function TransferModal({ close, amount = 0, makeTransfer }) {
  let [error, setError] = useState("");
  let amount_init = useRef();
  let address = useRef();
  let [done, setDone] = useState(false);
  let [disable, setDisable] = useState(false);

  async function validate(e) {
    e.preventDefault();
    setDisable(true);
    let error = true;

    let amount_to_send = parseInt(amount_init.current.value || "0");

    if (amount_to_send <= amount) error = false;

    if (error) {
      setDisable(false);
      return setError("Amount is greater than balance");
    }

    setError("");

    let resp = await makeTransfer(amount_to_send, address.current.value);

    if (resp.error) {
      setDisable(false);
      return setError(resp.message);
    }

    setDone(true);
    location.reload();
  }

  return (
    <div className="transferModal">
      {done ? (
        <div className="inner">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <p>Action</p>
            <FaX
              onClick={close}
              size={10}
              color="white"
              style={{
                padding: ".3rem",
                background: "red",
                borderRadius: "50%",
              }}
            />
          </div>
          <p
            style={{ textAlign: "center", fontSize: ".9rem", padding: "3rem" }}>
            Transaction has been successfully initiated
          </p>
        </div>
      ) : (
        <form className="inner" onSubmit={validate}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <p>Transfer Crypto</p>
            <FaX
              onClick={close}
              size={10}
              color="white"
              style={{
                padding: ".3rem",
                background: "red",
                borderRadius: "50%",
              }}
            />
          </div>
          <small style={{ color: "red" }}>{error}</small>
          <div className="inp">
            Recipient Address
            <input ref={address} type="text" name="address" id="" required />
          </div>
          <div className="inp">
            Amount
            <input
              ref={amount_init}
              type="number"
              name="amount"
              id=""
              required
            />
          </div>
          <button disabled={disable} className="btn">
            initiate Transaction
          </button>
        </form>
      )}
    </div>
  );
}

export default TransferModal;
