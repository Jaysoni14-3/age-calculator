import { useState } from "react";
import "./CurrencyConverter.css"
import { currencyList } from "../Components/CurrencyList";

export default function CurrencyConverter () {

    const [apiData, setApiData] = useState();

    const [currencyAmmount, setCurrencyAmmount] = useState("");
    const [currencyFromValue, setCurrencyFromValue] = useState("");
    const [currencyToValue, setCurrencyToValue] = useState("");

    document.title = "Currency Converter";

    const getApiData = (wantValue, haveValue, ammountValue) => {
        fetch(`https://api.api-ninjas.com/v1/convertcurrency?want=${wantValue}&have=${haveValue}&amount=${ammountValue}`, {
            method: "GET",
            headers: { 'X-Api-Key': "EBQI8WJAFaRYdXO+jEwUTA==hr4vGTtCUcLnzU5K"},
        })
        .then(res => res.json())
        .then(data => {
            setApiData(data.new_amount);
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
    }

    const getConvertedAmmount = () => {
        const wantValue = currencyToValue;
        const haveValue = currencyFromValue;
        const ammountValue = currencyAmmount;

        getApiData(wantValue, haveValue, ammountValue);
    }
    

    return (
        <>
         <div className="currency-converter">
                <div className="currency-converter-wrapper">
                    <a href="/" className='go-back'><span>🡐</span> Homepage</a>

                    <div className="currency-converter-app">
                        <div className="currency-converter-app-header">
                            <h2>Currency Converter</h2>
                        </div>
                        <div className="currency-converter-app-body">
                            <div className="currency-selector">
                                <div className="currency-from">
                                    <label htmlFor="from">From</label>
                                    <select
                                        name="currencyFrom"
                                        id="from"
                                        onChange={(e) => setCurrencyFromValue(e.target.value)}
                                    >
                                        {currencyList.map(currency => {
                                            return (
                                                <option value={currency.code} key={currency.code}>{currency.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="currency-to">
                                    <label htmlFor="to">To</label>
                                    <select 
                                        name="currencyTo" 
                                        id="to"
                                        onChange={(e) => setCurrencyToValue(e.target.value)}
                                    >
                                        {currencyList.map(currency => {
                                            return (
                                                <option value={currency.code} key={currency.code}>{currency.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="ammount-selector">
                                <label htmlFor="ammountToConvert">Ammount</label>
                                <input 
                                    type="number" 
                                    id="ammountToConvert"
                                    value={currencyAmmount}
                                    onChange={(e) => setCurrencyAmmount(e.target.value)}
                                />
                            </div>
                            <div className="button-container">
                                <button className="btn" onClick={getConvertedAmmount}>Convert</button>
                            </div>
                        </div>
                    </div>

                    {apiData && 
                        <h1>{apiData}</h1>
                    }

                </div>
            </div>


       


        </>
    )
}