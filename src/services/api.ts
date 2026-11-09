import {config} from '../config';
export type Entry={name:string;score:number};
const key='honor-demo-v1';
export const demo=!config.api;
export function data(){return JSON.parse(localStorage.getItem(key)||'{"sessions":0,"entries":[],"leads":0}')}
export function save(d:unknown){localStorage.setItem(key,JSON.stringify(d));}
export async function request(path:string,body?:unknown,token?:string){const r=await fetch(config.api+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});const d=await r.json();if(!r.ok)throw Error(d.error||'No se pudo conectar.');return d;}
export async function start(){if(demo){const d=data();d.sessions++;save(d);return {id:crypto.randomUUID()};}return request('/session',{});}
export async function finish(id:string,energy:number,hits:number){if(demo)return;return request('/finish',{id,energy,hits});}
export async function leaderboard():Promise<Entry[]>{return demo?data().entries.sort((a:Entry,b:Entry)=>b.score-a.score).slice(0,10):request('/leaderboard');}
export async function register(body:Record<string,unknown>){if(!demo)return request('/lead',body);const d=data();d.leads++;d.entries.push({name:`Challenger ${String(d.leads).padStart(3,'0')}`,score:body.score});save(d);}
