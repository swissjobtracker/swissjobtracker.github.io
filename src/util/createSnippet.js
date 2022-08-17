import { getKeys } from "./keys";


export const createSnippet = (series) => {
    return `<div class="code">library(kofdata)<br />
            tsl <- get_time_series(<br />
                ${getKeys(series).map((key) => `<span class="snippet-string">'${key}'</span>`).join(',<br />')}<br />
            )<br />
            tsl</div>`
}