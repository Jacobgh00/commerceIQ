"use client"

import { useState } from "react";
import {RichTextEditor} from "@/components/admin/products/RichTextEditor";

export function DescriptionField() {
    const [html, setHtml] = useState<string>("<p></p>");

    return (
        <div>
            <label className="block font-medium mb-1">Description</label>
            <RichTextEditor
                initialContent="<p></p>"
                onChange={(newHtml) => setHtml(newHtml)}
            />
            <input type="hidden" name="description" value={html}/>
        </div>
    )
}