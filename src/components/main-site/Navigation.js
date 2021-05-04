import { SearchOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';

import { useHistory } from 'react-router';
import {
    Link
} from "react-router-dom";
const Navigation = (props) => {
    const history = useHistory();
    const handleUserClick = () => {
        history.push('/upload');
    }

    return (
        <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
            <div className='container'>
                <div className='navbar-header'>
                    <button
                        type='button'
                        className='navbar-toggle collapsed'
                        data-toggle='collapse'
                        data-target='#bs-example-navbar-collapse-1'
                    >
                        {' '}
                        <span className='sr-only'>Toggle navigation</span>{' '}
                        <span className='icon-bar'></span>{' '}
                        <span className='icon-bar'></span>{' '}
                        <span className='icon-bar'></span>{' '}
                    </button>
                    <a className='navbar-brand page-scroll' href='#page-top'>
                        Disability Rights
          </a>{' '}
                </div>

                <div
                    className='collapse navbar-collapse'
                    id='bs-example-navbar-collapse-1'
                >
                    <ul className='nav navbar-nav navbar-right'>
                        <li>
                            <Link to="/search">
                                <SearchOutlined /> QAnswer
                            </Link>
                            {/* <a href='#features' className='page-scroll'>
                                <SearchOutlined /> Search
                            </a> */}
                        </li>
                        <li>
                            <a href='#about' className='page-scroll'>
                                Explore
                            </a>
                        </li>
                        <li>
                            <a href='#about' className='page-scroll'>
                                About
              </a>
                        </li>

                        {/* <li>
                            <a href='#portfolio' className='page-scroll'>
                                Gallery
              </a>
                        </li> */}
                        {/* <li>
                            <a href='#testimonials' className='page-scroll'>
                                Testimonials
              </a>
                        </li> */}
                        <li>
                            <a href='#team' className='page-scroll'>
                                Team
              </a>
                        </li>
                        <li>
                            <a href='#contact' className='page-scroll'>
                                Contact
              </a>
                        </li>
                        <li>
                            <Link to="/admin">
                                <UploadOutlined /> Upload
                            </Link>
                        </li>
                        <li>
                            <a href='#contact' className='page-scroll'>
                                <UserOutlined /> Login
              </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navigation