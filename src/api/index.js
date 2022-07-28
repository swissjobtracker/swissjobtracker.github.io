import fake from './fakeapi'
import real from './api.js'

let thing;
if(process.env.FAKE_API == 'true') {
    thing = ts
} else {
    thing = real
}
export default thing;

