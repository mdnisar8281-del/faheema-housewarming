'use client'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const audioRef = useRef<HTMLAudioElement>(null)

  // Countdown Timer - CHANGE THIS DATE to your event date/time
  useEffect(() => {
    const targetDate = new Date('2026-01-25T18:00:00').getTime() // Jan 25, 2026, 6 PM
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const handleOpen = () => {
    setIsOpened(true)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked by browser"))
      setIsPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.log("Play blocked"))
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {!isOpened ? (
        // Cover Screen
        <div 
          className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: "url('/house.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
              Faheema's Housewarming
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
              You're Invited
            </p>
            <button 
              onClick={handleOpen}
              className="bg-white/90 hover:bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-xl hover:scale-105"
            >
              Tap to Open Invitation
            </button>
          </div>
        </div>
      ) : (
        // Main Invitation
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 py-12 px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            
            {/* Music Toggle */}
            <button 
              onClick={toggleMusic}
              className="fixed top-4 right-4 bg-white rounded-full p-3 shadow-lg z-50"
            >
              {isPlaying ? '🔊' : '🔇'}
            </button>

            <div className="text-center">
              <p className="text-rose-600 text-sm uppercase tracking-widest mb-2">Housewarming Ceremony</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Faheema's New Home
              </h2>
              
              <div className="w-24 h-1 bg-rose-400 mx-auto mb-8"></div>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Join us as we celebrate new beginnings and create beautiful memories in our new home.
                Your presence will make our celebration complete.
              </p>

              {/* Date & Time */}
              <div className="bg-rose-50 rounded-2xl p-6 mb-8">
                <p className="text-gray-700 font-semibold mb-1">Sunday, January 25, 2026</p>
                <p className="text-gray-600">6:00 PM onwards</p>
                <p className="text-gray-500 text-sm mt-3">Dubai, UAE</p>
              </div>

              {/* Countdown */}
              <div className="mb-8">
                <p className="text-gray-700 font-semibold mb-4">Event Starts In</p>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-white border-2 border-rose-200 rounded-xl p-3">
                    <div className="text-2xl md:text-3xl font-bold text-rose-600">{timeLeft.days}</div>
                    <div className="text-xs text-gray-500">Days</div>
                  </div>
                  <div className="bg-white border-2 border-rose-200 rounded-xl p-3">
                    <div className="text-2xl md:text-3xl font-bold text-rose-600">{timeLeft.hours}</div>
                    <div className="text-xs text-gray-500">Hours</div>
                  </div>
                  <div className="bg-white border-2 border-rose-200 rounded-xl p-3">
                    <div className="text-2xl md:text-3xl font-bold text-rose-600">{timeLeft.minutes}</div>
                    <div className="text-xs text-gray-500">Mins</div>
                  </div>
                  <div className="bg-white border-2 border-rose-200 rounded-xl p-3">
                    <div className="text-2xl md:text-3xl font-bold text-rose-600">{timeLeft.seconds}</div>
                    <div className="text-xs text-gray-500">Secs</div>
                  </div>
                </div>
              </div>

              {/* RSVP Button */}
              <a 
                href="https://wa.me/971501234567?text=Assalamualaikum,%20I%20will%20be%20attending%20the%20housewarming%20InshaAllah"
                target="_blank"
                className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:scale-105 mb-6"
              >
                RSVP on WhatsApp
              </a>

              <p className="text-gray-500 text-sm">
                With love, Faheema & Family
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}