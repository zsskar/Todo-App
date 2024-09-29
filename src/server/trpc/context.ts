import { prisma } from '@/db/prisma';
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { Session } from 'next-auth';

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export async function createContext({ req, res }: CreateNextContextOptions) {
  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
