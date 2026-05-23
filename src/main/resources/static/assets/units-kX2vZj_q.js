import{c as s,j as l,L as c,H as m}from"./index-C_zWhOnL.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=s("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=s("Droplets",[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",key:"1ptgy4"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",key:"1sl1rz"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=s("Ruler",[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",key:"icamh8"}],["path",{d:"m14.5 12.5 2-2",key:"inckbg"}],["path",{d:"m11.5 9.5 2-2",key:"fmmyf7"}],["path",{d:"m8.5 6.5 2-2",key:"vc6u1g"}],["path",{d:"m17.5 15.5 2-2",key:"wo5hmg"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=s("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=s("Thermometer",[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",key:"17jzev"}]]);function v({title:e,description:a,actions:t}){return l.jsxs("header",{className:"mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",children:[l.jsxs("div",{children:[l.jsxs("nav",{className:"mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-on-muted dark:text-slate-400",children:[l.jsxs(c,{className:"flex items-center gap-1 hover:text-primary dark:hover:text-white",to:"/dashboard",children:[l.jsx(m,{size:14})," MeasurePro"]}),l.jsx(o,{size:14}),l.jsx("span",{children:e})]}),l.jsx("h1",{className:"text-3xl font-black tracking-normal text-primary dark:text-white sm:text-4xl",children:e}),a&&l.jsx("p",{className:"mt-2 max-w-3xl text-base text-on-muted dark:text-slate-300",children:a})]}),t&&l.jsx("div",{className:"flex flex-wrap gap-2",children:t})]})}const n={LENGTH:{label:"Length",eyebrow:"MEASURE",icon:d,units:[{value:"FEET",label:"Feet (ft)"},{value:"INCH",label:"Inch (in)"},{value:"YARDS",label:"Yards (yd)"},{value:"CENTIMETERS",label:"Centimeters (cm)"}]},WEIGHT:{label:"Weight",eyebrow:"MASS",icon:b,units:[{value:"KILOGRAM",label:"Kilogram (kg)"},{value:"GRAM",label:"Gram (g)"},{value:"POUND",label:"Pound (lb)"}]},VOLUME:{label:"Volume",eyebrow:"CAPACITY",icon:h,units:[{value:"LITRE",label:"Litre (L)"},{value:"MILLILITRE",label:"Millilitre (ml)"},{value:"GALLON",label:"Gallon (gal)"}]},TEMPERATURE:{label:"Temperature",eyebrow:"CLIMATE",icon:x,units:[{value:"CELSIUS",label:"Celsius (C)"},{value:"FAHRENHEIT",label:"Fahrenheit (F)"},{value:"KELVIN",label:"Kelvin (K)"}]}},y=Object.entries(n).map(([e,a])=>({value:e,label:a.label}));function g(e,a=0){var t;return((t=n[e].units[a])==null?void 0:t.value)||n[e].units[0].value}function k(e){for(const a of Object.values(n)){const t=a.units.find(r=>r.value===e);if(t)return t.label}return e}function f({category:e,fromValue:a,fromUnit:t,toValue:r=0,toUnit:i,targetUnit:u}){return{thisQuantityDTO:{value:Number(a),unit:t,measurementType:e},thatQuantityDTO:{value:Number(r),unit:i,measurementType:e},targetUnit:u||i}}export{v as P,n as U,f as b,y as c,g as d,k as u};
