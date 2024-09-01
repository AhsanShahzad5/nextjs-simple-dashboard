"use client"
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const NavigationTestPage = () => {

    //THESE ARE ALL FOR CLIENT SIDE COMPONENTS 
    const router = useRouter();
    const pathname = usePathname();
    const query = useSearchParams();
    const handleClick = () => {
        // console.log('clicked');
        // console.log(pathname);
        // console.log(query);
        
        // router.push('/')
        //basically this wont chnage the browser history stack
        // router.replace('/')

        //refreshes the page after doing smthing
        // router.refresh()
        //open up the previous page
        // router.back()
        // router.forward()
    }
    return (
        <div>
            {/* this wont prefetch the link to save performace issues */}
            <Link href='/' prefetch={false}>
                click here
            </Link>
            <button onClick={handleClick}>Write and redirect</button>
        </div>
    )
}

export default NavigationTestPage