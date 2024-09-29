import Header from "./components/Header";
import Features from "./components/Features";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import { FC } from "react";
import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "./api/auth/[...nextauth]";

type HomePageProps = {
  session: Session | null;
};


const Home: FC<HomePageProps> = ({ session }) => {
 
  return (
    <>
      <Header session={session}/>
      <HeroSection />
      <Features />
      <Footer />
    </>
  );
};



export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await getServerAuthSession(context);
    return {
      props: {
        session,
      },
    };
  } catch (error) {
    console.error('Error fetching session:', error);
    return {
      props: {
        session: null,
      },
    };
  }
};


export default Home;

