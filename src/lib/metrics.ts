export type Point = {date:string;nav:number};
export function calculate(points:Point[]) {
 if(points.length<2) throw new Error('至少需要两个观测点');
 let peak=0; let previous=-Infinity;
 const drawdowns=points.map(p=>{const time=Date.parse(p.date);if(!Number.isFinite(time)||time<=previous||!Number.isFinite(p.nav)||p.nav<=0)throw new Error('日期须递增且净值为正数');previous=time;peak=Math.max(peak,p.nav);return p.nav/peak-1;});
 const first=points[0]!, last=points.at(-1)!;
 const days=(Date.parse(last.date)-Date.parse(first.date))/86400000;
 return {total:last.nav/first.nav-1,annualized:(last.nav/first.nav)**(365.25/days)-1,maxDrawdown:Math.min(...drawdowns),drawdowns,days};
}
export const percent=(n:number)=>(n*100).toFixed(2)+'%';