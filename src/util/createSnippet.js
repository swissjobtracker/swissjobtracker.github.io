import { getKeys } from "./keys";


export const createSnippet = (series) => {
    return `<div class="code">library(kofdata)<br />
            tsl <- get_time_series(<br />
                ${getKeys(series).map((key) => `<span class="snippet-string">'${key}'</span>`).join(',<br />')}<br />
            )<br />
            tsl</div>`
}

export const copySnippet = (series) => {
    var code_str = `library(kofdata)
tsl <- get_time_series(
${getKeys(series).map((key) => `'${key}'`).join(',')}
    )
tsl`
$q.notify(
    {
        message: 'moo'
    }
)
    // might want to add a document.execCommand('copy') based fallback
    // but let's leave this to out future selves or others for now... 
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(code_str)
    return Promise.reject('The Clipboard API is not available. Please copy and paste code manually')
    
}