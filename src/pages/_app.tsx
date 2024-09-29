import { todoState } from "@/store/atoms/todo-atom";
import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import { Todo } from "@prisma/client";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";
import {MutableSnapshot, RecoilRoot} from 'recoil';

function App({ Component, pageProps }: any) {
  const { todos } = pageProps as { todos: Todo[]}; // Explicitly define todos type

  const initializeRecoilState = (snapshot: MutableSnapshot) => {
    if (todos) {
      snapshot.set(todoState, todos); // Hydrate Recoil state with todos
  
    }
  };
  
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot initializeState={initializeRecoilState}>
      <Component {...pageProps} />
      </RecoilRoot>
      <ToastContainer />
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
