
window.onload = () => {
	const headerTexts = document.querySelectorAll("header h1, header h2, header ");

	headerTexts.forEach((element, index) => {
		gsap.from(element, {
			scrollTrigger: {
				trigger: element,
				start: "top 80%",
			},
			y: 50,
			opacity: 0,
			duration: 1,
			stagger: 1,
		});
	});

	// animate all below hash
	const otherTexts = document.querySelectorAll('.project-base h2, .project-base h5, .project-base p, .project-base .image, section#about-me .about-wrapper, section#about-me h6, section#technologies h6, section#technologies .img-wrapper');
	otherTexts.forEach(element => {
		gsap.from(element, {
			scrollTrigger: {
				trigger: element,
				start: 'top 70%',
			},
			y: 50,
			opacity: 0,
			duration: 0.5,
			stagger: 0.3
		});
	});

	// animate elements that are on top of the screen when scrolling, move them to sides, create parallax effect
	const animateOnScroll = (elements, direction) => {
		elements.forEach((element, index) => {
			// check if element is in viewport
			if (element.getBoundingClientRect().top > window.innerHeight) {
				return;
			}

			let sign = "";
			if (direction === "right") {
				sign = "+";
			} else if (direction === "left") {
				sign = "-";
			}

			element.style.transform = `translateX(${sign + window.scrollY / 25}px)`;
		});
	};

	document.addEventListener("scroll", () => {
		if (window.innerWidth < 768 || window.location.hash != "#home") {
			return;
		}

		const h1 = document.querySelectorAll("header .heading-text h1");
		const h2 = document.querySelectorAll("header .heading-text h2");
		const p = document.querySelectorAll("header .heading-text p");
		const btn = document.querySelectorAll(
			"header .heading-text .button-wrapper"
		);
		const logo = document.querySelectorAll("header .heading-logo img");
		animateOnScroll(h2, "left");
		animateOnScroll(h1, "right");
		animateOnScroll(p, "left");
		animateOnScroll(btn, "right");
		animateOnScroll(logo, "left");
	});

	let coloredSections = gsap.utils.toArray("[data-color]");
	coloredSections.forEach((section, i) => {
		// grab the colors from the attribute
		let [bgColor, color] = section.getAttribute("data-color").split(" ");
		ScrollTrigger.create({
			trigger: section,
			start: "550 bottom",
			end: "+=100%",
			onToggle: (self) => {
				// whenever we enter a section from either direction (scrolling up or down), animate to its color
				if (self.isActive) {
					gsap.to("body", {
						backgroundColor: bgColor,
						color: color,
						overwrite: "auto",
					});
					// when we LEAVE the very first section scrolling in reverse -OR- when we scroll past the very last section (forward), return to the "normal" colors
				} else if (
					(i === 0 && self.direction < 0) ||
					(i === coloredSections.length - 1 && self.direction > 0)
				) {
					gsap.to("body", {
						backgroundColor: "#e9f3fb",
						color: "#585858",
						overwrite: "auto",
					});
				}
			},
		});
	});
}