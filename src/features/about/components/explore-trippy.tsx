import { ArrowRightIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function ExploreTrippy() {
  return (
    <div className="min-h-[100dvh] min-w-[100dvw] snap-start px-8 py-[100px]">
      <motion.div
        // style={{
        //   background,
        // }}
        className="fixed top-0 left-0 z-10 h-screen w-screen md:hidden"
      ></motion.div>
      <div className="relative z-30 mx-auto mt-[100vh] flex h-screen max-w-[1800px] flex-col items-center justify-between gap-12 px-4 text-2xl text-white lg:mt-0 lg:flex-row lg:justify-between lg:gap-0">
        <div className="flex w-full flex-col items-start justify-center gap-4 md:w-fit">
          <span className="max-w-[400px] text-[1.8rem] leading-[2.4rem] font-bold text-white md:text-[1.7rem]">
            Descubra destinos de tirar o fôlego,
            <span className="text-[#60A5FA]">
              {" "}
              planeje aventuras inesquecíveis,
            </span>{" "}
            e crie memórias que durarão a vida inteira.
          </span>
        </div>

        <div className="flex w-full flex-col items-start justify-center gap-8 md:w-fit md:items-start md:gap-8">
          <KPILabel
            kpi="Diga para onde vai"
            color="#FF8A8A"
            description="Escolha milhares de destinos e crie um perfil de viagem"
          />
          <KPILabel
            kpi="A IA planeja com você"
            color="#60A5FA"
            description="Tenha assistência do nosso modelo de inteligência artificial"
          />
          <KPILabel
            kpi="Viage e compartilhe"
            color="#C084FC"
            description={
              <>
                Compartilhe seus roteiros, tesouros escondidos, lugares
                românticos com milhares de viajantes!
              </>
            }
          />

          <a
            href="#lead-form"
            className="max-md: mt-8 flex cursor-pointer flex-nowrap items-center justify-center gap-2 rounded-4xl bg-gradient-to-r from-blue-400 to-purple-500 p-4 text-base text-white transition-all hover:scale-110 max-md:hidden"
          >
            Comece sua jornada <ArrowRightIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function KPILabel({
  kpi,
  description,
  color,
}: {
  kpi: string;
  description: string | React.ReactElement;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[8vw] font-bold md:text-[1.8rem]" style={{ color }}>
        {kpi}
      </span>
      <span className="-mt-2 text-[4vw] md:text-[1.3rem] lg:max-w-[320px]">
        {description}
      </span>
    </div>
  );
}
