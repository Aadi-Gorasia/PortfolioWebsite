export default function EditorialSection() {
  return (
    <section id="editorial" className="bg-[#F3EFE6] text-[#1B1B1B] min-h-screen flex items-center px-10 py-24">

      <div className="max-w-6xl mx-auto leading-none">

        <h2 className="font-[Inter] font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight">
          ENGINEERED SYSTEMS
        </h2>

        <h2 className="font-[Inter] font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight">
          INTELLIGENTLY DESIGNED
        </h2>

        <div className="relative mt-6">

          <span className="font-[Playfair_Display] italic text-[#B89C5E] text-10xl xl:text-6xl absolute -top-6 left-10">
            based on
          </span>
          <br />

          <h2 className="font-[Inter] font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight mt-8">
            CONTROL THEORY
          </h2>

        </div>

        <h2 className="font-[Inter] font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight">
          & ADAPTIVE LEARNING
        </h2>

      </div>

    </section>
  );
}