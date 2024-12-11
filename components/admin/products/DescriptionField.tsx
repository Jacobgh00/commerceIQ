"use client"

import { useState} from "react";
import {RichTextEditor} from "@/components/admin/products/editor/RichTextEditor";

export function DescriptionField(props: {
    initialContent?: string;
}) {
    const [html, setHtml] = useState<string>(props.initialContent || "<p></p>");

    return (
        <div>
            <label className="block font-medium mb-1">Beskrivelse</label>
            <RichTextEditor
                initialContent={html}
                onChange={(newHtml) => setHtml(newHtml)}
            />
            <input type="hidden" name="description" value={html}/>
        </div>
    )
}