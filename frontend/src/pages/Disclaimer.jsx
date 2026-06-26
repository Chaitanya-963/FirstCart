const Disclaimer = () => {
  return (
    <div className="bg-zinc-950 min-h-[calc(100vh-140px)] px-4 py-12 sm:px-6 lg:px-8 text-zinc-400">
      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl leading-relaxed">
        {/* DISCLAIMER TITLE HEADER */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight border-b border-zinc-800 pb-4 mb-6 flex items-center gap-2">
          <span>⚖️</span> Legal & Site Disclaimer
        </h2>

        <p className="mb-6 text-sm sm:text-base text-zinc-300 leading-relaxed">
          The data, interfaces, and graphical components represented across the{" "}
          <span className="text-blue-400 font-semibold">FirstCart</span> domain
          strictly act uniquely as an educational development platform. This
          codebase models rigorous application structures and architectures for
          purely demonstrative, portfolio-oriented engineering usage.
        </p>

        {/* SECTION 1 */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
            1. Accuracy of Materials
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The materials spanning the FirstCart interface may heavily include
            dynamic technical, typographical, or dummy photographic elements.
            Product matrices mapped in the DB pipeline do absolutely not
            correlate to strictly real physical outputs and are safely populated
            via generic high-quality placeholder imagery protocols.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
            2. Payment Processing Restrictions
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            No authentic financial variables are handled natively within this
            environment. All payment endpoints forcefully bind exclusively to
            external testing-based networks (Sandbox Razorpay environments). No
            exact deductibles exist.
          </p>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-2 mb-8">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
            3. External Binding Links
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            FirstCart operates completely independent domains and takes strictly
            zero absolute parameter responsibility over the specific contents or
            behaviors populated via external routing anchors generated
            implicitly by third-party configurations.
          </p>
        </div>

        {/* CLOSING NOTICE BANNER */}
        <div className="pt-5 border-t border-zinc-800/60 text-center">
          <p className="text-xs sm:text-sm font-medium italic text-zinc-500 bg-zinc-950/40 border border-zinc-800 p-4 rounded-xl max-w-2xl mx-auto">
            By interacting natively within this codebase, you unconditionally
            signal acceptance bounded by these parameters efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
