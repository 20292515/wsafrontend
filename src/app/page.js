'use client';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dashboard from "./ui/home/dashboard/dashboard/dashboard";
import './globals.css';
import {useSession} from "next-auth/react";
import { redirect } from "next/navigation";

// root home component used to displayed the dashboard
// the dashboard contains the sidenav and the widget container
// it is wrapped in the DndProvider to enable drag and drop functionality from the react-dnd library
export default function Home() {
  
  const {data: session} = useSession();
  if (!session) {
      redirect('/api/auth/signin');
  }

  return (
    <DndProvider className="normal" backend={HTML5Backend}>  
      <Dashboard />
    </DndProvider>
  );
}
