import { z } from "zod";

export const createTodoSchema = z.object({
    title: z.string().max(255),            // title is required and must be at most 255 characters
    content: z.string().nullable(),        // content is optional
    userId: z.string(),                    // userId is required
  });
  
  // Schema for updating a Todo (id required, other fields optional)
  export const updateTodoSchema = z.object({
    id: z.string().cuid(),                 // id is required for update
    title: z.string().max(255).optional(), // title is optional for update
    content: z.string().nullable().optional(), // content is optional for update
    completed: z.boolean().optional(),     // completed is optional for update
  });

  export const todoSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string().nullable(), // Allowing null
    completed: z.boolean(),
    userId: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });
  
  export type Todo = z.infer<typeof todoSchema>;
   
  export type CreateTodoInput = z.infer<typeof createTodoSchema>;
  export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
  