/* eslint-disable @next/next/no-img-element */
import { Inter } from 'next/font/google'
import NavBar from '../components/NavBar'
import Hero from '@/components/home/Hero'
import Feature from '@/components/home/Features'
import Pricing from '@/components/home/Pricing'
import NewsLetterSection from '../components/NewsLetterSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar className="mb-auto" />
      <div className="flex-grow pb-10 dark: bg-gray-800" >
        <Hero />
        <Feature />
        <Pricing />
      </div>
      <NewsLetterSection />
    </div>
  )
}
