import React from 'react'
import Main from './main/Main'
import Header from './header/Header'
import Aside from '../../shared/Aside'

function Home() {
    return (
        <>
        <h1 className=''> welcome Home</h1>
            <Header />
            <Main />
            <Aside />
        </>
    )
}

export default Home