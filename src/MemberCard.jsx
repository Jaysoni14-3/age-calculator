import "./MemberCard.css";


export default function MemberCard ({ id, username, userYears, userMonths, userDays, clickEvent }) {
    return (
        <div className="member-card" id={id}>
            <div className="card-header">
                <h1 className="member-name">{username}</h1>
                <button onClick={clickEvent} className="delete-user-btn">x</button>
            </div>
            <div className="card-body">
                <div className="member-age">
                    <h3>{userYears} years </h3>
                    <h3>{userMonths} months</h3>
                    <h3>{userDays} days</h3>
                </div>
            </div>
        </div>
    )
}