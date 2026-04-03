import { Briefcase, BrainCircuit, Zap, TrendingUp, FileText, PlayCircle } from "lucide-react";

export function AboutPMA() {
  const services = [
    {
      title: "PMA Pro",
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      description: "End-to-end product manager job hunting program that helps you master FAANG-level Product Management skills, conduct unlimited mock interviews, and gain job referrals through their largest alumni network. 25% of their offers came from tier 1 companies and get paid as high as $800K/year."
    },
    {
      title: "AI PM Bootcamp",
      icon: <BrainCircuit className="w-6 h-6 text-purple-500" />,
      description: "Gain hands-on AI Product Management skills by building a real-life AI product with a team of AI Engineers, data scientists, and designers. They will also help you launch your product with real user engagement using their 100,000+ PM community and social media channels."
    },
    {
      title: "PMA Power Skills",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      description: "Designed for existing product managers to sharpen their product management skills, leadership skills, and executive presentation skills."
    },
    {
      title: "PMA Leader",
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      description: "They help you accelerate your product management career, get promoted to Director and product executive levels, and win in the board room."
    },
    {
      title: "1:1 Resume Review",
      icon: <FileText className="w-6 h-6 text-pink-500" />,
      description: "They help you rewrite your killer product manager resume to stand out from the crowd, with an interview guarantee."
    },
    {
      title: "Free Content & Courses",
      icon: <PlayCircle className="w-6 h-6 text-red-500" />,
      description: "They also published over 500+ free training and courses. Start learning for free today."
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto mt-24 mb-16 px-6 sm:px-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
      <div className="relative p-8 md:p-12 rounded-3xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-2xl overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-blue-500 dark:text-blue-400 uppercase mb-3">
              Developed by Arthur Silva Carneiro
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Product Manager Accelerator
            </h3>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
              <p>
                The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, the program has helped over hundreds of students fulfill their career aspirations.
              </p>
              <p>
                The Product Manager Accelerator community are ambitious and committed. Through the program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
              </p>
              <p className="font-medium text-zinc-900 dark:text-white pt-2">
                Check out their website and social channels to learn more about the services!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl bg-white/50 dark:bg-zinc-800/50 hover:bg-white/80 dark:hover:bg-zinc-800/80 backdrop-blur-md border border-zinc-200/50 dark:border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 shadow-inner w-12 h-12 mb-4 ring-1 ring-zinc-200 dark:ring-white/10 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                    {service.title}
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://www.drnancyli.com/pmresume" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
              >
                Get FREE PM Resume Template
              </a>
              <a 
                href="https://www.youtube.com/c/drnancyli" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch on YouTube
              </a>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium">
              Instagram: <a href="https://instagram.com/drnancyli" target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-400 hover:underline transition-colors">@drnancyli</a> &bull; Over 500+ free training courses published &bull; Used by 14,000+ PMs
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
