"use strict";(()=>{var e={};e.id=883,e.ids=[883,944,919],e.modules={11185:e=>{e.exports=require("mongoose")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},35034:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},56939:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>w,patchFetch:()=>h,requestAsyncStorage:()=>g,routeModule:()=>m,serverHooks:()=>f,staticGenerationAsyncStorage:()=>y});var n={};r.r(n),r.d(n,{GET:()=>p});var s=r(63036),a=r(5736),o=r(15262),i=r(60942),d=r(1295),u=r(89254),c=r(50944);async function l(e){try{let t=function(e){let t=new Date(e.createdAt).toLocaleDateString(),r=e.generatedData,n=`%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 1000
>>
stream
BT
/F1 16 Tf
50 750 Td
(${e.reportTitle}) Tj
0 -30 Td
/F1 12 Tf
(Generated on: ${t}) Tj
0 -40 Td
/F1 14 Tf
(Financial Summary) Tj
0 -25 Td
/F1 12 Tf`;return r&&(n+=`
(Total Income: $${r.totalIncome?.toLocaleString()||0}) Tj
0 -20 Td
(Total Expenses: $${r.totalExpenses?.toLocaleString()||0}) Tj
0 -20 Td
(Net Cash Flow: $${r.netCashFlow?.toLocaleString()||0}) Tj
0 -30 Td`,r.insights&&r.insights.length>0&&(n+=`/F1 14 Tf
(Key Insights) Tj
0 -25 Td
/F1 10 Tf`,r.insights.slice(0,5).forEach((e,t)=>{let r=e.description.substring(0,80);n+=`
(${t+1}. ${r}${e.description.length>80?"...":""}) Tj
0 -15 Td`})),r.recommendations&&r.recommendations.length>0&&(n+=`
0 -20 Td
/F1 14 Tf
(Recommendations) Tj
0 -25 Td
/F1 10 Tf`,r.recommendations.slice(0,5).forEach((e,t)=>{let r=e.suggestion.substring(0,70);n+=`
(${t+1}. ${r}${e.suggestion.length>70?"...":""}) Tj
0 -15 Td
(   Potential savings: $${e.potentialSavings?.toLocaleString()||0}) Tj
0 -15 Td`}))),n+=`
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000104 00000 n 
0000000210 00000 n 
0000001300 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
1360
%%EOF`}(e);return Buffer.from(t,"utf8")}catch(e){throw console.error("PDF generation error:",e),Error("Failed to generate PDF report")}}async function p(e,{params:t}){try{let e=await (0,d.getServerSession)();if(!e?.user?.email)return i.NextResponse.json({error:"Authentication required"},{status:401});let r=await c.userRepository.findByEmail(e.user.email);if(!r)return i.NextResponse.json({error:"User account not found"},{status:404});if(!t.reportId||""===t.reportId.trim())return i.NextResponse.json({error:"Report ID is required"},{status:400});let n=await u.M.findById(t.reportId);if(!n)return i.NextResponse.json({error:"Report not found"},{status:404});if(n.userId!==r._id)return i.NextResponse.json({error:"Access denied"},{status:403});if("completed"!==n.status)return i.NextResponse.json({error:"Report is not ready for download. Status: "+n.status},{status:400});let s=await l(n),a=n.reportTitle.replace(/[^a-zA-Z0-9\s-]/g,"").replace(/\s+/g,"_").substring(0,50),o=`${a}_${new Date(n.createdAt).toISOString().split("T")[0]}.pdf`;return new i.NextResponse(s,{status:200,headers:{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="${o}"`,"Content-Length":s.length.toString(),"Cache-Control":"private, max-age=0"}})}catch(e){return console.error("PDF download error:",e),i.NextResponse.json({error:"Failed to generate PDF. Please try again."},{status:500})}}let m=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/reports/[reportId]/download/route",pathname:"/api/reports/[reportId]/download",filename:"route",bundlePath:"app/api/reports/[reportId]/download/route"},resolvedPagePath:"/Users/shrijayan.rajendran/projects/personal/bank_statement/apps/web/src/app/api/reports/[reportId]/download/route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:g,staticGenerationAsyncStorage:y,serverHooks:f}=m,w="/api/reports/[reportId]/download/route";function h(){return(0,o.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:y})}},77919:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(11185),s=r.n(n);let a=global.mongoose;a||(a=global.mongoose={conn:null,promise:null});let o=async function(){if(a.conn)return a.conn;if(!a.promise){let e=process.env.MONGODB_URI;if(!e)throw Error("Please define the MONGODB_URI environment variable inside .env.local");a.promise=s().connect(e,{bufferCommands:!1}).then(e=>e)}try{a.conn=await a.promise}catch(e){throw a.promise=null,e}return a.conn}},89254:(e,t,r)=>{r.d(t,{M:()=>u});var n=r(11185),s=r.n(n);let a=new(s()).Schema({userId:{type:s().Schema.Types.ObjectId,ref:"User",required:!0,index:!0},uploadId:{type:String,required:!1},reportTitle:{type:String,required:!0},sourceDocumentCount:{type:Number,required:!0},status:{type:String,enum:["processing","completed","failed"],default:"processing",required:!0},progress:{type:Number,min:0,max:100,default:0},generatedData:{type:Object,required:!1},completedAt:{type:Date,required:!1}},{timestamps:!0});a.index({userId:1,createdAt:-1}),a.index({status:1}),a.index({userId:1,status:1});let o=s().models?.AnalysisReport||s().model("AnalysisReport",a);var i=r(77919);class d{async ensureConnection(){process.env.JEST_WORKER_ID||await (0,i.Z)()}async create(e){await this.ensureConnection();let t=new o({userId:e.userId,uploadId:e.uploadId,reportTitle:e.reportTitle,sourceDocumentCount:e.sourceDocumentCount,status:e.status||"processing",progress:e.progress||0,generatedData:e.generatedData}),r=await t.save();return this.transformToPublicReport(r)}async findById(e){await this.ensureConnection();let t=await o.findById(e).exec();return t?this.transformToPublicReport(t):null}async findByUserId(e,t=50){return await this.ensureConnection(),(await o.find({userId:e}).sort({createdAt:-1}).limit(t).exec()).map(e=>this.transformToPublicReport(e))}async findByUserIdAndStatus(e,t,r=50){return await this.ensureConnection(),(await o.find({userId:e,status:t}).sort({createdAt:-1}).limit(r).exec()).map(e=>this.transformToPublicReport(e))}async updateById(e,t){await this.ensureConnection();let r={};void 0!==t.reportTitle&&(r.reportTitle=t.reportTitle),void 0!==t.status&&(r.status=t.status),void 0!==t.progress&&(r.progress=t.progress),void 0!==t.generatedData&&(r.generatedData=t.generatedData),void 0!==t.completedAt&&(r.completedAt=t.completedAt);let n=await o.findByIdAndUpdate(e,{$set:r},{new:!0,runValidators:!0}).exec();return n?this.transformToPublicReport(n):null}async deleteById(e){return await this.ensureConnection(),!!await o.findByIdAndDelete(e).exec()}async deleteByUserId(e){return await this.ensureConnection(),(await o.deleteMany({userId:e}).exec()).deletedCount||0}async findByUploadId(e){await this.ensureConnection();let t=await o.findOne({uploadId:e}).exec();return t?this.transformToPublicReport(t):null}async countByUserId(e){return await this.ensureConnection(),o.countDocuments({userId:e}).exec()}async countByUserIdAndStatus(e,t){return await this.ensureConnection(),o.countDocuments({userId:e,status:t}).exec()}async findPaginated(e,t){await this.ensureConnection();let{page:r,limit:n,sort:s={createdAt:-1}}=t,[a,i]=await Promise.all([o.find(e).sort(s).skip((r-1)*n).limit(n).exec(),o.countDocuments(e).exec()]);return{data:a.map(e=>this.transformToPublicReport(e)),page:r,limit:n,total:i,pages:Math.ceil(i/n)}}async deleteByIdAndUserId(e,t){return await this.ensureConnection(),!!await o.findOneAndDelete({_id:e,userId:t}).exec()}transformToPublicReport(e){return{_id:e._id.toString(),userId:e.userId,uploadId:e.uploadId,reportTitle:e.reportTitle,sourceDocumentCount:e.sourceDocumentCount,status:e.status,progress:e.progress,generatedData:e.generatedData,createdAt:e.createdAt,updatedAt:e.updatedAt,completedAt:e.completedAt}}}let u=new d},50944:(e,t,r)=>{r.d(t,{userRepository:()=>u});var n=r(11185),s=r.n(n);let a=new n.Schema({name:{type:String,required:[!0,"Name is required"],trim:!0,maxlength:[100,"Name cannot exceed 100 characters"]},email:{type:String,required:[!0,"Email is required"],unique:!0,lowercase:!0,trim:!0,match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,"Please enter a valid email address"]},password:{type:String,required:[!0,"Password is required"],minlength:[6,"Password must be at least 6 characters long"]}},{timestamps:!0,collection:"users"}),o=s().models.User||s().model("User",a);var i=r(77919);class d{async ensureConnection(){process.env.JEST_WORKER_ID||await (0,i.Z)()}async findByEmail(e){await this.ensureConnection();let t=await o.findOne({email:e}).exec();return t?this.transformToPublicUser(t):null}async findById(e){await this.ensureConnection();let t=await o.findById(e).exec();return t?this.transformToPublicUser(t):null}async create(e){await this.ensureConnection();let t=new o({name:e.name,email:e.email,password:e.password}),r=await t.save();return this.transformToPublicUser(r)}async updateById(e,t){await this.ensureConnection();let r=await o.findByIdAndUpdate(e,{$set:t},{new:!0,runValidators:!0}).exec();return r?this.transformToPublicUser(r):null}async deleteById(e){return await this.ensureConnection(),!!await o.findByIdAndDelete(e).exec()}async existsByEmail(e){return await this.ensureConnection(),await o.countDocuments({email:e}).exec()>0}async findByEmailWithPassword(e){return await this.ensureConnection(),o.findOne({email:e}).exec()}transformToPublicUser(e){return{_id:e._id.toString(),name:e.name,email:e.email,createdAt:e.createdAt,updatedAt:e.updatedAt}}}let u=new d}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[522,295,746],()=>r(56939));module.exports=n})();