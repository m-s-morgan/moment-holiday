'use strict';

const test = require('node:test');
const assert = require('node:assert');
const moment = require('moment');

// the package's main entry (the US build), as an app loads it: it patches the moment it requires
require('..');

const fixtures = require('./fixtures.json');
const BANKING = ['New Years Day', 'Martin Luther King Jr. Day', 'Presidents Day', 'Memorial Day', 'Independence Day',
    'Labor Day', 'Columbus Day', 'Veterans Day', 'Thanksgiving', 'Christmas'];

// every date below was recorded from the published moment-holiday@1.5.1 (npm), 2015 through 2045
test('main entry patches the peer moment', () => {
    assert.strictEqual(typeof moment.fn.isHoliday, 'function');
    assert.strictEqual(typeof moment.fn.holiday, 'function');
});

test('matches moment-holiday@1.5.1 for every day 2015-2045', () => {
    const banking = new Set(fixtures.banking);

    for (let d = moment.utc('2015-01-01'); d.isBefore('2046-01-01'); d.add(1, 'day')) {
        const key = d.format('YYYY-MM-DD');

        assert.strictEqual(d.clone().isHoliday(BANKING), banking.has(key), `isHoliday(BANKING) on ${key}`);
        assert.strictEqual(d.clone().isHoliday() || false, fixtures.any[key] || false, `isHoliday() on ${key}`);
    }
});
