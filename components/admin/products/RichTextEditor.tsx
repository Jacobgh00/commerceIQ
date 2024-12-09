"use client"

import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {Bold} from "@tiptap/extension-bold";
import {Heading} from "@tiptap/extension-heading";
import {useCallback, useEffect, useState} from "react";

export function RichTextEditor(props: {
    initialContent?: string
    onChange?: (html: string) => void
}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Bold,
            Heading,
        ],
        content: props.initialContent || "<p></p>",
        onUpdate({ editor }) {
            props.onChange?.(editor.getHTML())
        }
    }, [isMounted])

    const setHeading3 = useCallback(() => {
        if (!editor) {
            return
        }
        editor.chain().focus().setHeading({ level: 3 }).run()
    }, [editor])

    const toggleBold = useCallback(() => {
        if (!editor) {
            return
        }
        editor.chain().focus().toggleBold().run()
    }, [editor])

    if (!editor) {
        return <div>Loading editor...</div>
    }

    return (
        <div className="border rounded p-2">
            <div className="flex gap-2 mb-2">
                <button
                    type="button"
                    onClick={setHeading3}
                    className="border px-2 py-1 rounded hover:bg-gray-200"
                >
                    H3
                </button>
                <div>
                    <button
                        type="button"
                        onClick={toggleBold}
                        className="border px-2 py-1 rounded hover:bg-gray-200"
                    >
                        Bold
                    </button>
                </div>
            </div>
            <div className="prose max-w-none">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}