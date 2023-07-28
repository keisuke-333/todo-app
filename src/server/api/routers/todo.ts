import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const todoRouter = createTRPCRouter({
  fetch: publicProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return todos
  }),
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.todo.create({
        data: { title: input.title },
      })
    }),
  update: publicProcedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.todo.update({
        where: { id: input.id },
        data: {
          isCompleted: input.isCompleted,
        },
      })
    }),
  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.prisma.todo.delete({
      where: { id: input.id },
    })
  }),
})
