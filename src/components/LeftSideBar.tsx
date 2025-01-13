import Link from 'next/link';
import { FaCat } from "react-icons/fa";
import { HiHome } from 'react-icons/hi';
export default function LeftSideBar() {
    return (
        <div className='flex flex-col p-3 justify-between h-screen items-center'>
          <div className='flex flex-col gap-4 p-3'>
            <Link href='/' className=' p-3 rounded-full transition-all hover:bg-gray-100 duration-200'>
              <FaCat className='w-7 h-7 cursor-pointer' />
            </Link>
            <Link
              href='/'
              className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'
            >
              <HiHome className='w-7 h-7' />
              <span className='font-bold hidden xl:inline'>Home</span>
            </Link>
            <button className='bg-violet-400 text-white rounded-full  hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline font-semibold'>
              Sign in
            </button>
          </div>
        </div>
    )
}
