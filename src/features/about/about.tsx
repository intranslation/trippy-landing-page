import {
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react";
import ExploreTrippy from "./components/explore-trippy";
import WhyTrippy from "./components/why-trippy";

export default function About() {
  return (
    <>
      <ExploreTrippy />
      <WhyTrippy />

      <div className="flex justify-around border-t-1 border-t-white/30 p-8 text-white">
        <div className="flex flex-nowrap gap-6 text-sm">
          <ul>
            <li className="mb-2 font-bold">Produto</li>
            <li className="text-zinc-400">Nossa AI</li>
            <li className="text-zinc-400">Preços</li>
            <li className="text-zinc-400">App</li>
          </ul>
          <ul>
            <li className="mb-2 font-bold">Trippy</li>
            <li className="text-zinc-400">Sobre nós</li>
            <li className="text-zinc-400">Contato</li>
            <li className="text-zinc-400">Blog</li>
          </ul>
        </div>

        <div className="flex flex-col justify-start gap-2 font-bold">
          <h1>
            Siga o{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TRIPPY
            </span>{" "}
            nas redes
          </h1>
          <div className="flex gap-4 text-4xl">
            <InstagramLogoIcon className="cursor-pointer" />
            <LinkedinLogoIcon className="cursor-pointer" />
            <TwitterLogoIcon className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-8">
        <span className="text-sm text-zinc-500">
          © 2025 Trippy. Todos os direitos reservados.
        </span>
      </div>
    </>
  );
}
