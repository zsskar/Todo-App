import { initTRPC, TRPCError } from "@trpc/server";
import { createContext } from "./context";
import superjson from 'superjson';


const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;


const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });


  export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);