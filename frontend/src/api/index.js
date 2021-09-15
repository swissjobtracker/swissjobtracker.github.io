// TODO: conditional import of fake or real api based on env var
//       mayhaps need to conditionally EXport tho, or top level await here
import ts from './fakeapi'

export default {
  ...ts
}
