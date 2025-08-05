"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/uploads/route";
exports.ids = ["app/api/uploads/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploads%2Froute&page=%2Fapi%2Fuploads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploads%2Froute.ts&appDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploads%2Froute&page=%2Fapi%2Fuploads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploads%2Froute.ts&appDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/../../node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_shrijayan_rajendran_projects_personal_bank_statement_apps_web_src_app_api_uploads_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/uploads/route.ts */ \"(rsc)/./src/app/api/uploads/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/uploads/route\",\n        pathname: \"/api/uploads\",\n        filename: \"route\",\n        bundlePath: \"app/api/uploads/route\"\n    },\n    resolvedPagePath: \"/Users/shrijayan.rajendran/projects/personal/bank_statement/apps/web/src/app/api/uploads/route.ts\",\n    nextConfigOutput,\n    userland: _Users_shrijayan_rajendran_projects_personal_bank_statement_apps_web_src_app_api_uploads_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/uploads/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyLmpzP25hbWU9YXBwJTJGYXBpJTJGdXBsb2FkcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdXBsb2FkcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZHMlMkZyb3V0ZS50cyZhcHBEaXI9JTJGVXNlcnMlMkZzaHJpamF5YW4ucmFqZW5kcmFuJTJGcHJvamVjdHMlMkZwZXJzb25hbCUyRmJhbmtfc3RhdGVtZW50JTJGYXBwcyUyRndlYiUyRnNyYyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZzaHJpamF5YW4ucmFqZW5kcmFuJTJGcHJvamVjdHMlMkZwZXJzb25hbCUyRmJhbmtfc3RhdGVtZW50JTJGYXBwcyUyRndlYiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDaUQ7QUFDOUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWIvPzEyNDIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3NocmlqYXlhbi5yYWplbmRyYW4vcHJvamVjdHMvcGVyc29uYWwvYmFua19zdGF0ZW1lbnQvYXBwcy93ZWIvc3JjL2FwcC9hcGkvdXBsb2Fkcy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXBsb2Fkcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VwbG9hZHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VwbG9hZHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvc2hyaWpheWFuLnJhamVuZHJhbi9wcm9qZWN0cy9wZXJzb25hbC9iYW5rX3N0YXRlbWVudC9hcHBzL3dlYi9zcmMvYXBwL2FwaS91cGxvYWRzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS91cGxvYWRzL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploads%2Froute&page=%2Fapi%2Fuploads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploads%2Froute.ts&appDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/uploads/route.ts":
/*!**************************************!*\
  !*** ./src/app/api/uploads/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/../../node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/../../node_modules/next-auth/next/index.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! zod */ \"(rsc)/../../node_modules/zod/v4/classic/schemas.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! zod */ \"(rsc)/../../node_modules/zod/v4/classic/errors.js\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n// Mark this route as dynamic\nconst dynamic = \"force-dynamic\";\n// File validation constants\nconst ACCEPTED_FILE_TYPES = [\n    \"application/pdf\",\n    \"text/csv\",\n    \"text/plain\"\n];\nconst MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB\nconst MAX_FILES = 5;\n// Validation schema\nconst uploadSchema = zod__WEBPACK_IMPORTED_MODULE_5__.object({\n    files: zod__WEBPACK_IMPORTED_MODULE_5__.array(zod__WEBPACK_IMPORTED_MODULE_5__[\"instanceof\"](File)).min(1, \"At least one file required\").max(MAX_FILES, `Maximum ${MAX_FILES} files allowed`)\n});\n/**\n * Validates a single file for type and size\n */ function validateFile(file) {\n    // Check file type\n    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {\n        return {\n            filename: file.name,\n            error: `File type ${file.type} is not supported. Please upload PDF, CSV, or TXT files only.`,\n            code: \"INVALID_TYPE\"\n        };\n    }\n    // Check file size\n    if (file.size > MAX_FILE_SIZE) {\n        return {\n            filename: file.name,\n            error: `File size ${(file.size / (1024 * 1024)).toFixed(2)}MB exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit.`,\n            code: \"FILE_TOO_LARGE\"\n        };\n    }\n    // Basic file integrity check\n    if (file.size === 0) {\n        return {\n            filename: file.name,\n            error: \"File is empty or corrupted.\",\n            code: \"INVALID_FILE\"\n        };\n    }\n    return null;\n}\n/**\n * Generates a unique upload ID for tracking\n */ function generateUploadId() {\n    return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;\n}\n/**\n * Trigger analysis workflow for uploaded files\n * Integrated with AnalysisService from Story 2.2\n */ async function triggerAnalysisWorkflow(uploadId, fileReferences, userId) {\n    try {\n        // Import AnalysisService dynamically to avoid circular dependencies\n        const { analysisService } = await Promise.all(/*! import() */[__webpack_require__.e(\"vendor-chunks/@google\"), __webpack_require__.e(\"vendor-chunks/gaxios\"), __webpack_require__.e(\"vendor-chunks/google-auth-library\"), __webpack_require__.e(\"vendor-chunks/ws\"), __webpack_require__.e(\"vendor-chunks/bignumber.js\"), __webpack_require__.e(\"vendor-chunks/json-bigint\"), __webpack_require__.e(\"vendor-chunks/google-logging-utils\"), __webpack_require__.e(\"vendor-chunks/debug\"), __webpack_require__.e(\"vendor-chunks/gtoken\"), __webpack_require__.e(\"vendor-chunks/jws\"), __webpack_require__.e(\"vendor-chunks/jwa\"), __webpack_require__.e(\"vendor-chunks/ecdsa-sig-formatter\"), __webpack_require__.e(\"vendor-chunks/base64-js\"), __webpack_require__.e(\"vendor-chunks/extend\"), __webpack_require__.e(\"vendor-chunks/ms\"), __webpack_require__.e(\"vendor-chunks/supports-color\"), __webpack_require__.e(\"vendor-chunks/safe-buffer\"), __webpack_require__.e(\"vendor-chunks/buffer-equal-constant-time\"), __webpack_require__.e(\"vendor-chunks/is-stream\"), __webpack_require__.e(\"vendor-chunks/has-flag\"), __webpack_require__.e(\"_rsc_src_lib_services_AnalysisService_ts-_3713-_8e41-_d1700\")]).then(__webpack_require__.bind(__webpack_require__, /*! @/lib/services/AnalysisService */ \"(rsc)/./src/lib/services/AnalysisService.ts\"));\n        // Start the analysis process\n        const analysisId = await analysisService.processAnalysis(uploadId, fileReferences, userId);\n        console.log(\"Analysis workflow started successfully:\", {\n            uploadId,\n            analysisId,\n            fileCount: fileReferences.length\n        });\n        return analysisId;\n    } catch (error) {\n        console.error(\"Failed to trigger analysis workflow:\", error);\n        // Don't throw error to avoid breaking the upload flow\n        return null;\n    }\n}\n/**\n * POST /api/uploads\n * Handles file upload with optional authentication (allows guest uploads)\n */ async function POST(request) {\n    try {\n        // 1. Check authentication (optional for guest uploads)\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)();\n        const isAuthenticated = !!session?.user?.email;\n        let userId;\n        if (isAuthenticated) {\n            // For authenticated users, look up their ObjectId\n            const { userRepository } = await __webpack_require__.e(/*! import() */ \"_rsc_packages_db_src_repositories_UserRepository_ts-_bf460\").then(__webpack_require__.bind(__webpack_require__, /*! db/src/repositories/UserRepository */ \"(rsc)/../../packages/db/src/repositories/UserRepository.ts\"));\n            const user = await userRepository.findByEmail(session.user.email);\n            if (user) {\n                userId = user._id; // Use ObjectId for authenticated users\n            } else {\n                // User not found in database, treat as guest\n                userId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;\n            }\n        } else {\n            // Guest user\n            userId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;\n        }\n        // 2. Parse form data\n        const formData = await request.formData();\n        const files = [];\n        // Collect all files from form data\n        const entries = Array.from(formData.entries());\n        for (const [key, value] of entries){\n            if (key === \"files\" && value instanceof File) {\n                files.push(value);\n            }\n        }\n        if (files.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"No files provided. Please select files to upload.\"\n            }, {\n                status: 400\n            });\n        }\n        // 3. Validate request structure\n        const validationResult = uploadSchema.safeParse({\n            files\n        });\n        if (!validationResult.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid request\",\n                details: validationResult.error.issues.map((e)=>e.message)\n            }, {\n                status: 400\n            });\n        }\n        // 4. Validate individual files\n        const validationErrors = [];\n        for (const file of files){\n            const error = validateFile(file);\n            if (error) {\n                validationErrors.push(error);\n            }\n        }\n        if (validationErrors.length > 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"File validation failed\",\n                validationErrors\n            }, {\n                status: 400\n            });\n        }\n        // 5. Store files locally (development) or in cloud storage (production)\n        const uploadPromises = files.map(async (file, index)=>{\n            const timestamp = Date.now();\n            const randomId = Math.random().toString(36).substr(2, 9);\n            const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, \"_\");\n            const filename = `${timestamp}-${randomId}-${safeName}`;\n            try {\n                // Create uploads directory if it doesn't exist\n                const uploadsDir = (0,path__WEBPACK_IMPORTED_MODULE_3__.join)(process.cwd(), \"apps\", \"web\", \"uploads\", userId.replace(/[^a-zA-Z0-9.-]/g, \"_\"));\n                if (!(0,fs__WEBPACK_IMPORTED_MODULE_4__.existsSync)(uploadsDir)) {\n                    await (0,fs_promises__WEBPACK_IMPORTED_MODULE_2__.mkdir)(uploadsDir, {\n                        recursive: true\n                    });\n                }\n                // Convert file to buffer and save locally\n                const bytes = await file.arrayBuffer();\n                const buffer = Buffer.from(bytes);\n                const filepath = (0,path__WEBPACK_IMPORTED_MODULE_3__.join)(uploadsDir, filename);\n                await (0,fs_promises__WEBPACK_IMPORTED_MODULE_2__.writeFile)(filepath, buffer);\n                // Return local file path as reference\n                return `local://${userId.replace(/[^a-zA-Z0-9.-]/g, \"_\")}/${filename}`;\n            } catch (error) {\n                console.error(\"File upload error:\", error);\n                throw new Error(`Failed to upload ${file.name}`);\n            }\n        });\n        let fileReferences;\n        try {\n            fileReferences = await Promise.all(uploadPromises);\n        } catch (error) {\n            console.error(\"File upload error:\", error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to upload files. Please try again.\"\n            }, {\n                status: 500\n            });\n        }\n        // 6. Generate upload ID and trigger analysis workflow\n        const uploadId = generateUploadId();\n        try {\n            await triggerAnalysisWorkflow(uploadId, fileReferences, userId);\n        } catch (error) {\n            console.error(\"Analysis workflow trigger error:\", error);\n        // Don't fail the upload if analysis trigger fails\n        }\n        // 7. Return success response\n        const response = {\n            message: \"Files uploaded successfully\",\n            fileReferences,\n            uploadId\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(response, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Upload API error:\", error);\n        if (error instanceof zod__WEBPACK_IMPORTED_MODULE_6__.ZodError) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid request data\",\n                details: error.issues\n            }, {\n                status: 400\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal server error. Please try again.\"\n        }, {\n            status: 500\n        });\n    }\n}\n/**\n * GET /api/uploads\n * Optional: List user's uploaded files (for future enhancement)\n */ async function GET(request) {\n    // Verify authentication\n    const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)();\n    if (!session?.user?.email) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Authentication required\"\n        }, {\n            status: 401\n        });\n    }\n    // TODO: Implement file listing functionality in future stories\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        message: \"File listing not yet implemented\"\n    }, {\n        status: 501\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FDdEI7Z0JBQUV0QyxPQUFPO2dCQUF3QjJDLFNBQVMzQyxNQUFNNEMsTUFBTTtZQUFDLEdBQ3ZEO2dCQUFFTCxRQUFRO1lBQUk7UUFFbEI7UUFFQSxPQUFPaEUscURBQVlBLENBQUMrRCxJQUFJLENBQ3RCO1lBQUV0QyxPQUFPO1FBQTJDLEdBQ3BEO1lBQUV1QyxRQUFRO1FBQUk7SUFFbEI7QUFDRjtBQUVBOzs7Q0FHQyxHQUNNLGVBQWU4QixJQUFJOUMsT0FBb0I7SUFDNUMsd0JBQXdCO0lBQ3hCLE1BQU1DLFVBQVUsTUFBTWhELGdFQUFnQkE7SUFDdEMsSUFBSSxDQUFDZ0QsU0FBU0UsTUFBTUMsT0FBTztRQUN6QixPQUFPcEQscURBQVlBLENBQUMrRCxJQUFJLENBQ3RCO1lBQUV0QyxPQUFPO1FBQTBCLEdBQ25DO1lBQUV1QyxRQUFRO1FBQUk7SUFFbEI7SUFFQSwrREFBK0Q7SUFDL0QsT0FBT2hFLHFEQUFZQSxDQUFDK0QsSUFBSSxDQUN0QjtRQUFFUyxTQUFTO0lBQW1DLEdBQzlDO1FBQUVSLFFBQVE7SUFBSTtBQUVsQiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi8uL3NyYy9hcHAvYXBpL3VwbG9hZHMvcm91dGUudHM/ZWZlYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aC9uZXh0JztcbmltcG9ydCB7IHogfSBmcm9tICd6b2QnO1xuaW1wb3J0IHsgd3JpdGVGaWxlLCBta2RpciB9IGZyb20gJ2ZzL3Byb21pc2VzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgdHlwZSB7IEZpbGVVcGxvYWRSZXNwb25zZSwgRmlsZVZhbGlkYXRpb25FcnJvciB9IGZyb20gJ2xpYi90eXBlcyc7XG5cbi8vIE1hcmsgdGhpcyByb3V0ZSBhcyBkeW5hbWljXG5leHBvcnQgY29uc3QgZHluYW1pYyA9ICdmb3JjZS1keW5hbWljJztcblxuLy8gRmlsZSB2YWxpZGF0aW9uIGNvbnN0YW50c1xuY29uc3QgQUNDRVBURURfRklMRV9UWVBFUyA9IFsnYXBwbGljYXRpb24vcGRmJywgJ3RleHQvY3N2JywgJ3RleHQvcGxhaW4nXTtcbmNvbnN0IE1BWF9GSUxFX1NJWkUgPSAxMCAqIDEwMjQgKiAxMDI0OyAvLyAxME1CXG5jb25zdCBNQVhfRklMRVMgPSA1O1xuXG4vLyBWYWxpZGF0aW9uIHNjaGVtYVxuY29uc3QgdXBsb2FkU2NoZW1hID0gei5vYmplY3Qoe1xuICBmaWxlczogei5hcnJheSh6Lmluc3RhbmNlb2YoRmlsZSkpLm1pbigxLCAnQXQgbGVhc3Qgb25lIGZpbGUgcmVxdWlyZWQnKS5tYXgoTUFYX0ZJTEVTLCBgTWF4aW11bSAke01BWF9GSUxFU30gZmlsZXMgYWxsb3dlZGApLFxufSk7XG5cbi8qKlxuICogVmFsaWRhdGVzIGEgc2luZ2xlIGZpbGUgZm9yIHR5cGUgYW5kIHNpemVcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVGaWxlKGZpbGU6IEZpbGUpOiBGaWxlVmFsaWRhdGlvbkVycm9yIHwgbnVsbCB7XG4gIC8vIENoZWNrIGZpbGUgdHlwZVxuICBpZiAoIUFDQ0VQVEVEX0ZJTEVfVFlQRVMuaW5jbHVkZXMoZmlsZS50eXBlKSkge1xuICAgIHJldHVybiB7XG4gICAgICBmaWxlbmFtZTogZmlsZS5uYW1lLFxuICAgICAgZXJyb3I6IGBGaWxlIHR5cGUgJHtmaWxlLnR5cGV9IGlzIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSB1cGxvYWQgUERGLCBDU1YsIG9yIFRYVCBmaWxlcyBvbmx5LmAsXG4gICAgICBjb2RlOiAnSU5WQUxJRF9UWVBFJ1xuICAgIH07XG4gIH1cblxuICAvLyBDaGVjayBmaWxlIHNpemVcbiAgaWYgKGZpbGUuc2l6ZSA+IE1BWF9GSUxFX1NJWkUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZW5hbWU6IGZpbGUubmFtZSxcbiAgICAgIGVycm9yOiBgRmlsZSBzaXplICR7KGZpbGUuc2l6ZSAvICgxMDI0ICogMTAyNCkpLnRvRml4ZWQoMil9TUIgZXhjZWVkcyB0aGUgJHsoTUFYX0ZJTEVfU0laRSAvICgxMDI0ICogMTAyNCkpfU1CIGxpbWl0LmAsXG4gICAgICBjb2RlOiAnRklMRV9UT09fTEFSR0UnXG4gICAgfTtcbiAgfVxuXG4gIC8vIEJhc2ljIGZpbGUgaW50ZWdyaXR5IGNoZWNrXG4gIGlmIChmaWxlLnNpemUgPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmlsZW5hbWU6IGZpbGUubmFtZSxcbiAgICAgIGVycm9yOiAnRmlsZSBpcyBlbXB0eSBvciBjb3JydXB0ZWQuJyxcbiAgICAgIGNvZGU6ICdJTlZBTElEX0ZJTEUnXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHVuaXF1ZSB1cGxvYWQgSUQgZm9yIHRyYWNraW5nXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlVXBsb2FkSWQoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB1cGxvYWRfJHtEYXRlLm5vdygpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KX1gO1xufVxuXG4vKipcbiAqIFRyaWdnZXIgYW5hbHlzaXMgd29ya2Zsb3cgZm9yIHVwbG9hZGVkIGZpbGVzXG4gKiBJbnRlZ3JhdGVkIHdpdGggQW5hbHlzaXNTZXJ2aWNlIGZyb20gU3RvcnkgMi4yXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHRyaWdnZXJBbmFseXNpc1dvcmtmbG93KFxuICB1cGxvYWRJZDogc3RyaW5nLCBcbiAgZmlsZVJlZmVyZW5jZXM6IHN0cmluZ1tdLCBcbiAgdXNlcklkOiBzdHJpbmdcbik6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICB0cnkge1xuICAgIC8vIEltcG9ydCBBbmFseXNpc1NlcnZpY2UgZHluYW1pY2FsbHkgdG8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzXG4gICAgY29uc3QgeyBhbmFseXNpc1NlcnZpY2UgfSA9IGF3YWl0IGltcG9ydCgnQC9saWIvc2VydmljZXMvQW5hbHlzaXNTZXJ2aWNlJyk7XG4gICAgXG4gICAgLy8gU3RhcnQgdGhlIGFuYWx5c2lzIHByb2Nlc3NcbiAgICBjb25zdCBhbmFseXNpc0lkID0gYXdhaXQgYW5hbHlzaXNTZXJ2aWNlLnByb2Nlc3NBbmFseXNpcyhcbiAgICAgIHVwbG9hZElkLFxuICAgICAgZmlsZVJlZmVyZW5jZXMsXG4gICAgICB1c2VySWRcbiAgICApO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdBbmFseXNpcyB3b3JrZmxvdyBzdGFydGVkIHN1Y2Nlc3NmdWxseTonLCB7IHVwbG9hZElkLCBhbmFseXNpc0lkLCBmaWxlQ291bnQ6IGZpbGVSZWZlcmVuY2VzLmxlbmd0aCB9KTtcbiAgICByZXR1cm4gYW5hbHlzaXNJZDtcbiAgICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gdHJpZ2dlciBhbmFseXNpcyB3b3JrZmxvdzonLCBlcnJvcik7XG4gICAgLy8gRG9uJ3QgdGhyb3cgZXJyb3IgdG8gYXZvaWQgYnJlYWtpbmcgdGhlIHVwbG9hZCBmbG93XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBQT1NUIC9hcGkvdXBsb2Fkc1xuICogSGFuZGxlcyBmaWxlIHVwbG9hZCB3aXRoIG9wdGlvbmFsIGF1dGhlbnRpY2F0aW9uIChhbGxvd3MgZ3Vlc3QgdXBsb2FkcylcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpOiBQcm9taXNlPE5leHRSZXNwb25zZT4ge1xuICB0cnkge1xuICAgIC8vIDEuIENoZWNrIGF1dGhlbnRpY2F0aW9uIChvcHRpb25hbCBmb3IgZ3Vlc3QgdXBsb2FkcylcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbigpO1xuICAgIGNvbnN0IGlzQXV0aGVudGljYXRlZCA9ICEhc2Vzc2lvbj8udXNlcj8uZW1haWw7XG4gICAgXG4gICAgbGV0IHVzZXJJZDogc3RyaW5nO1xuICAgIGlmIChpc0F1dGhlbnRpY2F0ZWQpIHtcbiAgICAgIC8vIEZvciBhdXRoZW50aWNhdGVkIHVzZXJzLCBsb29rIHVwIHRoZWlyIE9iamVjdElkXG4gICAgICBjb25zdCB7IHVzZXJSZXBvc2l0b3J5IH0gPSBhd2FpdCBpbXBvcnQoJ2RiL3NyYy9yZXBvc2l0b3JpZXMvVXNlclJlcG9zaXRvcnknKTtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2VyUmVwb3NpdG9yeS5maW5kQnlFbWFpbChzZXNzaW9uLnVzZXIuZW1haWwhKTtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHVzZXJJZCA9IHVzZXIuX2lkOyAvLyBVc2UgT2JqZWN0SWQgZm9yIGF1dGhlbnRpY2F0ZWQgdXNlcnNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVzZXIgbm90IGZvdW5kIGluIGRhdGFiYXNlLCB0cmVhdCBhcyBndWVzdFxuICAgICAgICB1c2VySWQgPSBgZ3Vlc3RfJHtEYXRlLm5vdygpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KX1gO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBHdWVzdCB1c2VyXG4gICAgICB1c2VySWQgPSBgZ3Vlc3RfJHtEYXRlLm5vdygpfV8ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KX1gO1xuICAgIH1cblxuICAgIC8vIDIuIFBhcnNlIGZvcm0gZGF0YVxuICAgIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxdWVzdC5mb3JtRGF0YSgpO1xuICAgIGNvbnN0IGZpbGVzOiBGaWxlW10gPSBbXTtcbiAgICBcbiAgICAvLyBDb2xsZWN0IGFsbCBmaWxlcyBmcm9tIGZvcm0gZGF0YVxuICAgIGNvbnN0IGVudHJpZXMgPSBBcnJheS5mcm9tKGZvcm1EYXRhLmVudHJpZXMoKSk7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcykge1xuICAgICAgaWYgKGtleSA9PT0gJ2ZpbGVzJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgICAgZmlsZXMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnTm8gZmlsZXMgcHJvdmlkZWQuIFBsZWFzZSBzZWxlY3QgZmlsZXMgdG8gdXBsb2FkLicgfSwgXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyAzLiBWYWxpZGF0ZSByZXF1ZXN0IHN0cnVjdHVyZVxuICAgIGNvbnN0IHZhbGlkYXRpb25SZXN1bHQgPSB1cGxvYWRTY2hlbWEuc2FmZVBhcnNlKHsgZmlsZXMgfSk7XG4gICAgaWYgKCF2YWxpZGF0aW9uUmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBcbiAgICAgICAgICBlcnJvcjogJ0ludmFsaWQgcmVxdWVzdCcsIFxuICAgICAgICAgIGRldGFpbHM6IHZhbGlkYXRpb25SZXN1bHQuZXJyb3IuaXNzdWVzLm1hcCgoZTogYW55KSA9PiBlLm1lc3NhZ2UpXG4gICAgICAgIH0sIFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gNC4gVmFsaWRhdGUgaW5kaXZpZHVhbCBmaWxlc1xuICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvcnM6IEZpbGVWYWxpZGF0aW9uRXJyb3JbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgY29uc3QgZXJyb3IgPSB2YWxpZGF0ZUZpbGUoZmlsZSk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodmFsaWRhdGlvbkVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgXG4gICAgICAgICAgZXJyb3I6ICdGaWxlIHZhbGlkYXRpb24gZmFpbGVkJywgXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9ycyBcbiAgICAgICAgfSwgXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyA1LiBTdG9yZSBmaWxlcyBsb2NhbGx5IChkZXZlbG9wbWVudCkgb3IgaW4gY2xvdWQgc3RvcmFnZSAocHJvZHVjdGlvbilcbiAgICBjb25zdCB1cGxvYWRQcm9taXNlcyA9IGZpbGVzLm1hcChhc3luYyAoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCByYW5kb21JZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcbiAgICAgIGNvbnN0IHNhZmVOYW1lID0gZmlsZS5uYW1lLnJlcGxhY2UoL1teYS16QS1aMC05Li1dL2csICdfJyk7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGAke3RpbWVzdGFtcH0tJHtyYW5kb21JZH0tJHtzYWZlTmFtZX1gO1xuICAgICAgXG4gICAgICB0cnkge1xuICAgICAgICAvLyBDcmVhdGUgdXBsb2FkcyBkaXJlY3RvcnkgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgICAgICBjb25zdCB1cGxvYWRzRGlyID0gam9pbihwcm9jZXNzLmN3ZCgpLCAnYXBwcycsICd3ZWInLCAndXBsb2FkcycsIHVzZXJJZC5yZXBsYWNlKC9bXmEtekEtWjAtOS4tXS9nLCAnXycpKTtcbiAgICAgICAgaWYgKCFleGlzdHNTeW5jKHVwbG9hZHNEaXIpKSB7XG4gICAgICAgICAgYXdhaXQgbWtkaXIodXBsb2Fkc0RpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb252ZXJ0IGZpbGUgdG8gYnVmZmVyIGFuZCBzYXZlIGxvY2FsbHlcbiAgICAgICAgY29uc3QgYnl0ZXMgPSBhd2FpdCBmaWxlLmFycmF5QnVmZmVyKCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGJ5dGVzKTtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBqb2luKHVwbG9hZHNEaXIsIGZpbGVuYW1lKTtcbiAgICAgICAgXG4gICAgICAgIGF3YWl0IHdyaXRlRmlsZShmaWxlcGF0aCwgYnVmZmVyKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFJldHVybiBsb2NhbCBmaWxlIHBhdGggYXMgcmVmZXJlbmNlXG4gICAgICAgIHJldHVybiBgbG9jYWw6Ly8ke3VzZXJJZC5yZXBsYWNlKC9bXmEtekEtWjAtOS4tXS9nLCAnXycpfS8ke2ZpbGVuYW1lfWA7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGaWxlIHVwbG9hZCBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHVwbG9hZCAke2ZpbGUubmFtZX1gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBmaWxlUmVmZXJlbmNlczogc3RyaW5nW107XG4gICAgdHJ5IHtcbiAgICAgIGZpbGVSZWZlcmVuY2VzID0gYXdhaXQgUHJvbWlzZS5hbGwodXBsb2FkUHJvbWlzZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGaWxlIHVwbG9hZCBlcnJvcjonLCBlcnJvcik7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gdXBsb2FkIGZpbGVzLiBQbGVhc2UgdHJ5IGFnYWluLicgfSwgXG4gICAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyA2LiBHZW5lcmF0ZSB1cGxvYWQgSUQgYW5kIHRyaWdnZXIgYW5hbHlzaXMgd29ya2Zsb3dcbiAgICBjb25zdCB1cGxvYWRJZCA9IGdlbmVyYXRlVXBsb2FkSWQoKTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdHJpZ2dlckFuYWx5c2lzV29ya2Zsb3codXBsb2FkSWQsIGZpbGVSZWZlcmVuY2VzLCB1c2VySWQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbmFseXNpcyB3b3JrZmxvdyB0cmlnZ2VyIGVycm9yOicsIGVycm9yKTtcbiAgICAgIC8vIERvbid0IGZhaWwgdGhlIHVwbG9hZCBpZiBhbmFseXNpcyB0cmlnZ2VyIGZhaWxzXG4gICAgfVxuXG4gICAgLy8gNy4gUmV0dXJuIHN1Y2Nlc3MgcmVzcG9uc2VcbiAgICBjb25zdCByZXNwb25zZTogRmlsZVVwbG9hZFJlc3BvbnNlID0ge1xuICAgICAgbWVzc2FnZTogJ0ZpbGVzIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsXG4gICAgICBmaWxlUmVmZXJlbmNlcyxcbiAgICAgIHVwbG9hZElkXG4gICAgfTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXNwb25zZSwgeyBzdGF0dXM6IDIwMSB9KTtcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1VwbG9hZCBBUEkgZXJyb3I6JywgZXJyb3IpO1xuICAgIFxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIHouWm9kRXJyb3IpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0ludmFsaWQgcmVxdWVzdCBkYXRhJywgZGV0YWlsczogZXJyb3IuaXNzdWVzIH0sIFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvci4gUGxlYXNlIHRyeSBhZ2Fpbi4nIH0sIFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIEdFVCAvYXBpL3VwbG9hZHNcbiAqIE9wdGlvbmFsOiBMaXN0IHVzZXIncyB1cGxvYWRlZCBmaWxlcyAoZm9yIGZ1dHVyZSBlbmhhbmNlbWVudClcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCk6IFByb21pc2U8TmV4dFJlc3BvbnNlPiB7XG4gIC8vIFZlcmlmeSBhdXRoZW50aWNhdGlvblxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbigpO1xuICBpZiAoIXNlc3Npb24/LnVzZXI/LmVtYWlsKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0F1dGhlbnRpY2F0aW9uIHJlcXVpcmVkJyB9LCBcbiAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICk7XG4gIH1cblxuICAvLyBUT0RPOiBJbXBsZW1lbnQgZmlsZSBsaXN0aW5nIGZ1bmN0aW9uYWxpdHkgaW4gZnV0dXJlIHN0b3JpZXNcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgIHsgbWVzc2FnZTogJ0ZpbGUgbGlzdGluZyBub3QgeWV0IGltcGxlbWVudGVkJyB9LCBcbiAgICB7IHN0YXR1czogNTAxIH1cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwieiIsIndyaXRlRmlsZSIsIm1rZGlyIiwiam9pbiIsImV4aXN0c1N5bmMiLCJkeW5hbWljIiwiQUNDRVBURURfRklMRV9UWVBFUyIsIk1BWF9GSUxFX1NJWkUiLCJNQVhfRklMRVMiLCJ1cGxvYWRTY2hlbWEiLCJvYmplY3QiLCJmaWxlcyIsImFycmF5IiwiaW5zdGFuY2VvZiIsIkZpbGUiLCJtaW4iLCJtYXgiLCJ2YWxpZGF0ZUZpbGUiLCJmaWxlIiwiaW5jbHVkZXMiLCJ0eXBlIiwiZmlsZW5hbWUiLCJuYW1lIiwiZXJyb3IiLCJjb2RlIiwic2l6ZSIsInRvRml4ZWQiLCJnZW5lcmF0ZVVwbG9hZElkIiwiRGF0ZSIsIm5vdyIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0ciIsInRyaWdnZXJBbmFseXNpc1dvcmtmbG93IiwidXBsb2FkSWQiLCJmaWxlUmVmZXJlbmNlcyIsInVzZXJJZCIsImFuYWx5c2lzU2VydmljZSIsImFuYWx5c2lzSWQiLCJwcm9jZXNzQW5hbHlzaXMiLCJjb25zb2xlIiwibG9nIiwiZmlsZUNvdW50IiwibGVuZ3RoIiwiUE9TVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwiaXNBdXRoZW50aWNhdGVkIiwidXNlciIsImVtYWlsIiwidXNlclJlcG9zaXRvcnkiLCJmaW5kQnlFbWFpbCIsIl9pZCIsImZvcm1EYXRhIiwiZW50cmllcyIsIkFycmF5IiwiZnJvbSIsImtleSIsInZhbHVlIiwicHVzaCIsImpzb24iLCJzdGF0dXMiLCJ2YWxpZGF0aW9uUmVzdWx0Iiwic2FmZVBhcnNlIiwic3VjY2VzcyIsImRldGFpbHMiLCJpc3N1ZXMiLCJtYXAiLCJlIiwibWVzc2FnZSIsInZhbGlkYXRpb25FcnJvcnMiLCJ1cGxvYWRQcm9taXNlcyIsImluZGV4IiwidGltZXN0YW1wIiwicmFuZG9tSWQiLCJzYWZlTmFtZSIsInJlcGxhY2UiLCJ1cGxvYWRzRGlyIiwicHJvY2VzcyIsImN3ZCIsInJlY3Vyc2l2ZSIsImJ5dGVzIiwiYXJyYXlCdWZmZXIiLCJidWZmZXIiLCJCdWZmZXIiLCJmaWxlcGF0aCIsIkVycm9yIiwiUHJvbWlzZSIsImFsbCIsInJlc3BvbnNlIiwiWm9kRXJyb3IiLCJHRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/uploads/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploads%2Froute&page=%2Fapi%2Fuploads%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploads%2Froute.ts&appDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();