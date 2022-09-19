import errorImg from '../public/404.webp'
import Image from 'next/image';
const errorPage = () => {
    return(
        <div className='errorpage'>
            <div style={{
                paddingTop: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>
                <h1>Ooops...</h1>
                <h2>404 Page Not Found.</h2>
            </div>
        </div>
    );
};

export default errorPage;