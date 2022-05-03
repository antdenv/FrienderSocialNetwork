import './loginPage.css';

export const LoginPage = ({children}) => {
    return (
        <div className='login-page'>
            <div className='background-picture'></div>
            <div className='children'>{children}</div>
        </div>
    );
}