"use client"

import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  // useEffect(() => {
  //   redirect('/editor/javascript')
  // })
  return (
    <div className="page">
        <h1 style={{fontSize: "3vw"}}>Welcome to Online Code Editor</h1>
        <h3>Loading...</h3>

    </div>
  );
}
