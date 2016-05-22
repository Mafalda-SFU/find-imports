import { test } from 'tap';
import findImports from '..';

test('Pass a single file', (t) => {
    const result = findImports('test/fixtures/app.js');
    const wanted = {
        'test/fixtures/app.js': [
            'lodash',
            'fs',
            'path',
            'express',
            'consolidate',
            'errorhandler',
            'serve-favicon',
            'cookie-parser',
            'body-parser',
            'connect-multiparty',
            'connect-restreamer',
            'method-override',
            'morgan',
            'compression',
            'serve-static',
            'express-session',
            'session-file-store',
            'i18next',
            'i18next-node-fs-backend',
            'del',
            'i18next-express-middleware',
            'hogan.js'
        ]
    };
    t.same(result, wanted);
    t.end();
});

test('Pass a list of glob patterns', (t) => {
    const files = [
        'test/fixtures/**/app*.js',
    ];
    const result = findImports(files);
    const wanted = {
        'test/fixtures/app.js': [
            'lodash',
            'fs',
            'path',
            'express',
            'consolidate',
            'errorhandler',
            'serve-favicon',
            'cookie-parser',
            'body-parser',
            'connect-multiparty',
            'connect-restreamer',
            'method-override',
            'morgan',
            'compression',
            'serve-static',
            'express-session',
            'session-file-store',
            'i18next',
            'i18next-node-fs-backend',
            'del',
            'i18next-express-middleware',
            'hogan.js'
        ]
    };
    t.same(result, wanted);
    t.end();
});

test('Flatten output', (t) => {
    const result = findImports('test/fixtures/app.js', { flatten: true });
    const wanted = [
        'lodash',
        'fs',
        'path',
        'express',
        'consolidate',
        'errorhandler',
        'serve-favicon',
        'cookie-parser',
        'body-parser',
        'connect-multiparty',
        'connect-restreamer',
        'method-override',
        'morgan',
        'compression',
        'serve-static',
        'express-session',
        'session-file-store',
        'i18next',
        'i18next-node-fs-backend',
        'del',
        'i18next-express-middleware',
        'hogan.js'
    ];
    t.same(result, wanted);
    t.end();
});

test('Relative imports', (t) => {
    const files = [
        'test/fixtures/relative-imports.js',
    ];
    const result = findImports(files, { relativeImports: true });
    const wanted = {
        'test/fixtures/relative-imports.js': [
            './lib/urljoin',
            './lib/log',
            './config/settings',
            './api',
            './lib/middleware/errclient',
            './lib/middleware/errlog',
            './lib/middleware/errnotfound',
            './lib/middleware/errserver',
            './index.css'
        ]
    };
    t.same(result, wanted);
    t.end();
});


test('Absolute imports', (t) => {
    const files = [
        'test/fixtures/absolute-imports.js',
    ];
    const result = findImports(files, { absoluteImports: true });
    const wanted = {
        'test/fixtures/absolute-imports.js': [
            '/lib/urljoin',
            '/lib/log',
            '/config/settings',
            '/api',
            '/lib/middleware/errclient',
            '/lib/middleware/errlog',
            '/lib/middleware/errnotfound',
            '/lib/middleware/errserver',
            '/index.css'
        ]
    };
    t.same(result, wanted);
    t.end();
});


test('Only package imports', (t) => {
    const files = [
        'test/fixtures/mock-imports.js'
    ];
    const result = findImports(files);
    const wanted = {
        'test/fixtures/mock-imports.js': [
            'package1',
            'package2',
            'package3',
            'package4/extras'
        ]
    };
    t.same(result, wanted);
    t.end();
});


test('No package imports', (t) => {
    const files = [
        'test/fixtures/mock-imports.js'
    ];
    const result = findImports(files, {packageImports:false});
    const wanted = {
        'test/fixtures/mock-imports.js': [
        ]
    };
    t.same(result, wanted);
    t.end();
});


test('Only absolute imports', (t) => {
    const files = [
        'test/fixtures/mock-imports.js'
    ];
    const result = findImports(files, {absoluteImports:true, packageImports:false});
    const wanted = {
        'test/fixtures/mock-imports.js': [
            '/absolute1',
            '/absolute2',
            '/absolute3',
            '/absolute4/extras'
        ]
    };
    t.same(result, wanted);
    t.end();
});


test('Only relative imports', (t) => {
    const files = [
        'test/fixtures/mock-imports.js'
    ];
    const result = findImports(files, {relativeImports:true, packageImports:false});
    const wanted = {
        'test/fixtures/mock-imports.js': [
            './relative1',
            './relative2',
            './relative3',
            './relative4/extras'
        ]
    };
    t.same(result, wanted);
    t.end();
});

test('Syntax errors', (t) => {
    const result = findImports('test/fixtures/syntax-errors.js');
    const wanted = {};
    t.same(result, wanted);
    t.end();
});
