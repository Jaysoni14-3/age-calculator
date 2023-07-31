
import "./Home.css"

export default function Home (){
    return (
        <>
            <div className="home-page">

                <a href="/age-calculator">
                    <article className="home-article">
                        <div className="image-container">
                            <img src="../../images/age-calculator.png" alt="age calculator" />
                        </div>
                        <div className="article-description">
                            <h2 className="article-name">Age Calculator</h2>
                        </div>
                    </article>
                </a>

                <a href="/bmi-calculator">
                    <article className="home-article">
                        <div className="image-container">
                            <img src="../../images/BMI-calculator.png" alt="BMI calculator" />
                        </div>
                        <div className="article-description">
                            <h2 className="article-name">BMI Calculator</h2>
                        </div>
                    </article>
                </a>

            </div>
        </>
    )
}