import {getBaseUrl} from "@/utils/biu";
import {addSnippet} from '@/api/snippet';
import {getWebHost} from "@/utils/fofa";


chrome.contextMenus.create({ // eslint-disable-line
    title: '新增Biu笔记：%s',
    contexts: ['selection'],
    onclick: function (params) {
        addSnippet({
            "target": "",
            "content": "```\n" + params.selectionText + "\n```",
            "source": null,
            "tags": [],
            "public": false
        })
    }
})
chrome.contextMenus.create({ // eslint-disable-line
    title: 'Biu查看资产：%s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: getBaseUrl() + '/assets/detail/' + params.selectionText}); // eslint-disable-line
    }
});
chrome.contextMenus.create({ // eslint-disable-line
    title: 'Biu搜索：%s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: getBaseUrl() + '/assets/port?keyword=' + params.selectionText}); // eslint-disable-line
    }
});
chrome.contextMenus.create({ // eslint-disable-line
    title: 'Biu资产助手搜索：%s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: getBaseUrl() + '/vis?keywords=' + params.selectionText}); // eslint-disable-line
    }
});
chrome.contextMenus.create({ // eslint-disable-line
    title: 'Fofa搜索：%s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: 'https://'+getWebHost()+'/result?q=' + params.selectionText}); // eslint-disable-line
    }
});
chrome.contextMenus.create({ // eslint-disable-line
    title: 'QAX Hunter搜索：%s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: 'https://hunter.qianxin.com/home/list?searchType=grammar&search=' + params.selectionText}); // eslint-disable-line
    }
});
chrome.contextMenus.create({ // eslint-disable-line
    title: 'Quake搜索：%s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: 'https://quake.360.cn/quake/#/searchResult?searchVal=' + params.selectionText}); // eslint-disable-line
    }
});
chrome.contextMenus.create({ // eslint-disable-line
    title: 'ZoomEye搜索：%s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: 'https://www.zoomeye.org/searchResult?q=' + params.selectionText}); // eslint-disable-line
    }
});

chrome.contextMenus.create({ // eslint-disable-line
    title: '微步IP搜索：%s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: 'https://x.threatbook.cn/v5/ip/' + params.selectionText}); // eslint-disable-line
    }
});

chrome.contextMenus.create({ // eslint-disable-line
    title: '微步域名搜索：%s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: 'https://x.threatbook.cn/v5/domain/' + params.selectionText}); // eslint-disable-line
    }
});