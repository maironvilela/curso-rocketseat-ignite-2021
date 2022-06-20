import { createContext, ReactNode } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react"
import { useContext } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode
}

// utilizado na definição do tipo do Contexto
type SidebarDrawerContextData = UseDisclosureReturn

// Define as informações armazenadas no contexto
const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

// exporta o componente que contem o contexto.
export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {


  // hook do chakraUI que retorna funções para manipular o componente Drawer
  const disclosure = useDisclosure()
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath, disclosure])

  return (
    <SidebarDrawerContext.Provider value={disclosure} >

      {children}
    </SidebarDrawerContext.Provider>
  )
}

// cria uma contante contendo o contexto
export const useSidebarDrawer = () => useContext(SidebarDrawerContext)

