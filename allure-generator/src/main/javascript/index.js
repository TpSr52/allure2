import App from './app';
import $ from 'jquery';

import 'file-loader?name=favicon.ico!./favicon.ico';

import './blocks/arrow/styles.css';
import './blocks/executor-icon/styles.css';

import './pluginApi';

import './plugins/default';

import './plugins/tab-category';
import './plugins/tab-suites';
import './plugins/tab-graph';
import './plugins/tab-timeline';

import './plugins/widget-status';
import './plugins/widget-severity';
import './plugins/widget-duration';

import './plugins/widget-summary';
import './plugins/widget-history-trend';
import './plugins/widget-suites';
import './plugins/widget-environment';
import './plugins/widget-executor';

import './plugins/testresult-description';
import './plugins/testresult-tags';
import './plugins/testresult-category';
import './plugins/testresult-history';
import './plugins/testresult-retry';
import './plugins/testresult-owner';
import './plugins/testresult-severity';
import './plugins/testresult-duration';
import './plugins/testresult-parameters';
import './plugins/testresult-links';

window.jQuery = $;

$(document).ready(() => App.start());