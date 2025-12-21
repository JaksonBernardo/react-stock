
const MainCard = ({ icon, title, value, subtitle }) => {
    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="icon-box">
                    {icon}
                </div>
                <span className="card-title">{title}</span>
            </div>

            <h2 className="card-value">{value}</h2>

            {subtitle && (
                <div className="card-subtitle">
                    {subtitle}
                </div>
            )}
        </div>
    );
};

export default MainCard;
