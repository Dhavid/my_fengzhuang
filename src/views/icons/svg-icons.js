const req = require.context('../../icons/svg', false, /\.svg$/)
console.log(req)
// req:
// webpackContext(req) {
// 	var id = webpackContextResolve(req);
// 	return __webpack_require__(id);
// }
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

console.log(requireAll(req)); //["./404.svg", "./bug.svg", "./chart.svg"]

const svgIcons = requireAll(req).map(i => {
  return i.match(re)[1]
})
console.log(svgIcons) //["404", "bug", "chart"]

export default svgIcons
