'use strict';

//until 1.2 is released
// let instantsearch = require('instantsearch.js');
const inceptionWidget = require('./widgets/inception.js');


let superbowlsearch = instantsearch({
  appId: 'VC519DRAY3',
  apiKey: 'ba8e7e5e700d53fe3f28f20226b63baf',
  indexName: 'sb_ads',
  urlSync: true
});

window.search = superbowlsearch;

superbowlsearch.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search',
    placeholder: 'Find ads from big games past&hellip;',
    wrapInput: false
  })
);

superbowlsearch.addWidget(
  instantsearch.widgets.hits({
    hitsPerPage: 30,
    container: '#results',
    templates: {
      empty: `<div class="no-results"><h2>No Results</h2>
        <p>What about starting a new search?</p></div>`,
      item: document.getElementById('hit-template').innerHTML
    }
  })
);

superbowlsearch.addWidget(
  instantsearch.widgets.menu({
    container: '#years',
    attributeName: 'year',
    limit: 1000,
    sortBy: ['name:desc'],
    templates: {
      header: false,
      item: '{{name}}'
    }
  })
);

superbowlsearch.addWidget(
  instantsearch.widgets.currentRefinedValues({
    container: "#refinements",
    clearAll: false,
    templates: {
      item: '<a href="javascript:void(0)">{{name}} <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#clear-icon"></use></svg></a>',
      clearAll: '<a href="javascript:void(0)"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#clear-icon"></use></svg> Clear All</a>',
    }
  })
);

superbowlsearch.addWidget(
  inceptionWidget({
    container: '#brands',
    mainSearchAttribute: 'brand',
    secondarySearchAttribute: 'name',
    index: 'sb_ads_brands'
  })
)

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    maxPages: 20,
    padding: 1,
    showFirstLast: false
  })
);

superbowlsearch.start();