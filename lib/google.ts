import {google} from 'googleapis';
import {createCipheriv,createDecipheriv,randomBytes,createHash} from 'crypto';
import {cookies} from 'next/headers';
export const scopes=['https://www.googleapis.com/auth/calendar.events','https://www.googleapis.com/auth/spreadsheets'];
export function oauth(){return new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET,process.env.GOOGLE_REDIRECT_URI)}
function key(){if(!process.env.COOKIE_SECRET||process.env.COOKIE_SECRET.length<32)throw Error('Set COOKIE_SECRET (32+ chars)');return createHash('sha256').update(process.env.COOKIE_SECRET).digest()}
function seal(data:string){const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key(),iv);const encrypted=Buffer.concat([cipher.update(data,'utf8'),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),encrypted]).toString('base64url')}
function unseal(data:string){const raw=Buffer.from(data,'base64url'),dec=createDecipheriv('aes-256-gcm',key(),raw.subarray(0,12));dec.setAuthTag(raw.subarray(12,28));return Buffer.concat([dec.update(raw.subarray(28)),dec.final()]).toString('utf8')}
export async function getGoogle(){const token=(await cookies()).get('google_token')?.value;if(!token)throw Error('Connect Google first');const auth=oauth();auth.setCredentials(JSON.parse(unseal(token)));return auth}
export function tokenCookie(value:unknown){return {name:'google_token',value:seal(JSON.stringify(value)),options:{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax' as const,path:'/',maxAge:60*60*24*7}}}