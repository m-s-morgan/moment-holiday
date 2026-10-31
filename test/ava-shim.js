'use strict';

// the slice of ava's `t` the upstream suite uses, on node:test + node:assert
const nodeTest = require('node:test');
const assert = require('node:assert');

module.exports = function test(name, fn) {
    nodeTest(name, () => {
        fn({
            pass() {},
            fail(message) { assert.fail(message); },
            is(actual, expected, message) { assert.strictEqual(actual, expected, message); },
            true(value, message) { assert.strictEqual(value, true, message); },
            false(value, message) { assert.strictEqual(value, false, message); }
        });
    });
};
