// set project indexes
const indexElements = document.querySelectorAll(
	"section#projects .project-base .description h5"
);

indexElements.forEach((element, index) => {
	element.innerText = `${index + 1}/${indexElements.length}`;
});

async function setNumberOfRepos() {
    let totalLength = 0;
	const resultsPerPage = 100;
    let i = 1;
    while(i < 10) {
        const res = await fetch(`https://api.github.com/users/vojtechgistr/repos?page=${i++}&per_page=${resultsPerPage}`);
		if (!res.ok)
			return;

	    const data = await res.json();
		if (data.length == 0) {
			break;
		}

	    totalLength += data.length;
		if (data.length < resultsPerPage) {
			break;
		}
    }

	if (isNaN(totalLength) || totalLength < 1) {
		return;
	}

    const listedProjects = document.getElementById("projects").children.length;
	if (totalLength - listedProjects < 0) {
		return;
	}

	
    const lang = window.location.pathname;
	let message = "";
	if (lang.includes("cs")) {
		message = `Ukázat dalších ${totalLength - listedProjects} projektů...`;
	} else {
		message = `Show ${totalLength - listedProjects} more projects...`;
	}
    document.getElementById(
        "number-of-repos"
    ).innerHTML = message;
}

// smooth scroll
$(window).on("load", function () {
	var anchor = window.location.hash.replace("#", "");
	scrollToAnchor(anchor);
	setNumberOfRepos();
});


const scrollTargets = document.querySelectorAll("[data-scroll-target='true']");
$(window).on("wheel touchend", function() {
	var closest = {
		distance: null,
		target: null,
	};

	scrollTargets.forEach(target => {
		const currentY = window.scrollY;
		const targetY = $(target).offset().top;
		const distance = Math.abs(targetY - currentY);
		if (closest.distance == null || distance < closest.distance) {
			closest.distance = distance;
			closest.target = target;
		}
	});

	history.pushState({}, '', `#${closest.target.id}`);
});

function scrollToAnchor(selector) {
	if (selector == undefined || selector == "") return;

	const destination = $(`#${selector}`);
	$("html,body").animate(
		{
			scrollTop: destination.offset().top,
		},
		"slow"
	);
}

const technologyList = document.querySelectorAll("#technologies .img-wrapper img");
const tooltipElement = document.querySelector("#technologies .tooltip");
technologyList.forEach(element => {
	element.addEventListener("mouseover", (e) => {
		tooltipElement.innerHTML = e.currentTarget.alt;
		tooltipElement.style.display = "flex";
		const baseLocation = $(e.currentTarget).offset();
		tooltipElement.style.top = (baseLocation.top) + "px";
		tooltipElement.style.left = (baseLocation.left) + "px";
	});
	
	element.addEventListener("mouseleave", (e) => {
		tooltipElement.innerHTML = "";
		tooltipElement.style.display = "none";
	});
	
})