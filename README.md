# Vanilla JS Drop-in Annotation System

A zero-dependency, self-contained commenting and highlighting tool for any static HTML page. This system allows users to annotate text, auto-saves their comments locally, and lets them share their comments with others via compressed links or JSON files, all without requiring a server or external libraries.

## Core Features

*   **Self-Contained:** The entire system—HTML, CSS, and JavaScript—can be pasted into any existing static HTML file, right at the end. No external files, build systems, or anything else are needed.
*   **Zero Dependencies:** Written in modern, vanilla JavaScript. No need for jQuery, React, Vue, or any other framework.
*   **Purely Client-Side:** All data is processed and stored exclusively in the user's browser. No server is required, and no data is ever sent over the network, ensuring complete privacy.
*   **Persistent Local Storage:** Comments are automatically saved to the browser's `localStorage`, so they persist even after closing the tab or browser.
*   **Robust Highlighting:** The system can reliably highlight anything from a single word to selections that span multiple paragraphs.
*   **Resilient Data Model:** Annotations are saved using a precise DOM path, with a smart text-search fallback to ensure that comments can be imported and restored even if the underlying page structure has minor changes.
*   **Two Ways to Share:**
    1.  **Shareable Links:** Generates a compressed, URL-safe Base64 link that contains all comment data. Perfect for directly sharing an annotated version of the page.
    2.  **Import/Export:** Users can download their comments as a `.json` file for backup or sharing extremely large comment sets (over 1,740 comments, which is the length at which Chrome stops displaying URL characters), and import files from others.
*   **Intuitive UI & UX:**
    *   An immersive UI that tries to remain as unobtrusive as possible.
    *   A central management widget that appears on hover.
    *   A complete comment summary at the end of the document for easy navigation.
    *   Helpful keyboard shortcuts (`Shift+Enter` to comment/submit, `Esc` to cancel).
    *   Click-to-show tooltips with easy comment deletion.
    *   Fully responsive for both desktop and mobile use.

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

## How It Works

The system is designed for maximum resilience and portability.

*   **Annotation Positioning:** When a comment is created, the system saves the precise location of the highlight using a serialized DOM `Range`. This includes the node path from the root element and character offsets. When loading comments, it attempts to reconstruct this path.
*   **Resilient Fallback:** If a path cannot be found (due to minor HTML changes or browser parsing differences), the system intelligently falls back to searching for the highlight's saved text content within the expected area, dramatically increasing the durability of saved comments.
*   **Shareable Link Compression:** To avoid creating impractically long URLs, the "Copy Link" feature first compresses the entire JSON data of the comments using the browser's built-in Gzip compression stream before encoding it into a URL-safe Base64 string. This reduces the final data size by over 90%, making links practical for sharing.

## Vibe Coding Disclaimer

Usually even when I do AI-assisted coding I read every diff, design every architecture and algorithm decision before I even talk to the LLM, and I'm very careful and picky. I also use agentic coding systems to have tigher control over what they do, since every change is diffed. Not so here. I did this straight in a Gemini 2.5 Pro chat and literally didn't look at the code at all. So take that as you will. I'm not claiming this is my work, just that it's a really useful little tool for me, to replace the only thing I use Google Docs for, and someone might find it useful too.
