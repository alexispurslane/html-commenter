# HTML Commenter
## A vanilla JS drop-in annotation system for static HTML pages

HTML Commenter is a zero-dependency, self-contained document annotation tool for any static HTML page. This system allows users to annotate the text on a web page, auto-saves their comments to local storage, and lets them share their comments with others via compressed links or back them up with JSON files, all without requiring a server or external libraries.

The goal of this project is to provide a lightweight collaborative document annotation experience for people who:

- don't want to use SaaS
- don't want to have to install and maintain software on their own server
- don't want to ask users to install software (like LibreOffice)
- don't want to have to send multiple versions of files around like it's 1990 and we're dealing with Word Documents
- prefer writing in plain markup languages (like Markdown, Org, or HTML), exporting to HTML, and posting their writing to their domain (either self hosted or on things like NeoCities)

## Core Features

-   **Self-Contained:** The entire system—HTML, CSS, and JavaScript—can be pasted into any existing static HTML file, right at the end. No external files, build systems, or anything else are needed. No assumptions about HTML page layout are made.
-   **Zero Dependencies:** Written in modern, vanilla JavaScript. No need for jQuery, React, Vue, or any other framework.
-   **Purely Client-Side:** All data is processed and stored exclusively in the user's browser. No server is required, and no data is ever sent over the network, ensuring complete privacy and **zero setup** for anyone.
-   **Persistent Local Storage:** Comments are automatically saved to the browser's `localStorage`, so they persist even after closing the tab or browser.
-   **Robust Highlighting:** The system can reliably highlight anything from text within an element to selections that span multiple elements, anywhere on the page.
-   **Two Ways to Share:**
    1.  **Shareable Links:** Generates a compressed, URL-safe Base64 link that contains all comment data as an anchor on the URL to the document the comments are on. Perfect for directly sharing an annotated version of a page for collaboration: one click, and someone can immediately see the document and import your annotations to their local storage, with zero downloading or installation.
    2.  **Import/Export:** Users can download their comments as a `.json` file for backup or sharing extremely large comment sets (over ~2,300 comments and the URLs might run into browser issues), and import files from others.
-   **Best-case Collaboration Features:** When you import other people's comments, your own are preserved, and next time you export, the combined comments are exported together, allowing conversations (made easier with self-contained link sharing). Even better, the authorship of each comment is maintained, with different author names and associated colors (based on a hash function). On top of that, "resolve" functionality allows you to mark which comments you've delt with in your local database without losing comment history.
-   **Intuitive UI & UX:**
    -   An immersive UI that tries to remain as unobtrusive as possible.
    -   A central management widget that appears on hover.
    -   A complete comment list at the end of the document for easy navigation.
    -   Helpful keyboard shortcuts (`Shift+Enter` to comment/submit, `Esc` to cancel).
    -   Click-to-show tooltips with easy comment deletion.
    -   Fully responsive for both desktop and mobile use.
    -   Click on the management widget to jump to the next comment, to save you scrolling in long documents.
-   **Resilient Data Model:** Annotations are saved using a precise DOM path, with a smart text-search fallback to ensure that comments can be imported and restored even if the underlying page structure has minor changes.
    
## Installation

Adding this system to any existing HTML page is a simple three-step process:

1.  **Add the HTML:** Copy the HTML for the UI elements and paste it right before the closing `</body>` tag in your file. This includes the main UI container, the corner widget, and the comment summary section.

2.  **Add the CSS:** Copy the entire `<style>...</style>` block and paste it inside your `<head>` tag or right before the HTML you just added.

3.  **Add the JavaScript:** Copy the entire final `<script>...</script>` block and paste it at the very end of your file, right before the closing `</body>` tag and after the UI HTML.

    **Important:** The script initializes itself by targeting the element with the ID `content`. If your main text container has a different ID, simply change the last line of the script:
    ```javascript
    // Change 'content' to the ID of your main text container
    document.addEventListener('DOMContentLoaded', () => {
      initializeCommentingSystem('your-content-id-here');
    });
    ```

That's it! Your page now has a complete annotation system.

## Vibe Coding Disclaimer

When I do AI-assisted coding I use agentic systems to maintain tigher control with finer-grained changes, and I usually read every diff, design every architecture and algorithm decision before I even talk to the LLM, and I'm very careful and picky. Not so here. I did this straight in a Gemini 2.5 Pro chat and literally didn't look at the code at all. So take that as you will. I'm not claiming this is my work, just that it's a really useful little tool for me, to replace the only thing I use Google Docs for, and someone might find it useful too.
