import React, { useEffect, useRef } from "react";
import { oneDark } from "@codemirror/theme-one-dark";
import { ChangeSet, EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { go } from "@codemirror/lang-go";
import {php} from "@codemirror/lang-php"
import {cpp} from "@codemirror/lang-cpp"
import {rust} from "@codemirror/lang-rust"
import { defaultKeymap } from "@codemirror/commands";

interface DynamicCodeEditorProps {
  language: "javascript" | "python" | "go" | "swift" | "c" | "php" | "rust" | "swift";
  initialCode: string;
  onChange?: (value: string) => void;
}

const DynamicCodeEditor: React.FC<DynamicCodeEditorProps> = ({ language, initialCode, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const languageExtension = (() => {
      switch (language) {
        case "javascript":
          return javascript();
        case "python":
          return python();
        case "go":
          return go();
        case "php":
          return php();
        case "c":
          return cpp();
        case "rust":
          return rust();
        case "swift":
          alert("Swift is not natively supported in CodeMirror. Using JavaScript syntax highlighting as a fallback.");
          return javascript();
        default:
          return python();
      }
    })();

    const updateListener = EditorView.updateListener.of((update: { changes: ChangeSet; state: EditorState }) => {
      if (update.changes && onChange) {
        const doc = update.state.doc;
        onChange(doc.toString());
      }
    });

    const state = EditorState.create({
      doc: initialCode,
      extensions: [lineNumbers(), languageExtension, updateListener,keymap.of(defaultKeymap),oneDark],
    });
    

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => view.destroy();
  }, [language, initialCode, onChange]);

  return <div ref={editorRef} className="editor"/>;
};

export default DynamicCodeEditor;
