const posts = [
  "posty/test-post.html",
];

async function loadPosts() {
    const container = document.getElementById("post-list");

    const detailedPosts = [];
    for (const post of posts) {
        try {
            const response = await fetch(post);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            const title = doc.querySelector('meta[name="post-title"]').content;
            const date = doc.querySelector('meta[name="post-date"]').content;
            const img = doc.querySelector('meta[name="post-img"]').content;

            detailedPosts.push({
                post,
                title,
                date: new Date(date),
                img
            });
        } catch (error) {
            console.error("Błąd ładowania posta:", post, error);
        }
    }

    detailedPosts.sort((a, b) => b.date - a.date);

    for (const postData of detailedPosts) {
        const article = document.createElement("article");
        article.innerHTML = `
            <a href="${postData.post}">
                <img src="${postData.img}" alt="Miniatura posta" class="miniatura">
                <h2>${postData.title}</h2>
            </a>
            <p class="data">${postData.date.toISOString().split('T')[0]}</p>
        `;
        container.appendChild(article);
    }
}

loadPosts();
