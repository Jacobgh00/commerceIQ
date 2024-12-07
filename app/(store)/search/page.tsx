import {Renderable} from "@/utilities/ComponentUtilities";

export default async function SearchPage(props: {
    searchParams: { query: string }
}) {
    const {query} = await props.searchParams;

    return (
        <div>
            Searchpage for {query}
        </div>
    )
}