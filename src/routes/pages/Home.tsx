import { useHeaderStore } from '@/stores/header'
import { useEffect } from 'react'

export default function Home() {
    const setTitle = useHeaderStore(state => state.setTitle)

    useEffect(() => {
        setTitle('Home')
    }, [setTitle])

    return (
        <>
            <h1>안녕</h1>
        </>
    )
}