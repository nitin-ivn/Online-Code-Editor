"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DynamicCodeEditor from "@/app/Components/DynamicLanguage";

const runCode = async (language: string, code: string) => {
  if (language === "javascript") {
    try {
      return eval(code); // Be cautious with eval!
    } catch (error: any) {
      return `Error: ${error.message}`;
    }
  }
  return `Execution for ${language} is not supported in the browser.`;
};

const validLanguages = ["python", "javascript", "go", "php", "rust", "c"];

const LanguageEditor = () => {
  const pathname = usePathname();
  const router = useRouter();
  const language = pathname?.split("/").pop();

  const [code, setCode] = useState("// Start coding here...");
  const [output, setOutput] = useState<string>("# Output is displayed here");

  useEffect(() => {
    if (!language || !validLanguages.includes(language)) {
      router.push("/editor/javascript");
    }
  }, [language, router]);

  const handleCode = (code: string) => {
    setCode(code)
  }

  const handleRun = async () => {
    const result = await runCode(language || "python", code);
    setOutput(result);
  };

  if (!language || !validLanguages.includes(language)) {
    return null;
  }

  return (
    <div style={{marginLeft: "4.2rem",  display: "flex", height: "100vh" }}>
      <div style={{ flex: 1}}>
        <div className="w-50vw topbar">
            <div className="header">
                <h2>{`${language.charAt(0).toUpperCase() + language.slice(1)}`}</h2>
            </div>
            <button
            onClick={handleRun}
            className="run-btn"
            >
                Run
            </button>
        </div>
        <DynamicCodeEditor language={language as any} initialCode={code} onChange={setCode} />
      </div>
      <div style={{ flex: 1,borderLeft: "1px solid #373d49" }}>
      <div className="w-50vw topbar">
            <div className="ms-2">
                <h2>Output</h2>
            </div>
            <button
            className="clear-btn me-3"
            >
                Clear
            </button>
        </div>
        <pre style={{ background: "#212836", padding: "10px", borderRadius: "5px" }}>{output}</pre>
      </div>
    </div>
  );
};

export default LanguageEditor;