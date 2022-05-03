import './theme.css';

export const Theme = () => {
    return (
        <div className="customize-theme">
            <div className="card">
                <h2>Редактирование оформления страницы</h2>
                <p className="text-muted">Измените размер шрифта, цвет и фон.</p>

                <div className="font-size">
                    <h4>Размер шрифта</h4>
                    <div>
                        <h6>Aa</h6>
                        <div className="choose-size">
                            <span className="font-size-1"></span>
                            <span className="font-size-2"></span>
                            <span className="font-size-3"></span>
                            <span className="font-size-4"></span>
                            <span className="font-size-5"></span>
                        </div>
                        <h3>Aa</h3>
                    </div>
                </div>

                <div className="color">
                    <h4>Цвет</h4>
                    <div className="choose-color">
                        <span className="color-1 active"></span>
                        <span className="color-2"></span>
                        <span className="color-3"></span>
                        <span className="color-4"></span>
                        <span className="color-5"></span>
                    </div>
                </div>

                <div className="background">
                    <h4>Фон</h4>
                    <div className="choose-bg">
                        <div className="bg-1 active">
                            <span></span>
                            <h5 htmlFor="bg-1">Светлый</h5>
                        </div>
                        <div className="bg-2">
                            <span></span>
                            <h5 htmlFor="bg-2">Темный</h5>
                        </div>
                        <div className="bg-3">
                            <span></span>
                            <h5 htmlFor="bg-3">Черный</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}