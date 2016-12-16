import { moduleFor, test } from 'ember-qunit';

moduleFor('service:fastboot', 'Unit | Service | fastboot in the browser', {});

test('isFastBoot', function(assert) {
  assert.expect(3);

  let service = this.subject();
  assert.equal(service.isFastBoot, false, `it should be false`);
  assert.equal(service.get('isFastBoot'), false, `it should be false`);

  try {
    service.isFastBoot = true;
  } catch(e) {
    assert.ok(true, 'throws since isFastBoot is not writable');
  }
});

test('request', function(assert) {
  let service = this.subject();
  assert.equal(service.get('request'), null, `it should be null`);
});

test('response', function(assert) {
  let service = this.subject();
  assert.equal(service.get('response'), null, `it should be null`);
});

test('metadata', function(assert) {
  let service = this.subject();
  assert.equal(service.get('metadata'), null, `it should be null`);
});
