export const clamp=(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v));
export function phase(seconds:number){return Math.min(2,Math.floor(seconds/10));}
export function scoreFor(elapsed:number,energy:number,hits:number){return Math.max(0,Math.floor(clamp(elapsed,0,30)*10)+energy*50-hits*30);}
export function validateLead(v:{name:string;whatsapp:string;trap?:string}){if(v.trap)return 'Solicitud inválida.';if(v.name.trim().length<2||v.name.length>80)return 'Ingresá tu nombre (2–80 caracteres).';if(!/^\+?[0-9]{8,15}$/.test(v.whatsapp.replace(/[\s()-]/g,'')))return 'Ingresá un WhatsApp válido con código de país.';return '';}
export function fairLanes(random:number){const safe=Math.floor(clamp(random,0,.9999)*3);return [0,1,2].filter(x=>x!==safe);}
