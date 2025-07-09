import { ArrowRightIcon } from "@phosphor-icons/react";
import Checkbox from "../../../components/ui/checkbox";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneMask } from "../../../utils/functions";
import { AnimatePresence, motion } from "motion/react";
import { saveLead } from "../api/send-lead";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(11).max(11),
  aggreement: z.literal(true, {
    errorMap: () => ({ message: "Você deve aceitar os termos" }),
  }),
});

type LeadFormData = z.infer<typeof schema>;

export default function LeadForm({
  onFormFilled,
  formFilled,
}: {
  onFormFilled: (isFilled: boolean) => void;
  formFilled: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LeadFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, name, phone }: LeadFormData) => {
    try {
      await saveLead({
        email,
        name,
        phone,
      });
      onFormFilled(true);
    } catch (e) {
      console.log(e);
      onFormFilled(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.form
        id="lead-form"
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white/20 px-6 py-8"
      >
        {formFilled && (
          <motion.div
            key="gif-okay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center gap-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent max-md:text-left">
                PRONTO, VOCÊ JÁ ESTÁ NA NOSSA <br /> LISTA DE ESPERA!
              </span>
              <span className="text-white">
                Te enviaremos um convite assim que o período de testes iniciar
              </span>
            </div>
          </motion.div>
        )}
        {!formFilled && (
          <motion.div
            key="form-div"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center justify-start gap-6 rounded-2xl"
          >
            <input
              type="text"
              className={`h-[50px] w-full rounded-2xl border-white/20 bg-zinc-200 p-4 text-base text-zinc-900 ${errors.name ? "border-red-400" : ""}`}
              placeholder="Seu nome"
              {...register("name")}
            />
            <input
              type="email"
              className="h-[50px] w-full rounded-2xl border-white/20 bg-zinc-200 p-4 text-base text-zinc-900"
              placeholder="Seu melhor e-mail"
              {...register("email")}
            />
            <div className="w-full">
              <input
                type="text"
                className="h-[50px] w-full rounded-2xl border-white/20 bg-zinc-200 p-4 text-base text-zinc-900"
                placeholder="Seu número de telefone"
                {...register("phone")}
                maxLength={12}
                onChange={(e) => {
                  e.target.value = phoneMask(e.target.value);
                  register("phone").onChange({
                    ...e,
                  });
                }}
              />
              {errors.phone && (
                <label className="text-left text-sm text-red-400">
                  Este número não parece estar correto, tente digitar no format
                  (xx) xxxxx-xxxx
                </label>
              )}
            </div>
            <div className="flex flex-nowrap items-center gap-2 text-white">
              <Checkbox props={{ ...register("aggreement") }}>
                Ao clicar na caixinha, você aceita o envio de e-mails e
                mensagens da plataforma trippy
              </Checkbox>
            </div>

            <button
              className="mt-4 flex w-full cursor-pointer flex-nowrap items-center justify-center gap-2 rounded-4xl bg-gradient-to-r from-blue-400 to-purple-500 py-3 text-base text-white transition-all hover:scale-110 disabled:grayscale-75 md:w-[200px]"
              type="submit"
              disabled={!isValid}
            >
              Me inscrever <ArrowRightIcon />
            </button>
          </motion.div>
        )}
      </motion.form>
    </AnimatePresence>
  );
}
