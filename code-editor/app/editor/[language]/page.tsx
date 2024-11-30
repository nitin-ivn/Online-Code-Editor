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
  const [themeToggle,setThemeToggle] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>("/icons/sun.svg");

  useEffect(() => {
    if (!language || !validLanguages.includes(language)) {
      router.push("/editor/javascript");
    }
  }, [language, router]);

  const handleTheme = () => {
    setThemeToggle((prev) => !prev);
    if(themeToggle){
      setTheme("/icons/moon.svg");
    }else{
      setTheme('/icons/sun.svg');
    }
  }

  const handleClear = () => {
    setOutput("");
  }

  const handleRun = async () => {
    const result = await runCode(language || "python", code);
    setOutput(result);
  };

  if (!language || !validLanguages.includes(language)) {
    return null;
  }

  return (
    <div className="inp-con">
      <div style={{ flex: 1}}>
        <div className="w-50vw topbar">
            <div className="header">
                <h2>{`${language.charAt(0).toUpperCase() + language.slice(1)}`}</h2>
            </div>
            <div className="flex flex-row">
              <button className="theme-btn me-4 px-3"
              onClick={handleTheme}>
                <img src={theme} alt="" />
              </button>

              <button
              onClick={handleRun}
              className="run-btn"
              >
                  Run
              </button>
            </div>
        </div>
        <DynamicCodeEditor language={language as any} initialCode={code} onChange={setCode} />
      </div>
      <div style={{ flex: 1,borderLeft: "1px solid #373d49" }}>
      <div className="w-50vw topbar">
            <div className="ms-2">
                <h2>Output</h2>
            </div>
            <button
            onClick={handleClear}
            className="clear-btn me-3"
            >
                Clear
            </button>
        </div>
        <p style={{color: "rgb(170,170,170)"}}>#Output will be displayed here</p>
        <pre style={{ background: "#212836", padding: "10px", borderRadius: "5px" }}>{output}</pre>
      </div>
    </div>
  );
};

export default LanguageEditor;