import { z } from "zod";
import { protectedProcedure, router } from "../trpc/trpc";
import { TRPCError } from "@trpc/server";
import { CreateTodoInput, createTodoSchema, updateTodoSchema } from "@/types/todo_types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const todosRouter = router({
    getTodo : protectedProcedure.input(z.object({id : z.string()})).
             query(async({input, ctx}) => {

                const todo  = await ctx.prisma.todo.findUnique({
                    where :{
                        id : input.id
                    },  
                });
                if (!todo) {
                    throw new TRPCError({
                      code: 'NOT_FOUND',
                      message: `Todo with ID ${input.id} not found`,
                    });
                  }
            
                  return todo;
             }),
    getTodos : protectedProcedure.input(z.object({id : z.string()})).
                query(async({input, ctx}) => {
                const todos = await ctx.prisma.todo.findMany({
                  where: {
                    userId: input.id,
                  },
                  orderBy: {
                    createdAt: 'desc',
                  },
                });
                if (!todos) {
                    throw new TRPCError({
                      code: 'NOT_FOUND',
                      message: "Todos not found",
                    });
                  }
            
                  return todos;
                }), 
    createTodo : protectedProcedure.input(createTodoSchema).
                mutation(async({input, ctx}) => {
                    const {title, content, userId} : CreateTodoInput = input;
                    const newTodo = await ctx.prisma.todo.create({
                        data: {
                            title,
                            content,
                            userId
                        },
                    });
                    return newTodo; 
                }),
    deleteTodo: protectedProcedure.input(z.object({ id: z.string() }))
                .mutation(async ({ input, ctx }) => {
                  try {
                    await ctx.prisma.todo.delete({
                      where: {
                        id: input.id
                      },
                    });
                    return { success: true, msg : `todo with ID ${input.id} deleted.` };
                  } catch (error) {
                    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                      throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: 'Todo not found',
                      });
                    }
                    // console.error('Error deleting todo:', error);
                    throw new TRPCError({
                      code: 'INTERNAL_SERVER_ERROR',
                      message: 'Failed to delete todo',
                    });
                  }
                }),
     updateTodo: protectedProcedure
                .input(updateTodoSchema) 
                .mutation(async ({ input, ctx }) => {
                  try {
                    const updatedTodo = await ctx.prisma.todo.update({
                      where: {
                        id: input.id,
                      },
                      data: {
                        title: input.title,
                        content: input.content, 
                        completed: input.completed, 
                      },
                    });
            
                    return updatedTodo;
                  } catch (error) {
                    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                      throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: 'Todo not found',
                      });
                    }
            
                    // Handle other errors
                    // console.error('Error updating todo:', error); // Log the error for debugging
                    throw new TRPCError({
                      code: 'INTERNAL_SERVER_ERROR',
                      message: 'Failed to update todo',
                    });
                  }
                }),
});