import React, { type PropsWithChildren } from 'react'
import Header from './ui/Header'

const Layout = ({children} : PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
        {/* <header></header> */}
        <Header></Header>
        <main className='min-h-screen contianer mx-auto px-4 py-8'>
        {children}

        </main>
        <footer className='border-t backdrop-blur py-12 supports[backdrop-filter]'>
            <div className="container mx-auto px-4 text-center text-gray-400">
                Made by the speedy dev
            </div>
        </footer>
    </div>
  )
}

export default Layout