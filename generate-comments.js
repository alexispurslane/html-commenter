const fs = require('fs');

// Generate a CID based on comment data
function generateCID(commentData) {
    const str = commentData.range.text + commentData.author + commentData.text;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return 'cid-' + Math.abs(hash).toString(36);
}

// Sample text snippets from try.html that we can highlight
const textSnippets = [
    "HTML Commenter is a zero-dependency, self-contained document annotation tool",
    "don't want to use SaaS",
    "don't want to have to install and maintain software on their own server",
    "don't want to ask users to install software (like LibreOffice)",
    "prefer writing in plain markup languages (like Markdown, Org, or HTML)",
    "Self-Contained: The entire system—HTML, CSS, and JavaScript",
    "Zero Dependencies: Written in modern, vanilla JavaScript",
    "Purely Client-Side: All data is processed and stored exclusively",
    "Persistent Local Storage: Comments are automatically saved",
    "Robust Highlighting: The system can reliably highlight anything",
    "Shareable Links: Generates a compressed, URL-safe Base64 link",
    "Import/Export: Users can download their comments as a .json file",
    "Best-case Collaboration Features: When you import other people's comments",
    "Intuitive UI & UX: An immersive UI that tries to remain as unobtrusive",
    "Resilient Data Model: Annotations are saved using a precise DOM path",
    "Add the HTML: Copy the HTML for the UI elements",
    "Add the CSS: Copy the entire <style>...</style> block",
    "Add the JavaScript: Copy the entire final <script>...</script> block",
    "Vibe Coding Disclaimer: When I do AI-assisted coding",
    "zero-dependency, self-contained commenting and highlighting tool"
];

// DOM paths for different parts of the document
const domPaths = [
    [3, 0, 0, 0], // HTML Commenter heading
    [3, 0, 1, 0], // First paragraph
    [3, 0, 2, 0], // Second paragraph
    [3, 0, 3, 0, 0], // First list item
    [3, 0, 3, 1, 0], // Second list item
    [3, 0, 3, 2, 0], // Third list item
    [3, 0, 3, 3, 0], // Fourth list item
    [3, 0, 3, 4, 0], // Fifth list item
    [3, 0, 4, 0, 0], // Core Features heading
    [3, 0, 5, 0, 0], // First feature
    [3, 0, 5, 1, 0], // Second feature
    [3, 0, 5, 2, 0], // Third feature
    [3, 0, 5, 3, 0], // Fourth feature
    [3, 0, 5, 4, 0], // Fifth feature
    [3, 0, 5, 5, 0], // Sixth feature
    [3, 0, 5, 6, 0, 0], // First sub-feature
    [3, 0, 5, 6, 0, 1], // Second sub-feature
    [3, 0, 5, 6, 0, 2], // Third sub-feature
    [3, 0, 5, 6, 0, 3], // Fourth sub-feature
    [3, 0, 5, 6, 0, 4], // Fifth sub-feature
    [3, 0, 5, 6, 0, 5], // Sixth sub-feature
    [3, 0, 5, 6, 0, 6], // Seventh sub-feature
    [3, 0, 23, 0, 0], // Installation heading
    [3, 0, 24, 0], // Installation paragraph
    [3, 0, 25, 0, 0], // First installation step
    [3, 0, 25, 1, 0], // Second installation step
    [3, 0, 25, 2, 0], // Third installation step
    [3, 0, 27, 0] // Final paragraph
];

// Generate 150 comments
const comments = [];
const baseTime = Date.now() - 1000000; // Start time 1 million seconds ago

for (let i = 0; i < 150; i++) {
    // Select a random text snippet
    const snippet = textSnippets[i % textSnippets.length];
    
    // Select a random DOM path
    const domPath = domPaths[i % domPaths.length];
    
    // Create a comment object
    const commentData = {
        text: `This is test comment #${i + 1} about: ${snippet.substring(0, 30)}...`,
        range: {
            startPath: [...domPath],
            startOffset: 0,
            endPath: [...domPath],
            endOffset: Math.min(10, snippet.length),
            text: snippet.substring(0, Math.min(10, snippet.length))
        },
        author: `Test User ${Math.floor(i / 10) + 1}`,
        isResolved: i % 10 === 0, // Every 10th comment is resolved
        createdAt: baseTime + i * 1000,
        updatedAt: baseTime + i * 1000 + 500
    };
    
    // Generate CID
    const cid = generateCID(commentData);
    
    // Add CID to comment
    comments.push({
        cid,
        ...commentData
    });
}

// Write to file
fs.writeFileSync('test-150-comments.json', JSON.stringify(comments, null, 2));
console.log('Generated test-150-comments.json with 150 comments');