import React from 'react'
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa"
import { SiX } from "react-icons/si";




const Footer = ({darkMode}) => {
  return (
    <div>
      <div className={`flex gap-1.5 p-2 border-t-2 dark:border-white/75 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} `}>
        <a href="https://github.com/mohd-javed7/Data-Science" target="_blank" className='hover:text-black '><FaGithub/></a>
        <a href="https://discordapp.com/users/628280143760326688" target='_blank' className='hover:text-indigo-700'><FaDiscord/></a>
        <a href="https://x.com/Javed35984979" target='_blank' className='hover:text-black '><SiX/></a>
      </div>
    </div>
  )
}

export default Footer