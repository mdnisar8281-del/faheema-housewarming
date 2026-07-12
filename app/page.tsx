"use client";

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const target = new Date("2026-08-16T11:30:00+05:30")
    
    const interval = setInterval(() => {
      const now = new Date()
      const difference = target - now
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handleOpen = () => {
    setIsOpened(true)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked"))
      setIsPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      audioRef.current?.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Raleway:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
      `}</style>

      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!isOpened ? (
          <motion.div 
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50"
          >
            <div 
              className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-end pb-20"
              style={{ backgroundImage: "url('/house.jpg')" }}
            >
              <div className="absolute inset-0 bg-black/40" />
              
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative z-10 text-center text-white px-6"
              >
                <p style={{fontFamily: "'Cinzel', serif"}} className="text-lg tracking-[0.3em] mb-2">HOUSE WARMING CEREMONY</p>
                <h1 style={{fontFamily: "'Cinzel Decorative', serif"}} className="text-5xl md:text-7xl font-bold mb-6">
                  Faheema's Residence
                </h1>
                <p style={{fontFamily: "'Cormorant Garamond', serif"}} className="text-xl mb-8 italic">
                  A.Mohamed Nisar & G.Habeeb Fathima
                </p>
                
                <motion.button
                  onClick={handleOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-[#8B5A2B] rounded-full text-lg font-semibold shadow-2xl"
                  style={{fontFamily: "'Lato', sans-serif"}}
                >
                  Tap to Open Invitation
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.main
            key="invitation"
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{fontFamily: "'Raleway', sans-serif"}} 
            className="min-h-screen bg-[#FDFBF7] text-[#4A3728]"
          >
            <button 
              onClick={toggleMusic}
              className="fixed top-5 right-5 z-50 bg-white/80 p-3 rounded-full shadow-lg"
            >
              {isPlaying ? '🔊' : '🔇'}
            </button>

            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-2xl"
              >
                <p className="text-4xl mb-6" style={{fontFamily: "'Cinzel', serif"}}>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
                
                <p className="text-lg mb-2 italic" style={{fontFamily: "'Cormorant Garamond', serif"}}>With the blessings of Allah</p>
                <p className="text-xl mb-1 font-semibold" style={{fontFamily: "'Libre Baskerville', serif"}}>Abulkalam Asad <span className="text-sm">(Late)</span> & Jeevanisa Begum</p>
                <p className="text-lg mb-1">&</p>
                <p className="text-xl mb-2 font-semibold" style={{fontFamily: "'Libre Baskerville', serif"}}>Gulam Hussain <span className="text-sm">(Late)</span> & Safiya Jailani</p>
                <p className="text-lg mb-6">& their Family</p>
                
                <p className="text-lg mb-8 italic" style={{fontFamily: "'Cormorant Garamond', serif"}}>Cordially invite you with your family to grace the occasion of</p>
                
                <h1 className="text-5xl md:text-7xl mb-4 text-[#8B5A2B]" style={{fontFamily: "'Cinzel Decorative', serif", fontWeight: 700}}>Housewarming Ceremony</h1>
                <p className="text-xl mb-2" style={{fontFamily: "'EB Garamond', serif"}}>of our newly built home</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-2 text-[#8B5A2B]" style={{fontFamily: "'Great Vibes', cursive"}}>Faheema's Residence</h2>
                <p className="text-sm mb-8" style={{fontFamily: "'Lato', sans-serif"}}>(Faheema - our beloved grand daughter)</p>
                
                <div className="border-y-2 border-[#8B5A2B] py-6 my-8">
                  <p className="text-2xl mb-2" style={{fontFamily: "'Cinzel', serif"}}>2026</p>
                  <div className="flex items-center justify-center gap-4 text-3xl font-bold" style={{fontFamily: "'Cinzel', serif"}}>
                    <span>AUG</span>
                    <span className="text-6xl px-4 border-x-2 border-[#8B5A2B]">16</span>
                    <span>SUN</span>
                  </div>
                  <p className="mt-3 text-lg" style={{fontFamily: "'Cormorant Garamond', serif"}}>Rabiyul Awwal 2, Hijri 1448</p>
                  <p className="text-xl font-semibold mt-1" style={{fontFamily: "'Lato', sans-serif"}}>11:30 AM onwards</p>
                </div>
                
                <p className="text-lg mb-1">at</p>
                <p className="text-xl font-semibold mb-1" style={{fontFamily: "'EB Garamond', serif"}}>1, Railway Feeder Road, Aruppukottai</p>
                
                <p className="text-lg mt-6 mb-1">Followed by Lunch at</p>
                <p className="text-2xl font-bold text-[#8B5A2B]" style={{fontFamily: "'Cinzel', serif"}}>M.S. Mahal</p>
                <p className="text-lg" style={{fontFamily: "'EB Garamond', serif"}}>Railway Feeder Road, Aruppukottai</p>
              </motion.div>
              
              <div className="flex gap-4 md:gap-6 mt-12 text-center">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item) => (
                  <div key={item.label} className="bg-white/80 px-3 py-3 md:px-4 rounded-lg shadow-md">
                    <div className="text-2xl md:text-3xl font-bold text-[#8B5A2B]" style={{fontFamily: "'Cinzel', serif"}}>{item.value}</div>
                    <div className="text-xs uppercase" style={{fontFamily: "'Lato', sans-serif"}}>{item.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-20 px-6 bg-white text-center">
              <h3 className="text-2xl mb-8" style={{fontFamily: "'Dancing Script', cursive"}}>Your presence is our greatest blessing</h3>
              <p className="text-xl mb-2 italic" style={{fontFamily: "'Cormorant Garamond', serif"}}>With Love,</p>
              <p className="text-xl font-semibold mb-6" style={{fontFamily: "'Libre Baskerville', serif"}}>A.Mohamed Nisar, G.Habeeb Fathima</p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-10">
                <a 
                  href="https://wa.me/919994477590?text=Assalamu%20Alaikum%2C%20We%20will%20attend%20the%20house%20warming%20InshaAllah" 
                  className="px-8 py-3 bg-[#25D366] text-white rounded-full font-semibold"
                  style={{fontFamily: "'Lato', sans-serif"}}
                >
                  RSVP on WhatsApp
                </a>
                <a 
                  href="https://maps.google.com/?q=1,Railway+Feeder+Road,Aruppukottai" 
                  target="_blank"
                  className="px-8 py-3 bg-[#8B5A2B] text-white rounded-full font-semibold"
                  style={{fontFamily: "'Lato', sans-serif"}}
                >
                  Get Directions
                </a>
              </div>
              
              <p className="mt-12 text-sm" style={{fontFamily: "'Raleway', sans-serif"}}>Mobile: +91 9994477590</p>
            </section>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}