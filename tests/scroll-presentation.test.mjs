import assert from 'node:assert/strict';
import test from 'node:test';
import { sectionProgress, processStage, processStageProgress, processStageScrollTop, processStageFrameScrollTop, stickyFrameProgress, printerPose } from '../src/lib/scroll-presentation.ts';
test('scroll presentation clamps before/after its section and reverses without hysteresis', () => {
  assert.equal(sectionProgress(1000, 1800, 900), 0);
  assert.equal(sectionProgress(-2000, 1800, 900), 1);
  const forward = sectionProgress(-100, 1800, 900);
  assert.ok(forward > sectionProgress(100, 1800, 900));
  assert.equal(forward, sectionProgress(-100, 1800, 900));
  assert.ok(Number.isFinite(sectionProgress(-10, 0, 900)));
});
test('all five process stages have stable boundaries, including reverse scroll and final endpoint', () => {
  assert.deepEqual([-1, 0, 0.199, 0.2, 0.399, 0.4, 0.599, 0.6, 0.799, 0.8, 1, 2].map(processStage), [0,0,0,1,1,2,2,3,3,4,4,4]);
  assert.deepEqual([1,0.7,0.5,0.3,0].map(processStage), [4,3,2,1,0]);
  assert.equal(processStageProgress(1), 1);
});
test('print height follows reversible scroll while the head moves at the same scroll position', () => {
  const first = printerPose(0.7, 0);
  const later = printerPose(0.7, 1);
  assert.equal(first.complete, later.complete);
  assert.notEqual(first.x, later.x);
  assert.ok(printerPose(0.75, 0).complete > printerPose(0.65, 0).complete);
  assert.equal(printerPose(0.65, 0).complete, printerPose(0.65, 10).complete);
  assert.equal(printerPose(0.8, 0).complete, 1);
  assert.equal(printerPose(1, 0).reveal, 1);
});
test('card destinations and native scroll select the same stage across responsive section sizes', () => {
  for (const [top, height, viewport] of [[3708,5220,900], [2966,4388,844], [2380,3650,702]]) {
    for (const stage of [0,1,2,3,4]) {
      const scrollY = processStageScrollTop(stage, top, height, viewport);
      const progress = stickyProgress(top - scrollY + 72, height, viewport);
      assert.equal(processStage(progress), stage);
      assert.ok(Math.abs(processStageProgress(progress) - 0.6) < 0.00001);
      if (stage === 4) assert.equal(printerPose(progress, 0).reveal, 1);
    }
    assert.equal(processStageScrollTop(-5,top,height,viewport), processStageScrollTop(0,top,height,viewport));
    assert.equal(processStageScrollTop(9,top,height,viewport), processStageScrollTop(4,top,height,viewport));
  }
});
import { heroStoryPose, storyCardPose, stickyProgress } from '../src/lib/scroll-presentation.ts';
test('hero model enlarges continuously in the original scene before cards arrive', () => {
  assert.equal(heroStoryPose(0).enlarge, 0);
  assert.equal(heroStoryPose(0.3).enlarge, 1);
  assert.ok(heroStoryPose(0.15).enlarge > heroStoryPose(0.1).enlarge);
  assert.equal(heroStoryPose(0.3).intro, 0);
  assert.equal(stickyProgress(100, 3000, 900), 0);
  assert.equal(stickyProgress(-3000, 3000, 900), 1);
});
test('cards rise from below, remain in the stack and withdraw only on reverse scroll', () => {
  for (const [index, center] of [[0,0.34],[1,0.76]]) {
    assert.equal(storyCardPose(center - 0.07, index).opacity, 0);
    assert.ok(storyCardPose(center - 0.04, index).y > 0);
    assert.ok(Math.abs(storyCardPose(center + 0.025, index).opacity - 1) < 0.001);
  }
  assert.equal(storyCardPose(0.55, 0).opacity, 1);
  assert.equal(storyCardPose(0.55, 1).opacity, 0);
  for (const index of [0,1]) {
    assert.equal(storyCardPose(0.9, index).opacity, 1);
    assert.equal(storyCardPose(0.9, index).y, 0);
  }
  assert.equal(storyCardPose(0.45, 1).opacity, 0);
  assert.equal(storyCardPose(0.45, 0).opacity, 1);
});

test('phone card entrances have complete targets at a fixed scroll position and reverse cleanly', () => {
  for (const [index, center] of [[0,0.34],[1,0.76]]) {
    assert.deepEqual(storyCardPose(center - 0.04, index, true), { y: 125, opacity: 0 });
    assert.deepEqual(storyCardPose(center - 0.02, index, true), { y: 0, opacity: 1 });
    assert.deepEqual(storyCardPose(0.9, index, true), { y: 0, opacity: 1 });
    assert.deepEqual(storyCardPose(center - 0.04, index, true), { y: 125, opacity: 0 });
  }
});

test('phone sticky progress and clicked stages match actual frame edges on short and tall screens', () => {
  for (const frameHeight of [484, 628, 772]) {
    const height = 3.6 * (frameHeight + 72);
    assert.equal(stickyFrameProgress(72, height, frameHeight), 0);
    assert.equal(stickyFrameProgress(72 + frameHeight - height, height, frameHeight), 1);
    for (let stage = 0; stage < 5; stage++) {
      const destination = processStageFrameScrollTop(stage, 2200, height, frameHeight);
      const progress = stickyFrameProgress(2200 - destination, height, frameHeight);
      assert.equal(processStage(progress), stage);
      assert.ok(Math.abs(processStageProgress(progress) - 0.6) < 0.00001);
    }
    const heroHeight = 2.6 * (frameHeight + 72);
    assert.equal(stickyFrameProgress(0, heroHeight - 72, frameHeight, 0), 0);
    assert.equal(stickyFrameProgress(-(heroHeight - frameHeight - 72), heroHeight - 72, frameHeight, 0), 1);
  }
});
