describe("Home page", () => {
	before(() => {
		cy.resetDatabase();
	});

	it("should create and list recommendations", () => {
		const videos = [
			{name: "Phaxe", link: "https://www.youtube.com/results?search_query=phaxe+universo+paralello"},
			{name: "Vegas", link: "https://www.youtube.com/watch?v=6bRGO7r0E-Y&t=167s"}
		]
		
		cy.intercept("POST", "/recommendations").as("postRecommendation");
		cy.intercept("GET", "/recommendations").as("getRecommendations");

        cy.visit("http://localhost:3000");

		cy.get('#name').type(videos[0].name);
		cy.get('#link').type(videos[0].link);
		cy.get('#send').click();
		cy.wait("@postRecommendation");
		cy.wait("@getRecommendations");

		cy.get('#name').type(videos[1].name);
		cy.get('#link').type(videos[1].link);
		cy.get('#send').click();
		cy.wait("@postRecommendation");
		cy.wait("@getRecommendations");

		cy.get("article").should( ($article) => {
			expect($article).to.have.length(2)
		})
	});
});

describe("Top page", () => {
	it("should list top recommendations by score", () => {
		cy.intercept("POST", "/recommendations/*/upvote").as("upvoteRecommendation");
		cy.intercept("POST", "/recommendations/*/downvote").as("downvoteRecommendation");
		cy.intercept("GET", "/recommendations/top/10").as("getTopRecommendations");

        cy.visit("http://localhost:3000/top");
		cy.wait("@getTopRecommendations");
		cy.get("article").should( ($article) => {
			expect($article).to.have.length(2)
		})

		cy.get("#Vegas-upvote").click()
		cy.wait("@upvoteRecommendation")
		cy.wait("@getTopRecommendations");
		cy.get("article").first().should("contain", "Vegas")

		cy.get("#Phaxe-upvote").click()
		cy.wait("@upvoteRecommendation")
		cy.wait("@getTopRecommendations");
		cy.get("#Phaxe-upvote").click()
		cy.wait("@upvoteRecommendation")
		cy.wait("@getTopRecommendations");

		cy.wait(500) // eslint-disable-line cypress/no-unnecessary-waiting

		cy.get("article").first().should("contain", "Phaxe")
	});
});

describe("Random page", () => {
	it("should show only one recommendation", () => {
		cy.intercept("GET", "/recommendations/*").as("getRandomRecommendation");

        cy.visit("http://localhost:3000/random");
		cy.wait("@getRandomRecommendation");
		cy.get("article").should( ($article) => {
			expect($article).to.have.length(1)
		})
	});
});