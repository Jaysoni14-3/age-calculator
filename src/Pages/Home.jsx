// import AgeCalculatorImage from '../../images/age-calculator.png'
// import BmiCalculatorImage from '../../images/bmi-calculator.png'
// import CalculatorImage from '../../images/calculator.png'
// import CurrencyConverterImage from '../../images/currency-converter.png'
import "./Home.css"

export default function Home (){

    document.title = "Calculators";

    return (
        <div className="home-wrapper">
            <div className="home-page">

                {/*
                 <a href="/age-calculator">
                    <article className="home-article">
                        <div className="image-container">
                            <img src={AgeCalculatorImage} alt="age calculator" />
                        </div>
                        <div className="article-description">
                            <h2 className="article-name">Age Calculator</h2>
                        </div>
                    </article>
                </a>

                <a href="/bmi-calculator">
                    <article className="home-article">
                        <div className="image-container">
                            <img src={BmiCalculatorImage} alt="BMI calculator" />
                        </div>
                        <div className="article-description">
                            <h2 className="article-name">BMI Calculator</h2>
                        </div>
                    </article>
                </a>

                <a href="/calculator">
                    <article className="home-article">
                        <div className="image-container">
                            <img src={CalculatorImage} alt="Calculator" />
                        </div>
                        <div className="article-description">
                            <h2 className="article-name">Calculator</h2>
                        </div>
                    </article>
                </a>

                <a href="/currency-converter">
                    <article className="home-article">
                        <div className="image-container">
                            <img src={CurrencyConverterImage} alt="CurrencyConverterImage" />
                        </div>
                        <div className="article-description">
                            <h2 className="article-name">Currency Converter</h2>
                        </div>
                    </article>
                </a>
                */}

                <a href="/age-calculator">
                    <article className="home-article">
                        <h2 className="article-name">Age Calculator</h2>
                    </article>
                </a>
                <a href="/bmi-calculator">
                    <article className="home-article">
                        <h2 className="article-name">BMI Calculator</h2>
                    </article>
                </a>
                <a href="/calculator">
                    <article className="home-article">
                        <h2 className="article-name">Calculator</h2>
                    </article>
                </a>
                <a href="/currency-converter">
                    <article className="home-article">
                        <h2 className="article-name">Currency Converter</h2>
                    </article>
                </a>

            </div>
        </div>
    )
}