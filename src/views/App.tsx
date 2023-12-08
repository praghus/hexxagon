import { Suspense, lazy, useEffect, useState } from 'react'

import { Status } from '../components'

import './App.css'

const ThreeCanvas = lazy(() => import('../components/GameElements/ThreeCanvas'))

const App = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>
            <Status />
            {isMounted ? (
                <Suspense fallback={null}>
                    <ThreeCanvas />
                </Suspense>
            ) : null}
        </>
    )
}

export default App
