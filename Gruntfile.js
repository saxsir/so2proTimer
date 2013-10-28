'use strict';
var LIVERELOAD_PORT = 35729;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
module.exports = function (grunt) {
  grunt.initConfig({
    dev: 'dev/',
    prod: 'prod/',
    //@notice: connect（サーバースタート）
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              require('connect-livereload')({
                port: LIVERELOAD_PORT
              }),
              mountFolder(connect, 'prod/')
            ];
          }
        }
      }
    },
    //@notice: open（ページ開く）
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    //@notice: watch (ファイルの変更監視)
    watch: {
      livereload: {
        options: {
            livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= prod %>*.html',
          '<%= prod %>styles/*.css',
          '<%= prod %>scripts/*.js'
        ]
      },
      jade: {
        files: '<%= dev %>*.jade',
        tasks: ['jade', 'jsbeautifier']
      },
      stylus: {
        files: '<%= dev %>stylus/*.styl',
        tasks: ['stylus', 'csso', 'jsbeautifier']
      },
      scripts: {
        files: '<%= dev %>scripts/*.js',
        tasks: ['jsbeautifier']
      }
    },
    //@notice: jade（コンパイル）
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          '<%= prod %>index.html': '<%= dev %>index.jade'
        }
      }
    },
    //@notice: stylus（コンパイル）
    stylus: {
      compile: {
        options: {
          compress: false
        },
        files: {
          '<%= prod %>styles/app.css': '<%= dev %>stylus/main.styl'
        }
      }
    },
    //@notice: copy(ファイルコピー)
    copy: {
　　　　main: {
　　　　　　files: [
            {expand: true, cwd: '<%= dev %>scripts/', src: ['**'], dest: '<%= prod %>scripts/'},
            {expand: true, cwd: '<%= dev %>lib/', src: ['**'], dest: '<%= prod %>lib/'},
          ]
　　　　}
　　},
    //@notice: csso（css最適化)
    csso: {
      dist: {
        options: {
          restructure: false,
          report: 'min'
        },
        files: {
          '<%= prod %>styles/app.css': '<%= prod %>styles/app.css'
        }
      }
    },
    //@notice: jsbeautifier（html, cssの整形）
    jsbeautifier: {
      files: ['<%= prod %>{,*/}*.html', '<%= prod %>styles/{,*/}*.css', '<%= prod %>scripts/*.js', '<%= dev %>scripts/*.js'],
      options: {
        html: {
          braceStyle: 'collapse',
          indentChar: ' ',
          indentScripts: 'keep',
          indentSize: 2,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u'],
          wrapLineLength: 0
        },
        css: {
          indentChar: ' ',
          indentSize: 2
        },
        js: {
          braceStyle: 'collapse',
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: ' ',
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: false,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0
        }
      }
    }
  });

  //@notice Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', ['jade', 'stylus', 'csso', 'jsbeautifier', 'copy']);
  grunt.registerTask('default', ['build', 'connect', 'open', 'watch']);
};


