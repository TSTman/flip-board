/* Copyright 2022 TSTman
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// ==UserScript==
// @name         HD Wiki Board Flipper
// @namespace    HD Wiki Board Flipper
// @license      Apache 2.0
// @version      v0.0.6
// @description  Buttons to flip the stacking boards on the Hard Drop wiki
// @homepage     https://github.com/TSTman/board-flipper
// @author       TSTman
// @match        https://harddrop.com/wiki/*
// @match        https://harddrop.com/w/index.php*
// @grant        none
// @run-at       document-start
// ==/UserScript==
(() => {
	if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1) {
		boardFlipper();
	} else {
		document.addEventListener('DOMContentLoaded', boardFlipper);
	}

	function boardFlipper() {
		'use strict';

		addFlipButtons();

		function addFlipButtons() {
			document.addEventListener('keydown', (event) => event.key === 'f' && flipBoard());
			const navigationMenu = document.querySelector('div#gumax-p-navigation > ul#gumax-nav');
			const flipLink = document.createElement('a');
			flipLink.textContent = 'Flip boards';
			flipLink.href = 'javascript:';
			flipLink.title = 'Shortcut: f';
			flipLink.addEventListener('click', flipBoard);
			navigationMenu.appendChild(document.createElement('li')).appendChild(flipLink);

			const pattern = `:scope > tbody > tr > td > div > ${Array(8).fill('a.image[href^="/wiki/File:"][href$="Tet.png"]').join(' + ')}`;
			const boardTables = [...document.querySelectorAll('table')].filter(element => element.querySelector(pattern));
			boardTables.forEach(boardTable => {
					const flipWrapper = document.createElement('div');
					flipWrapper.classList.add('flip-wrapper');
					const flipButton = document.createElement('button');
					flipButton.textContent = 'Flip';
					flipButton.class = 'mw-htmlform-submit flip-button';
					flipButton.addEventListener('click', () => flipBoard(flipButton));
					boardTable.appendChild(flipWrapper).appendChild(flipButton);
				}
			);
		}

		const minoProperties = {
			//"1": {"reverse": "1", "attributes": {"a": {"title": "1", "href": "/wiki/File:1Tet.png"}, "img": {"alt": "1", "src": "/w/images/9/9f/1Tet.png"}}},
			//"2": {"reverse": "2", "attributes": {"a": {"title": "2", "href": "/wiki/File:2Tet.png"}, "img": {"alt": "2", "src": "/w/images/4/4f/2Tet.png"}}},
			//"3": {"reverse": "3", "attributes": {"a": {"title": "3", "href": "/wiki/File:3Tet.png"}, "img": {"alt": "3", "src": "/w/images/0/08/3Tet.png"}}},
			//"4": {"reverse": "4", "attributes": {"a": {"title": "4", "href": "/wiki/File:4Tet.png"}, "img": {"alt": "4", "src": "/w/images/0/0d/4Tet.png"}}},
			//"5": {"reverse": "5", "attributes": {"a": {"title": "5", "href": "/wiki/File:5Tet.png"}, "img": {"alt": "5", "src": "/w/images/9/93/5Tet.png"}}},
			//"6": {"reverse": "6", "attributes": {"a": {"title": "6", "href": "/wiki/File:6Tet.png"}, "img": {"alt": "6", "src": "/w/images/e/e7/6Tet.png"}}},
			//"7": {"reverse": "7", "attributes": {"a": {"title": "7", "href": "/wiki/File:7Tet.png"}, "img": {"alt": "7", "src": "/w/images/c/cd/7Tet.png"}}},
			//"8": {"reverse": "8", "attributes": {"a": {"title": "8", "href": "/wiki/File:8Tet.png"}, "img": {"alt": "8", "src": "/w/images/e/e6/8Tet.png"}}},
			//"9": {"reverse": "9", "attributes": {"a": {"title": "9", "href": "/wiki/File:9Tet.png"}, "img": {"alt": "9", "src": "/w/images/c/c8/9Tet.png"}}},
			"11": {"reverse": "72",
				"attributes": {
					"a": {"title": "11", "href": "/wiki/File:11Tet.png"},
					"img": {"alt": "11", "src": "/w/images/9/95/11Tet.png"}
				}
			},
			"12": {"reverse": "71",
				"attributes": {
					"a": {"title": "12", "href": "/wiki/File:12Tet.png"},
					"img": {"alt": "12", "src": "/w/images/c/cd/12Tet.png"}
				}
			},
			"13": {"reverse": "74",
				"attributes": {
					"a": {"title": "13", "href": "/wiki/File:13Tet.png"},
					"img": {"alt": "13", "src": "/w/images/e/ec/13Tet.png"}
				}
			},
			"14": {"reverse": "73",
				"attributes": {
					"a": {"title": "14", "href": "/wiki/File:14Tet.png"},
					"img": {"alt": "14", "src": "/w/images/0/04/14Tet.png"}
				}
			},
			"21": {"reverse": "52",
				"attributes": {
					"a": {"title": "21", "href": "/wiki/File:21Tet.png"},
					"img": {"alt": "21", "src": "/w/images/2/22/21Tet.png"}
				}
			},
			"22": {"reverse": "51",
				"attributes": {
					"a": {"title": "22", "href": "/wiki/File:22Tet.png"},
					"img": {"alt": "22", "src": "/w/images/4/41/22Tet.png"}
				}
			},
			"23": {"reverse": "54",
				"attributes": {
					"a": {"title": "23", "href": "/wiki/File:23Tet.png"},
					"img": {"alt": "23", "src": "/w/images/e/e2/23Tet.png"}
				}
			},
			"24": {"reverse": "53",
				"attributes": {
					"a": {"title": "24", "href": "/wiki/File:24Tet.png"},
					"img": {"alt": "24", "src": "/w/images/6/67/24Tet.png"}
				}
			},
			//"31": {"reverse": "31", "attributes": {"a": {"title": "31", "href": "/wiki/File:31Tet.png"}, "img": {"alt": "31", "src": "/w/images/0/06/31Tet.png"}}},
			//"32": {"reverse": "32", "attributes": {"a": {"title": "32", "href": "/wiki/File:32Tet.png"}, "img": {"alt": "32", "src": "/w/images/7/7c/32Tet.png"}}},
			//"33": {"reverse": "33", "attributes": {"a": {"title": "33", "href": "/wiki/File:33Tet.png"}, "img": {"alt": "33", "src": "/w/images/c/c8/33Tet.png"}}},
			//"34": {"reverse": "34", "attributes": {"a": {"title": "34", "href": "/wiki/File:34Tet.png"}, "img": {"alt": "34", "src": "/w/images/8/8f/34Tet.png"}}},
			"51": {"reverse": "22",
				"attributes": {
					"a": {"title": "51", "href": "/wiki/File:51Tet.png"},
					"img": {"alt": "51", "src": "/w/images/e/ec/51Tet.png"}
				}
			},
			"52": {"reverse": "21",
				"attributes": {
					"a": {"title": "52", "href": "/wiki/File:52Tet.png"},
					"img": {"alt": "52", "src": "/w/images/d/d6/52Tet.png"}
				}
			},
			"53": {"reverse": "24",
				"attributes": {
					"a": {"title": "53", "href": "/wiki/File:53Tet.png"},
					"img": {"alt": "53", "src": "/w/images/7/79/53Tet.png"}
				}
			},
			"54": {"reverse": "23",
				"attributes": {
					"a": {"title": "54", "href": "/wiki/File:54Tet.png"},
					"img": {"alt": "54", "src": "/w/images/4/46/54Tet.png"}
				}
			},
			"71": {"reverse": "12",
				"attributes": {
					"a": {"title": "71", "href": "/wiki/File:71Tet.png"},
					"img": {"alt": "71", "src": "/w/images/3/3b/71Tet.png"}
				}
			},
			"72": {"reverse": "11",
				"attributes": {
					"a": {"title": "72", "href": "/wiki/File:72Tet.png"},
					"img": {"alt": "72", "src": "/w/images/5/5e/72Tet.png"}
				}
			},
			"73": {"reverse": "14",
				"attributes": {
					"a": {"title": "73", "href": "/wiki/File:73Tet.png"},
					"img": {"alt": "73", "src": "/w/images/1/15/73Tet.png"}
				}
			},
			"74": {"reverse": "13",
				"attributes": {
					"a": {"title": "74", "href": "/wiki/File:74Tet.png"},
					"img": {"alt": "74", "src": "/w/images/3/34/74Tet.png"}
				}
			},
			//"!1": {"reverse": "!1", "attributes": {"a": {"title": "!1", "href": "/wiki/File:!1Tet.png"}, "img": {"alt": "!1", "src": "/w/images/9/9b/%211Tet.png"}}},
			//"!2": {"reverse": "!2", "attributes": {"a": {"title": "!2", "href": "/wiki/File:!2Tet.png"}, "img": {"alt": "!2", "src": "/w/images/5/5f/%212Tet.png"}}},
			//"!3": {"reverse": "!3", "attributes": {"a": {"title": "!3", "href": "/wiki/File:!3Tet.png"}, "img": {"alt": "!3", "src": "/w/images/c/ce/%213Tet.png"}}},
			//"!4": {"reverse": "!4", "attributes": {"a": {"title": "!4", "href": "/wiki/File:!4Tet.png"}, "img": {"alt": "!4", "src": "/w/images/d/df/%214Tet.png"}}},
			//"01": {"reverse": "01", "attributes": {"a": {"title": "01", "href": "/wiki/File:01Tet.png"}, "img": {"alt": "01", "src": "/w/images/b/b0/01Tet.png"}}},
			//"02": {"reverse": "02", "attributes": {"a": {"title": "02", "href": "/wiki/File:02Tet.png"}, "img": {"alt": "02", "src": "/w/images/b/b2/02Tet.png"}}},
			//"03": {"reverse": "03", "attributes": {"a": {"title": "03", "href": "/wiki/File:03Tet.png"}, "img": {"alt": "03", "src": "/w/images/9/93/03Tet.png"}}},
			//"04": {"reverse": "04", "attributes": {"a": {"title": "04", "href": "/wiki/File:04Tet.png"}, "img": {"alt": "04", "src": "/w/images/c/c5/04Tet.png"}}},
			"S1": {"reverse": "Z2",
				"attributes": {
					"a": {"title": "S1", "href": "/wiki/File:S1Tet.png"},
					"img": {"alt": "S1", "src": "/w/images/5/55/S1Tet.png"}
				}
			},
			"S2": {"reverse": "Z1",
				"attributes": {
					"a": {"title": "S2", "href": "/wiki/File:S2Tet.png"},
					"img": {"alt": "S2", "src": "/w/images/4/47/S2Tet.png"}
				}
			},
			"S3": {"reverse": "Z4",
				"attributes": {
					"a": {"title": "S3", "href": "/wiki/File:S3Tet.png"},
					"img": {"alt": "S3", "src": "/w/images/6/66/S3Tet.png"}
				}
			},
			"S4": {"reverse": "Z3",
				"attributes": {
					"a": {"title": "S4", "href": "/wiki/File:S4Tet.png"},
					"img": {"alt": "S4", "src": "/w/images/8/8d/S4Tet.png"}
				}
			},
			"Z1": {"reverse": "S2",
				"attributes": {
					"a": {"title": "Z1", "href": "/wiki/File:Z1Tet.png"},
					"img": {"alt": "Z1", "src": "/w/images/c/c1/Z1Tet.png"}
				}
			},
			"Z2": {"reverse": "S1",
				"attributes": {
					"a": {"title": "Z2", "href": "/wiki/File:Z2Tet.png"},
					"img": {"alt": "Z2", "src": "/w/images/8/8f/Z2Tet.png"}
				}
			},
			"Z3": {"reverse": "S4",
				"attributes": {
					"a": {"title": "Z3", "href": "/wiki/File:Z3Tet.png"},
					"img": {"alt": "Z3", "src": "/w/images/6/62/Z3Tet.png"}
				}
			},
			"Z4": {"reverse": "S3",
				"attributes": {
					"a": {"title": "Z4", "href": "/wiki/File:Z4Tet.png"},
					"img": {"alt": "Z4", "src": "/w/images/b/b1/Z4Tet.png"}
				}
			},
			"J1": {"reverse": "L2",
				"attributes": {
					"a": {"title": "J1", "href": "/wiki/File:J1Tet.png"},
					"img": {"alt": "J1", "src": "/w/images/1/1a/J1Tet.png"}
				}
			},
			"J2": {"reverse": "L1",
				"attributes": {
					"a": {"title": "J2", "href": "/wiki/File:J2Tet.png"},
					"img": {"alt": "J2", "src": "/w/images/7/7b/J2Tet.png"}
				}
			},
			"J3": {"reverse": "L4",
				"attributes": {
					"a": {"title": "J3", "href": "/wiki/File:J3Tet.png"},
					"img": {"alt": "J3", "src": "/w/images/7/7d/J3Tet.png"}
				}
			},
			"J4": {"reverse": "L3",
				"attributes": {
					"a": {"title": "J4", "href": "/wiki/File:J4Tet.png"},
					"img": {"alt": "J4", "src": "/w/images/b/b0/J4Tet.png"}
				}
			},
			"L1": {"reverse": "J2",
				"attributes": {
					"a": {"title": "L1", "href": "/wiki/File:L1Tet.png"},
					"img": {"alt": "L1", "src": "/w/images/1/1d/L1Tet.png"}
				}
			},
			"L2": {"reverse": "J1",
				"attributes": {
					"a": {"title": "L2", "href": "/wiki/File:L2Tet.png"},
					"img": {"alt": "L2", "src": "/w/images/c/c4/L2Tet.png"}
				}
			},
			"L3": {"reverse": "J4",
				"attributes": {
					"a": {"title": "L3", "href": "/wiki/File:L3Tet.png"},
					"img": {"alt": "L3", "src": "/w/images/4/4b/L3Tet.png"}
				}
			},
			"L4": {"reverse": "J3",
				"attributes": {
					"a": {"title": "L4", "href": "/wiki/File:L4Tet.png"},
					"img": {"alt": "L4", "src": "/w/images/1/12/L4Tet.png"}
				}
			},
			//"O1": {"reverse": "O1", "attributes": {"a": {"title": "O1", "href": "/wiki/File:O1Tet.png"}, "img": {"alt": "O1", "src": "/w/images/d/df/O1Tet.png"}}},
			//"O2": {"reverse": "O2", "attributes": {"a": {"title": "O2", "href": "/wiki/File:O2Tet.png"}, "img": {"alt": "O2", "src": "/w/images/7/71/O2Tet.png"}}},
			//"O3": {"reverse": "O3", "attributes": {"a": {"title": "O3", "href": "/wiki/File:O3Tet.png"}, "img": {"alt": "O3", "src": "/w/images/b/b3/O3Tet.png"}}},
			//"O4": {"reverse": "O4", "attributes": {"a": {"title": "O4", "href": "/wiki/File:O4Tet.png"}, "img": {"alt": "O4", "src": "/w/images/4/49/O4Tet.png"}}},
			//"I1": {"reverse": "I1", "attributes": {"a": {"title": "I1", "href": "/wiki/File:I1Tet.png"}, "img": {"alt": "I1", "src": "/w/images/8/88/I1Tet.png"}}},
			//"I2": {"reverse": "I2", "attributes": {"a": {"title": "I2", "href": "/wiki/File:I2Tet.png"}, "img": {"alt": "I2", "src": "/w/images/f/f7/I2Tet.png"}}},
			//"I3": {"reverse": "I3", "attributes": {"a": {"title": "I3", "href": "/wiki/File:I3Tet.png"}, "img": {"alt": "I3", "src": "/w/images/0/04/I3Tet.png"}}},
			//"I4": {"reverse": "I4", "attributes": {"a": {"title": "I4", "href": "/wiki/File:I4Tet.png"}, "img": {"alt": "I4", "src": "/w/images/7/73/I4Tet.png"}}},
			//"T1": {"reverse": "T1", "attributes": {"a": {"title": "T1", "href": "/wiki/File:T1Tet.png"}, "img": {"alt": "T1", "src": "/w/images/a/a8/T1Tet.png"}}},
			//"T2": {"reverse": "T2", "attributes": {"a": {"title": "T2", "href": "/wiki/File:T2Tet.png"}, "img": {"alt": "T2", "src": "/w/images/e/ef/T2Tet.png"}}},
			//"T3": {"reverse": "T3", "attributes": {"a": {"title": "T3", "href": "/wiki/File:T3Tet.png"}, "img": {"alt": "T3", "src": "/w/images/a/a0/T3Tet.png"}}},
			//"T4": {"reverse": "T4", "attributes": {"a": {"title": "T4", "href": "/wiki/File:T4Tet.png"}, "img": {"alt": "T4", "src": "/w/images/c/cf/T4Tet.png"}}},
			//"W1": {"reverse": "W1", "attributes": {"a": {"title": "W1", "href": "/wiki/File:W1Tet.png"}, "img": {"alt": "W1", "src": "/w/images/c/c5/W1Tet.png"}}},
			//"W2": {"reverse": "W2", "attributes": {"a": {"title": "W2", "href": "/wiki/File:W2Tet.png"}, "img": {"alt": "W2", "src": "/w/images/1/1e/W2Tet.png"}}},
			//"W3": {"reverse": "W3", "attributes": {"a": {"title": "W3", "href": "/wiki/File:W3Tet.png"}, "img": {"alt": "W3", "src": "/w/images/5/50/W3Tet.png"}}},
			//"W4": {"reverse": "W4", "attributes": {"a": {"title": "W4", "href": "/wiki/File:W4Tet.png"}, "img": {"alt": "W4", "src": "/w/images/8/8b/W4Tet.png"}}},
			//"G1": {"reverse": "G1", "attributes": {"a": {"title": "G1", "href": "/wiki/File:G1Tet.png"}, "img": {"alt": "G1", "src": "/w/images/2/29/G1Tet.png"}}},
			//"G2": {"reverse": "G2", "attributes": {"a": {"title": "G2", "href": "/wiki/File:G2Tet.png"}, "img": {"alt": "G2", "src": "/w/images/8/83/G2Tet.png"}}},
			//"G3": {"reverse": "G3", "attributes": {"a": {"title": "G3", "href": "/wiki/File:G3Tet.png"}, "img": {"alt": "G3", "src": "/w/images/e/e1/G3Tet.png"}}},
			//"G4": {"reverse": "G4", "attributes": {"a": {"title": "G4", "href": "/wiki/File:G4Tet.png"}, "img": {"alt": "G4", "src": "/w/images/b/ba/G4Tet.png"}}},
			//"Tet.png": {"reverse": "Tet.png", "attributes": {"a": {"title": "", "href": "/wiki/File:Tet.png"}, "img": {"alt": "Tet.png", "src": "/w/images/1/18/Tet.png"}}},
			"J": {"reverse": "L",
				"attributes": {
					"a": {"title": "J", "href": "/wiki/File:JTet.png"},
					"img": {"alt": "J", "src": "/w/images/8/85/JTet.png"}
				}
			},
			//"-": {"reverse": "-", "attributes": {"a": {"title": "-", "href": "/wiki/File:-Tet.png"}, "img": {"alt": "-", "src": "/w/images/3/38/-Tet.png"}}},
			//"i": {"reverse": "i", "attributes": {"a": {"title": "i", "href": "/wiki/File:ITet.png"}, "img": {"alt": "i", "src": "/w/images/1/19/ITet.png"}}},
			"Z": {"reverse": "S",
				"attributes": {
					"a": {"title": "Z", "href": "/wiki/File:ZTet.png"},
					"img": {"alt": "Z", "src": "/w/images/c/c6/ZTet.png"}
				}
			},
			"S": {"reverse": "Z",
				"attributes": {
					"a": {"title": "S", "href": "/wiki/File:STet.png"},
					"img": {"alt": "S", "src": "/w/images/b/bc/STet.png"}
				}
			},
			"L": {"reverse": "J",
				"attributes": {
					"a": {"title": "L", "href": "/wiki/File:LTet.png"},
					"img": {"alt": "L", "src": "/w/images/5/51/LTet.png"}
				}
			},
			//"O": {"reverse": "O", "attributes": {"a": {"title": "O", "href": "/wiki/File:OTet.png"}, "img": {"alt": "O", "src": "/w/images/2/20/OTet.png"}}},
			//"T": {"reverse": "T", "attributes": {"a": {"title": "T", "href": "/wiki/File:TTet.png"}, "img": {"alt": "T", "src": "/w/images/2/20/TTet.png"}}},
			//"G": {"reverse": "G", "attributes": {"a": {"title": "G", "href": "/wiki/File:GTet.png"}, "img": {"alt": "G", "src": "/w/images/8/88/GTet.png"}}},
			//"I": {"reverse": "I", "attributes": {"a": {"title": "I", "href": "/wiki/File:ITet.png"}, "img": {"alt": "I", "src": "/w/images/1/19/ITet.png"}}},
			//"k": {"reverse": "k", "attributes": {"a": {"title": "k", "href": "/wiki/File:KTet.png"}, "img": {"alt": "k", "src": "/w/images/5/56/KTet.png"}}},
			//"YH": {"reverse": "YH", "attributes": {"a": {"title": "YH", "href": "/wiki/File:YHTet.png"}, "img": {"alt": "YH", "src": "/w/images/d/d7/YHTet.png"}}},
			//"YO": {"reverse": "YO", "attributes": {"a": {"title": "YO", "href": "/wiki/File:YOTet.png"}, "img": {"alt": "YO", "src": "/w/images/5/51/YOTet.png"}}},
			//"YL": {"reverse": "YL", "attributes": {"a": {"title": "YL", "href": "/wiki/File:YLTet.png"}, "img": {"alt": "YL", "src": "/w/images/b/bb/YLTet.png"}}},
			//"YD": {"reverse": "YD", "attributes": {"a": {"title": "YD", "href": "/wiki/File:YDTet.png"}, "img": {"alt": "YD", "src": "/w/images/c/ce/YDTet.png"}}},
			//"Y": {"reverse": "Y", "attributes": {"a": {"title": "Y", "href": "/wiki/File:YTet.png"}, "img": {"alt": "Y", "src": "/w/images/a/a0/YTet.png"}}},
			//"YN": {"reverse": "YN", "attributes": {"a": {"title": "YN", "href": "/wiki/File:YNTet.png"}, "img": {"alt": "YN", "src": "/w/images/f/f4/YNTet.png"}}},
			//"YE": {"reverse": "YE", "attributes": {"a": {"title": "YE", "href": "/wiki/File:YETet.png"}, "img": {"alt": "YE", "src": "/w/images/e/ec/YETet.png"}}},
			//"YX": {"reverse": "YX", "attributes": {"a": {"title": "YX", "href": "/wiki/File:YXTet.png"}, "img": {"alt": "YX", "src": "/w/images/a/a5/YXTet.png"}}},
			//"YT": {"reverse": "YT", "attributes": {"a": {"title": "YT", "href": "/wiki/File:YTTet.png"}, "img": {"alt": "YT", "src": "/w/images/3/3d/YTTet.png"}}},
			//"C": {"reverse": "C", "attributes": {"a": {"title": "C", "href": "/wiki/File:CTet.png"}, "img": {"alt": "C", "src": "/w/images/4/42/CTet.png"}}},
			//"B": {"reverse": "B", "attributes": {"a": {"title": "B", "href": "/wiki/File:BTet.png"}, "img": {"alt": "B", "src": "/w/images/6/6d/BTet.png"}}},
			//"X": {"reverse": "X", "attributes": {"a": {"title": "X", "href": "/wiki/File:XTet.png"}, "img": {"alt": "X", "src": "/w/images/0/04/XTet.png"}}},
			"M": {"reverse": "R",
				"attributes": {
					"a": {"title": "M", "href": "/wiki/File:MTet.png"},
					"img": {"alt": "M", "src": "/w/images/f/f3/MTet.png"}
				}
			},
			"R": {"reverse": "M",
				"attributes": {
					"a": {"title": "R", "href": "/wiki/File:RTet.png"},
					"img": {"alt": "R", "src": "/w/images/1/12/RTet.png"}
				}
			},
			"A": {"reverse": "E",
				"attributes": {
					"a": {"title": "A", "href": "/wiki/File:ATet.png"},
					"img": {"alt": "A", "src": "/w/images/5/51/ATet.png"}
				}
			},
			"E": {"reverse": "A",
				"attributes": {
					"a": {"title": "E", "href": "/wiki/File:ETet.png"},
					"img": {"alt": "E", "src": "/w/images/2/2d/ETet.png"}
				}
			},
			//"D": {"reverse": "D", "attributes": {"a": {"title": "D", "href": "/wiki/File:DTet.png"}, "img": {"alt": "D", "src": "/w/images/3/3e/DTet.png"}}},
			//"H": {"reverse": "H", "attributes": {"a": {"title": "H", "href": "/wiki/File:HTet.png"}, "img": {"alt": "H", "src": "/w/images/e/ed/HTet.png"}}},
			//"U": {"reverse": "U", "attributes": {"a": {"title": "U", "href": "/wiki/File:UTet.png"}, "img": {"alt": "U", "src": "/w/images/3/37/UTet.png"}}},
			"'": {"reverse": "+",
				"attributes": {
					"a": {"title": "'", "href": "/wiki/File:%27Tet.png"},
					"img": {"alt": "'", "src": "/w/images/5/5d/%27Tet.png"}
				}
			},
			"V": {"reverse": "N",
				"attributes": {
					"a": {"title": "V", "href": "/wiki/File:VTet.png"},
					"img": {"alt": "V", "src": "/w/images/a/ab/VTet.png"}
				}
			},
			"+": {"reverse": "'",
				"attributes": {
					"a": {"title": "+", "href": "/wiki/File:%2BTet.png"},
					"img": {"alt": "+", "src": "/w/images/a/a9/%2BTet.png"}
				}
			},
			//"F": {"reverse": "F", "attributes": {"a": {"title": "F", "href": "/wiki/File:FTet.png"}, "img": {"alt": "F", "src": "/w/images/b/b5/FTet.png"}}},
			"N": {"reverse": "V",
				"attributes": {
					"a": {"title": "N", "href": "/wiki/File:NTet.png"},
					"img": {"alt": "N", "src": "/w/images/f/f2/NTet.png"}
				}
			},
			//"P": {"reverse": "P", "attributes": {"a": {"title": "P", "href": "/wiki/File:PTet.png"}, "img": {"alt": "P", "src": "/w/images/9/9a/PTet.png"}}},
			//"K": {"reverse": "K", "attributes": {"a": {"title": "K", "href": "/wiki/File:KTet.png"}, "img": {"alt": "K", "src": "/w/images/5/56/KTet.png"}}},
			//"W": {"reverse": "W", "attributes": {"a": {"title": "W", "href": "/wiki/File:WTet.png"}, "img": {"alt": "W", "src": "/w/images/2/28/WTet.png"}}},
			//"Q": {"reverse": "Q", "attributes": {"a": {"title": "Q", "href": "/wiki/File:QTet.png"}, "img": {"alt": "Q", "src": "/w/images/c/cb/QTet.png"}}},
			//"B0": {"reverse": "B0", "attributes": {"a": {"title": "B0", "href": "/wiki/File:B0Tet.png"}, "img": {"alt": "B0", "src": "/w/images/c/c3/B0Tet.png"}}},
			//"B1": {"reverse": "B1", "attributes": {"a": {"title": "B1", "href": "/wiki/File:B1Tet.png"}, "img": {"alt": "B1", "src": "/w/images/0/06/B1Tet.png"}}},
			//"B2": {"reverse": "B2", "attributes": {"a": {"title": "B2", "href": "/wiki/File:B2Tet.png"}, "img": {"alt": "B2", "src": "/w/images/0/07/B2Tet.png"}}},
			//"B3": {"reverse": "B3", "attributes": {"a": {"title": "B3", "href": "/wiki/File:B3Tet.png"}, "img": {"alt": "B3", "src": "/w/images/a/a4/B3Tet.png"}}},
			//"B4": {"reverse": "B4", "attributes": {"a": {"title": "B4", "href": "/wiki/File:B4Tet.png"}, "img": {"alt": "B4", "src": "/w/images/3/33/B4Tet.png"}}},
			//"B5": {"reverse": "B5", "attributes": {"a": {"title": "B5", "href": "/wiki/File:B5Tet.png"}, "img": {"alt": "B5", "src": "/w/images/4/44/B5Tet.png"}}},
			//"B6": {"reverse": "B6", "attributes": {"a": {"title": "B6", "href": "/wiki/File:B6Tet.png"}, "img": {"alt": "B6", "src": "/w/images/0/05/B6Tet.png"}}},
			//"B7": {"reverse": "B7", "attributes": {"a": {"title": "B7", "href": "/wiki/File:B7Tet.png"}, "img": {"alt": "B7", "src": "/w/images/9/9d/B7Tet.png"}}},
			//"B8": {"reverse": "B8", "attributes": {"a": {"title": "B8", "href": "/wiki/File:B8Tet.png"}, "img": {"alt": "B8", "src": "/w/images/7/7b/B8Tet.png"}}},
			//"B9": {"reverse": "B9", "attributes": {"a": {"title": "B9", "href": "/wiki/File:B9Tet.png"}, "img": {"alt": "B9", "src": "/w/images/d/d2/B9Tet.png"}}},
			"-Z": {"reverse": "-S",
				"attributes": {
					"a": {"title": "-Z", "href": "/wiki/File:-ZTet.png"},
					"img": {"alt": "-Z", "src": "/w/images/6/67/-ZTet.png"}
				}
			},
			"-L": {"reverse": "-J",
				"attributes": {
					"a": {"title": "-L", "href": "/wiki/File:-LTet.png"},
					"img": {"alt": "-L", "src": "/w/images/a/ae/-LTet.png"}
				}
			},
			//"-O": {"reverse": "-O", "attributes": {"a": {"title": "-O", "href": "/wiki/File:-OTet.png"}, "img": {"alt": "-O", "src": "/w/images/b/bc/-OTet.png"}}},
			"-S": {"reverse": "-Z",
				"attributes": {
					"a": {"title": "-S", "href": "/wiki/File:-STet.png"},
					"img": {"alt": "-S", "src": "/w/images/7/72/-STet.png"}
				}
			},
			//"-I": {"reverse": "-I", "attributes": {"a": {"title": "-I", "href": "/wiki/File:-ITet.png"}, "img": {"alt": "-I", "src": "/w/images/0/0f/-ITet.png"}}},
			"-J": {"reverse": "-L",
				"attributes": {
					"a": {"title": "-J", "href": "/wiki/File:-JTet.png"},
					"img": {"alt": "-J", "src": "/w/images/f/f3/-JTet.png"}
				}
			},
			//"-T": {"reverse": "-T", "attributes": {"a": {"title": "-T", "href": "/wiki/File:-TTet.png"}, "img": {"alt": "-T", "src": "/w/images/6/6f/-TTet.png"}}},
			//"B-": {"reverse": "B-", "attributes": {"a": {"title": "B-", "href": "/wiki/File:B-Tet.png"}, "img": {"alt": "B-", "src": "/w/images/f/fb/B-Tet.png"}}},
			"LZ": {"reverse": "LS",
				"attributes": {
					"a": {"title": "LZ", "href": "/wiki/File:LZTet.png"},
					"img": {"alt": "LZ", "src": "/w/images/7/79/LZTet.png"}
				}
			},
			"LL": {"reverse": "LJ",
				"attributes": {
					"a": {"title": "LL", "href": "/wiki/File:LLTet.png"},
					"img": {"alt": "LL", "src": "/w/images/8/87/LLTet.png"}
				}
			},
			//"LO": {"reverse": "LO", "attributes": {"a": {"title": "LO", "href": "/wiki/File:LOTet.png"}, "img": {"alt": "LO", "src": "/w/images/e/e5/LOTet.png"}}},
			"LS": {"reverse": "LZ",
				"attributes": {
					"a": {"title": "LS", "href": "/wiki/File:LSTet.png"},
					"img": {"alt": "LS", "src": "/w/images/a/ad/LSTet.png"}
				}
			},
			//"LI": {"reverse": "LI", "attributes": {"a": {"title": "LI", "href": "/wiki/File:LITet.png"}, "img": {"alt": "LI", "src": "/w/images/0/0d/LITet.png"}}},
			"LJ": {"reverse": "LL",
				"attributes": {
					"a": {"title": "LJ", "href": "/wiki/File:LJTet.png"},
					"img": {"alt": "LJ", "src": "/w/images/8/83/LJTet.png"}
				}
			},
			//"LT": {"reverse": "LT", "attributes": {"a": {"title": "LT", "href": "/wiki/File:LTTet.png"}, "img": {"alt": "LT", "src": "/w/images/d/df/LTTet.png"}}},
			"-'": {"reverse": "-+",
				"attributes": {
					"a": {"title": "-'", "href": "/wiki/File:-%27Tet.png"},
					"img": {"alt": "-'", "src": "/w/images/9/94/-%27Tet.png"}
				}
			},
			"-V": {"reverse": "-N",
				"attributes": {
					"a": {"title": "-V", "href": "/wiki/File:-VTet.png"},
					"img": {"alt": "-V", "src": "/w/images/d/dd/-VTet.png"}
				}
			},
			//"-Y": {"reverse": "-Y", "attributes": {"a": {"title": "-Y", "href": "/wiki/File:-YTet.png"}, "img": {"alt": "-Y", "src": "/w/images/1/1e/-YTet.png"}}},
			"-+": {"reverse": "-'",
				"attributes": {
					"a": {"title": "-+", "href": "/wiki/File:-%2BTet.png"},
					"img": {"alt": "-+", "src": "/w/images/f/fc/-%2BTet.png"}
				}
			},
			//"-F": {"reverse": "-F", "attributes": {"a": {"title": "-F", "href": "/wiki/File:-FTet.png"}, "img": {"alt": "-F", "src": "/w/images/3/30/-FTet.png"}}},
			"-N": {"reverse": "-V",
				"attributes": {
					"a": {"title": "-N", "href": "/wiki/File:-NTet.png"},
					"img": {"alt": "-N", "src": "/w/images/0/05/-NTet.png"}
				}
			},
			//"-P": {"reverse": "-P", "attributes": {"a": {"title": "-P", "href": "/wiki/File:-PTet.png"}, "img": {"alt": "-P", "src": "/w/images/0/08/-PTet.png"}}},
			//"-G": {"reverse": "-G", "attributes": {"a": {"title": "-G", "href": "/wiki/File:-GTet.png"}, "img": {"alt": "-G", "src": "/w/images/4/4c/-GTet.png"}}},
			"+Z": {"reverse": "+S",
				"attributes": {
					"a": {"title": "+Z", "href": "/wiki/File:%2BZTet.png"},
					"img": {"alt": "+Z", "src": "/w/images/9/9d/%2BZTet.png"}
				}
			},
			"+L": {"reverse": "+J",
				"attributes": {
					"a": {"title": "+L", "href": "/wiki/File:%2BLTet.png"},
					"img": {"alt": "+L", "src": "/w/images/4/4c/%2BLTet.png"}
				}
			},
			//"+O": {"reverse": "+O", "attributes": {"a": {"title": "+O", "href": "/wiki/File:%2BOTet.png"}, "img": {"alt": "+O", "src": "/w/images/0/0d/%2BOTet.png"}}},
			"+S": {"reverse": "+Z",
				"attributes": {
					"a": {"title": "+S", "href": "/wiki/File:%2BSTet.png"},
					"img": {"alt": "+S", "src": "/w/images/9/9c/%2BSTet.png"}
				}
			},
			//"+I": {"reverse": "+I", "attributes": {"a": {"title": "+I", "href": "/wiki/File:%2BITet.png"}, "img": {"alt": "+I", "src": "/w/images/3/30/%2BITet.png"}}},
			"+J": {"reverse": "+L",
				"attributes": {
					"a": {"title": "+J", "href": "/wiki/File:%2BJTet.png"},
					"img": {"alt": "+J", "src": "/w/images/8/8e/%2BJTet.png"}
				}
			},
			//"+T": {"reverse": "+T", "attributes": {"a": {"title": "+T", "href": "/wiki/File:%2BTTet.png"}, "img": {"alt": "+T", "src": "/w/images/a/a7/%2BTTet.png"}}},
			//"+G": {"reverse": "+G", "attributes": {"a": {"title": "+G", "href": "/wiki/File:%2BGTet.png"}, "img": {"alt": "+G", "src": "/w/images/5/5d/%2BGTet.png"}}},
			//"+W": {"reverse": "+W", "attributes": {"a": {"title": "+W", "href": "/wiki/File:%2BWTet.png"}, "img": {"alt": "+W", "src": "/w/images/d/d2/%2BWTet.png"}}},
			"!Z": {"reverse": "!S",
				"attributes": {
					"a": {"title": "!Z", "href": "/wiki/File:!ZTet.png"},
					"img": {"alt": "!Z", "src": "/w/images/2/29/%21ZTet.png"}
				}
			},
			"!L": {"reverse": "!J",
				"attributes": {
					"a": {"title": "!L", "href": "/wiki/File:!LTet.png"},
					"img": {"alt": "!L", "src": "/w/images/5/5e/%21LTet.png"}
				}
			},
			//"!O": {"reverse": "!O", "attributes": {"a": {"title": "!O", "href": "/wiki/File:!OTet.png"}, "img": {"alt": "!O", "src": "/w/images/c/c6/%21OTet.png"}}},
			"!S": {"reverse": "!Z",
				"attributes": {
					"a": {"title": "!S", "href": "/wiki/File:!STet.png"},
					"img": {"alt": "!S", "src": "/w/images/b/b1/%21STet.png"}
				}
			},
			//"!I": {"reverse": "!I", "attributes": {"a": {"title": "!I", "href": "/wiki/File:!ITet.png"}, "img": {"alt": "!I", "src": "/w/images/5/5f/%21ITet.png"}}},
			"!J": {"reverse": "!L",
				"attributes": {
					"a": {"title": "!J", "href": "/wiki/File:!JTet.png"},
					"img": {"alt": "!J", "src": "/w/images/4/44/%21JTet.png"}
				}
			},
			//"!T": {"reverse": "!T", "attributes": {"a": {"title": "!T", "href": "/wiki/File:!TTet.png"}, "img": {"alt": "!T", "src": "/w/images/f/ff/%21TTet.png"}}},
			"SZ": {"reverse": "SS",
				"attributes": {
					"a": {"title": "SZ", "href": "/wiki/File:SZTet.png"},
					"img": {"alt": "SZ", "src": "/w/images/2/28/SZTet.png"}
				}
			},
			"SL": {"reverse": "SJ",
				"attributes": {
					"a": {"title": "SL", "href": "/wiki/File:SLTet.png"},
					"img": {"alt": "SL", "src": "/w/images/7/71/SLTet.png"}
				}
			},
			//"SO": {"reverse": "SO", "attributes": {"a": {"title": "SO", "href": "/wiki/File:SOTet.png"}, "img": {"alt": "SO", "src": "/w/images/4/4c/SOTet.png"}}},
			"SS": {"reverse": "SZ",
				"attributes": {
					"a": {"title": "SS", "href": "/wiki/File:SSTet.png"},
					"img": {"alt": "SS", "src": "/w/images/0/00/SSTet.png"}
				}
			},
			//"SI": {"reverse": "SI", "attributes": {"a": {"title": "SI", "href": "/wiki/File:SITet.png"}, "img": {"alt": "SI", "src": "/w/images/d/d0/SITet.png"}}},
			"SJ": {"reverse": "SL",
				"attributes": {
					"a": {"title": "SJ", "href": "/wiki/File:SJTet.png"},
					"img": {"alt": "SJ", "src": "/w/images/e/e7/SJTet.png"}
				}
			},
			//"ST": {"reverse": "ST", "attributes": {"a": {"title": "ST", "href": "/wiki/File:STTet.png"}, "img": {"alt": "ST", "src": "/w/images/0/0a/STTet.png"}}},
			//"SG": {"reverse": "SG", "attributes": {"a": {"title": "SG", "href": "/wiki/File:SGTet.png"}, "img": {"alt": "SG", "src": "/w/images/4/49/SGTet.png"}}},
			"AZ": {"reverse": "AS",
				"attributes": {
					"a": {"title": "AZ", "href": "/wiki/File:AZTet.png"},
					"img": {"alt": "AZ", "src": "/w/images/d/d0/AZTet.png"}
				}
			},
			"AL": {"reverse": "AJ",
				"attributes": {
					"a": {"title": "AL", "href": "/wiki/File:ALTet.png"},
					"img": {"alt": "AL", "src": "/w/images/1/16/ALTet.png"}
				}
			},
			//"AO": {"reverse": "AO", "attributes": {"a": {"title": "AO", "href": "/wiki/File:AOTet.png"}, "img": {"alt": "AO", "src": "/w/images/a/a1/AOTet.png"}}},
			"AS": {"reverse": "AZ",
				"attributes": {
					"a": {"title": "AS", "href": "/wiki/File:ASTet.png"},
					"img": {"alt": "AS", "src": "/w/images/b/bb/ASTet.png"}
				}
			},
			//"AI": {"reverse": "AI", "attributes": {"a": {"title": "AI", "href": "/wiki/File:AITet.png"}, "img": {"alt": "AI", "src": "/w/images/6/64/AITet.png"}}},
			"AJ": {"reverse": "AL",
				"attributes": {
					"a": {"title": "AJ", "href": "/wiki/File:AJTet.png"},
					"img": {"alt": "AJ", "src": "/w/images/9/98/AJTet.png"}
				}
			},
			//"AT": {"reverse": "AT", "attributes": {"a": {"title": "AT", "href": "/wiki/File:ATTet.png"}, "img": {"alt": "AT", "src": "/w/images/b/ba/ATTet.png"}}},
			//"AG": {"reverse": "AG", "attributes": {"a": {"title": "AG", "href": "/wiki/File:AGTet.png"}, "img": {"alt": "AG", "src": "/w/images/7/7a/AGTet.png"}}},
			"NZ": {"reverse": "NS",
				"attributes": {
					"a": {"title": "NZ", "href": "/wiki/File:NZTet.png"},
					"img": {"alt": "NZ", "src": "/w/images/5/5b/NZTet.png"}
				}
			},
			"NL": {"reverse": "NJ",
				"attributes": {
					"a": {"title": "NL", "href": "/wiki/File:NLTet.png"},
					"img": {"alt": "NL", "src": "/w/images/1/1f/NLTet.png"}
				}
			},
			//"NO": {"reverse": "NO", "attributes": {"a": {"title": "NO", "href": "/wiki/File:NOTet.png"}, "img": {"alt": "NO", "src": "/w/images/a/ab/NOTet.png"}}},
			"NS": {"reverse": "NZ",
				"attributes": {
					"a": {"title": "NS", "href": "/wiki/File:NSTet.png"},
					"img": {"alt": "NS", "src": "/w/images/4/45/NSTet.png"}
				}
			},
			//"NI": {"reverse": "NI", "attributes": {"a": {"title": "NI", "href": "/wiki/File:NITet.png"}, "img": {"alt": "NI", "src": "/w/images/8/8c/NITet.png"}}},
			"NJ": {"reverse": "NL",
				"attributes": {
					"a": {"title": "NJ", "href": "/wiki/File:NJTet.png"},
					"img": {"alt": "NJ", "src": "/w/images/0/0a/NJTet.png"}
				}
			},
			//"NT": {"reverse": "NT", "attributes": {"a": {"title": "NT", "href": "/wiki/File:NTTet.png"}, "img": {"alt": "NT", "src": "/w/images/a/ad/NTTet.png"}}},
			//"NG": {"reverse": "NG", "attributes": {"a": {"title": "NG", "href": "/wiki/File:NGTet.png"}, "img": {"alt": "NG", "src": "/w/images/0/0f/NGTet.png"}}},
			"GZ": {"reverse": "GS",
				"attributes": {
					"a": {"title": "GZ", "href": "/wiki/File:GZTet.png"},
					"img": {"alt": "GZ", "src": "/w/images/4/47/GZTet.png"}
				}
			},
			"GL": {"reverse": "GJ",
				"attributes": {
					"a": {"title": "GL", "href": "/wiki/File:GLTet.png"},
					"img": {"alt": "GL", "src": "/w/images/1/1d/GLTet.png"}
				}
			},
			//"GO": {"reverse": "GO", "attributes": {"a": {"title": "GO", "href": "/wiki/File:GOTet.png"}, "img": {"alt": "GO", "src": "/w/images/a/aa/GOTet.png"}}},
			"GS": {"reverse": "GZ",
				"attributes": {
					"a": {"title": "GS", "href": "/wiki/File:GSTet.png"},
					"img": {"alt": "GS", "src": "/w/images/1/12/GSTet.png"}
				}
			},
			//"GI": {"reverse": "GI", "attributes": {"a": {"title": "GI", "href": "/wiki/File:GITet.png"}, "img": {"alt": "GI", "src": "/w/images/d/d6/GITet.png"}}},
			"GJ": {"reverse": "GL",
				"attributes": {
					"a": {"title": "GJ", "href": "/wiki/File:GJTet.png"},
					"img": {"alt": "GJ", "src": "/w/images/3/32/GJTet.png"}
				}
			},
			//"GT": {"reverse": "GT", "attributes": {"a": {"title": "GT", "href": "/wiki/File:GTTet.png"}, "img": {"alt": "GT", "src": "/w/images/e/e9/GTTet.png"}}},
			//"GG": {"reverse": "GG", "attributes": {"a": {"title": "GG", "href": "/wiki/File:GGTet.png"}, "img": {"alt": "GG", "src": "/w/images/a/a2/GGTet.png"}}},
			"S'": {"reverse": "S+",
				"attributes": {
					"a": {"title": "S'", "href": "/wiki/File:S%27Tet.png"},
					"img": {"alt": "S'", "src": "/w/images/4/4e/S%27Tet.png"}
				}
			},
			"SV": {"reverse": "SN",
				"attributes": {
					"a": {"title": "SV", "href": "/wiki/File:SVTet.png"},
					"img": {"alt": "SV", "src": "/w/images/3/37/SVTet.png"}
				}
			},
			//"SY": {"reverse": "SY", "attributes": {"a": {"title": "SY", "href": "/wiki/File:SYTet.png"}, "img": {"alt": "SY", "src": "/w/images/8/88/SYTet.png"}}},
			"S+": {"reverse": "S'",
				"attributes": {
					"a": {"title": "S+", "href": "/wiki/File:S%2BTet.png"},
					"img": {"alt": "S+", "src": "/w/images/9/97/S%2BTet.png"}
				}
			},
			//"SF": {"reverse": "SF", "attributes": {"a": {"title": "SF", "href": "/wiki/File:SFTet.png"}, "img": {"alt": "SF", "src": "/w/images/e/e5/SFTet.png"}}},
			"SN": {"reverse": "SV",
				"attributes": {
					"a": {"title": "SN", "href": "/wiki/File:SNTet.png"},
					"img": {"alt": "SN", "src": "/w/images/7/70/SNTet.png"}
				}
			},
			//"SP": {"reverse": "SP", "attributes": {"a": {"title": "SP", "href": "/wiki/File:SPTet.png"}, "img": {"alt": "SP", "src": "/w/images/6/6a/SPTet.png"}}},
			"A'": {"reverse": "A+",
				"attributes": {
					"a": {"title": "A'", "href": "/wiki/File:A%27Tet.png"},
					"img": {"alt": "A'", "src": "/w/images/1/1b/A%27Tet.png"}
				}
			},
			"AV": {"reverse": "AN",
				"attributes": {
					"a": {"title": "AV", "href": "/wiki/File:AVTet.png"},
					"img": {"alt": "AV", "src": "/w/images/1/1a/AVTet.png"}
				}
			},
			//"AY": {"reverse": "AY", "attributes": {"a": {"title": "AY", "href": "/wiki/File:AYTet.png"}, "img": {"alt": "AY", "src": "/w/images/f/f9/AYTet.png"}}},
			"A+": {"reverse": "A'",
				"attributes": {
					"a": {"title": "A+", "href": "/wiki/File:A%2BTet.png"},
					"img": {"alt": "A+", "src": "/w/images/9/93/A%2BTet.png"}
				}
			},
			//"AF": {"reverse": "AF", "attributes": {"a": {"title": "AF", "href": "/wiki/File:AFTet.png"}, "img": {"alt": "AF", "src": "/w/images/6/66/AFTet.png"}}},
			"AN": {"reverse": "AV",
				"attributes": {
					"a": {"title": "AN", "href": "/wiki/File:ANTet.png"},
					"img": {"alt": "AN", "src": "/w/images/f/f1/ANTet.png"}
				}
			},
			//"AP": {"reverse": "AP", "attributes": {"a": {"title": "AP", "href": "/wiki/File:APTet.png"}, "img": {"alt": "AP", "src": "/w/images/3/3e/APTet.png"}}},
			"N'": {"reverse": "N+",
				"attributes": {
					"a": {"title": "N'", "href": "/wiki/File:N%27Tet.png"},
					"img": {"alt": "N'", "src": "/w/images/a/a4/N%27Tet.png"}
				}
			},
			"NV": {"reverse": "NN",
				"attributes": {
					"a": {"title": "NV", "href": "/wiki/File:NVTet.png"},
					"img": {"alt": "NV", "src": "/w/images/f/f2/NVTet.png"}
				}
			},
			//"NY": {"reverse": "NY", "attributes": {"a": {"title": "NY", "href": "/wiki/File:NYTet.png"}, "img": {"alt": "NY", "src": "/w/images/b/bc/NYTet.png"}}},
			"N+": {"reverse": "N'",
				"attributes": {
					"a": {"title": "N+", "href": "/wiki/File:N%2BTet.png"},
					"img": {"alt": "N+", "src": "/w/images/e/e8/N%2BTet.png"}
				}
			},
			//"NF": {"reverse": "NF", "attributes": {"a": {"title": "NF", "href": "/wiki/File:NFTet.png"}, "img": {"alt": "NF", "src": "/w/images/2/28/NFTet.png"}}},
			"NN": {"reverse": "NV",
				"attributes": {
					"a": {"title": "NN", "href": "/wiki/File:NNTet.png"},
					"img": {"alt": "NN", "src": "/w/images/5/5b/NNTet.png"}
				}
			},
			//"NP": {"reverse": "NP", "attributes": {"a": {"title": "NP", "href": "/wiki/File:NPTet.png"}, "img": {"alt": "NP", "src": "/w/images/0/05/NPTet.png"}}},
			"G'": {"reverse": "G+",
				"attributes": {
					"a": {"title": "G'", "href": "/wiki/File:G%27Tet.png"},
					"img": {"alt": "G'", "src": "/w/images/f/fc/G%27Tet.png"}
				}
			},
			"GV": {"reverse": "GN",
				"attributes": {
					"a": {"title": "GV", "href": "/wiki/File:GVTet.png"},
					"img": {"alt": "GV", "src": "/w/images/3/3b/GVTet.png"}
				}
			},
			//"GY": {"reverse": "GY", "attributes": {"a": {"title": "GY", "href": "/wiki/File:GYTet.png"}, "img": {"alt": "GY", "src": "/w/images/2/20/GYTet.png"}}},
			"G+": {"reverse": "G'",
				"attributes": {
					"a": {"title": "G+", "href": "/wiki/File:G%2BTet.png"},
					"img": {"alt": "G+", "src": "/w/images/8/81/G%2BTet.png"}
				}
			},
			//"GF": {"reverse": "GF", "attributes": {"a": {"title": "GF", "href": "/wiki/File:GFTet.png"}, "img": {"alt": "GF", "src": "/w/images/3/39/GFTet.png"}}},
			"GN": {"reverse": "GV",
				"attributes": {
					"a": {"title": "GN", "href": "/wiki/File:GNTet.png"},
					"img": {"alt": "GN", "src": "/w/images/4/4d/GNTet.png"}
				}
			},
			//"GP": {"reverse": "GP", "attributes": {"a": {"title": "GP", "href": "/wiki/File:GPTet.png"}, "img": {"alt": "GP", "src": "/w/images/9/92/GPTet.png"}}},
			"SegZ": {"reverse": "SegS",
				"attributes": {
					"a": {"title": "SegZ", "href": "/wiki/File:SegZTet.png"},
					"img": {"alt": "SegZ", "src": "/w/images/1/13/SegZTet.png"}
				}
			},
			"SegL": {"reverse": "SegJ",
				"attributes": {
					"a": {"title": "SegL", "href": "/wiki/File:SegLTet.png"},
					"img": {"alt": "SegL", "src": "/w/images/6/6e/SegLTet.png"}
				}
			},
			//"SegO": {"reverse": "SegO", "attributes": {"a": {"title": "SegO", "href": "/wiki/File:SegOTet.png"}, "img": {"alt": "SegO", "src": "/w/images/c/ca/SegOTet.png"}}},
			"SegS": {"reverse": "SegZ",
				"attributes": {
					"a": {"title": "SegS", "href": "/wiki/File:SegSTet.png"},
					"img": {"alt": "SegS", "src": "/w/images/f/ff/SegSTet.png"}
				}
			},
			//"SegI": {"reverse": "SegI", "attributes": {"a": {"title": "SegI", "href": "/wiki/File:SegITet.png"}, "img": {"alt": "SegI", "src": "/w/images/a/ae/SegITet.png"}}},
			"SegJ": {"reverse": "SegL",
				"attributes": {
					"a": {"title": "SegJ", "href": "/wiki/File:SegJTet.png"},
					"img": {"alt": "SegJ", "src": "/w/images/6/6d/SegJTet.png"}
				}
			},
			//"SegT": {"reverse": "SegT", "attributes": {"a": {"title": "SegT", "href": "/wiki/File:SegTTet.png"}, "img": {"alt": "SegT", "src": "/w/images/3/30/SegTTet.png"}}},
			//"SegG": {"reverse": "SegG", "attributes": {"a": {"title": "SegG", "href": "/wiki/File:SegGTet.png"}, "img": {"alt": "SegG", "src": "/w/images/b/b5/SegGTet.png"}}},
			//"PB": {"reverse": "PB", "attributes": {"a": {"title": "PB", "href": "/wiki/File:PBTet.png"}, "img": {"alt": "PB", "src": "/w/images/3/3e/PBTet.png"}}},
			//"PJ": {"reverse": "PL", "attributes": {"a": {"title": "PJ", "href": "/wiki/File:PJTet.png"}, "img": {"alt": "PJ", "src": "/w/images/b/b3/PJTet.png"}}}, // No PL exists
			"PZ": {"reverse": "PS",
				"attributes": {
					"a": {"title": "PZ", "href": "/wiki/File:PZTet.png"},
					"img": {"alt": "PZ", "src": "/w/images/6/6d/PZTet.png"}
				}
			},
			//"PT": {"reverse": "PT", "attributes": {"a": {"title": "PT", "href": "/wiki/File:PTTet.png"}, "img": {"alt": "PT", "src": "/w/images/d/d1/PTTet.png"}}},
			"PS": {"reverse": "PZ",
				"attributes": {
					"a": {"title": "PS", "href": "/wiki/File:PSTet.png"},
					"img": {"alt": "PS", "src": "/w/images/d/da/PSTet.png"}
				}
			},
			//"PI": {"reverse": "PI", "attributes": {"a": {"title": "PI", "href": "/wiki/File:PITet.png"}, "img": {"alt": "PI", "src": "/w/images/9/9c/PITet.png"}}},
			//"PO": {"reverse": "PO", "attributes": {"a": {"title": "PO", "href": "/wiki/File:POTet.png"}, "img": {"alt": "PO", "src": "/w/images/d/d9/POTet.png"}}},
			//"PW": {"reverse": "PW", "attributes": {"a": {"title": "PW", "href": "/wiki/File:PWTet.png"}, "img": {"alt": "PW", "src": "/w/images/4/49/PWTet.png"}}},
			//"HB": {"reverse": "HB", "attributes": {"a": {"title": "HB", "href": "/wiki/File:HBTet.png"}, "img": {"alt": "HB", "src": "/w/images/c/ce/HBTet.png"}}},
			//"HJ": {"reverse": "HJ", "attributes": {"a": {"title": "HJ", "href": "/wiki/File:HJTet.png"}, "img": {"alt": "HJ", "src": "/w/images/4/41/HJTet.png"}}}, // No HL exists
			//"M0": {"reverse": "M0", "attributes": {"a": {"title": "M0", "href": "/wiki/File:M0Tet.png"}, "img": {"alt": "M0", "src": "/w/images/thumb/f/f8/M0Tet.png/12px-M0Tet.png"}}},
			//"M1": {"reverse": "M1", "attributes": {"a": {"title": "M1", "href": "/wiki/File:M1Tet.png"}, "img": {"alt": "M1", "src": "/w/images/thumb/8/89/M1Tet.png/12px-M1Tet.png"}}},
			//"M2": {"reverse": "M2", "attributes": {"a": {"title": "M2", "href": "/wiki/File:M2Tet.png"}, "img": {"alt": "M2", "src": "/w/images/thumb/d/d0/M2Tet.png/12px-M2Tet.png"}}},
			//"M3": {"reverse": "M3", "attributes": {"a": {"title": "M3", "href": "/wiki/File:M3Tet.png"}, "img": {"alt": "M3", "src": "/w/images/thumb/6/67/M3Tet.png/12px-M3Tet.png"}}},
			//"M4": {"reverse": "M4", "attributes": {"a": {"title": "M4", "href": "/wiki/File:M4Tet.png"}, "img": {"alt": "M4", "src": "/w/images/thumb/b/bb/M4Tet.png/12px-M4Tet.png"}}},
			//"M5": {"reverse": "M5", "attributes": {"a": {"title": "M5", "href": "/wiki/File:M5Tet.png"}, "img": {"alt": "M5", "src": "/w/images/thumb/5/5c/M5Tet.png/12px-M5Tet.png"}}},
			//"M6": {"reverse": "M6", "attributes": {"a": {"title": "M6", "href": "/wiki/File:M6Tet.png"}, "img": {"alt": "M6", "src": "/w/images/thumb/8/8f/M6Tet.png/12px-M6Tet.png"}}},
			//"M7": {"reverse": "M7", "attributes": {"a": {"title": "M7", "href": "/wiki/File:M7Tet.png"}, "img": {"alt": "M7", "src": "/w/images/thumb/e/e2/M7Tet.png/12px-M7Tet.png"}}},
			//"M8": {"reverse": "M8", "attributes": {"a": {"title": "M8", "href": "/wiki/File:M8Tet.png"}, "img": {"alt": "M8", "src": "/w/images/thumb/b/bc/M8Tet.png/12px-M8Tet.png"}}},
			//"M9": {"reverse": "M9", "attributes": {"a": {"title": "M9", "href": "/wiki/File:M9Tet.png"}, "img": {"alt": "M9", "src": "/w/images/thumb/8/87/M9Tet.png/12px-M9Tet.png"}}},
			"MZ": {"reverse": "ML",
				"attributes": {
					"a": {"title": "MZ", "href": "/wiki/File:MZTet.png"},
					"img": {"alt": "MZ", "src": "/w/images/thumb/a/ae/MZTet.png/12px-MZTet.png"}
				}
			},
			"ML": {"reverse": "MJ",
				"attributes": {
					"a": {"title": "ML", "href": "/wiki/File:MLTet.png"},
					"img": {"alt": "ML", "src": "/w/images/thumb/7/7f/MLTet.png/12px-MLTet.png"}
				}
			},
			//"MO": {"reverse": "MO", "attributes": {"a": {"title": "MO", "href": "/wiki/File:MOTet.png"}, "img": {"alt": "MO", "src": "/w/images/thumb/6/69/MOTet.png/12px-MOTet.png"}}},
			"MS": {"reverse": "MZ",
				"attributes": {
					"a": {"title": "MS", "href": "/wiki/File:MSTet.png"},
					"img": {"alt": "MS", "src": "/w/images/thumb/3/31/MSTet.png/12px-MSTet.png"}
				}
			},
			//"MI": {"reverse": "MI", "attributes": {"a": {"title": "MI", "href": "/wiki/File:MITet.png"}, "img": {"alt": "MI", "src": "/w/images/thumb/0/03/MITet.png/12px-MITet.png"}}},
			"MJ": {"reverse": "ML",
				"attributes": {
					"a": {"title": "MJ", "href": "/wiki/File:MJTet.png"},
					"img": {"alt": "MJ", "src": "/w/images/thumb/2/20/MJTet.png/12px-MJTet.png"}
				}
			},
			//"MT": {"reverse": "MT", "attributes": {"a": {"title": "MT", "href": "/wiki/File:MTTet.png"}, "img": {"alt": "MT", "src": "/w/images/thumb/3/38/MTTet.png/12px-MTTet.png"}}},
			//"MG": {"reverse": "MG", "attributes": {"a": {"title": "MG", "href": "/wiki/File:MGTet.png"}, "img": {"alt": "MG", "src": "/w/images/thumb/c/ce/MGTet.png/12px-MGTet.png"}}},
			//"M-": {"reverse": "M-", "attributes": {"a": {"title": "M-", "href": "/wiki/File:M-Tet.png"}, "img": {"alt": "M-", "src": "/w/images/thumb/8/80/M-Tet.png/12px-M-Tet.png"}}},
			//"MC": {"reverse": "MC", "attributes": {"a": {"title": "MC", "href": "/wiki/File:MCTet.png"}, "img": {"alt": "MC", "src": "/w/images/thumb/8/86/MCTet.png/12px-MCTet.png"}}},
			//"MB": {"reverse": "MB", "attributes": {"a": {"title": "MB", "href": "/wiki/File:MBTet.png"}, "img": {"alt": "MB", "src": "/w/images/thumb/f/fa/MBTet.png/12px-MBTet.png"}}},
			//"MX": {"reverse": "MX", "attributes": {"a": {"title": "MX", "href": "/wiki/File:MXTet.png"}, "img": {"alt": "MX", "src": "/w/images/thumb/1/12/MXTet.png/12px-MXTet.png"}}},
			"MM": {"reverse": "MR",
				"attributes": {
					"a": {"title": "MM", "href": "/wiki/File:MMTet.png"},
					"img": {"alt": "MM", "src": "/w/images/thumb/a/ac/MMTet.png/12px-MMTet.png"}
				}
			},
			"MR": {"reverse": "MM",
				"attributes": {
					"a": {"title": "MR", "href": "/wiki/File:MRTet.png"},
					"img": {"alt": "MR", "src": "/w/images/thumb/1/12/MRTet.png/12px-MRTet.png"}
				}
			},
			"MA": {"reverse": "ME",
				"attributes": {
					"a": {"title": "MA", "href": "/wiki/File:MATet.png"},
					"img": {"alt": "MA", "src": "/w/images/thumb/d/dc/MATet.png/12px-MATet.png"}
				}
			},
			"ME": {"reverse": "MA",
				"attributes": {
					"a": {"title": "ME", "href": "/wiki/File:METet.png"},
					"img": {"alt": "ME", "src": "/w/images/thumb/f/f7/METet.png/12px-METet.png"}
				}
			},
			//"MD": {"reverse": "MD", "attributes": {"a": {"title": "MD", "href": "/wiki/File:MDTet.png"}, "img": {"alt": "MD", "src": "/w/images/thumb/0/0c/MDTet.png/12px-MDTet.png"}}},
			//"MH": {"reverse": "MH", "attributes": {"a": {"title": "MH", "href": "/wiki/File:MHTet.png"}, "img": {"alt": "MH", "src": "/w/images/thumb/5/50/MHTet.png/12px-MHTet.png"}}},
			//"MU": {"reverse": "MU", "attributes": {"a": {"title": "MU", "href": "/wiki/File:MUTet.png"}, "img": {"alt": "MU", "src": "/w/images/thumb/9/9a/MUTet.png/12px-MUTet.png"}}},
			"M'": {"reverse": "M+",
				"attributes": {
					"a": {"title": "M'", "href": "/wiki/File:M%27Tet.png"},
					"img": {"alt": "M'", "src": "/w/images/thumb/9/9c/M%27Tet.png/12px-M%27Tet.png"}
				}
			},
			"MV": {"reverse": "MN",
				"attributes": {
					"a": {"title": "MV", "href": "/wiki/File:MVTet.png"},
					"img": {"alt": "MV", "src": "/w/images/thumb/9/9d/MVTet.png/12px-MVTet.png"}
				}
			},
			//"MY": {"reverse": "MY", "attributes": {"a": {"title": "MY", "href": "/wiki/File:MYTet.png"}, "img": {"alt": "MY", "src": "/w/images/thumb/e/eb/MYTet.png/12px-MYTet.png"}}},
			"M+": {"reverse": "M'",
				"attributes": {
					"a": {"title": "M+", "href": "/wiki/File:M%2BTet.png"},
					"img": {"alt": "M+", "src": "/w/images/thumb/7/7d/M%2BTet.png/12px-M%2BTet.png"}
				}
			},
			//"MF": {"reverse": "MF", "attributes": {"a": {"title": "MF", "href": "/wiki/File:MFTet.png"}, "img": {"alt": "MF", "src": "/w/images/thumb/9/9f/MFTet.png/12px-MFTet.png"}}},
			"MN": {"reverse": "MV",
				"attributes": {
					"a": {"title": "MN", "href": "/wiki/File:MNTet.png"},
					"img": {"alt": "MN", "src": "/w/images/thumb/4/4c/MNTet.png/12px-MNTet.png"}
				}
			},
			//"MP": {"reverse": "MP", "attributes": {"a": {"title": "MP", "href": "/wiki/File:MPTet.png"}, "img": {"alt": "MP", "src": "/w/images/thumb/5/56/MPTet.png/12px-MPTet.png"}}},
			//"MK": {"reverse": "MK", "attributes": {"a": {"title": "MK", "href": "/wiki/File:MKTet.png"}, "img": {"alt": "MK", "src": "/w/images/thumb/3/3c/MKTet.png/12px-MKTet.png"}}},
			//"MW": {"reverse": "MW", "attributes": {"a": {"title": "MW", "href": "/wiki/File:MWTet.png"}, "img": {"alt": "MW", "src": "/w/images/thumb/4/49/MWTet.png/12px-MWTet.png"}}},
			//"MQ": {"reverse": "MQ", "attributes": {"a": {"title": "MQ", "href": "/wiki/File:MQTet.png"}, "img": {"alt": "MQ", "src": "/w/images/thumb/6/6c/MQTet.png/12px-MQTet.png"}}},
			//"D0": {"reverse": "D0", "attributes": {"a": {"title": "D0", "href": "/wiki/File:D0Tet.png"}, "img": {"alt": "D0", "src": "/w/images/4/41/D0Tet.png"}}},
			//"D1": {"reverse": "D1", "attributes": {"a": {"title": "D1", "href": "/wiki/File:D1Tet.png"}, "img": {"alt": "D1", "src": "/w/images/f/fc/D1Tet.png"}}},
			//"D2": {"reverse": "D2", "attributes": {"a": {"title": "D2", "href": "/wiki/File:D2Tet.png"}, "img": {"alt": "D2", "src": "/w/images/0/0b/D2Tet.png"}}},
			//"D3": {"reverse": "D3", "attributes": {"a": {"title": "D3", "href": "/wiki/File:D3Tet.png"}, "img": {"alt": "D3", "src": "/w/images/b/b1/D3Tet.png"}}},
			//"D4": {"reverse": "D4", "attributes": {"a": {"title": "D4", "href": "/wiki/File:D4Tet.png"}, "img": {"alt": "D4", "src": "/w/images/7/71/D4Tet.png"}}},
			//"D5": {"reverse": "D5", "attributes": {"a": {"title": "D5", "href": "/wiki/File:D5Tet.png"}, "img": {"alt": "D5", "src": "/w/images/4/48/D5Tet.png"}}},
			//"D6": {"reverse": "D6", "attributes": {"a": {"title": "D6", "href": "/wiki/File:D6Tet.png"}, "img": {"alt": "D6", "src": "/w/images/3/32/D6Tet.png"}}},
			//"D7": {"reverse": "D7", "attributes": {"a": {"title": "D7", "href": "/wiki/File:D7Tet.png"}, "img": {"alt": "D7", "src": "/w/images/6/60/D7Tet.png"}}},
			//"D8": {"reverse": "D8", "attributes": {"a": {"title": "D8", "href": "/wiki/File:D8Tet.png"}, "img": {"alt": "D8", "src": "/w/images/7/7a/D8Tet.png"}}},
			//"D9": {"reverse": "D9", "attributes": {"a": {"title": "D9", "href": "/wiki/File:D9Tet.png"}, "img": {"alt": "D9", "src": "/w/images/0/07/D9Tet.png"}}},
			"DZ": {"reverse": "DS",
				"attributes": {
					"a": {"title": "DZ", "href": "/wiki/File:DZTet.png"},
					"img": {"alt": "DZ", "src": "/w/images/6/6d/DZTet.png"}
				}
			},
			"DL": {"reverse": "DJ",
				"attributes": {
					"a": {"title": "DL", "href": "/wiki/File:DLTet.png"},
					"img": {"alt": "DL", "src": "/w/images/b/b2/DLTet.png"}
				}
			},
			//"DO": {"reverse": "DO", "attributes": {"a": {"title": "DO", "href": "/wiki/File:DOTet.png"}, "img": {"alt": "DO", "src": "/w/images/e/e6/DOTet.png"}}},
			"DS": {"reverse": "DZ",
				"attributes": {
					"a": {"title": "DS", "href": "/wiki/File:DSTet.png"},
					"img": {"alt": "DS", "src": "/w/images/b/b7/DSTet.png"}
				}
			},
			//"DI": {"reverse": "DI", "attributes": {"a": {"title": "DI", "href": "/wiki/File:DITet.png"}, "img": {"alt": "DI", "src": "/w/images/d/de/DITet.png"}}},
			"DJ": {"reverse": "DL",
				"attributes": {
					"a": {"title": "DJ", "href": "/wiki/File:DJTet.png"},
					"img": {"alt": "DJ", "src": "/w/images/7/74/DJTet.png"}
				}
			},
			//"DT": {"reverse": "DT", "attributes": {"a": {"title": "DT", "href": "/wiki/File:DTTet.png"}, "img": {"alt": "DT", "src": "/w/images/0/05/DTTet.png"}}},
			//"DG": {"reverse": "DG", "attributes": {"a": {"title": "DG", "href": "/wiki/File:DGTet.png"}, "img": {"alt": "DG", "src": "/w/images/9/97/DGTet.png"}}},
			//"D-": {"reverse": "D-", "attributes": {"a": {"title": "D-", "href": "/wiki/File:D-Tet.png"}, "img": {"alt": "D-", "src": "/w/images/9/93/D-Tet.png"}}},
			//"Y!": {"reverse": "Y!", "attributes": {"a": {"title": "Y!", "href": "/wiki/File:Y!Tet.png"}, "img": {"alt": "Y!", "src": "/w/images/1/18/Y%21Tet.png"}}},
			//"Y\"": {"reverse": "Y\"", "attributes": {"a": {"title": "Y\"", "href": "/wiki/File:Y%22Tet.png"}, "img": {"alt": "Y\"", "src": "/w/images/7/7b/Y%22Tet.png"}}},
			//"Y#": {"reverse": "Y#", "attributes": {"a": {"title": "Y#", "href": "/wiki/File:Y%3F%22Tet.png"}, "img": {"alt": "Y#", "src": "/w/images/7/70/Y%3F%22Tet.png"}}},
			//"Y$": {"reverse": "Y$", "attributes": {"a": {"title": "Y$", "href": "/wiki/File:Y$Tet.png"}, "img": {"alt": "Y$", "src": "/w/images/e/e3/Y%24Tet.png"}}},
			//"Y%": {"reverse": "Y%", "attributes": {"a": {"title": "Y%", "href": "/wiki/File:Y%25Tet.png"}, "img": {"alt": "Y%", "src": "/w/images/4/4f/Y%25Tet.png"}}},
			//"Y&": {"reverse": "Y&", "attributes": {"a": {"title": "Y&", "href": "/wiki/File:Y%26Tet.png"}, "img": {"alt": "Y&", "src": "/w/images/e/e7/Y%26Tet.png"}}},
			//"Y'": {"reverse": "Y'", "attributes": {"a": {"title": "Y'", "href": "/wiki/File:Y%27Tet.png"}, "img": {"alt": "Y'", "src": "/w/images/f/f3/Y%27Tet.png"}}},
			//"Y(": {"reverse": "Y(", "attributes": {"a": {"title": "Y(", "href": "/wiki/File:Y(Tet.png"}, "img": {"alt": "Y(", "src": "/w/images/2/28/Y%28Tet.png"}}},
			//"Y)": {"reverse": "Y)", "attributes": {"a": {"title": "Y)", "href": "/wiki/File:Y)Tet.png"}, "img": {"alt": "Y)", "src": "/w/images/3/38/Y%29Tet.png"}}},
			//"Y*": {"reverse": "Y*", "attributes": {"a": {"title": "Y*", "href": "/wiki/File:Y*Tet.png"}, "img": {"alt": "Y*", "src": "/w/images/5/59/Y%2ATet.png"}}},
			//"Y+": {"reverse": "Y+", "attributes": {"a": {"title": "Y+", "href": "/wiki/File:Y%2BTet.png"}, "img": {"alt": "Y+", "src": "/w/images/3/3d/Y%2BTet.png"}}},
			//"Y6": {"reverse": "Y6", "attributes": {"a": {"title": "Y6", "href": "/wiki/File:6Tet.png"}, "img": {"alt": "Y6", "src": "/w/images/e/e7/6Tet.png"}}},
			//"Y7": {"reverse": "Y7", "attributes": {"a": {"title": "Y7", "href": "/wiki/File:7Tet.png"}, "img": {"alt": "Y7", "src": "/w/images/c/cd/7Tet.png"}}},
			//"Y8": {"reverse": "Y8", "attributes": {"a": {"title": "Y8", "href": "/wiki/File:8Tet.png"}, "img": {"alt": "Y8", "src": "/w/images/e/e6/8Tet.png"}}},
			//"Y9": {"reverse": "Y9", "attributes": {"a": {"title": "Y9", "href": "/wiki/File:9Tet.png"}, "img": {"alt": "Y9", "src": "/w/images/c/c8/9Tet.png"}}},
			//"Y:": {"reverse": "Y:", "attributes": {"a": {"title": "Y:", "href": "/wiki/File:Y(colon)Tet.png"}, "img": {"alt": "Y:", "src": "/w/images/7/70/Y%28colon%29Tet.png"}}},
			//"Y;": {"reverse": "Y;", "attributes": {"a": {"title": "Y;", "href": "/wiki/File:Y;Tet.png"}, "img": {"alt": "Y;", "src": "/w/images/3/39/Y%3BTet.png"}}},
			//"Y?l": {"reverse": "Y?l", "attributes": {"a": {"title": "Y?l", "href": "/wiki/File:Y%3FlTet.png"}, "img": {"alt": "Y?l", "src": "/w/images/7/77/Y%3FlTet.png"}}},
			//"Y?q": {"reverse": "Y?q", "attributes": {"a": {"title": "Y?q", "href": "/wiki/File:Y%3FqTet.png"}, "img": {"alt": "Y?q", "src": "/w/images/2/2f/Y%3FqTet.png"}}},
			//"Y?g": {"reverse": "Y?g", "attributes": {"a": {"title": "Y?g", "href": "/wiki/File:Y%3FgTet.png"}, "img": {"alt": "Y?g", "src": "/w/images/e/e5/Y%3FgTet.png"}}},
			//"Y?": {"reverse": "Y?", "attributes": {"a": {"title": "Y?", "href": "/wiki/File:Y%3FTet.png"}, "img": {"alt": "Y?", "src": "/w/images/c/c4/Y%3FTet.png"}}},
			//"Y@": {"reverse": "Y@", "attributes": {"a": {"title": "Y@", "href": "/wiki/File:Y@Tet.png"}, "img": {"alt": "Y@", "src": "/w/images/a/a5/Y%40Tet.png"}}},
			//"YA": {"reverse": "YA", "attributes": {"a": {"title": "YA", "href": "/wiki/File:YATet.png"}, "img": {"alt": "YA", "src": "/w/images/c/c7/YATet.png"}}},
			//"YB": {"reverse": "YB", "attributes": {"a": {"title": "YB", "href": "/wiki/File:YBTet.png"}, "img": {"alt": "YB", "src": "/w/images/8/8a/YBTet.png"}}},
			//"YC": {"reverse": "YC", "attributes": {"a": {"title": "YC", "href": "/wiki/File:YCTet.png"}, "img": {"alt": "YC", "src": "/w/images/d/d8/YCTet.png"}}},
			//"YF": {"reverse": "YF", "attributes": {"a": {"title": "YF", "href": "/wiki/File:YFTet.png"}, "img": {"alt": "YF", "src": "/w/images/f/fa/YFTet.png"}}},
			//"YG": {"reverse": "YG", "attributes": {"a": {"title": "YG", "href": "/wiki/File:YGTet.png"}, "img": {"alt": "YG", "src": "/w/images/2/20/YGTet.png"}}},
			//"YI": {"reverse": "YI", "attributes": {"a": {"title": "YI", "href": "/wiki/File:YITet.png"}, "img": {"alt": "YI", "src": "/w/images/0/0d/YITet.png"}}},
			//"YJ": {"reverse": "YJ", "attributes": {"a": {"title": "YJ", "href": "/wiki/File:YJTet.png"}, "img": {"alt": "YJ", "src": "/w/images/3/38/YJTet.png"}}},
			//"YK": {"reverse": "YK", "attributes": {"a": {"title": "YK", "href": "/wiki/File:YKTet.png"}, "img": {"alt": "YK", "src": "/w/images/0/0a/YKTet.png"}}},
			//"YM": {"reverse": "YM", "attributes": {"a": {"title": "YM", "href": "/wiki/File:YMTet.png"}, "img": {"alt": "YM", "src": "/w/images/f/f5/YMTet.png"}}},
			//"YP": {"reverse": "YP", "attributes": {"a": {"title": "YP", "href": "/wiki/File:YPTet.png"}, "img": {"alt": "YP", "src": "/w/images/e/e1/YPTet.png"}}},
			//"YQ": {"reverse": "YQ", "attributes": {"a": {"title": "YQ", "href": "/wiki/File:YQTet.png"}, "img": {"alt": "YQ", "src": "/w/images/b/b2/YQTet.png"}}},
			//"YR": {"reverse": "YR", "attributes": {"a": {"title": "YR", "href": "/wiki/File:YRTet.png"}, "img": {"alt": "YR", "src": "/w/images/7/73/YRTet.png"}}},
			//"YS": {"reverse": "YS", "attributes": {"a": {"title": "YS", "href": "/wiki/File:YSTet.png"}, "img": {"alt": "YS", "src": "/w/images/1/18/YSTet.png"}}},
			//"YU": {"reverse": "YU", "attributes": {"a": {"title": "YU", "href": "/wiki/File:YUTet.png"}, "img": {"alt": "YU", "src": "/w/images/6/60/YUTet.png"}}},
			//"YV": {"reverse": "YV", "attributes": {"a": {"title": "YV", "href": "/wiki/File:YVTet.png"}, "img": {"alt": "YV", "src": "/w/images/9/9d/YVTet.png"}}},
			//"YW": {"reverse": "YW", "attributes": {"a": {"title": "YW", "href": "/wiki/File:YWTet.png"}, "img": {"alt": "YW", "src": "/w/images/d/d9/YWTet.png"}}},
			//"YY": {"reverse": "YY", "attributes": {"a": {"title": "YY", "href": "/wiki/File:YYTet.png"}, "img": {"alt": "YY", "src": "/w/images/d/de/YYTet.png"}}},
			//"YZ": {"reverse": "YZ", "attributes": {"a": {"title": "YZ", "href": "/wiki/File:YZTet.png"}, "img": {"alt": "YZ", "src": "/w/images/0/06/YZTet.png"}}},
			//"Y?(": {"reverse": "Y?(", "attributes": {"a": {"title": "Y?(", "href": "/wiki/File:Y%3F(Tet.png"}, "img": {"alt": "Y?(", "src": "/w/images/5/51/Y%3F%28Tet.png"}}},
			//"Y\\": {"reverse": "Y\\", "attributes": {"a": {"title": "Y\\", "href": "/wiki/File:Y(rslash)Tet.png"}, "img": {"alt": "Y\\", "src": "/w/images/6/60/Y%28rslash%29Tet.png"}}},
			//"Y?)": {"reverse": "Y?)", "attributes": {"a": {"title": "Y?)", "href": "/wiki/File:Y%3F)Tet.png"}, "img": {"alt": "Y?)", "src": "/w/images/4/4c/Y%3F%29Tet.png"}}},
			//"Y^": {"reverse": "Y^", "attributes": {"a": {"title": "Y^", "href": "/wiki/File:Y%5ETet.png"}, "img": {"alt": "Y^", "src": "/w/images/2/21/Y%5ETet.png"}}},
			//"Y?u": {"reverse": "Y?u", "attributes": {"a": {"title": "Y?u", "href": "/wiki/File:Y%3FuTet.png"}, "img": {"alt": "Y?u", "src": "/w/images/0/0a/Y%3FuTet.png"}}},
			//"Y`": {"reverse": "Y`", "attributes": {"a": {"title": "Y`", "href": "/wiki/File:Y%60Tet.png"}, "img": {"alt": "Y`", "src": "/w/images/f/f2/Y%60Tet.png"}}},
			//"Ya": {"reverse": "Ya", "attributes": {"a": {"title": "Ya", "href": "/wiki/File:YaTet.png"}, "img": {"alt": "Ya", "src": "/w/images/2/27/YaTet.png"}}},
			//"Yb": {"reverse": "Yb", "attributes": {"a": {"title": "Yb", "href": "/wiki/File:YbTet.png"}, "img": {"alt": "Yb", "src": "/w/images/1/1b/YbTet.png"}}},
			//"Yc": {"reverse": "Yc", "attributes": {"a": {"title": "Yc", "href": "/wiki/File:YcTet.png"}, "img": {"alt": "Yc", "src": "/w/images/1/13/YcTet.png"}}},
			//"Yd": {"reverse": "Yd", "attributes": {"a": {"title": "Yd", "href": "/wiki/File:YdTet.png"}, "img": {"alt": "Yd", "src": "/w/images/4/4d/YdTet.png"}}},
			//"Ye": {"reverse": "Ye", "attributes": {"a": {"title": "Ye", "href": "/wiki/File:YeTet.png"}, "img": {"alt": "Ye", "src": "/w/images/7/78/YeTet.png"}}},
			//"Yf": {"reverse": "Yf", "attributes": {"a": {"title": "Yf", "href": "/wiki/File:YfTet.png"}, "img": {"alt": "Yf", "src": "/w/images/c/ca/YfTet.png"}}},
			//"Yg": {"reverse": "Yg", "attributes": {"a": {"title": "Yg", "href": "/wiki/File:YgTet.png"}, "img": {"alt": "Yg", "src": "/w/images/f/f0/YgTet.png"}}},
			//"Yh": {"reverse": "Yh", "attributes": {"a": {"title": "Yh", "href": "/wiki/File:YhTet.png"}, "img": {"alt": "Yh", "src": "/w/images/a/a1/YhTet.png"}}},
			//"Yi": {"reverse": "Yi", "attributes": {"a": {"title": "Yi", "href": "/wiki/File:YiTet.png"}, "img": {"alt": "Yi", "src": "/w/images/4/45/YiTet.png"}}},
			//"Yj": {"reverse": "Yj", "attributes": {"a": {"title": "Yj", "href": "/wiki/File:YjTet.png"}, "img": {"alt": "Yj", "src": "/w/images/6/66/YjTet.png"}}},
			//"Yk": {"reverse": "Yk", "attributes": {"a": {"title": "Yk", "href": "/wiki/File:YkTet.png"}, "img": {"alt": "Yk", "src": "/w/images/7/72/YkTet.png"}}},
			//"Yl": {"reverse": "Yl", "attributes": {"a": {"title": "Yl", "href": "/wiki/File:YlTet.png"}, "img": {"alt": "Yl", "src": "/w/images/e/ec/YlTet.png"}}},
			//"Ym": {"reverse": "Ym", "attributes": {"a": {"title": "Ym", "href": "/wiki/File:YmTet.png"}, "img": {"alt": "Ym", "src": "/w/images/1/12/YmTet.png"}}},
			//"Yn": {"reverse": "Yn", "attributes": {"a": {"title": "Yn", "href": "/wiki/File:YnTet.png"}, "img": {"alt": "Yn", "src": "/w/images/0/0e/YnTet.png"}}},
			//"Yo": {"reverse": "Yo", "attributes": {"a": {"title": "Yo", "href": "/wiki/File:YoTet.png"}, "img": {"alt": "Yo", "src": "/w/images/3/36/YoTet.png"}}},
			//"Yp": {"reverse": "Yp", "attributes": {"a": {"title": "Yp", "href": "/wiki/File:YpTet.png"}, "img": {"alt": "Yp", "src": "/w/images/f/fa/YpTet.png"}}},
			//"Yq": {"reverse": "Yq", "attributes": {"a": {"title": "Yq", "href": "/wiki/File:YqTet.png"}, "img": {"alt": "Yq", "src": "/w/images/0/03/YqTet.png"}}},
			//"Yr": {"reverse": "Yr", "attributes": {"a": {"title": "Yr", "href": "/wiki/File:YrTet.png"}, "img": {"alt": "Yr", "src": "/w/images/5/5c/YrTet.png"}}},
			//"Ys": {"reverse": "Ys", "attributes": {"a": {"title": "Ys", "href": "/wiki/File:YsTet.png"}, "img": {"alt": "Ys", "src": "/w/images/7/7d/YsTet.png"}}},
			//"Yt": {"reverse": "Yt", "attributes": {"a": {"title": "Yt", "href": "/wiki/File:YtTet.png"}, "img": {"alt": "Yt", "src": "/w/images/6/66/YtTet.png"}}},
			//"Yu": {"reverse": "Yu", "attributes": {"a": {"title": "Yu", "href": "/wiki/File:YuTet.png"}, "img": {"alt": "Yu", "src": "/w/images/2/2e/YuTet.png"}}},
			//"Yv": {"reverse": "Yv", "attributes": {"a": {"title": "Yv", "href": "/wiki/File:YvTet.png"}, "img": {"alt": "Yv", "src": "/w/images/2/25/YvTet.png"}}},
			//"Yw": {"reverse": "Yw", "attributes": {"a": {"title": "Yw", "href": "/wiki/File:YwTet.png"}, "img": {"alt": "Yw", "src": "/w/images/2/25/YwTet.png"}}},
			//"Yx": {"reverse": "Yx", "attributes": {"a": {"title": "Yx", "href": "/wiki/File:YxTet.png"}, "img": {"alt": "Yx", "src": "/w/images/9/96/YxTet.png"}}},
			//"Yy": {"reverse": "Yy", "attributes": {"a": {"title": "Yy", "href": "/wiki/File:YyTet.png"}, "img": {"alt": "Yy", "src": "/w/images/5/57/YyTet.png"}}},
			//"Yz": {"reverse": "Yz", "attributes": {"a": {"title": "Yz", "href": "/wiki/File:YzTet.png"}, "img": {"alt": "Yz", "src": "/w/images/2/28/YzTet.png"}}},
			//"Y?,": {"reverse": "Y?,", "attributes": {"a": {"title": "Y?,", "href": "/wiki/File:Y%3F,Tet.png"}, "img": {"alt": "Y?,", "src": "/w/images/d/d9/Y%3F%2CTet.png"}}},
			//"Y?!": {"reverse": "Y?!", "attributes": {"a": {"title": "Y?!", "href": "/wiki/File:Y%3F!Tet.png"}, "img": {"alt": "Y?!", "src": "/w/images/f/f3/Y%3F%21Tet.png"}}},
			//"Y?.": {"reverse": "Y?.", "attributes": {"a": {"title": "Y?.", "href": "/wiki/File:Y%3F.Tet.png"}, "img": {"alt": "Y?.", "src": "/w/images/1/1e/Y%3F.Tet.png"}}},
			//"Y~": {"reverse": "Y~", "attributes": {"a": {"title": "Y~", "href": "/wiki/File:Y%7ETet.png"}, "img": {"alt": "Y~", "src": "/w/images/d/db/Y~Tet.png"}}}
		};

		function flipBoard(button) {
			let scope;
			if (button instanceof HTMLElement) {
				scope = button.closest('table');
			} else {
				scope = document.body;
			}
			const pattern = `:scope div > ${Array(8).fill('a.image[href^="/wiki/File:"][href$="Tet.png"]').join(' + ')}`;
			const toUpperCase = String.prototype.toUpperCase.apply.bind(String.prototype.toUpperCase);
			[...scope.querySelectorAll(pattern)].map(el => el.parentElement).forEach(row => {
				const children = [...row.childNodes].reverse();
				children.forEach(anchor => {
					if (!(anchor instanceof HTMLAnchorElement)) {
						return;
					}
					const elements = {
						a: anchor,
						img: anchor.querySelector(':scope > img'),
					};
					const singleMinoProperties = minoProperties[toUpperCase(String(elements.img.alt))];
					if (!(singleMinoProperties instanceof Object)) {
						return;
					}
					const properties = minoProperties[singleMinoProperties.reverse];
					Object.keys(elements).forEach(tag =>
						Object.keys(properties.attributes[tag]).forEach(attribute =>
							elements[tag].setAttribute(attribute, properties.attributes[tag][attribute])
						))
				});
				children.forEach(child => row.appendChild(child));
			});
		}
	}
})();
