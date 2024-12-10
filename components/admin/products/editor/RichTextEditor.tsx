"use client"

import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import {useCallback, useEffect, useState} from "react";

export function RichTextEditor(props: {
    initialContent?: string;
    onChange?: (html: string) => void;
}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const editor = useEditor(
        {
            extensions: [
                StarterKit.configure({
                    heading: {levels: [1, 2, 3]},
                }),
                Bold,
                Italic,
                Strike,
                Heading,
                BulletList,
                OrderedList,
                ListItem,
                Blockquote,
            ],
            content: props.initialContent || "<p></p>",
            onUpdate({editor}) {
                props.onChange?.(editor.getHTML());
            },
        },
        [isMounted]
    );

    type HeadingLevel = 1 | 2 | 3;

    const setHeading = useCallback((level: HeadingLevel) => {
        if (!editor) return;
        editor.chain().focus().toggleHeading({level}).run();
    }, [editor]);

    const toggleBold = useCallback(() => {
        editor?.chain().focus().toggleBold().run();
    }, [editor]);

    const toggleItalic = useCallback(() => {
        editor?.chain().focus().toggleItalic().run();
    }, [editor]);

    const toggleStrike = useCallback(() => {
        editor?.chain().focus().toggleStrike().run();
    }, [editor]);

    const addBulletList = useCallback(() => {
        editor?.chain().focus().toggleBulletList().run();
    }, [editor]);

    const addOrderedList = useCallback(() => {
        editor?.chain().focus().toggleOrderedList().run();
    }, [editor]);

    const addBlockquote = useCallback(() => {
        editor?.chain().focus().toggleBlockquote().run();
    }, [editor]);

    const setParagraph = useCallback(() => {
        editor?.chain().focus().setParagraph().run();
    }, [editor]);

    const setNormal = useCallback(() => {
        if (!editor) return;

        editor.chain().focus().unsetAllMarks().run();
        if (editor.isActive("bold")) toggleBold();
        if (editor.isActive("italic")) toggleItalic();
        if (editor.isActive("strike")) toggleStrike();
    }, [editor, toggleBold, toggleItalic, toggleStrike]);

    const setNormalBlock = useCallback(() => {
        setParagraph();
    }, [setParagraph]);

    if (!editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <div className="border rounded p-2">
            <div className="flex flex-wrap gap-2 mb-2 items-center">
                <div className="flex-1 min-w-[120px]">
                    <select
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === "paragraph") {
                                setParagraph();
                            } else {
                                const level = parseInt(value) as HeadingLevel;
                                setHeading(level);
                            }
                        }}
                        className="w-full border px-2 py-1 rounded hover:bg-gray-200"
                        defaultValue="paragraph"
                    >
                        <option value="paragraph">P</option>
                        <option value="1">H1</option>
                        <option value="2">H2</option>
                        <option value="3">H3</option>
                    </select>
                </div>

                <div className="flex-1 min-w-[120px]">
                    <select
                        className="w-full border px-2 py-1 rounded hover:bg-gray-200"
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "normal") setNormal();
                            if (val === "bold") toggleBold();
                            if (val === "italic") toggleItalic();
                            if (val === "strike") toggleStrike();
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>Text</option>
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="italic">Italic</option>
                        <option value="strike">Strike</option>
                    </select>
                </div>

                <div className="flex-1 min-w-[120px]">
                    <select
                        className="w-full border px-2 py-1 rounded hover:bg-gray-200"
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "normal") setNormalBlock();
                            if (val === "bullet") addBulletList();
                            if (val === "ordered") addOrderedList();
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>Lists</option>
                        <option value="normal">Normal</option>
                        <option value="bullet">Bullet List</option>
                        <option value="ordered">Ordered List</option>
                    </select>
                </div>

                <div className="flex-1 min-w-[120px]">
                    <select
                        className="w-full border px-2 py-1 rounded hover:bg-gray-200"
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "normal") setNormalBlock();
                            if (val === "blockquote") addBlockquote();
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>Insert</option>
                        <option value="normal">Normal</option>
                        <option value="blockquote">Citat</option>
                    </select>
                </div>
            </div>

            <div className="prose max-w-none">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
        ;
}