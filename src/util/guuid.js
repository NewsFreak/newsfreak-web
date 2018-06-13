/* Generates a RFC4122 version 4 compliant uuid */
/* This is NOT PERFECT, it should not be used
for important tasks. The current use is giving lists a unique key
*/
/* Source: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#2117523 */
/* eslint-disable */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
/* eslint-enable */