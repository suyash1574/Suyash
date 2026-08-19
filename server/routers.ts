import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getPortfolioAssistantReply } from "./portfolioAssistant";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const assistantRateLimits = new Map<string, { count: number; resetAt: number }>();
const ASSISTANT_WINDOW_MS = 60_000;
const ASSISTANT_MAX_REQUESTS = 8;

function enforceAssistantRateLimit(clientId: string) {
  const now = Date.now();
  const current = assistantRateLimits.get(clientId);

  if (!current || current.resetAt <= now) {
    assistantRateLimits.set(clientId, { count: 1, resetAt: now + ASSISTANT_WINDOW_MS });
    return;
  }

  if (current.count >= ASSISTANT_MAX_REQUESTS) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Please wait a minute before sending another message.",
    });
  }

  current.count += 1;
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  assistant: router({
    chat: publicProcedure
      .input(
        z.object({
          messages: z
            .array(
              z.object({
                role: z.enum(["user", "assistant"]),
                content: z.string().trim().min(1).max(1400),
              })
            )
            .min(1)
            .max(8),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const clientId = ctx.req.ip || ctx.req.get("x-forwarded-for") || "unknown";
        enforceAssistantRateLimit(clientId);

        try {
          const response = await getPortfolioAssistantReply(input.messages);
          return { message: response.content };
        } catch (error) {
          console.error("[Portfolio assistant] Provider request failed:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "The portfolio assistant is temporarily unavailable. Please email Suyash at zinjurke77h@gmail.com.",
          });
        }
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
