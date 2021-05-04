const MainPage = (props) => {
    return (
        <header id='header'>
            <div className='intro'>
                <div className='overlay'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-8 col-md-offset-2 intro-text'>
                                <h1 style={{ color: '#ffffff' }}>
                                    {props.data ? props.data.title : 'Loading'}
                                    <span></span>
                                </h1>
                                <p style={{ color: '#ffffff', fontSize: '30px' }}>{props.data ? props.data.paragraph : 'Loading'}</p>
                                <a
                                    href='#features'
                                    className='btn btn-custom btn-lg page-scroll'
                                >
                                    Learn More
                </a>{' '}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default MainPage;