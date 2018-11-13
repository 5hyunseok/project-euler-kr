export const baseURI = '/api';

export const sayswho = () => {
  const ua = navigator.userAgent;
  let tem;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return `IE ${tem[1] || ''}`;
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  tem = ua.match(/version\/(\d+)/i);
  if (tem != null) {
    M.splice(1, 1, tem[1]);
  }
  return M.join(' ');
};

export const formatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = `${d.getFullYear()}`;
  let hour = `${d.getHours()}`;
  let min = `${d.getMinutes()}`;
  let sec = `${d.getSeconds()}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (hour.length < 2) hour = `0${hour}`;
  if (min.length < 2) min = `0${min}`;
  if (sec.length < 2) sec = `0${sec}`;

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
};

export const translateCategory = (c) => {
  if (c === 'TRANS') {
    return '번역';
  } else if (c === 'MISS') {
    return '오역';
  } else if (c === 'FREE') {
    return '자유';
  }
  return '';
};

export const dateFormat = d => `${d.split('T')[0]} ${d.split('T')[1].split('.')[0]}`;

export const languageOptions = [
  { value: 'cpp' },
  { value: 'go' },
  { value: 'java' },
  { value: 'javascript' },
  { value: 'lisp' },
  { value: 'perl' },
  { value: 'python' },
  { value: 'r' },
  { value: 'ruby' },
  { value: 'scala' },
  { value: 'scheme' },
  { value: 'sql' },
  { value: 'swift' },
];


export const languageFullOptions = [
  { value: '1c' },
  { value: 'abnf' },
  { value: 'accesslog' },
  { value: 'actionscript' },
  { value: 'ada' },
  { value: 'angelscript' },
  { value: 'apache' },
  { value: 'applescript' },
  { value: 'arcade' },
  { value: 'arduino' },
  { value: 'armasm' },
  { value: 'asciidoc' },
  { value: 'aspectj' },
  { value: 'autohotkey' },
  { value: 'autoit' },
  { value: 'avrasm' },
  { value: 'awk' },
  { value: 'axapta' },
  { value: 'bash' },
  { value: 'basic' },
  { value: 'bnf' },
  { value: 'brainfuck' },
  { value: 'cal' },
  { value: 'capnproto' },
  { value: 'ceylon' },
  { value: 'clean' },
  { value: 'clojure-repl' },
  { value: 'clojure' },
  { value: 'cmake' },
  { value: 'coffeescript' },
  { value: 'coq' },
  { value: 'cos' },
  { value: 'cpp' },
  { value: 'crmsh' },
  { value: 'crystal' },
  { value: 'cs' },
  { value: 'csp' },
  { value: 'css' },
  { value: 'd' },
  { value: 'dart' },
  { value: 'delphi' },
  { value: 'diff' },
  { value: 'django' },
  { value: 'dns' },
  { value: 'dockerfile' },
  { value: 'dos' },
  { value: 'dsconfig' },
  { value: 'dts' },
  { value: 'dust' },
  { value: 'ebnf' },
  { value: 'elixir' },
  { value: 'elm' },
  { value: 'erb' },
  { value: 'erlang-repl' },
  { value: 'erlang' },
  { value: 'excel' },
  { value: 'fix' },
  { value: 'flix' },
  { value: 'fortran' },
  { value: 'fsharp' },
  { value: 'gams' },
  { value: 'gauss' },
  { value: 'gcode' },
  { value: 'gherkin' },
  { value: 'glsl' },
  { value: 'gml' },
  { value: 'go' },
  { value: 'golo' },
  { value: 'gradle' },
  { value: 'groovy' },
  { value: 'haml' },
  { value: 'handlebars' },
  { value: 'haskell' },
  { value: 'haxe' },
  { value: 'hsp' },
  { value: 'htmlbars' },
  { value: 'http' },
  { value: 'hy' },
  { value: 'inform7' },
  { value: 'ini' },
  { value: 'irpf90' },
  { value: 'isbl' },
  { value: 'java' },
  { value: 'javascript' },
  { value: 'jboss-cli' },
  { value: 'json' },
  { value: 'julia-repl' },
  { value: 'julia' },
  { value: 'kotlin' },
  { value: 'lasso' },
  { value: 'ldif' },
  { value: 'leaf' },
  { value: 'less' },
  { value: 'lisp' },
  { value: 'livecodeserver' },
  { value: 'livescript' },
  { value: 'llvm' },
  { value: 'lsl' },
  { value: 'lua' },
  { value: 'makefile' },
  { value: 'markdown' },
  { value: 'mathematica' },
  { value: 'matlab' },
  { value: 'maxima' },
  { value: 'mel' },
  { value: 'mercury' },
  { value: 'mipsasm' },
  { value: 'mizar' },
  { value: 'mojolicious' },
  { value: 'monkey' },
  { value: 'moonscript' },
  { value: 'n1ql' },
  { value: 'nginx' },
  { value: 'nimrod' },
  { value: 'nix' },
  { value: 'nsis' },
  { value: 'objectivec' },
  { value: 'ocaml' },
  { value: 'openscad' },
  { value: 'oxygene' },
  { value: 'parser3' },
  { value: 'perl' },
  { value: 'pf' },
  { value: 'pgsql' },
  { value: 'php' },
  { value: 'plaintext' },
  { value: 'pony' },
  { value: 'powershell' },
  { value: 'processing' },
  { value: 'profile' },
  { value: 'prolog' },
  { value: 'properties' },
  { value: 'protobuf' },
  { value: 'puppet' },
  { value: 'purebasic' },
  { value: 'python' },
  { value: 'q' },
  { value: 'qml' },
  { value: 'r' },
  { value: 'reasonml' },
  { value: 'rib' },
  { value: 'roboconf' },
  { value: 'routeros' },
  { value: 'rsl' },
  { value: 'ruby' },
  { value: 'ruleslanguage' },
  { value: 'rust' },
  { value: 'sas' },
  { value: 'scala' },
  { value: 'scheme' },
  { value: 'scilab' },
  { value: 'scss' },
  { value: 'shell' },
  { value: 'smali' },
  { value: 'smalltalk' },
  { value: 'sml' },
  { value: 'sqf' },
  { value: 'sql' },
  { value: 'stan' },
  { value: 'stata' },
  { value: 'step21' },
  { value: 'stylus' },
  { value: 'subunit' },
  { value: 'swift' },
  { value: 'taggerscript' },
  { value: 'tap' },
  { value: 'tcl' },
  { value: 'tex' },
  { value: 'thrift' },
  { value: 'tp' },
  { value: 'twig' },
  { value: 'typescript' },
  { value: 'vala' },
  { value: 'vbnet' },
  { value: 'vbscript-html' },
  { value: 'vbscript' },
  { value: 'verilog' },
  { value: 'vhdl' },
  { value: 'vim' },
  { value: 'x86asm' },
  { value: 'xl' },
  { value: 'xml' },
  { value: 'xquery' },
  { value: 'yaml' },
  { value: 'zephir' },
];
