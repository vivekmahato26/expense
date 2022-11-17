import { useState, useEffect, useRef } from "react";
import { baseUrl } from "../constants";
import axios from "axios";

import "../styles/dashboard.css"
import Expense from "./expense";


const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [show, setShow] = useState(false);
    const addExpFormRef = useRef();

    const token = localStorage.getItem("token");
    const fetchData = async () => {
        try {
            const response = await axios.get(baseUrl + "expenses", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            if (response.data[0]._id) {
                setExpenses(response.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImg = async (event) => {
        event.preventDefault();
        const url = "https://api.cloudinary.com/v1_1/dwdy4lewd/image/upload";
        const formData = new FormData();

        formData.append("upload_preset", "expense");
        const file = addExpFormRef.current.img.files;
        console.log(file);
        formData.append("file", file[0]);

        const response = await axios.post(url, formData);
        if (response.data.url) {
            addExpense(response.data.url);
        }
    }

    const addExpense = async (imgUrl) => {
        const expForm = addExpFormRef.current;
        const body = {
            name: expForm.name.value,
            desc: expForm.desc.value,
            transactionDetails: expForm.transactionDetails.value,
            transactionAccount: expForm.transactionAccount.value,
            amount: expForm.amount.value,
            type: expForm.type.value,
            img: imgUrl
        }

        try {
            const response = await axios.post(baseUrl + "expenses/add", body, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            console.log(response);
            setShow(false)
            fetchData();
        } catch (error) {
            setShow(false)

            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <table border="2">
                <thead>
                    <th>Expense ID</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Created Date</th>
                    <th>Updated Date</th>
                    <th>Transaction Details</th>
                    <th>Transaction Account</th>
                </thead>
                <tbody>
                    {expenses.map(e => (
                        <tr>
                            <td>{e._id}</td>
                            <td>{e.name}</td>
                            <td>{e.amount}</td>
                            <td>{e.desc}</td>
                            <td>{e.createdAt}</td>
                            <td>{e.updatedAt}</td>
                            <td>{e.transactionDetails}</td>
                            <td>{e.transactionAccount}</td>
                            {/* {e.img && <img src={e.img} alt={e.name} />} */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setShow(true)}>Add Expense</button>
            {show && <div className="modal">
                <div className="modalContainer">
                    <p>
                        Add Expenses
                    </p>
                    <form ref={addExpFormRef} onSubmit={(event) => uploadImg(event)}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input name="name" />
                        </div>
                        <div>
                            <label htmlFor="desc">Description</label>
                            <input name="desc" />
                        </div>
                        <div>
                            <label htmlFor="transactionDetails">Transaction Deatils</label>
                            <textarea name="transactionDetails" />
                        </div>
                        <div>
                            <label htmlFor="transactionAccount">Transaction Account</label>
                            <input name="transactionAccount" />
                        </div>
                        <div>
                            <label htmlFor="amount">Amount</label>
                            <input name="amount" type="number" />
                        </div>
                        <div>
                            <label htmlFor="type">Select Type</label>
                            <select name="type">
                                <option value="credit">Credit</option>
                                <option value="debit">Debit</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="img"></label>
                            <input name="img" type="file" accept="image/*,.pdf" />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>}
            <Expense />

        </div>
    )
}

export default Dashboard;