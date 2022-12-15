var mdconverter = new showdown.Converter();

var api = "5fd6169ead4405e6d9cac2af2bea513f";
var experienceKey = "bestatter-finden";
var businessId = "3567041";
var locale = "de";

ANSWERS.init({
	apiKey: api,
	experienceKey: experienceKey,
	businessId: businessId,
	experienceVersion: "PRODUCTION",
	locale: locale,
	onReady: function() {
		if(document.querySelectorAll(".search-bar-searchsection").length != 0){
			this.addComponent("SearchBar", {
				container: ".search-bar-searchsection",
				customIconUrl: "https://bestatterportal.ch/wp-content/themes/bestatter-ch/bestatterfile/assets/searchglass.png",
				redirectUrl: "https://bestatterportal.ch/result/",
				name: "search-bar-searchsection"
			});
			
			var url = `https://liveapi.yext.com/v2/accounts/me/answers/autocomplete`;
			url += `?v=20190101`;
			url += `&api_key=` + api;
			url += `&sessionTrackingEnabled=false`;
			url += `&experienceKey=` + experienceKey;
			url += `&input=`;
			url += `&version=PRODUCTION`;
			url += `&locale=` + locale;

			axios.get(url).then(function (response) {
				// Get strings from response
				const strings = response.data.response.results.map(function (r) {
					return r.value;
				});

				// Set up Typed
				var options = {
					strings,
					showCursor: true,
					cursorChar: "|",
					typeSpeed: 45,
					backSpeed: 20,
					smartBackspace: true,
					loop: true,
					startDelay: 500,
					backDelay: 2000,
					attr: "placeholder",
				};

				var typed = new Typed(".js-yext-query", options);
			});
		}
		
		if(document.querySelectorAll(".search-bar-searchsection-footer").length != 0){
			this.addComponent("SearchBar", {
				container: ".search-bar-searchsection-footer",
				customIconUrl: "https://bestatterportal.ch/wp-content/themes/bestatter-ch/bestatterfile/assets/searchglass.png",
				redirectUrl: "https://bestatterportal.ch/result/",
				name: "search-bar-searchsection-footer"
			});
			var url = `https://liveapi.yext.com/v2/accounts/me/answers/autocomplete`;
			url += `?v=20190101`;
			url += `&api_key=` + api;
			url += `&sessionTrackingEnabled=false`;
			url += `&experienceKey=` + experienceKey;
			url += `&input=`;
			url += `&version=PRODUCTION`;
			url += `&locale=` + locale;

			axios.get(url).then(function (response) {
				// Get strings from response
				const strings = response.data.response.results.map(function (r) {
					return r.value;
				});

				// Set up Typed
				var options = {
					strings,
					showCursor: true,
					cursorChar: "|",
					typeSpeed: 45,
					backSpeed: 20,
					smartBackspace: true,
					loop: true,
					startDelay: 500,
					backDelay: 2000,
					attr: "placeholder",
				};

				var typed = new Typed("#yxt-SearchBar-input--search-bar-searchsection-footer", options);
			});
		}
		
		if(document.querySelectorAll(".search-bar-footer").length != 0){
			ANSWERS.addComponent("SearchBar", {
				container: ".search-bar-footer",
				name: "search-bar-footer",
				submitIcon: "magnifying_glass",
				redirectUrl: "/result"
			});
		}
		
		if(document.querySelectorAll(".result-search-bar").length != 0){
			ANSWERS.addComponent("SearchBar", {
				container: ".result-search-bar",
				submitIcon: "magnifying_glass",
				name: "result-search-bar",
			});
		}
		
		if(document.querySelectorAll(".result-spell-check").length != 0){
			ANSWERS.addComponent("SpellCheck", {
				container: ".result-spell-check"
			});
		}
		
		if(document.querySelectorAll(".result-direct-answer").length != 0){
			ANSWERS.addComponent("DirectAnswer", {
				container: ".result-direct-answer"
			});
		}
		
		if(document.querySelectorAll(".result-universal-results").length != 0){
			ANSWERS.addComponent("UniversalResults", {
				container: ".result-universal-results",
				config: {
					standorte: {
						icon: "pin",
						card: {
							cardType: "Standard",
							title: "Bestatter",
							dataMappings: {
								title: (item) => item.name,
								subtitle: (item) => item.address.line1,
								details: (item) => item.description,
								image: (item) => item.logo.image.url,
								url: (item) => `https://bestatterportal.ch/mitglieder-seite/${item.id}`
							},
							callsToAction: [
								{
									label: "Webgbeschreibung anzeigen",
									icon: "directions",
									url: "#",
									analyticsEventType: "GET_DIRECTIONS",
									target: "_self"
								},
								{
									label: "Anrufen",
									icon: "phone",
									url: (item) => `tel:${item.mainPhone}`,
									analyticsEventType: "TAP_TO_CALL"
								}
							]
						},
						appliedFilters: {
							show: true,
							showFieldNames: true,
							hiddenFields: ["builtin.entityType"],
							delimiter: "|",
							labelText: "Filters applied to this search:",
							removableLabelText: "Remove this filter"
						}
					},
					faqs: {
						icon: "support",
						title: "Fragen und Antworten",
						card: {
							cardType: "Accordion",
							dataMappings: {
								title: (item) => item.name,
								details: (item) => mdconverter.makeHtml(item.answer.replace(/(\\)/gm, "").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/\)\[/gm, ")\n\n[")),
								url: "#"
							}
						}
					}
				}
			});
		}
	}
});