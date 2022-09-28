import { getKeys } from "./keys";


export const createSnippet = (series) => {
    return `<div class="code">library(kofdata)<br />
tsl <- get_time_series(<br />
  ${getKeys(series).map((key) => `<span class="snippet-string">'${key}'</span>`).join(',\n<br />  ')}<br />
)<br />
tsl</div>`
}

export const copySnippet = (id) => {
  const code_str = document.getElementById(id).textContent;

    // might want to add a document.execCommand('copy') based fallback
    // but let's leave this to out future selves or others for now...
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(code_str)
    return Promise.reject('Error while copying. Please copy and paste code manually.')
}
