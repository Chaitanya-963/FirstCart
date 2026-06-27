const About = () => {
  return (
    <div className="bg-zinc-950 min-h-[calc(100vh-140px)] px-4 py-12 sm:px-6 lg:px-8 text-zinc-300">
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800/80 rounded-3xl p-6 sm:p-12 text-center shadow-2xl shadow-black/60">
        {/* INSTRUCTOR PROFILE PHOTO MEDIA FRAME */}
        <div className="relative inline-block mb-6 group">
          {/* Subtle glowing halo aura ring tracking company colors */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl scale-110 group-hover:scale-120 group-hover:bg-teal-500/20 transition-all duration-500"></div>

          <img
            src="/logo.jpg"
            alt="@chaitanya.md"
            className="relative w-40 h-40 rounded-full object-cover border-4 border-blue-600/80 shadow-[0_0_25px_rgba(37,99,235,0.25)] group-hover:border-teal-400 transition-colors duration-500 mx-auto"
          />
        </div>

        {/* BIO HEADER SUMMARY TYPOGRAPHY */}
        <div className="space-y-2 mb-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            About Me
          </h2>
          <h3 className="text-lg sm:text-xl font-bold bg-linear-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent inline-block">
            Chaitanya Mehetre (@chaitanya.md)
          </h3>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10">
          <strong className="text-zinc-200">
            Code. Create. Continuously Improve.
          </strong>
          <br />
          I'm Chaitanya Mehetre, a Full Stack Developer and Expo React Native
          Developer passionate about building scalable web and mobile
          applications. I enjoy crafting intuitive user experiences and am
          currently expanding my expertise in Java Full Stack Development.
        </p>

        {/* SOCIAL NETWORKS WRAPPER ICON CHANNELS */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          <a
            href="https://instagram.com/chaitanya.md"
            target="_blank"
            rel="noreferrer"
            className="bg-pink-950/20 text-pink-400 border border-pink-900/40 hover:bg-pink-950/50 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
          >
            📸 Instagram
          </a>

          <a
            href="https://www.linkedin.com/in/chaitanya-mehetre/"
            target="_blank"
            rel="noreferrer"
            className="bg-blue-950/20 text-blue-400 border border-blue-900/40 hover:bg-blue-950/50 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
          >
            💼 LinkedIn
          </a>

          <a
            href="https://x.com/Chaitanya_CM_"
            target="_blank"
            rel="noreferrer"
            className="bg-zinc-800 text-zinc-100 hover:text-white border border-zinc-700 hover:border-zinc-600 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
          >
            ✖️ X (Twitter)
          </a>

          <a
            href="https://github.com/Chaitanya-963"
            target="_blank"
            rel="noreferrer"
            className="bg-slate-950/20 text-slate-50 border border-slate-400/40 hover:bg-emerald-950/50 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
          >
            🔍 GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
