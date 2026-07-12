'use client'
import { useState, useEffect, useRef } from 'react'
import { Playfair_Display, Great_Vibes, Noto_Naskh_Arabic, Noto_Serif_Tamil } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' })
const arabic = Noto_Naskh_Arabic({ subsets: ['arabic'], weight: '400' })
const tamil = Noto_Serif_Tamil({ subsets: ['tamil'], weight: '400' })

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isScratched, setIsScratched] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  })
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const targetDate = new Date('2026-08-16T18:00:00').getTime()
    
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

  // Scratch card effect
  useEffect(() => {
    if (!isOpened ||!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 320
    canvas.height = 120
    
    ctx.fillStyle = '#d4a574'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#8b6914'
    ctx.font = '18px serif'
    ctx.textAlign = 'center'
    ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2)

    let isDrawing = false

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return
      const rect = canvas.getBoundingClientRect()
      const x = 'touches' in e? e.touches[0].clientX - rect.left : e.clientX - rect.left
      const y = 'touches' in e? e.touches[0].clientY - rect.top : e.clientY - rect.top
      
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, Math.PI * 2)
      ctx.fill()
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      let transparent = 0
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++
      }
      if (transparent / (pixels.length / 4) > 0.5) {
        setIsScratched(true)
      }
    }

    canvas.addEventListener('mousedown', () => isDrawing = true)
    canvas.addEventListener('mouseup', () => isDrawing = false)
    canvas.addEventListener('mousemove', scratch)
    canvas.addEventListener('touchstart', () => isDrawing = true)
    canvas.addEventListener('touchend', () => isDrawing = false)
    canvas.addEventListener('touchmove', scratch)

    return () => {
      canvas.removeEventListener('mousemove', scratch)
      canvas.removeEventListener('touchmove', scratch)
    }
  }, [isOpened])

  const handleOpen = () => {
    setIsOpened(true)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause()
      else audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const addToGoogleCal = () => {
    const start = '20260816T140000Z' // 6 PM Dubai = 2 PM UTC
    const end = '20260816T180000Z' // 10 PM Dubai = 6 PM UTC
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Faheema%27s%20House%20Warming&dates=${start}/${end}&details=Join%20us%20for%20the%20housewarming%20ceremony&location=Dubai,%20UAE`
    window.open(url, '_blank')
  }

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {!isOpened? (
        // COVER PAGE - Like your temple reference
        <div className="h-screen w-full relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/house.jpg)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
          </div>

          {/* Falling Petals */}
          <div className="petals">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="petal">🌸</div>
            ))}
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-between py-12 px-4">
            {/* Top: Bismillah */}
            <div className="text-center">
              <p className={`${arabic.className} text-amber-200 text-2xl md:text-3xl tracking-wider`}>
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
            </div>

            {/* Center: Round Tap Button with Calligraphy */}
            <div onClick={handleOpen} className="cursor-pointer group">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-rose-900 to-rose-700 border-4 border-amber-300 shadow-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                <div className={`${arabic.className} text-amber-100 text-3xl md:text-4xl`}>
                  نثار حبين
                </div>
              </div>
              <p className={`${playfair.className} text-amber-200 text-sm tracking-[0.3em] mt-6 text-center`}>
                TAP TO OPEN THE INVITATION
              </p>
            </div>

            <div></div>
          </div>
        </div>
      ) : (
        // INSIDE PAGE - Like your Meghana reference
        <div className="min-h-screen bg-[#faf8f5] relative">
          <button 
            onClick={toggleMusic}
            className="fixed top-4 right-4 z-50 bg-white/90 rounded-full p-3 shadow-lg"
          >
            {isPlaying? '🔊' : '🔇'}
          </button>

          <div className="max-w-3xl mx-auto px-6 py-16">
            {/* Tamil Header */}
            <p className={`${tamil.className} text-center text-[#8b6914] text-sm tracking-[0.3em] mb-12`}>
              எல்லாப் புகழும் இறைவனுக்கே
            </p>

            {/* Names */}
            <h1 className={`${greatVibes.className} text-6xl md:text-8xl text-center text-[#2c1810] mb-2`}>
              House Warming
            </h1>
            <p className={`${greatVibes.className} text-5xl md:text-7xl text-center text-[#2c1810] mb-4`}>
              Ceremony
            </p>
            
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="h-px w-16 bg-[#8b6914]"></div>
              <span className={`${greatVibes.className} text-3xl text-[#8b6914]`}>&</span>
              <div className="h-px w-16 bg-[#8b6914]"></div>
            </div>

            <h2 className={`${greatVibes.className} text-5xl md:text-6xl text-center text-[#2c1810] mb-16`}>
              Faheema's Residence
            </h2>

            {/* Save the Date */}
            <div className="text-center mb-8">
              <h3 className={`${playfair.className} text-2xl text-[#2c1810] mb-4`}>Save the Date</h3>
              <p className="text-xl text-[#2c1810] mb-6">16th August 2026</p>
              <button 
                onClick={addToGoogleCal}
                className="bg-[#8b6914] hover:bg-[#6d5209] text-white px-6 py-2 rounded-full text-sm transition"
              >
                Add to Google Calendar
              </button>
            </div>

            {/* Scroll to Explore */}
            <div className="text-center my-16">
              <p className={`${playfair.className} text-[#8b6914] text-sm tracking-[0.2em]`}>
                SCROLL TO EXPLORE
              </p>
              <div className="animate-bounce mt-2">↓</div>
            </div>

            {/* House Warming Ceremony Section */}
            <div className="text-center mb-12">
              <h3 className={`${playfair.className} text-3xl text-[#2c1810] mb-8`}>
                House Warming Ceremony
              </h3>
              
              {/* Auspicious Countdown */}
              <p className="text-[#8b6914] text-sm mb-4 tracking-wider">THE AUSPICIOUS COUNTDOWN</p>
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds }
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className={`${playfair.className} text-4xl text-[#2c1810] font-bold`}>
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-[#8b6914] uppercase mt-1">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Arabic Dua */}
              <p className={`${arabic.className} text-2xl text-[#8b6914] mb-2`}>
                اللَّهُمَّ بَارِكْ لَنَا فِي بَيْتِنَا
              </p>
              <p className="text-sm text-gray-600 italic mb-12">
                O Allah, bless our home
              </p>

              {/* Scratch Countdown Card */}
              <div className="relative max-w-sm mx-auto">
                <p className={`${playfair.className} text-[#8b6914] mb-4`}>Scratch to Reveal Timer</p>
                <div className="relative">
                  {!isScratched && (
                    <canvas 
                      ref={canvasRef}
                      className="absolute inset-0 z-20 rounded-xl cursor-pointer"
                    />
                  )}
                  <div className="bg-gradient-to-br from-amber-50 to-rose-50 border-2 border-amber-300 rounded-xl p-6">
                    <div className={`${playfair.className} text-3xl text-[#8b6914]`}>
                      {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Until we celebrate together</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
           .petals {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              z-index: 1;
            }
           .petal {
              position: absolute;
              font-size: 1.2rem;
              animation: fall linear infinite;
              opacity: 0.7;
            }
            ${[...Array(20)].map((_, i) => `
             .petal:nth-child(${i + 1}) { 
                left: ${Math.random() * 100}%; 
                animation-duration: ${8 + Math.random() * 6}s; 
                animation-delay: ${Math.random() * 5}s; 
              }
            `).join('')}
            
            @keyframes fall {
              0% {
                top: -10%;
                transform: translateX(0) rotate(0deg);
              }
              100% {
                top: 110%;
                transform: translateX(${Math.random() * 100 - 50}px) rotate(360deg);
              }
            }
          `}</style>
        </div>
      )}
    </>
  )
}