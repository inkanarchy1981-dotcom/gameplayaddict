import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
const vite = await createServer({appType:'custom',configFile:false,root,resolve:{alias:{'@':root}},server:{middlewareMode:true}});
after(()=>vite.close());
const {evaluateNewsBrief, netflixExtendedLookBrief} = await vite.ssrLoadModule('/lib/news-intelligence.ts');
test('approved existing copy retains its update decision',()=>{
 const result=evaluateNewsBrief(netflixExtendedLookBrief,[]);
 assert.ok(result.decisions.includes('UPDATE_EXISTING'));
 assert.ok(result.publicSummary.length>0);
});
for(const summary of ['', 'Great news.', 'Delve into this comprehensive guide to the latest game and all its features.']) {
 test(`editorial failure blocks every public action: ${summary}`,()=>{
  const input={...netflixExtendedLookBrief,publicSummary:summary};
  const before=JSON.stringify(input);
  const result=evaluateNewsBrief(input,[]);
  assert.deepEqual(result.decisions,['HOLD_EDITORIAL']);
  assert.equal(result.publicSummary,'');
  assert.equal(JSON.stringify(input),before);
 });
}
