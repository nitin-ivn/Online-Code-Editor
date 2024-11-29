import { useRouter } from "next/router";
import { useState } from "react";
import DynamicCodeEditor from "../Components/DynamicLanguage";


const runCode = async (language: string, code: string) => {
  let output = "";
  if (language === "javascript") {
    try {
      output = eval(code);
    } catch (e: any) {
      output = `Error: ${e.message}`;
    }
  } else if (language === "python") {
    output = "Python execution is not supported in the browser directly.";
  } else if (language === "go") {
    output = "Go execution is not supported in the browser directly.";
  } else if (language === "rust") {
    output = "Rust execution is not supported in the browser directly.";
  } else if (language === "php") {
    output = "PHP execution is not supported in the browser directly.";
  } else if (language === "swift") {
    output = "Swift execution is not supported in the browser directly.";
  } else if (language === "cpp") {
    output = "C/C++ execution is not supported in the browser directly.";
  }
  return output;
};

const LanguageEditor = () => {
  const { query } = useRouter();
  const { language } = query;
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunClick = async () => {
    if (language) {
      const result = await runCode(language as string, code);
      setOutput(result);
    }
  };

  if (!language) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", height: "100vh" }}>
      <div style={{ flex: 1, marginRight: "20px" }}>
        <h2>{`${language[0].toUpperCase() + language.slice(1)} Editor`}</h2>
        <DynamicCodeEditor
          language={language as "javascript" | "python" | "rust" | "go" | "php" | "swift" | "c" }
          initialCode={code}
          onChange={handleCodeChange}
        />
        <button onClick={handleRunClick} style={{ marginTop: "20px" }}>
          Run
        </button>
      </div>

      <div style={{ flex: 1, borderLeft: "1px solid #ddd", paddingLeft: "20px" }}>
        <h3>Output</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default LanguageEditor;
