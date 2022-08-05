import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const Navbar = () => {
    const { isLoggedIn, activeUploadModal, handleActiveUploadModal } = useAppContext();

    const navigate = useNavigate();

    const handleUploadButton = () => {
        if(isLoggedIn && !activeUploadModal) handleActiveUploadModal(true);
        else  navigate('/login',{replace:true});
    }
    return (
        <header className='border-b-2 border-solid border-gray-200'>
            <nav className='max-w-[1200px] mx-auto p-4 py-8 flex justify-between items-center'>
                <div>
                    <h2 className='text-xl font-medium text-red-900'>Photo Library</h2>
                </div>
                <div className='flex gap-4 text-sm items-center'>
                    {isLoggedIn || <div className='flex gap-2'>

                        <Link to='/login' className='
                        py-1
                        rounded
                        cursor-pointer
                        border-[1px]
                        border-solid
                        border-gray-400
                        text-gray-700
                        px-3
                        '>Login</Link>
                        <Link to='/signup' className='
                        py-1
                        rounded
                        cursor-pointer
                        border-[1px]
                        border-solid
                        border-gray-400
                        text-gray-700
                        px-3
                        '>Join</Link>
                    </div>}

                    <button 
                    onClick={handleUploadButton}
                    className='
                    text-gray-50
                    bg-green-700
                    py-1
                    rounded
                    px-3
                    cursor-pointer
                    transition-all
                    hover:opacity-90
                    active:opacity-80
                    '>Upload</button>
                    {/* <button className=''>menu</button> */}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;