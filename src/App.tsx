/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Droplets, 
  ChevronRight, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  Leaf,
  Diamond,
  Flower2
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hjem', href: '#' },
    { 
      name: 'Maskiner', 
      href: '#produkter',
      submenu: [
        { name: 'Kaffemaskiner', href: '#produkter' },
        { name: 'Kaffetraktere', href: '#produkter' },
        { name: 'Vannmaskiner', href: '#produkter' },
      ]
    },
    { name: 'Produkter', href: '#produkter' },
    { name: 'Om oss', href: '#om-oss' },
    { name: 'Service', href: '#service' },
    { name: 'Bestilling', href: '#kontakt' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-7 md:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/images/MrCoffee_Logo.svg"
              alt="MrCoffee Logo"
              className={`w-auto transition-[height] duration-300 ease-out ${isScrolled ? 'h-16' : 'h-20'}`}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.submenu && setIsDropdownOpen(true)}
                onMouseLeave={() => link.submenu && setIsDropdownOpen(false)}
              >
                <a 
                  href={link.href} 
                  className="text-[13px] uppercase tracking-widest hover:text-antique-brass transition-colors flex items-center gap-1"
                >
                  {link.name}
                  {link.submenu && <ChevronRight size={12} className="rotate-90" />}
                </a>
                
                {link.submenu && (
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-4 w-48 glass rounded-xl overflow-hidden py-2"
                      >
                        {link.submenu.map((sub) => (
                          <a 
                            key={sub.name} 
                            href={sub.href} 
                            className="block px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-white/5 hover:text-antique-brass transition-colors"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden text-white z-[70] relative"
            aria-label="Åpne meny"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Utenfor nav: unngår stacking/clipping med glass (backdrop-filter) på mobil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[100] flex flex-col bg-chinese-black p-8 text-white overflow-y-auto overscroll-contain"
            style={{ WebkitOverflowScrolling: 'touch', paddingTop: 'max(2rem, env(safe-area-inset-top))', paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex shrink-0 justify-end">
              <button
                type="button"
                className="text-white p-2 -mr-2"
                aria-label="Lukk meny"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-8 text-white">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-2xl font-serif text-white hover:text-antique-brass block"
                    onClick={() => !link.submenu && setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                  {link.submenu && (
                    <div className="ml-4 mt-4 flex flex-col gap-4 border-l border-white/10 pl-4">
                      {link.submenu.map((sub) => (
                        <a 
                          key={sub.name} 
                          href={sub.href} 
                          className="text-lg font-serif text-white/70 hover:text-antique-brass"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SectionHeading = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="mb-12">
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-antique-brass uppercase tracking-[0.3em] text-xs font-semibold block mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-6xl font-serif leading-tight ${light ? 'text-chinese-black' : 'text-white'}`}
    >
      {title}
    </motion.h2>
  </div>
);

const Button = ({
  children,
  variant = 'primary',
  className = '',
  href,
  ...props
}: React.ComponentProps<'button'> & {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'outlineDark';
}) => {
  const variants = {
    primary: 'bg-antique-brass text-chinese-black hover:bg-white',
    secondary: 'border border-white/20 text-white hover:bg-white hover:text-chinese-black',
    outline: 'border border-antique-brass text-antique-brass hover:bg-antique-brass hover:text-chinese-black',
    outlineDark:
      'border border-[#AAAAAA] text-chinese-black hover:bg-antique-brass hover:text-chinese-black hover:border-antique-brass',
  };
  const sharedClass = `inline-flex items-center justify-center px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={sharedClass} {...(props as React.ComponentProps<'a'>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={sharedClass} {...props}>
      {children}
    </button>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-antique-brass selection:text-chinese-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-kaffe.jpg" 
            alt="Premium Coffee" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chinese-black via-chinese-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-chinese-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-7 md:px-6 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8">
                Gratis kaffemaskin <br />
                <span className="text-antique-brass italic">til kontoret.</span>
              </h1>
              <div className="flex flex-wrap gap-4 mb-8">
                {['Gratis leie', 'Gratis service', 'Ingen bindingstid'].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm uppercase tracking-widest text-white/70">
                    <CheckCircle2 size={16} className="text-antique-brass" />
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
                Vi leverer kaffeløsninger til kontor og bedrifter – uten risiko og uten unødvendige kostnader. 
                Få bedre kaffe på jobb uten å binde deg til lange avtaler.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button>Bestill kaffeløsning</Button>
                <Button variant="secondary">Kontakt oss</Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-antique-brass rounded-full blur-[120px]"
        />
      </section>

      {/* Kvalitet Section */}
      <section id="kvalitet" className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-7 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                subtitle="Kvalitet på kaffe" 
                title="Kaffe folk faktisk vil drikke." 
              />
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>
                  Det hjelper ikke med en kaffemaskin hvis kaffen ikke smaker godt. Derfor jobber vi med utvalgte mikrobrennerier og leverandører som leverer kvalitet – hver gang.
                </p>
                <p>
                  Vi tilbyr blant annet kaffe fra <span className="text-white font-medium">Den Gyldne Bønne</span> og utvalgte brennerier i Stockholm, inkludert <span className="text-white font-medium">GasHaga på Lidingö</span>, som har oppnådd topp plassering internasjonalt.
                </p>
                <p>
                  Hos oss får du ikke bare kaffe – du får en løsning som er tilpasset smaken på arbeidsplassen. Selv kakaoen smaker slik den skal – som sjokolade.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div className="p-6 glass rounded-2xl">
                  <div className="text-antique-brass mb-4"><Coffee size={32} /></div>
                  <h4 className="font-serif text-xl mb-2">Mikrobrennerier</h4>
                  <p className="text-sm text-white/50">Håndplukkede bønner fra de beste brenneriene.</p>
                </div>
                <div className="p-6 glass rounded-2xl">
                  <div className="text-antique-brass mb-4"><Leaf size={32} /></div>
                  <h4 className="font-serif text-xl mb-2">Bærekraftig</h4>
                  <p className="text-sm text-white/50">Miljøfyrtårn-sertifisert og etisk handel.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-3xl overflow-hidden relative z-10"
              >
                <img 
                  src="/images/mikrobrennerier.jpg" 
                  alt="Coffee Roastery" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute -top-8 -right-8 w-64 h-64 border border-antique-brass/20 rounded-3xl -z-0" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-antique-brass/10 rounded-3xl -z-0 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Produkter Section */}
      <section id="produkter" className="py-24 md:py-32 bg-dark-jungle">
        <div className="max-w-7xl mx-auto px-7 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionHeading 
              subtitle="Produkter og løsninger" 
              title="Kaffeløsninger tilpasset din bedrift." 
            />
            <p className="text-white/60">
              Vi leverer kaffemaskiner og drikkeløsninger til kontorer og arbeidsplasser. Enten dere er 20 ansatte eller flere, finner vi en løsning som passer behovet deres.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Kaffemaskiner', 
                desc: 'Kaffemaskiner for den perfekte koppen.', 
                icon: <Coffee />,
                img: '/images/produkt-kaffemaskin.jpg'
              },
              { 
                title: 'Kaffetraktere', 
                desc: 'Tradisjonell trakting for store og små kontorer.', 
                icon: <Clock />,
                img: '/images/produkt-kaffetrakter.jpg'
              },
              { 
                title: 'Vannmaskiner', 
                desc: 'Friskt, kaldt vann med og uten kullsyre.', 
                icon: <Droplets />,
                img: '/images/produkt-vannmaskin.jpg'
              }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl aspect-[3/4]"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chinese-black via-chinese-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center mb-4 text-antique-brass">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 mb-6">{item.desc}</p>
                  <button className="flex items-center gap-2 text-antique-brass text-sm font-semibold group-hover:gap-4 transition-all">
                    Se {item.title.toLowerCase()} <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Midlertidig skjult — gjenaktiver når ønsket */}
          {false && (
            <div className="mt-20 glass p-12 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-3xl font-serif mb-4">Alt samlet på ett sted</h3>
                <p className="text-white/60">
                  I tillegg leverer vi kaffeprodukter som bønner, filterkaffe, te, kakao og melk – alt du trenger for en komplett kaffepause.
                </p>
              </div>
              <Button variant="outline">Se alle produkter</Button>
            </div>
          )}
        </div>
      </section>

      {/* Kaffe og sortiment Section */}
      <section id="kaffe-og-sortiment" className="pb-24 md:pb-32 bg-dark-jungle">
        <div className="max-w-7xl mx-auto px-7 md:px-6">
          <div className="glass p-12 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-3xl font-serif mb-4">Kaffe, tilbehør og våre utvalgte anbefalinger</h3>
              <p className="text-white/60">
                Vi har valgt ut kaffe, te, kakao og tilbehør fra leverandører vi vet leverer kvalitet – basert på det som faktisk fungerer på norske arbeidsplasser.
              </p>
            </div>
            <Button variant="outline">Se alle produkter</Button>
          </div>
        </div>
      </section>

      {/* Kaffe og sortiment — bakgrunnsbilde-versjon (deaktivert) */}
      {false && (
        <section id="kaffe-og-sortiment-v2" className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/kaffesmak-bakgrunn.jpg"
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-chinese-black/60 via-transparent to-chinese-black/80" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-7 md:px-6">
            <SectionHeading subtitle="Kaffe og sortiment" title="Hvordan vil du at kaffen skal smake?" />
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Coffee size={28} />, name: "Vanlige mannen i gata", desc: "Klassisk og tilgjengelig – kaffe alle kjenner seg igjen i." },
                { icon: <Diamond size={28} />, name: "Feinsmekker'n", desc: "Spesialkaffe fra mikrobrennerier med karakter og dybde." },
                { icon: <Flower2 size={28} />, name: "Trommer'n", desc: "Kraftig og fyldig – for de som vil kjenne at det er kaffe." },
              ].map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 rounded-3xl border border-white/10 hover:border-antique-brass/40 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm transition-all duration-300">
                  <div className="text-antique-brass/50 group-hover:text-antique-brass transition-colors duration-300 mb-6">{item.icon}</div>
                  <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-antique-brass transition-colors duration-300 leading-tight mb-4">{item.name}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10"><Button variant="outline">Se alle produkter</Button></div>
          </div>
        </section>
      )}

      {/* Service Section */}
      <section id="service" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-7 md:px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1 flex justify-center items-center md:block">
              <div className="relative aspect-square w-[min(100%,18rem)] shrink-0 md:w-full md:max-w-none">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-antique-brass/30 p-6 md:p-8 animate-[spin_20s_linear_infinite] box-border">
                  <div className="h-full w-full rounded-full border border-antique-brass/10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="text-5xl sm:text-6xl md:text-7xl font-serif text-antique-brass block mb-2">1-2</span>
                    <span className="text-xs sm:text-sm uppercase tracking-widest text-white/50">Timer responstid</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <SectionHeading 
                subtitle="Service" 
                title="Service som faktisk fungerer." 
              />
              <div className="space-y-6 text-white/70">
                <p>
                  Når kaffemaskinen stopper, må det løses raskt. Derfor er service det viktigste vi gjør. Vi er på plass innen 1–2 timer ved behov.
                </p>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 text-antique-brass"><ShieldCheck size={24} /></div>
                  <div>
                    <h4 className="font-serif text-xl text-white font-medium mb-1">Gratis service</h4>
                    <p className="text-sm">Alle våre maskiner inkluderer full serviceavtale uten ekstra kostnad.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 text-antique-brass"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-serif text-xl text-white font-medium mb-1">Rask support</h4>
                    <p className="text-sm">I de fleste tilfeller løser vi problemet over telefon – raskt og effektivt.</p>
                  </div>
                </div>
              </div>
              <Button className="mt-10">Kontakt oss</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Om Oss Section */}
      <section id="om-oss" className="py-24 md:py-32 bg-white text-chinese-black">
        <div className="max-w-7xl mx-auto px-7 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                subtitle="Om oss" 
                title="Erfaring du kan stole på." 
                light
              />
              <div className="space-y-6 text-chinese-black/70 leading-relaxed">
                <p>
                  MrCoffee er et 100 % norskeid selskap med over 17 års erfaring i å levere kaffeløsninger til norske arbeidsplasser.
                </p>
                <p>
                  Vi serverer i dag over <span className="text-chinese-black font-bold">70.000 kopper</span> varm drikke hver eneste dag, og har fornøyde kunder over store deler av landet.
                </p>
                <div>
                  <h4 className="font-serif text-xl text-chinese-black">Miljøfyrtårn-sertifisert</h4>
                  <p className="text-chinese-black/70 mt-2 leading-relaxed">
                    Et bevis på at vi tar bærekraft på alvor – i alt vi leverer.
                  </p>
                  <Button variant="outlineDark" href="#om-oss" className="mt-10 w-fit">
                    Om oss
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <img src="/images/om-oss-kaffe.jpg" alt="Coffee" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-3xl bg-antique-brass p-8 flex flex-col justify-end group hover:bg-white transition-colors duration-500 cursor-default relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                      <img
                        src="/images/MrCoffee_Logo.svg"
                        alt=""
                        className="w-[5.92515rem] md:w-[9.87525rem] h-auto object-contain opacity-100 -translate-x-[3px] -translate-y-[calc(0.75rem+29px)] md:-translate-x-[5px] md:-translate-y-[calc(1.25rem+35px)]"
                        aria-hidden
                      />
                    </div>
                    <span className="text-6xl font-serif text-chinese-black group-hover:scale-110 transition-transform relative z-10">17+</span>
                    <span className="text-xs uppercase tracking-widest text-chinese-black/60 font-bold relative z-10">Års erfaring</span>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="aspect-square rounded-3xl bg-dark-jungle p-8 flex flex-col justify-end text-white relative overflow-hidden group cursor-default">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Coffee size={120} />
                    </div>
                    <span className="text-5xl md:text-6xl font-serif text-antique-brass relative z-10 leading-none">70.000</span>
                    <span className="text-xs uppercase tracking-widest text-white/60 font-bold relative z-10">Kopper daglig</span>
                  </div>
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <img src="/images/om-oss-kaffekopp.jpg" alt="Coffee Cup" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Miljøfyrtårn Section */}
      <section id="baerekraft" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/baerekraft-bakgrunn_2.jpeg" 
            alt="Sustainable Coffee Production" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/55 via-[#0f0c0a]/48 to-[#0d0907]/94" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-7 md:px-6">
          <div className="glass p-12 md:p-20 rounded-[60px] border-white/5 bg-chinese-black/40">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-32 md:w-48 flex-shrink-0">
                <img 
                  src="/images/miljofyrtarn-sertifisert-virksomhet-vertikal-RGB.svg" 
                  alt="Miljøfyrtårn-sertifisert virksomhet" 
                  className="w-full h-auto"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-antique-brass uppercase tracking-[0.3em] text-xs font-semibold block mb-4">Bærekraft</span>
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Vi tar ansvar for fremtiden.</h2>
                <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                  MrCoffee er stolte av å være Miljøfyrtårn-sertifisert. Vi jobber kontinuerlig med å redusere vårt miljøavtrykk gjennom bærekraftige kaffeløsninger, etisk handel og miljøvennlig logistikk.
                </p>
                <div className="mt-8 flex flex-wrap gap-6 justify-center md:justify-start">
                  {['Etisk handel', 'Gjenbrukbare løsninger', 'CO2-nøytral frakt'].map(item => (
                    <span key={item} className="flex items-center gap-2 text-sm text-antique-brass font-medium">
                      <CheckCircle2 size={18} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-24 md:py-32 atmosphere-bg">
        <div className="max-w-7xl mx-auto px-7 md:px-6">
          <div className="glass p-12 md:p-20 rounded-[60px] relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-16">
              <div>
                <SectionHeading 
                  subtitle="Bestilling / Kontakt" 
                  title="Klar for bedre kaffe på jobben?" 
                />
                <p className="text-white/60 mb-12">
                  Ta kontakt med oss for en løsning tilpasset din bedrift. Det er enkelt å komme i gang, og vi hjelper deg hele veien.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex size-12 shrink-0 aspect-square glass rounded-full items-center justify-center text-antique-brass">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/40">Ring oss</p>
                      <p className="text-lg">64 86 68 00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="inline-flex size-12 shrink-0 aspect-square glass rounded-full items-center justify-center text-antique-brass">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/40">E-post</p>
                      <p className="text-lg">post@mrcoffee.no</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="inline-flex size-12 shrink-0 aspect-square glass rounded-full items-center justify-center text-antique-brass">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/40">Besøk oss</p>
                      <p className="text-lg">Gneisveien 2, 1914 Ytre Enebakk</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-8 md:p-12 rounded-3xl">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/50 ml-2">Navn</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-antique-brass transition-colors" placeholder="Ditt navn" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-white/50 ml-2">Bedrift</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-antique-brass transition-colors" placeholder="Bedriftsnavn" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 ml-2">E-post</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-antique-brass transition-colors" placeholder="din@epost.no" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 ml-2">Melding</label>
                    <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-antique-brass transition-colors resize-none" placeholder="Hvordan kan vi hjelpe deg?"></textarea>
                  </div>
                  <Button className="w-full">Send forespørsel</Button>
                </form>
              </div>
            </div>
            
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-antique-brass/10 rounded-full blur-[100px] -z-0" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-7 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <img src="/images/MrCoffee_Logo.svg" alt="MrCoffee Logo" className="h-16 w-auto" />
          </div>
          
          <div className="text-white/30 text-xs uppercase tracking-[0.2em]">
            © 2026 MrCoffee.no — 100% Norskeid
          </div>

          <div className="flex gap-6">
            {['Facebook', 'Instagram', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="text-white/40 hover:text-antique-brass transition-colors text-xs uppercase tracking-widest font-bold">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
