const ReturnPolicy = () => {
  return (
    <div className="bg-zinc-950 min-h-[calc(100vh-140px)] px-4 py-12 sm:px-6 lg:px-8 text-zinc-400">
      {/* 
        GLOBAL LAYOUT CONTAINER: 
        Matches your existing dark-theme cards with clean zinc borders 
        and unified spacing.
      */}
      <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl leading-relaxed">
        
        {/* POLICY HEADER SECTION */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight border-b border-zinc-800 pb-4 mb-6 flex items-center gap-2">
          <span>🔄</span> Return & Refund Policy
        </h2>
        
        <p className="mb-6 text-sm sm:text-base text-zinc-300 leading-relaxed">
          At <span className="text-blue-500 font-bold">FirstCart</span>, we proudly stand behind the quality of our merchandise. If for any reason you are completely dissatisfied with your purchase, you may securely initiate a return within 30 days of receiving your order.
        </p>

        {/* SECTION 1 */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
            1. Eligibility for Returns
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            To be eligible for a return, the item must be completely unused, housed in the same absolute condition that it was received, and maintained within its original factory packaging. Receipts or proof of purchase mappings are strictly required.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
            2. Refund Processing
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Once your return is physically received and internally inspected, an immediate email protocol will fire notifying you of the approval status. Approved refunds will cleanly propagate to your original designated Razorpay gateway endpoint within 5-7 business working days naturally.
          </p>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
            3. Exempted Output Goods
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Certain explicit categories such as perishable items, custom software, digital media, or physically tampered items are heavily restricted and do not qualify for any standard refund sequence.
          </p>
        </div>

        {/* SECTION 4 */}
        <div className="space-y-2 mb-8">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
            4. Shipping Transit Costs
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            You will actively remain strictly responsible for covering your own outbound logistical shipping rates associated with returning the item. Restocking fees may conditionally apply.
          </p>
        </div>

        {/* LOWER BRAND CONTACT ANCHOR */}
        <div className="pt-6 border-t border-zinc-800/60 text-center text-xs text-zinc-500">
          Need help with an item? Open a ticket via our portal or contact support directly.
        </div>

      </div>
    </div>
  );
};

export default ReturnPolicy;
