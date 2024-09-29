import { z } from "zod";
import { protectedProcedure, router } from "../trpc/trpc";

export const userRouter = router({
    getUser : protectedProcedure
            .input(z.object({id : z.string()}))
            .query(async({input,ctx}) =>{
                const user = await ctx.prisma.user.findUnique({
                    where :{
                        id : input.id,
                    },
                });
                return user;
            }),

    createUser : protectedProcedure
                 .input(z.object({
                    email : z.string(),
                    password : z.string(),
                    name : z.string()
                 }))
                .mutation(async({input,ctx}) => {
                  const {email, name}  = input;
                  const savedUser = await ctx.prisma.user.create({
                    data: {
                        name,email
                    }
                  });
                  return savedUser;
                 })
});