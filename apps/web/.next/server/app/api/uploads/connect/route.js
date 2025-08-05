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
exports.id = "app/api/uploads/connect/route";
exports.ids = ["app/api/uploads/connect/route"];
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

/***/ "(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploads%2Fconnect%2Froute&page=%2Fapi%2Fuploads%2Fconnect%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploads%2Fconnect%2Froute.ts&appDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploads%2Fconnect%2Froute&page=%2Fapi%2Fuploads%2Fconnect%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploads%2Fconnect%2Froute.ts&appDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/../../node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_shrijayan_rajendran_projects_personal_bank_statement_apps_web_src_app_api_uploads_connect_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/uploads/connect/route.ts */ \"(rsc)/./src/app/api/uploads/connect/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/uploads/connect/route\",\n        pathname: \"/api/uploads/connect\",\n        filename: \"route\",\n        bundlePath: \"app/api/uploads/connect/route\"\n    },\n    resolvedPagePath: \"/Users/shrijayan.rajendran/projects/personal/bank_statement/apps/web/src/app/api/uploads/connect/route.ts\",\n    nextConfigOutput,\n    userland: _Users_shrijayan_rajendran_projects_personal_bank_statement_apps_web_src_app_api_uploads_connect_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/uploads/connect/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9idWlsZC93ZWJwYWNrL2xvYWRlcnMvbmV4dC1hcHAtbG9hZGVyLmpzP25hbWU9YXBwJTJGYXBpJTJGdXBsb2FkcyUyRmNvbm5lY3QlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZHMlMkZjb25uZWN0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXBsb2FkcyUyRmNvbm5lY3QlMkZyb3V0ZS50cyZhcHBEaXI9JTJGVXNlcnMlMkZzaHJpamF5YW4ucmFqZW5kcmFuJTJGcHJvamVjdHMlMkZwZXJzb25hbCUyRmJhbmtfc3RhdGVtZW50JTJGYXBwcyUyRndlYiUyRnNyYyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZzaHJpamF5YW4ucmFqZW5kcmFuJTJGcHJvamVjdHMlMkZwZXJzb25hbCUyRmJhbmtfc3RhdGVtZW50JTJGYXBwcyUyRndlYiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDeUQ7QUFDdEk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWIvPzg2ZjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3NocmlqYXlhbi5yYWplbmRyYW4vcHJvamVjdHMvcGVyc29uYWwvYmFua19zdGF0ZW1lbnQvYXBwcy93ZWIvc3JjL2FwcC9hcGkvdXBsb2Fkcy9jb25uZWN0L3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91cGxvYWRzL2Nvbm5lY3Qvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91cGxvYWRzL2Nvbm5lY3RcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VwbG9hZHMvY29ubmVjdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9zaHJpamF5YW4ucmFqZW5kcmFuL3Byb2plY3RzL3BlcnNvbmFsL2Jhbmtfc3RhdGVtZW50L2FwcHMvd2ViL3NyYy9hcHAvYXBpL3VwbG9hZHMvY29ubmVjdC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvdXBsb2Fkcy9jb25uZWN0L3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploads%2Fconnect%2Froute&page=%2Fapi%2Fuploads%2Fconnect%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploads%2Fconnect%2Froute.ts&appDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/uploads/connect/route.ts":
/*!**********************************************!*\
  !*** ./src/app/api/uploads/connect/route.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/../../node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/../../node_modules/next-auth/next/index.js\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zod */ \"(rsc)/../../node_modules/zod/v4/classic/schemas.js\");\n/* harmony import */ var db_src_repositories_UserRepository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! db/src/repositories/UserRepository */ \"(rsc)/../../packages/db/src/repositories/UserRepository.ts\");\n\n\n\n\n// Validation schema for connecting upload\nconst connectUploadSchema = zod__WEBPACK_IMPORTED_MODULE_3__.object({\n    uploadId: zod__WEBPACK_IMPORTED_MODULE_3__.string().min(1, \"Upload ID is required\"),\n    fileReferences: zod__WEBPACK_IMPORTED_MODULE_3__.array(zod__WEBPACK_IMPORTED_MODULE_3__.string()).min(1, \"File references are required\")\n});\n/**\n * POST /api/uploads/connect\n * Connect a guest upload to an authenticated user and trigger analysis\n */ async function POST(request) {\n    try {\n        // 1. Check authentication - required for this endpoint\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)();\n        if (!session?.user?.email) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Authentication required\"\n            }, {\n                status: 401\n            });\n        }\n        const userEmail = session.user.email;\n        // 2. Look up user to get their ObjectId\n        const user = await db_src_repositories_UserRepository__WEBPACK_IMPORTED_MODULE_2__.userRepository.findByEmail(userEmail);\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User account not found\"\n            }, {\n                status: 404\n            });\n        }\n        const userId = user._id; // Use the ObjectId instead of email\n        // 3. Parse and validate request\n        const body = await request.json();\n        const validationResult = connectUploadSchema.safeParse(body);\n        if (!validationResult.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid request data\",\n                details: validationResult.error.issues.map((e)=>e.message)\n            }, {\n                status: 400\n            });\n        }\n        const { uploadId, fileReferences } = validationResult.data;\n        // 4. Trigger analysis workflow for authenticated user\n        try {\n            // Import AnalysisService dynamically to avoid circular dependencies\n            const { analysisService } = await Promise.all(/*! import() */[__webpack_require__.e(\"vendor-chunks/@google\"), __webpack_require__.e(\"vendor-chunks/gaxios\"), __webpack_require__.e(\"vendor-chunks/google-auth-library\"), __webpack_require__.e(\"vendor-chunks/ws\"), __webpack_require__.e(\"vendor-chunks/bignumber.js\"), __webpack_require__.e(\"vendor-chunks/json-bigint\"), __webpack_require__.e(\"vendor-chunks/google-logging-utils\"), __webpack_require__.e(\"vendor-chunks/debug\"), __webpack_require__.e(\"vendor-chunks/gtoken\"), __webpack_require__.e(\"vendor-chunks/jws\"), __webpack_require__.e(\"vendor-chunks/jwa\"), __webpack_require__.e(\"vendor-chunks/ecdsa-sig-formatter\"), __webpack_require__.e(\"vendor-chunks/base64-js\"), __webpack_require__.e(\"vendor-chunks/extend\"), __webpack_require__.e(\"vendor-chunks/ms\"), __webpack_require__.e(\"vendor-chunks/supports-color\"), __webpack_require__.e(\"vendor-chunks/safe-buffer\"), __webpack_require__.e(\"vendor-chunks/buffer-equal-constant-time\"), __webpack_require__.e(\"vendor-chunks/is-stream\"), __webpack_require__.e(\"vendor-chunks/has-flag\"), __webpack_require__.e(\"_rsc_src_lib_services_AnalysisService_ts-_3713-_8e41-_d1701\")]).then(__webpack_require__.bind(__webpack_require__, /*! @/lib/services/AnalysisService */ \"(rsc)/./src/lib/services/AnalysisService.ts\"));\n            // Start the analysis process with authenticated user ID\n            const analysisId = await analysisService.processAnalysis(uploadId, fileReferences, userId);\n            console.log(\"Connected upload to authenticated user:\", {\n                uploadId,\n                analysisId,\n                userId,\n                fileCount: fileReferences.length\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: true,\n                analysisId,\n                message: \"Upload successfully connected to your account and analysis started\"\n            }, {\n                status: 200\n            });\n        } catch (analysisError) {\n            console.error(\"Failed to trigger analysis for connected upload:\", analysisError);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Failed to start analysis for your uploaded files. Please try again.\",\n                details: analysisError instanceof Error ? analysisError.message : String(analysisError)\n            }, {\n                status: 500\n            });\n        }\n    } catch (error) {\n        console.error(\"Connect upload API error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Internal server error. Please try again.\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS91cGxvYWRzL2Nvbm5lY3Qvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBd0Q7QUFDTjtBQUMxQjtBQUM0QztBQUVwRSwwQ0FBMEM7QUFDMUMsTUFBTUksc0JBQXNCRix1Q0FBUSxDQUFDO0lBQ25DSSxVQUFVSix1Q0FBUSxHQUFHTSxHQUFHLENBQUMsR0FBRztJQUM1QkMsZ0JBQWdCUCxzQ0FBTyxDQUFDQSx1Q0FBUSxJQUFJTSxHQUFHLENBQUMsR0FBRztBQUM3QztBQUVBOzs7Q0FHQyxHQUNNLGVBQWVHLEtBQUtDLE9BQW9CO0lBQzdDLElBQUk7UUFDRix1REFBdUQ7UUFDdkQsTUFBTUMsVUFBVSxNQUFNWixnRUFBZ0JBO1FBQ3RDLElBQUksQ0FBQ1ksU0FBU0MsTUFBTUMsT0FBTztZQUN6QixPQUFPZixxREFBWUEsQ0FBQ2dCLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBMEIsR0FDbkM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1DLFlBQVlOLFFBQVFDLElBQUksQ0FBQ0MsS0FBSztRQUVwQyx3Q0FBd0M7UUFDeEMsTUFBTUQsT0FBTyxNQUFNWCw4RUFBY0EsQ0FBQ2lCLFdBQVcsQ0FBQ0Q7UUFDOUMsSUFBSSxDQUFDTCxNQUFNO1lBQ1QsT0FBT2QscURBQVlBLENBQUNnQixJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQXlCLEdBQ2xDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNRyxTQUFTUCxLQUFLUSxHQUFHLEVBQUUsb0NBQW9DO1FBRTdELGdDQUFnQztRQUNoQyxNQUFNQyxPQUFPLE1BQU1YLFFBQVFJLElBQUk7UUFDL0IsTUFBTVEsbUJBQW1CcEIsb0JBQW9CcUIsU0FBUyxDQUFDRjtRQUV2RCxJQUFJLENBQUNDLGlCQUFpQkUsT0FBTyxFQUFFO1lBQzdCLE9BQU8xQixxREFBWUEsQ0FBQ2dCLElBQUksQ0FDdEI7Z0JBQ0VDLE9BQU87Z0JBQ1BVLFNBQVNILGlCQUFpQlAsS0FBSyxDQUFDVyxNQUFNLENBQUNDLEdBQUcsQ0FBQ0MsQ0FBQUEsSUFBS0EsRUFBRUMsT0FBTztZQUMzRCxHQUNBO2dCQUFFYixRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNLEVBQUVaLFFBQVEsRUFBRUcsY0FBYyxFQUFFLEdBQUdlLGlCQUFpQlEsSUFBSTtRQUUxRCxzREFBc0Q7UUFDdEQsSUFBSTtZQUNGLG9FQUFvRTtZQUNwRSxNQUFNLEVBQUVDLGVBQWUsRUFBRSxHQUFHLE1BQU0scXZDQUFPO1lBRXpDLHdEQUF3RDtZQUN4RCxNQUFNQyxhQUFhLE1BQU1ELGdCQUFnQkUsZUFBZSxDQUN0RDdCLFVBQ0FHLGdCQUNBWTtZQUdGZSxRQUFRQyxHQUFHLENBQUMsMkNBQTJDO2dCQUNyRC9CO2dCQUNBNEI7Z0JBQ0FiO2dCQUNBaUIsV0FBVzdCLGVBQWU4QixNQUFNO1lBQ2xDO1lBRUEsT0FBT3ZDLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO2dCQUN2QlUsU0FBUztnQkFDVFE7Z0JBQ0FILFNBQVM7WUFDWCxHQUFHO2dCQUFFYixRQUFRO1lBQUk7UUFFbkIsRUFBRSxPQUFPc0IsZUFBZTtZQUN0QkosUUFBUW5CLEtBQUssQ0FBQyxvREFBb0R1QjtZQUVsRSxPQUFPeEMscURBQVlBLENBQUNnQixJQUFJLENBQ3RCO2dCQUNFQyxPQUFPO2dCQUNQVSxTQUFTYSx5QkFBeUJDLFFBQVFELGNBQWNULE9BQU8sR0FBR1csT0FBT0Y7WUFDM0UsR0FDQTtnQkFBRXRCLFFBQVE7WUFBSTtRQUVsQjtJQUVGLEVBQUUsT0FBT0QsT0FBTztRQUNkbUIsUUFBUW5CLEtBQUssQ0FBQyw2QkFBNkJBO1FBRTNDLE9BQU9qQixxREFBWUEsQ0FBQ2dCLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUEyQyxHQUNwRDtZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi8uL3NyYy9hcHAvYXBpL3VwbG9hZHMvY29ubmVjdC9yb3V0ZS50cz83OGYxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoL25leHQnO1xuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5pbXBvcnQgeyB1c2VyUmVwb3NpdG9yeSB9IGZyb20gJ2RiL3NyYy9yZXBvc2l0b3JpZXMvVXNlclJlcG9zaXRvcnknO1xuXG4vLyBWYWxpZGF0aW9uIHNjaGVtYSBmb3IgY29ubmVjdGluZyB1cGxvYWRcbmNvbnN0IGNvbm5lY3RVcGxvYWRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIHVwbG9hZElkOiB6LnN0cmluZygpLm1pbigxLCAnVXBsb2FkIElEIGlzIHJlcXVpcmVkJyksXG4gIGZpbGVSZWZlcmVuY2VzOiB6LmFycmF5KHouc3RyaW5nKCkpLm1pbigxLCAnRmlsZSByZWZlcmVuY2VzIGFyZSByZXF1aXJlZCcpLFxufSk7XG5cbi8qKlxuICogUE9TVCAvYXBpL3VwbG9hZHMvY29ubmVjdFxuICogQ29ubmVjdCBhIGd1ZXN0IHVwbG9hZCB0byBhbiBhdXRoZW50aWNhdGVkIHVzZXIgYW5kIHRyaWdnZXIgYW5hbHlzaXNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpOiBQcm9taXNlPE5leHRSZXNwb25zZT4ge1xuICB0cnkge1xuICAgIC8vIDEuIENoZWNrIGF1dGhlbnRpY2F0aW9uIC0gcmVxdWlyZWQgZm9yIHRoaXMgZW5kcG9pbnRcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbigpO1xuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uZW1haWwpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0F1dGhlbnRpY2F0aW9uIHJlcXVpcmVkJyB9LCBcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJFbWFpbCA9IHNlc3Npb24udXNlci5lbWFpbDtcblxuICAgIC8vIDIuIExvb2sgdXAgdXNlciB0byBnZXQgdGhlaXIgT2JqZWN0SWRcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdXNlclJlcG9zaXRvcnkuZmluZEJ5RW1haWwodXNlckVtYWlsKTtcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ1VzZXIgYWNjb3VudCBub3QgZm91bmQnIH0sIFxuICAgICAgICB7IHN0YXR1czogNDA0IH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcklkID0gdXNlci5faWQ7IC8vIFVzZSB0aGUgT2JqZWN0SWQgaW5zdGVhZCBvZiBlbWFpbFxuXG4gICAgLy8gMy4gUGFyc2UgYW5kIHZhbGlkYXRlIHJlcXVlc3RcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XG4gICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IGNvbm5lY3RVcGxvYWRTY2hlbWEuc2FmZVBhcnNlKGJvZHkpO1xuICAgIFxuICAgIGlmICghdmFsaWRhdGlvblJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgXG4gICAgICAgICAgZXJyb3I6ICdJbnZhbGlkIHJlcXVlc3QgZGF0YScsIFxuICAgICAgICAgIGRldGFpbHM6IHZhbGlkYXRpb25SZXN1bHQuZXJyb3IuaXNzdWVzLm1hcChlID0+IGUubWVzc2FnZSlcbiAgICAgICAgfSwgXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHVwbG9hZElkLCBmaWxlUmVmZXJlbmNlcyB9ID0gdmFsaWRhdGlvblJlc3VsdC5kYXRhO1xuXG4gICAgLy8gNC4gVHJpZ2dlciBhbmFseXNpcyB3b3JrZmxvdyBmb3IgYXV0aGVudGljYXRlZCB1c2VyXG4gICAgdHJ5IHtcbiAgICAgIC8vIEltcG9ydCBBbmFseXNpc1NlcnZpY2UgZHluYW1pY2FsbHkgdG8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzXG4gICAgICBjb25zdCB7IGFuYWx5c2lzU2VydmljZSB9ID0gYXdhaXQgaW1wb3J0KCdAL2xpYi9zZXJ2aWNlcy9BbmFseXNpc1NlcnZpY2UnKTtcbiAgICAgIFxuICAgICAgLy8gU3RhcnQgdGhlIGFuYWx5c2lzIHByb2Nlc3Mgd2l0aCBhdXRoZW50aWNhdGVkIHVzZXIgSURcbiAgICAgIGNvbnN0IGFuYWx5c2lzSWQgPSBhd2FpdCBhbmFseXNpc1NlcnZpY2UucHJvY2Vzc0FuYWx5c2lzKFxuICAgICAgICB1cGxvYWRJZCxcbiAgICAgICAgZmlsZVJlZmVyZW5jZXMsXG4gICAgICAgIHVzZXJJZFxuICAgICAgKTtcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB1cGxvYWQgdG8gYXV0aGVudGljYXRlZCB1c2VyOicsIHsgXG4gICAgICAgIHVwbG9hZElkLCBcbiAgICAgICAgYW5hbHlzaXNJZCwgXG4gICAgICAgIHVzZXJJZCwgXG4gICAgICAgIGZpbGVDb3VudDogZmlsZVJlZmVyZW5jZXMubGVuZ3RoIFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIGFuYWx5c2lzSWQsXG4gICAgICAgIG1lc3NhZ2U6ICdVcGxvYWQgc3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCB0byB5b3VyIGFjY291bnQgYW5kIGFuYWx5c2lzIHN0YXJ0ZWQnXG4gICAgICB9LCB7IHN0YXR1czogMjAwIH0pO1xuICAgICAgXG4gICAgfSBjYXRjaCAoYW5hbHlzaXNFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHRyaWdnZXIgYW5hbHlzaXMgZm9yIGNvbm5lY3RlZCB1cGxvYWQ6JywgYW5hbHlzaXNFcnJvcik7XG4gICAgICBcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBcbiAgICAgICAgICBlcnJvcjogJ0ZhaWxlZCB0byBzdGFydCBhbmFseXNpcyBmb3IgeW91ciB1cGxvYWRlZCBmaWxlcy4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgICAgIGRldGFpbHM6IGFuYWx5c2lzRXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGFuYWx5c2lzRXJyb3IubWVzc2FnZSA6IFN0cmluZyhhbmFseXNpc0Vycm9yKVxuICAgICAgICB9LCBcbiAgICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgICApO1xuICAgIH1cblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Nvbm5lY3QgdXBsb2FkIEFQSSBlcnJvcjonLCBlcnJvcik7XG4gICAgXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvci4gUGxlYXNlIHRyeSBhZ2Fpbi4nIH0sIFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJ6IiwidXNlclJlcG9zaXRvcnkiLCJjb25uZWN0VXBsb2FkU2NoZW1hIiwib2JqZWN0IiwidXBsb2FkSWQiLCJzdHJpbmciLCJtaW4iLCJmaWxlUmVmZXJlbmNlcyIsImFycmF5IiwiUE9TVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwidXNlciIsImVtYWlsIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidXNlckVtYWlsIiwiZmluZEJ5RW1haWwiLCJ1c2VySWQiLCJfaWQiLCJib2R5IiwidmFsaWRhdGlvblJlc3VsdCIsInNhZmVQYXJzZSIsInN1Y2Nlc3MiLCJkZXRhaWxzIiwiaXNzdWVzIiwibWFwIiwiZSIsIm1lc3NhZ2UiLCJkYXRhIiwiYW5hbHlzaXNTZXJ2aWNlIiwiYW5hbHlzaXNJZCIsInByb2Nlc3NBbmFseXNpcyIsImNvbnNvbGUiLCJsb2ciLCJmaWxlQ291bnQiLCJsZW5ndGgiLCJhbmFseXNpc0Vycm9yIiwiRXJyb3IiLCJTdHJpbmciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/uploads/connect/route.ts\n");

/***/ }),

/***/ "(rsc)/../../packages/db/src/connection.ts":
/*!*******************************************!*\
  !*** ../../packages/db/src/connection.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        const MONGODB_URI = process.env.MONGODB_URI;\n        if (!MONGODB_URI) {\n            throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n        }\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vcGFja2FnZXMvZGIvc3JjL2Nvbm5lY3Rpb24udHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBTWhDLElBQUlDLFNBQVNDLE9BQU9GLFFBQVE7QUFFNUIsSUFBSSxDQUFDQyxRQUFRO0lBQ1hBLFNBQVNDLE9BQU9GLFFBQVEsR0FBRztRQUFFRyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUN6RDtBQUVBLGVBQWVDO0lBQ2IsSUFBSUosT0FBT0UsSUFBSSxFQUFFO1FBQ2YsT0FBT0YsT0FBT0UsSUFBSTtJQUNwQjtJQUVBLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1FBQ25CLE1BQU1FLE9BQU87WUFDWEMsZ0JBQWdCO1FBQ2xCO1FBRUEsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO1FBRTNDLElBQUksQ0FBQ0EsYUFBYTtZQUNoQixNQUFNLElBQUlHLE1BQ1I7UUFFSjtRQUVBVixPQUFPRyxPQUFPLEdBQUdKLHVEQUFnQixDQUFDUSxhQUFhRixNQUFNTyxJQUFJLENBQUMsQ0FBQ2I7WUFDekQsT0FBT0E7UUFDVDtJQUNGO0lBRUEsSUFBSTtRQUNGQyxPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztJQUNwQyxFQUFFLE9BQU9VLEdBQUc7UUFDVmIsT0FBT0csT0FBTyxHQUFHO1FBQ2pCLE1BQU1VO0lBQ1I7SUFFQSxPQUFPYixPQUFPRSxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWIvLi4vLi4vcGFja2FnZXMvZGIvc3JjL2Nvbm5lY3Rpb24udHM/NzRkMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHZhciBtb25nb29zZTogYW55OyAvLyBUaGlzIG11c3QgYmUgYSBgdmFyYCBhbmQgbm90IGEgYGxldCAvIGNvbnN0YFxufVxuXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlO1xuXG5pZiAoIWNhY2hlZCkge1xuICBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2UgPSB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGJDb25uZWN0KCk6IFByb21pc2U8dHlwZW9mIG1vbmdvb3NlPiB7XG4gIGlmIChjYWNoZWQuY29ubikge1xuICAgIHJldHVybiBjYWNoZWQuY29ubjtcbiAgfVxuXG4gIGlmICghY2FjaGVkLnByb21pc2UpIHtcbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgYnVmZmVyQ29tbWFuZHM6IGZhbHNlLFxuICAgIH07XG5cbiAgICBjb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuXG4gICAgaWYgKCFNT05HT0RCX1VSSSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUgaW5zaWRlIC5lbnYubG9jYWwnXG4gICAgICApO1xuICAgIH1cblxuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cykudGhlbigobW9uZ29vc2UpID0+IHtcbiAgICAgIHJldHVybiBtb25nb29zZTtcbiAgICB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY2FjaGVkLmNvbm4gPSBhd2FpdCBjYWNoZWQucHJvbWlzZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZC5wcm9taXNlID0gbnVsbDtcbiAgICB0aHJvdyBlO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJjYWNoZWQiLCJnbG9iYWwiLCJjb25uIiwicHJvbWlzZSIsImRiQ29ubmVjdCIsIm9wdHMiLCJidWZmZXJDb21tYW5kcyIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiY29ubmVjdCIsInRoZW4iLCJlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../packages/db/src/connection.ts\n");

/***/ }),

/***/ "(rsc)/../../packages/db/src/models/User.ts":
/*!********************************************!*\
  !*** ../../packages/db/src/models/User.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserSchema: () => (/* binding */ UserSchema),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\n * User schema definition\n * Following coding standards: camelCase collection name, proper validation, indexing\n */ const UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: [\n            true,\n            \"Name is required\"\n        ],\n        trim: true,\n        maxlength: [\n            100,\n            \"Name cannot exceed 100 characters\"\n        ]\n    },\n    email: {\n        type: String,\n        required: [\n            true,\n            \"Email is required\"\n        ],\n        unique: true,\n        lowercase: true,\n        trim: true,\n        match: [\n            /^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/,\n            \"Please enter a valid email address\"\n        ]\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"Password is required\"\n        ],\n        minlength: [\n            6,\n            \"Password must be at least 6 characters long\"\n        ]\n    }\n}, {\n    timestamps: true,\n    collection: \"users\"\n});\n// Email index is automatically created by unique: true in schema definition\n/**\n * User model\n * Export both the model and the schema for testing purposes\n */ const User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vcGFja2FnZXMvZGIvc3JjL21vZGVscy9Vc2VyLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBc0Q7QUFtQnREOzs7Q0FHQyxHQUNELE1BQU1FLGFBQWEsSUFBSUQsNENBQU1BLENBQzNCO0lBQ0VFLE1BQU07UUFDSkMsTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBbUI7UUFDcENDLE1BQU07UUFDTkMsV0FBVztZQUFDO1lBQUs7U0FBb0M7SUFDdkQ7SUFDQUMsT0FBTztRQUNMTCxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUFvQjtRQUNyQ0ksUUFBUTtRQUNSQyxXQUFXO1FBQ1hKLE1BQU07UUFDTkssT0FBTztZQUNMO1lBQ0E7U0FDRDtJQUNIO0lBQ0FDLFVBQVU7UUFDUlQsTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBdUI7UUFDeENRLFdBQVc7WUFBQztZQUFHO1NBQThDO0lBQy9EO0FBQ0YsR0FDQTtJQUNFQyxZQUFZO0lBQ1pDLFlBQVk7QUFDZDtBQUdGLDRFQUE0RTtBQUU1RTs7O0NBR0MsR0FDRCxNQUFNQyxPQUFPakIsd0RBQWUsQ0FBQ2lCLElBQUksSUFBSWpCLHFEQUFjLENBQWUsUUFBUUU7QUFFMUUsaUVBQWVlLElBQUlBLEVBQUM7QUFDRSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi8uLi8uLi9wYWNrYWdlcy9kYi9zcmMvbW9kZWxzL1VzZXIudHM/OTcwZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UsIHsgU2NoZW1hLCBEb2N1bWVudCB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IFVzZXIgYXMgSVVzZXIsIENyZWF0ZVVzZXJEYXRhIH0gZnJvbSAnbGliL3NyYy90eXBlcyc7XG5cbi8qKlxuICogRGF0YWJhc2Utc3BlY2lmaWMgVXNlciBpbnRlcmZhY2UgaW5jbHVkaW5nIHBhc3N3b3JkIGZpZWxkXG4gKiBQYXNzd29yZCBpcyBzdG9yZWQgaW4gZGF0YWJhc2UgYnV0IG5vdCBleHBvc2VkIGluIHNoYXJlZCBmcm9udGVuZCB0eXBlc1xuICovXG5pbnRlcmZhY2UgRGF0YWJhc2VVc2VyIGV4dGVuZHMgT21pdDxJVXNlciwgJ19pZCc+IHtcbiAgcGFzc3dvcmQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBVc2VyIGRvY3VtZW50IGludGVyZmFjZSBleHRlbmRpbmcgTW9uZ29vc2UgRG9jdW1lbnRcbiAqIFRoaXMgY29tYmluZXMgdGhlIGRhdGFiYXNlIFVzZXIgaW50ZXJmYWNlIHdpdGggTW9uZ29vc2UgRG9jdW1lbnQgbWV0aG9kc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJEb2N1bWVudCBleHRlbmRzIERhdGFiYXNlVXNlciwgRG9jdW1lbnQge1xuICBfaWQ6IG1vbmdvb3NlLlR5cGVzLk9iamVjdElkO1xufVxuXG4vKipcbiAqIFVzZXIgc2NoZW1hIGRlZmluaXRpb25cbiAqIEZvbGxvd2luZyBjb2Rpbmcgc3RhbmRhcmRzOiBjYW1lbENhc2UgY29sbGVjdGlvbiBuYW1lLCBwcm9wZXIgdmFsaWRhdGlvbiwgaW5kZXhpbmdcbiAqL1xuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBTY2hlbWE8VXNlckRvY3VtZW50PihcbiAge1xuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ05hbWUgaXMgcmVxdWlyZWQnXSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBtYXhsZW5ndGg6IFsxMDAsICdOYW1lIGNhbm5vdCBleGNlZWQgMTAwIGNoYXJhY3RlcnMnXSxcbiAgICB9LFxuICAgIGVtYWlsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsICdFbWFpbCBpcyByZXF1aXJlZCddLFxuICAgICAgdW5pcXVlOiB0cnVlLFxuICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICAgIG1hdGNoOiBbXG4gICAgICAgIC9eXFx3KyhbLi1dP1xcdyspKkBcXHcrKFsuLV0/XFx3KykqKFxcLlxcd3syLDN9KSskLyxcbiAgICAgICAgJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsICdQYXNzd29yZCBpcyByZXF1aXJlZCddLFxuICAgICAgbWlubGVuZ3RoOiBbNiwgJ1Bhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgNiBjaGFyYWN0ZXJzIGxvbmcnXSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgdGltZXN0YW1wczogdHJ1ZSwgLy8gQXV0b21hdGljYWxseSBhZGRzIGNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0IGZpZWxkc1xuICAgIGNvbGxlY3Rpb246ICd1c2VycycsIC8vIEZvbGxvd2luZyBjYW1lbENhc2UgbmFtaW5nIGNvbnZlbnRpb24gZm9yIGNvbGxlY3Rpb25zXG4gIH1cbik7XG5cbi8vIEVtYWlsIGluZGV4IGlzIGF1dG9tYXRpY2FsbHkgY3JlYXRlZCBieSB1bmlxdWU6IHRydWUgaW4gc2NoZW1hIGRlZmluaXRpb25cblxuLyoqXG4gKiBVc2VyIG1vZGVsXG4gKiBFeHBvcnQgYm90aCB0aGUgbW9kZWwgYW5kIHRoZSBzY2hlbWEgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAqL1xuY29uc3QgVXNlciA9IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsPFVzZXJEb2N1bWVudD4oJ1VzZXInLCBVc2VyU2NoZW1hKTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbmV4cG9ydCB7IFVzZXJTY2hlbWEgfTtcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsIlVzZXJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsIm1heGxlbmd0aCIsImVtYWlsIiwidW5pcXVlIiwibG93ZXJjYXNlIiwibWF0Y2giLCJwYXNzd29yZCIsIm1pbmxlbmd0aCIsInRpbWVzdGFtcHMiLCJjb2xsZWN0aW9uIiwiVXNlciIsIm1vZGVscyIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../packages/db/src/models/User.ts\n");

/***/ }),

/***/ "(rsc)/../../packages/db/src/repositories/UserRepository.ts":
/*!************************************************************!*\
  !*** ../../packages/db/src/repositories/UserRepository.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserRepository: () => (/* binding */ UserRepository),\n/* harmony export */   userRepository: () => (/* binding */ userRepository)\n/* harmony export */ });\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/User */ \"(rsc)/../../packages/db/src/models/User.ts\");\n/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../connection */ \"(rsc)/../../packages/db/src/connection.ts\");\n\n\n/**\n * UserRepository class implementing the Repository Pattern\n * All database operations for User model should go through this repository\n * Following coding standards: no direct Mongoose calls in API routes\n */ class UserRepository {\n    /**\n   * Ensure database connection before operations\n   * Skip connection in test environment (handled by test setup)\n   */ async ensureConnection() {\n        // In test environment, connection is handled by test setup\n        if ( false || process.env.JEST_WORKER_ID) {\n            return;\n        }\n        await (0,_connection__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    }\n    /**\n   * Find user by email\n   * @param email - User's email address\n   * @returns User document or null if not found\n   */ async findByEmail(email) {\n        await this.ensureConnection();\n        const user = await _models_User__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n            email\n        }).exec();\n        if (!user) return null;\n        // Transform to match shared interface (exclude password)\n        return this.transformToPublicUser(user);\n    }\n    /**\n   * Find user by ID\n   * @param userId - User's MongoDB ObjectId as string\n   * @returns User document or null if not found\n   */ async findById(userId) {\n        await this.ensureConnection();\n        const user = await _models_User__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(userId).exec();\n        if (!user) return null;\n        return this.transformToPublicUser(user);\n    }\n    /**\n   * Create a new user\n   * @param userData - User creation data with password\n   * @returns Created user (without password)\n   */ async create(userData) {\n        await this.ensureConnection();\n        const user = new _models_User__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n            name: userData.name,\n            email: userData.email,\n            password: userData.password\n        });\n        const savedUser = await user.save();\n        return this.transformToPublicUser(savedUser);\n    }\n    /**\n   * Update user by ID\n   * @param userId - User's MongoDB ObjectId as string\n   * @param updateData - Partial user data to update\n   * @returns Updated user or null if not found\n   */ async updateById(userId, updateData) {\n        await this.ensureConnection();\n        const user = await _models_User__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(userId, {\n            $set: updateData\n        }, {\n            new: true,\n            runValidators: true\n        }).exec();\n        if (!user) return null;\n        return this.transformToPublicUser(user);\n    }\n    /**\n   * Delete user by ID\n   * @param userId - User's MongoDB ObjectId as string\n   * @returns true if deleted, false if not found\n   */ async deleteById(userId) {\n        await this.ensureConnection();\n        const result = await _models_User__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndDelete(userId).exec();\n        return !!result;\n    }\n    /**\n   * Check if user exists by email\n   * @param email - User's email address\n   * @returns true if user exists, false otherwise\n   */ async existsByEmail(email) {\n        await this.ensureConnection();\n        const count = await _models_User__WEBPACK_IMPORTED_MODULE_0__[\"default\"].countDocuments({\n            email\n        }).exec();\n        return count > 0;\n    }\n    /**\n   * Find user by email including password (for authentication)\n   * @param email - User's email address\n   * @returns User document with password or null if not found\n   */ async findByEmailWithPassword(email) {\n        await this.ensureConnection();\n        return _models_User__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n            email\n        }).exec();\n    }\n    /**\n   * Transform UserDocument to public User interface (exclude password)\n   * @param userDoc - Mongoose UserDocument\n   * @returns Public user data without sensitive fields\n   */ transformToPublicUser(userDoc) {\n        return {\n            _id: userDoc._id.toString(),\n            name: userDoc.name,\n            email: userDoc.email,\n            createdAt: userDoc.createdAt,\n            updatedAt: userDoc.updatedAt\n        };\n    }\n}\n/**\n * Export singleton instance for use in API routes\n * This ensures consistent database connection handling\n */ const userRepository = new UserRepository();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vcGFja2FnZXMvZGIvc3JjL3JlcG9zaXRvcmllcy9Vc2VyUmVwb3NpdG9yeS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ29EO0FBQ2Q7QUFFdEM7Ozs7Q0FJQyxHQUNNLE1BQU1FO0lBQ1g7OztHQUdDLEdBQ0QsTUFBY0MsbUJBQWtDO1FBQzlDLDJEQUEyRDtRQUMzRCxJQUFJQyxNQUF5QixJQUFVQSxRQUFRQyxHQUFHLENBQUNDLGNBQWMsRUFBRTtZQUNqRTtRQUNGO1FBQ0EsTUFBTUwsdURBQVNBO0lBQ2pCO0lBRUE7Ozs7R0FJQyxHQUNELE1BQU1NLFlBQVlDLEtBQWEsRUFBeUI7UUFDdEQsTUFBTSxJQUFJLENBQUNMLGdCQUFnQjtRQUUzQixNQUFNTSxPQUFPLE1BQU1ULG9EQUFJQSxDQUFDVSxPQUFPLENBQUM7WUFBRUY7UUFBTSxHQUFHRyxJQUFJO1FBQy9DLElBQUksQ0FBQ0YsTUFBTSxPQUFPO1FBRWxCLHlEQUF5RDtRQUN6RCxPQUFPLElBQUksQ0FBQ0cscUJBQXFCLENBQUNIO0lBQ3BDO0lBRUE7Ozs7R0FJQyxHQUNELE1BQU1JLFNBQVNDLE1BQWMsRUFBeUI7UUFDcEQsTUFBTSxJQUFJLENBQUNYLGdCQUFnQjtRQUUzQixNQUFNTSxPQUFPLE1BQU1ULG9EQUFJQSxDQUFDYSxRQUFRLENBQUNDLFFBQVFILElBQUk7UUFDN0MsSUFBSSxDQUFDRixNQUFNLE9BQU87UUFFbEIsT0FBTyxJQUFJLENBQUNHLHFCQUFxQixDQUFDSDtJQUNwQztJQUVBOzs7O0dBSUMsR0FDRCxNQUFNTSxPQUFPQyxRQUF3QixFQUFrQjtRQUNyRCxNQUFNLElBQUksQ0FBQ2IsZ0JBQWdCO1FBRTNCLE1BQU1NLE9BQU8sSUFBSVQsb0RBQUlBLENBQUM7WUFDcEJpQixNQUFNRCxTQUFTQyxJQUFJO1lBQ25CVCxPQUFPUSxTQUFTUixLQUFLO1lBQ3JCVSxVQUFVRixTQUFTRSxRQUFRO1FBQzdCO1FBRUEsTUFBTUMsWUFBWSxNQUFNVixLQUFLVyxJQUFJO1FBQ2pDLE9BQU8sSUFBSSxDQUFDUixxQkFBcUIsQ0FBQ087SUFDcEM7SUFFQTs7Ozs7R0FLQyxHQUNELE1BQU1FLFdBQVdQLE1BQWMsRUFBRVEsVUFBMEIsRUFBeUI7UUFDbEYsTUFBTSxJQUFJLENBQUNuQixnQkFBZ0I7UUFFM0IsTUFBTU0sT0FBTyxNQUFNVCxvREFBSUEsQ0FBQ3VCLGlCQUFpQixDQUN2Q1QsUUFDQTtZQUFFVSxNQUFNRjtRQUFXLEdBQ25CO1lBQUVHLEtBQUs7WUFBTUMsZUFBZTtRQUFLLEdBQ2pDZixJQUFJO1FBRU4sSUFBSSxDQUFDRixNQUFNLE9BQU87UUFDbEIsT0FBTyxJQUFJLENBQUNHLHFCQUFxQixDQUFDSDtJQUNwQztJQUVBOzs7O0dBSUMsR0FDRCxNQUFNa0IsV0FBV2IsTUFBYyxFQUFvQjtRQUNqRCxNQUFNLElBQUksQ0FBQ1gsZ0JBQWdCO1FBRTNCLE1BQU15QixTQUFTLE1BQU01QixvREFBSUEsQ0FBQzZCLGlCQUFpQixDQUFDZixRQUFRSCxJQUFJO1FBQ3hELE9BQU8sQ0FBQyxDQUFDaUI7SUFDWDtJQUVBOzs7O0dBSUMsR0FDRCxNQUFNRSxjQUFjdEIsS0FBYSxFQUFvQjtRQUNuRCxNQUFNLElBQUksQ0FBQ0wsZ0JBQWdCO1FBRTNCLE1BQU00QixRQUFRLE1BQU0vQixvREFBSUEsQ0FBQ2dDLGNBQWMsQ0FBQztZQUFFeEI7UUFBTSxHQUFHRyxJQUFJO1FBQ3ZELE9BQU9vQixRQUFRO0lBQ2pCO0lBRUE7Ozs7R0FJQyxHQUNELE1BQU1FLHdCQUF3QnpCLEtBQWEsRUFBZ0M7UUFDekUsTUFBTSxJQUFJLENBQUNMLGdCQUFnQjtRQUUzQixPQUFPSCxvREFBSUEsQ0FBQ1UsT0FBTyxDQUFDO1lBQUVGO1FBQU0sR0FBR0csSUFBSTtJQUNyQztJQUVBOzs7O0dBSUMsR0FDRCxzQkFBOEJ1QixPQUFxQixFQUFTO1FBQzFELE9BQU87WUFDTEMsS0FBS0QsUUFBUUMsR0FBRyxDQUFDQyxRQUFRO1lBQ3pCbkIsTUFBTWlCLFFBQVFqQixJQUFJO1lBQ2xCVCxPQUFPMEIsUUFBUTFCLEtBQUs7WUFDcEI2QixXQUFXSCxRQUFRRyxTQUFTO1lBQzVCQyxXQUFXSixRQUFRSSxTQUFTO1FBQzlCO0lBQ0Y7QUFDRjtBQUVBOzs7Q0FHQyxHQUNNLE1BQU1DLGlCQUFpQixJQUFJckMsaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViLy4uLy4uL3BhY2thZ2VzL2RiL3NyYy9yZXBvc2l0b3JpZXMvVXNlclJlcG9zaXRvcnkudHM/NTJlNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyIGFzIElVc2VyLCBDcmVhdGVVc2VyRGF0YSwgVXBkYXRlVXNlckRhdGEgfSBmcm9tICdsaWIvc3JjL3R5cGVzJztcbmltcG9ydCBVc2VyLCB7IFVzZXJEb2N1bWVudCB9IGZyb20gJy4uL21vZGVscy9Vc2VyJztcbmltcG9ydCBkYkNvbm5lY3QgZnJvbSAnLi4vY29ubmVjdGlvbic7XG5cbi8qKlxuICogVXNlclJlcG9zaXRvcnkgY2xhc3MgaW1wbGVtZW50aW5nIHRoZSBSZXBvc2l0b3J5IFBhdHRlcm5cbiAqIEFsbCBkYXRhYmFzZSBvcGVyYXRpb25zIGZvciBVc2VyIG1vZGVsIHNob3VsZCBnbyB0aHJvdWdoIHRoaXMgcmVwb3NpdG9yeVxuICogRm9sbG93aW5nIGNvZGluZyBzdGFuZGFyZHM6IG5vIGRpcmVjdCBNb25nb29zZSBjYWxscyBpbiBBUEkgcm91dGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VyUmVwb3NpdG9yeSB7XG4gIC8qKlxuICAgKiBFbnN1cmUgZGF0YWJhc2UgY29ubmVjdGlvbiBiZWZvcmUgb3BlcmF0aW9uc1xuICAgKiBTa2lwIGNvbm5lY3Rpb24gaW4gdGVzdCBlbnZpcm9ubWVudCAoaGFuZGxlZCBieSB0ZXN0IHNldHVwKVxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBlbnN1cmVDb25uZWN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIEluIHRlc3QgZW52aXJvbm1lbnQsIGNvbm5lY3Rpb24gaXMgaGFuZGxlZCBieSB0ZXN0IHNldHVwXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcgfHwgcHJvY2Vzcy5lbnYuSkVTVF9XT1JLRVJfSUQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgZGJDb25uZWN0KCk7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB1c2VyIGJ5IGVtYWlsXG4gICAqIEBwYXJhbSBlbWFpbCAtIFVzZXIncyBlbWFpbCBhZGRyZXNzXG4gICAqIEByZXR1cm5zIFVzZXIgZG9jdW1lbnQgb3IgbnVsbCBpZiBub3QgZm91bmRcbiAgICovXG4gIGFzeW5jIGZpbmRCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPElVc2VyIHwgbnVsbD4ge1xuICAgIGF3YWl0IHRoaXMuZW5zdXJlQ29ubmVjdGlvbigpO1xuICAgIFxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbCB9KS5leGVjKCk7XG4gICAgaWYgKCF1c2VyKSByZXR1cm4gbnVsbDtcblxuICAgIC8vIFRyYW5zZm9ybSB0byBtYXRjaCBzaGFyZWQgaW50ZXJmYWNlIChleGNsdWRlIHBhc3N3b3JkKVxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybVRvUHVibGljVXNlcih1c2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHVzZXIgYnkgSURcbiAgICogQHBhcmFtIHVzZXJJZCAtIFVzZXIncyBNb25nb0RCIE9iamVjdElkIGFzIHN0cmluZ1xuICAgKiBAcmV0dXJucyBVc2VyIGRvY3VtZW50IG9yIG51bGwgaWYgbm90IGZvdW5kXG4gICAqL1xuICBhc3luYyBmaW5kQnlJZCh1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8SVVzZXIgfCBudWxsPiB7XG4gICAgYXdhaXQgdGhpcy5lbnN1cmVDb25uZWN0aW9uKCk7XG4gICAgXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQodXNlcklkKS5leGVjKCk7XG4gICAgaWYgKCF1c2VyKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybVRvUHVibGljVXNlcih1c2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdXNlclxuICAgKiBAcGFyYW0gdXNlckRhdGEgLSBVc2VyIGNyZWF0aW9uIGRhdGEgd2l0aCBwYXNzd29yZFxuICAgKiBAcmV0dXJucyBDcmVhdGVkIHVzZXIgKHdpdGhvdXQgcGFzc3dvcmQpXG4gICAqL1xuICBhc3luYyBjcmVhdGUodXNlckRhdGE6IENyZWF0ZVVzZXJEYXRhKTogUHJvbWlzZTxJVXNlcj4ge1xuICAgIGF3YWl0IHRoaXMuZW5zdXJlQ29ubmVjdGlvbigpO1xuICAgIFxuICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih7XG4gICAgICBuYW1lOiB1c2VyRGF0YS5uYW1lLFxuICAgICAgZW1haWw6IHVzZXJEYXRhLmVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IHVzZXJEYXRhLnBhc3N3b3JkLCAvLyBTaG91bGQgYmUgaGFzaGVkIGJlZm9yZSBjYWxsaW5nIHRoaXMgbWV0aG9kXG4gICAgfSk7XG5cbiAgICBjb25zdCBzYXZlZFVzZXIgPSBhd2FpdCB1c2VyLnNhdmUoKTtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Ub1B1YmxpY1VzZXIoc2F2ZWRVc2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdXNlciBieSBJRFxuICAgKiBAcGFyYW0gdXNlcklkIC0gVXNlcidzIE1vbmdvREIgT2JqZWN0SWQgYXMgc3RyaW5nXG4gICAqIEBwYXJhbSB1cGRhdGVEYXRhIC0gUGFydGlhbCB1c2VyIGRhdGEgdG8gdXBkYXRlXG4gICAqIEByZXR1cm5zIFVwZGF0ZWQgdXNlciBvciBudWxsIGlmIG5vdCBmb3VuZFxuICAgKi9cbiAgYXN5bmMgdXBkYXRlQnlJZCh1c2VySWQ6IHN0cmluZywgdXBkYXRlRGF0YTogVXBkYXRlVXNlckRhdGEpOiBQcm9taXNlPElVc2VyIHwgbnVsbD4ge1xuICAgIGF3YWl0IHRoaXMuZW5zdXJlQ29ubmVjdGlvbigpO1xuICAgIFxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkQW5kVXBkYXRlKFxuICAgICAgdXNlcklkLFxuICAgICAgeyAkc2V0OiB1cGRhdGVEYXRhIH0sXG4gICAgICB7IG5ldzogdHJ1ZSwgcnVuVmFsaWRhdG9yczogdHJ1ZSB9XG4gICAgKS5leGVjKCk7XG5cbiAgICBpZiAoIXVzZXIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybVRvUHVibGljVXNlcih1c2VyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgdXNlciBieSBJRFxuICAgKiBAcGFyYW0gdXNlcklkIC0gVXNlcidzIE1vbmdvREIgT2JqZWN0SWQgYXMgc3RyaW5nXG4gICAqIEByZXR1cm5zIHRydWUgaWYgZGVsZXRlZCwgZmFsc2UgaWYgbm90IGZvdW5kXG4gICAqL1xuICBhc3luYyBkZWxldGVCeUlkKHVzZXJJZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgYXdhaXQgdGhpcy5lbnN1cmVDb25uZWN0aW9uKCk7XG4gICAgXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgVXNlci5maW5kQnlJZEFuZERlbGV0ZSh1c2VySWQpLmV4ZWMoKTtcbiAgICByZXR1cm4gISFyZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdXNlciBleGlzdHMgYnkgZW1haWxcbiAgICogQHBhcmFtIGVtYWlsIC0gVXNlcidzIGVtYWlsIGFkZHJlc3NcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB1c2VyIGV4aXN0cywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBhc3luYyBleGlzdHNCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBhd2FpdCB0aGlzLmVuc3VyZUNvbm5lY3Rpb24oKTtcbiAgICBcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IFVzZXIuY291bnREb2N1bWVudHMoeyBlbWFpbCB9KS5leGVjKCk7XG4gICAgcmV0dXJuIGNvdW50ID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHVzZXIgYnkgZW1haWwgaW5jbHVkaW5nIHBhc3N3b3JkIChmb3IgYXV0aGVudGljYXRpb24pXG4gICAqIEBwYXJhbSBlbWFpbCAtIFVzZXIncyBlbWFpbCBhZGRyZXNzXG4gICAqIEByZXR1cm5zIFVzZXIgZG9jdW1lbnQgd2l0aCBwYXNzd29yZCBvciBudWxsIGlmIG5vdCBmb3VuZFxuICAgKi9cbiAgYXN5bmMgZmluZEJ5RW1haWxXaXRoUGFzc3dvcmQoZW1haWw6IHN0cmluZyk6IFByb21pc2U8VXNlckRvY3VtZW50IHwgbnVsbD4ge1xuICAgIGF3YWl0IHRoaXMuZW5zdXJlQ29ubmVjdGlvbigpO1xuICAgIFxuICAgIHJldHVybiBVc2VyLmZpbmRPbmUoeyBlbWFpbCB9KS5leGVjKCk7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtIFVzZXJEb2N1bWVudCB0byBwdWJsaWMgVXNlciBpbnRlcmZhY2UgKGV4Y2x1ZGUgcGFzc3dvcmQpXG4gICAqIEBwYXJhbSB1c2VyRG9jIC0gTW9uZ29vc2UgVXNlckRvY3VtZW50XG4gICAqIEByZXR1cm5zIFB1YmxpYyB1c2VyIGRhdGEgd2l0aG91dCBzZW5zaXRpdmUgZmllbGRzXG4gICAqL1xuICBwcml2YXRlIHRyYW5zZm9ybVRvUHVibGljVXNlcih1c2VyRG9jOiBVc2VyRG9jdW1lbnQpOiBJVXNlciB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9pZDogdXNlckRvYy5faWQudG9TdHJpbmcoKSxcbiAgICAgIG5hbWU6IHVzZXJEb2MubmFtZSxcbiAgICAgIGVtYWlsOiB1c2VyRG9jLmVtYWlsLFxuICAgICAgY3JlYXRlZEF0OiB1c2VyRG9jLmNyZWF0ZWRBdCxcbiAgICAgIHVwZGF0ZWRBdDogdXNlckRvYy51cGRhdGVkQXQsXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9ydCBzaW5nbGV0b24gaW5zdGFuY2UgZm9yIHVzZSBpbiBBUEkgcm91dGVzXG4gKiBUaGlzIGVuc3VyZXMgY29uc2lzdGVudCBkYXRhYmFzZSBjb25uZWN0aW9uIGhhbmRsaW5nXG4gKi9cbmV4cG9ydCBjb25zdCB1c2VyUmVwb3NpdG9yeSA9IG5ldyBVc2VyUmVwb3NpdG9yeSgpO1xuIl0sIm5hbWVzIjpbIlVzZXIiLCJkYkNvbm5lY3QiLCJVc2VyUmVwb3NpdG9yeSIsImVuc3VyZUNvbm5lY3Rpb24iLCJwcm9jZXNzIiwiZW52IiwiSkVTVF9XT1JLRVJfSUQiLCJmaW5kQnlFbWFpbCIsImVtYWlsIiwidXNlciIsImZpbmRPbmUiLCJleGVjIiwidHJhbnNmb3JtVG9QdWJsaWNVc2VyIiwiZmluZEJ5SWQiLCJ1c2VySWQiLCJjcmVhdGUiLCJ1c2VyRGF0YSIsIm5hbWUiLCJwYXNzd29yZCIsInNhdmVkVXNlciIsInNhdmUiLCJ1cGRhdGVCeUlkIiwidXBkYXRlRGF0YSIsImZpbmRCeUlkQW5kVXBkYXRlIiwiJHNldCIsIm5ldyIsInJ1blZhbGlkYXRvcnMiLCJkZWxldGVCeUlkIiwicmVzdWx0IiwiZmluZEJ5SWRBbmREZWxldGUiLCJleGlzdHNCeUVtYWlsIiwiY291bnQiLCJjb3VudERvY3VtZW50cyIsImZpbmRCeUVtYWlsV2l0aFBhc3N3b3JkIiwidXNlckRvYyIsIl9pZCIsInRvU3RyaW5nIiwiY3JlYXRlZEF0IiwidXBkYXRlZEF0IiwidXNlclJlcG9zaXRvcnkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../../packages/db/src/repositories/UserRepository.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/@panva","vendor-chunks/oidc-token-hash","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/../../node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuploads%2Fconnect%2Froute&page=%2Fapi%2Fuploads%2Fconnect%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuploads%2Fconnect%2Froute.ts&appDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fshrijayan.rajendran%2Fprojects%2Fpersonal%2Fbank_statement%2Fapps%2Fweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();