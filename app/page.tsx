"use client"
import { useState, useEffect } from "react";
import { Button, Card, TextInput, Textarea, Label } from "flowbite-react";
import { SnowParticles } from "@/components/SnowParticles";
import { Snowflake, User, Code, Mail, ExternalLink, Github, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import snowyBg from "@/assets/image.png";

const sections = ["Home", "About", "Portfolio", "Contact"];

const Navigation = ({ activeSection }: { activeSection: string }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4">
      <div className="max-w-5xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-2 font-display font-bold text-xl text-primary cursor-pointer" onClick={() => scrollTo("Home")}>
          <Snowflake className="h-6 w-6" />
          <span>TABS</span>
        </div>
        
        <div className="hidden md:flex gap-1">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeSection === section
                    ? "bg-primary text-black shadow-md scale-105"
                    : "text-gray-600 hover:bg-white/50 hover:text-primary dark:text-gray-300"
                }`}
            >
              {section}
            </button>
          ))}
        </div>
        
        <Button size="sm" outline pill className="group bg-linear-to-br from-cyan-500 to-blue-500 text-white border-none hover:from-cyan-600 hover:to-blue-600 focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-800">
          Resume
        </Button>
      </div>
    </nav>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("Home");
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/github").then((res) => res.json()).then(setRepos);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans selection:bg-cyan-200 selection:text-cyan-900">
      <SnowParticles />
      <Navigation activeSection={activeSection} />

      {/* Hero Section */}
      <section
        id="Home"
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
            <img 
                src={snowyBg.src} 
                alt="Snowy Background" 
                className="w-full h-full object-cover opacity-60 dark:opacity-40"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-50/20 to-slate-50 dark:via-slate-900/20 dark:to-slate-900"></div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 max-w-3xl space-y-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-100/80 text-cyan-800 text-sm font-semibold backdrop-blur-sm border border-cyan-200 mb-4">
            ❄️ Welcome to my portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-cyan-700 dark:from-white dark:to-cyan-300 drop-shadow-sm">
            Crafting Digital <br/> Experiences
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I'm a Full Stack Developer specializing in React, Next.js, and creating icy-smooth user interfaces.
          </p>
          <div className="flex gap-4 justify-center pt-8">
            <Button 
                size="xl" 
                pill 
                className="bg-linear-to-r from-cyan-500 to-blue-600 border-none hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:scale-105"
                onClick={() => document.getElementById('Portfolio')?.scrollIntoView({behavior: 'smooth'})}
            >
              View My Work
            </Button>
            <Button 
                size="xl" 
                color="light" 
                pill 
                className="bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 border-slate-200 shadow-md transition-all transform hover:scale-105"
                onClick={() => document.getElementById('Contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              Contact Me
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 z-10 text-slate-400"
        >
            <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="About"
        className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-900 py-20 px-4"
      >
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-linear-to-tr from-cyan-200 to-blue-200 rounded-2xl blur-2xl opacity-50 transform rotate-3"></div>
                <img 
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
                    alt="Coding workspace" 
                    className="relative rounded-2xl shadow-2xl border-4 border-white dark:border-slate-800"
                />
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
            >
                <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <User className="text-cyan-500" /> About Me
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    Hello! I'm a passionate developer with a love for clean code and elegant designs. 
                    Like a perfectly formed snowflake, I believe every line of code should be unique and purposeful.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    I specialize in building scalable web applications using modern technologies. My journey started
                    with simple HTML pages and has evolved into building complex systems with Next.js and Cloud architecture.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                    {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'Design'].map((skill) => (
                        <div key={skill} className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                            <span className="font-medium text-slate-700 dark:text-slate-200">{skill}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="Portfolio"
        className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800/50 py-20 px-4"
      >
        <div className="max-w-6xl w-full">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 flex justify-center items-center gap-3">
                    <Code className="text-cyan-500" /> Recent Projects
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    A collection of my recent work, built with precision and care.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {repos.map((item) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: item * 0.1 }}
                    >
                        <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden group h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-br from-cyan-400 to-blue-500 opacity-80 group-hover:scale-105 transition-transform duration-500"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button pill color="light" size="sm">View Project</Button>
                                </div>
                            </div>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
                                {item.name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 grow">
                                A beautiful dashboard application built with Next.js and Tailwind CSS featuring real-time data visualization.
                            </p>
                            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <a href="#" className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors">
                                    <Github className="w-4 h-4" /> Code
                                </a>
                                <a href="#" className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors">
                                    <ExternalLink className="w-4 h-4" /> Live Demo
                                </a>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="Contact"
        className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-900 py-20 px-4"
      >
        <div className="max-w-4xl w-full">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
                <div className="bg-linear-to-br from-cyan-600 to-blue-700 p-10 md:w-2/5 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-4">Let's Chat</h2>
                        <p className="text-cyan-100 mb-8">
                            Have a project in mind? I'd love to hear about it. Send me a message and let's create something cool together.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="text-cyan-200" />
                            <span>hello@winterport.dev</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Github className="text-cyan-200" />
                            <span>@username</span>
                        </div>
                    </div>
                </div>
                
                <div className="p-10 md:w-3/5">
                    <form className="space-y-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Your Name</Label>
                            </div>
                            <TextInput id="name" type="text" placeholder="John Snow" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email">Your Email</Label>
                            </div>
                            <TextInput id="email" type="email" placeholder="john@winterfell.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="message">Your Message</Label>
                            </div>
                            <Textarea id="message" placeholder="Leave a comment..." required rows={4} />
                        </div>
                        <Button className="w-full bg-linear-to-r from-cyan-500 to-blue-600 border-none hover:from-cyan-600 hover:to-blue-700">
                            Send Message
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 text-sm bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <p>© {new Date().getFullYear()} WinterPort. Built with React & Flowbite.</p>
      </footer>
    </div>
  );
}
