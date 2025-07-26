document.addEventListener("DOMContentLoaded", () => {
    const topbarContainer = document.getElementById("topbar-container");

    fetch("topbar.html")
        .then(res => res.text())
        .then(html => {
            topbarContainer.innerHTML = html;

            // 淡入效果
            topbarContainer.style.opacity = 0;
            setTimeout(() => {
                topbarContainer.style.transition = "opacity 0.6s ease-in-out";
                topbarContainer.style.opacity = 1;
            }, 50);
        });
});
