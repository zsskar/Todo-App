import Header from "../components/Header";
import { Session } from "next-auth";
import { FC } from "react";
import { prisma } from "@/db/prisma";
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "../api/auth/[...nextauth]";
import superjson from 'superjson';
import Main from "./Main";
import { Todo } from "@/types/todo_types";

type DashboardProps = {
  session: Session;
  todos : Todo[];
};


const Dashboard: FC<DashboardProps> = ({ session, todos }) => {
    return (
      <>
      <Header session={session} />
      <Main todos={todos} />
      </>
    );

}
export const getServerSideProps: GetServerSideProps = async (context) => {  
  try {
    const session = await getServerAuthSession(context);

    if (!session?.user?.id) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    const todos = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
    });

    // console.log("todos :",todos);
    const serializedTodos = superjson.serialize(todos);
    return {
      props: {
        session,
        todos: serializedTodos.json, 
      },
    };
  } catch (error) {
    // console.error('Error fetching todos:', error);
    return {
      props: {
        session : null,
        todos: [], 
      },
    };
  }
};



export default Dashboard;
