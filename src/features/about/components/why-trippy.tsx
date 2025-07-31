import {
  CameraIcon,
  CompassIcon,
  MapPinIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import Label from "../../../shared/components/ui/label";
import Title from "../../../shared/components/ui/title";
import LeadForm from "./lead-form";
import { useState } from "react";

export default function WhyTrippy() {
  const [formFilled, setFormFilled] = useState(false);
  return (
    <motion.div className="relative z-30 flex min-h-[100vh] snap-start flex-col items-center justify-center px-12 pt-[200px]">
      <Title>
        Por que ir de{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Trippy
        </span>
        ?
      </Title>

      <div className="my-20 flex flex-col gap-2 text-center">
        <Label>
          Planejar sua viagem não precisar ser um momento de ansiedade e
          indecisão.
        </Label>
        <Label>
          Trippy está aqui para isso, te ajudando a montar o melhor roteiro para
          o seu objetivo.
        </Label>
      </div>

      <div className="grid max-w-[1800px] gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          icon={<MapPinIcon />}
          title="Destinos Inteligentes"
          description="Recomendações de itinerários baseados em IA usando suas preferências de budget e estilo de viagem."
        />
        <Card
          icon={<CompassIcon />}
          title="Planejamento de viagens"
          description="Criação de itinerários sem esforço!"
        />
        <Card
          icon={<CameraIcon />}
          title="Capture memórias"
          description="Capture seus melhores momentos, adicione ao seu itinerário e compartilhe com o mundo!"
        />
        <Card
          icon={<UsersIcon />}
          title="Viajar sozinho?"
          description="Se conecte com outros viajantes e compartilhe experiências em tempo real."
        />
        <Card
          icon={<StarIcon />}
          title="Experiências premium"
          description="Experiências exclusivas e acesso a atividades únicas."
        />
        <Card
          icon={<ShieldIcon />}
          title="Viaje com segurança"
          description="Atualizações em tempo real e 24/7 sobre emergências ocorrendo durante sua viagem."
        />
      </div>

      <div
        className="flex min-h-[80dvh] flex-col items-center justify-center gap-8 py-[100px]"
        id="lead"
      >
        {!formFilled && (
          <>
            <Title>
              Entre na nossa{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                lista de espera
              </span>
            </Title>
            <Label>
              Participe do nosso grupo VIP de beta testers, e receba 2 convites
              para convidar seus amigos.
            </Label>
          </>
        )}

        <LeadForm formFilled={formFilled} onFormFilled={setFormFilled} />
      </div>
    </motion.div>
  );
}

function Card({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-start justify-start gap-4 rounded-2xl border border-white/10 bg-white/2 px-6 py-6 text-white">
      <span className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-[2rem]">
        {icon}
      </span>
      <span className="text-2xl font-bold">{title}</span>
      <span>{description}</span>
    </div>
  );
}
