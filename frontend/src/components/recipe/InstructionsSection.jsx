const InstructionsSection = ({ instructions }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
      {/* Header avec gradient */}
      <div className="p-8 border-b border-white/20 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/5">
        <h2
          className="text-4xl font-bold uppercase tracking-wider flex items-center gap-3"
          style={{ fontFamily: "var(--amatic)" }}
        >
          <span className="text-orange-400">→</span>
          Étapes à suivre
        </h2>
      </div>
      
      {/* Liste scrollable avec custom scrollbar */}
      <div className="overflow-auto h-[450px] p-8 recipe-scroll">
        <div className="grid grid-cols-1 gap-5">
          {instructions.map((instruction) => (
            <div key={instruction.step} className="flex gap-5 group">
              {/* Numéro avec gradient et ombre */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-white shadow-lg border-2 border-orange-400/50 group-hover:scale-110 group-hover:shadow-xl transition-all">
                {instruction.step}
              </div>
              
              {/* Description avec effet hover */}
              <div className="flex-1 bg-white/5 group-hover:bg-white/10 rounded-xl p-4 transition-all">
                <p
                  className="text-gray-200 leading-relaxed group-hover:text-white transition-colors"
                  style={{ fontFamily: "var(--spbutch)" }}
                >
                  {instruction.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructionsSection;