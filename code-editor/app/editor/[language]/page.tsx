"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DynamicCodeEditor from "@/app/Components/DynamicLanguage";
import { useTheme } from "@/context/ThemeContext";

type Language = "javascript" | "python" | "go" | "swift" | "c" | "php" | "rust";

const runCode = async (language: string, code: string) => {
  if (language === "javascript") {
    try {
      let result = '';
      const originalLog = console.log;
      console.log = (message: string) => {
        result += message + '\n';
      };
      eval(code);
      console.log = originalLog;

      return result || "Code executed without output.";
    } catch (error: unknown) {
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      }
      return "Unknown error occurred";
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
  const [output, setOutput] = useState<string>("");

  const {theme, toggleTheme} = useTheme();

  useEffect(() => {
    if (!language || !validLanguages.includes(language)) {
      router.push("/editor/javascript");
    }
  }, [language, router]);

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
              onClick={toggleTheme}>
                <img src={theme === 'dark' ? "/icons/sun.svg": "/icons/moon.svg"} alt="" />
              </button>

              <button
              onClick={handleRun}
              className="run-btn"
              >
                  Run
              </button>
            </div>
        </div>
        <DynamicCodeEditor language={language as Language} initialCode={code} onChange={setCode} />
      </div>
      <div className="output">
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
        <pre className="ouput-con">{output}</pre>
      </div>
    </div>
  );
};

export default LanguageEditor;