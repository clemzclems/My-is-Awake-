document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight active section in navigation
    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY + 100;
        links.forEach(link => {
            const targetId = link.getAttribute("href").substring(1);
            const section = document.getElementById(targetId);
            if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                links.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });

    // Load blog content dynamically using Markdown.js (if present)
    fetch("blog/blog.md")
        .then(response => response.text())
        .then(text => {
            if (typeof markdown !== "undefined") {
                document.getElementById("blog-content").innerHTML = markdown.toHTML(text);
            } else {
                document.getElementById("blog-content").innerHTML = "<p>Error loading blog content.</p>";
            }
        })
        .catch(error => console.error("Error loading blog:", error));
});
