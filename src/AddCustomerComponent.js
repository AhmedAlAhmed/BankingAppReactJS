import axios from "axios";
import {useMemo, useState} from "react";

const AddCustomerComponent = () => {

    const [form, setForm] = useState({
        email: 'ahmed@gmail.com',
        firstName: 'ahmed',
        lastName: 'al-ahmed',
        token: '',
        cvv: '123',
        cardNumber: '4242424242424242',
        expirationMonth: '4',
        expirationYear: '2024',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const isButtonDisabled = useMemo(() => {
        return !form.cvv || !form.lastName || !form.firstName || !form.email || !form.cardNumber || !form.expirationYear || !form.expirationMonth;
    }, [form]);

    const handleChange = (e) => {
        if (!e) {
            return;
        }

        const {name, value} = e.target;

        setForm({
            ...form, [name]: value,
        });
    }

    const createAccount = () => {
        axios.post('http://localhost:8080/api/v1/accounts/', {
            email: form.email, firstName: form.firstName, lastName: form.lastName, token: form.token,
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then(() => {
                alert("Customer has been added successfully")
            })
            .catch((err) => {
                setErrorMessage(err.message || err);
            });
    }

    const validateCardDetails = (e) => {

        window.Stripe.card.createToken({
            number: form.cardNumber, exp_month: form.expirationMonth, exp_year: form.expirationYear, cvc: form.cvc,
        }, (status, response) => {
            if (status === 200) {
                let token = response.id;
                setForm({
                    ...form, token,
                })
                alert(token);
                setErrorMessage('');
                createAccount();
            } else {
                console.log(response.error.message);
                setErrorMessage(response.error.message);
            }
        });
    }

    return (<div className="container">

        <div className="row justify-content-center mt-3">
            <div className="col-6">
                <div className="card shadow">
                    <div className="card-body">
                        {errorMessage.length > 0 && <div className="alert alert-danger">{errorMessage}</div>}
                        <h3 className="text-center">Add Bank Account</h3>
                        <div className="form-group mt-5">
                            <label>Email:</label>
                            <input className="form-control"
                                   name="email"
                                   onChange={handleChange}
                                   value={form.email} type="email"
                                   placeholder="Enter your email"/>
                        </div>

                        <div className="form-group mt-3">
                            <label>First name:</label>
                            <input className="form-control"
                                   onChange={handleChange}
                                   name="firstName"
                                   value={form.firstName} type="text"
                                   placeholder="ex. John"/>
                        </div>

                        <div className="form-group mt-3">
                            <label>Last name:</label>
                            <input className="form-control"
                                   onChange={handleChange}
                                   name="lastName"
                                   type="text" placeholder="ex. Doe"
                                   value={form.lastName}/>
                        </div>

                        <div className="form-group mt-3">
                            <label>Card details:</label>
                            <p className="text-warning">Link current bank account with international payment
                                (bank).</p>
                            <div className="row mt-4">
                                <div className="col-3">
                                    <label>Card number</label>
                                    <input className="form-control"
                                           onChange={handleChange}
                                           type="text"
                                           name="cardNumber"
                                           value={form.cardNumber}
                                           placeholder="ex. 24242424242424"/>
                                </div>
                                <div className="col-3">
                                    <label>CVV</label>
                                    <input className="form-control"
                                           onChange={handleChange}
                                           name="cvv"
                                           type="text" placeholder="ex. 123" minLength={3}
                                           value={form.cvv}
                                           maxLength={3}/>
                                </div>
                                <div className="col-3">
                                    <label>Expiration month</label>
                                    <input className="form-control"
                                           onChange={handleChange}
                                           name="expirationMonth"
                                           value={form.expirationMonth}
                                           type="number" min={1} max={12} placeholder="4"/>
                                </div>

                                <div className="col-3">
                                    <label>Expiration year</label>
                                    <input className="form-control"
                                           onChange={handleChange}
                                           value={form.expirationYear}
                                           name="expirationYear"
                                           type="number" min={2022} max={2040}
                                           placeholder="2024"/>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                disabled={isButtonDisabled}
                                className="btn btn-primary"
                                type="button"
                                onClick={validateCardDetails}>Create bank
                                account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default AddCustomerComponent;
