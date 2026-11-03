import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculate} from '../src/lib/metrics.ts';
test('收益和回撤使用同一净值序列',()=>{const m=calculate([{date:'2024-01-01',nav:1},{date:'2024-07-01',nav:1.2},{date:'2025-01-01',nav:1.08}]);assert.ok(Math.abs(m.total-.08)<1e-10);assert.ok(Math.abs(m.maxDrawdown+.1)<1e-10);assert.equal(m.drawdowns.length,3);});
test('拒绝非法数据',()=>{assert.throws(()=>calculate([{date:'2024-01-01',nav:1},{date:'2024-01-01',nav:0}]));});
