// iterativecycle.js
(function() {
    // --- Styles ---
    const style = document.createElement('style');
    style.textContent = `
    .ic-cycle-container {
        position: relative;
        width: 250px;
        height: 250px;
        margin: 40px auto;
        display: block;
    }
    .ic-cycle-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 4px dashed #3498db;
        border-radius: 50%;
        animation: ic-rotate 60s linear infinite;
    }
    @keyframes ic-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .ic-tag {
        position: absolute;
        background-color: #fff;
        padding: 7px 12px;
        border-radius: 18px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 7px;
        font-size: 16px;
        min-width: 90px;
        max-width: 140px;
        width: max-content;
        cursor: pointer;
        font-family: 'Inter', 'Segoe UI', 'Roboto', Arial, sans-serif;
    }
    .ic-tag .ic-emoji {
        font-size: 24px;
    }
    .ic-explanation {
        display: none;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        padding: 8px 12px;
        font-size: 13px;
        color: #333;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 100%;
        z-index: 2;
        width: max-content;
        max-width: 180px;
        min-width: 120px;
        transform: translateX(-50%);
        font-family: 'Inter', 'Segoe UI', 'Roboto', Arial, sans-serif;
        font-weight: normal;
    }
    .ic-explanation strong {
        font-weight: 600;
    }
    .ic-tag[data-type="research"] {
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #f9e8fc;
        color: #8e44ad;
    }
    .ic-tag[data-type="design"] {
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
        background-color: #e8f4fc;
        color: #2980b9;
    }
    .ic-tag[data-type="make"] {
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        background-color: #fef2e7;
        color: #e67e22;
    }
    .ic-tag[data-type="evaluate"] {
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        background-color: #e9f7ef;
        color: #27ae60;
    }
    `;
    document.head.appendChild(style);

    // --- Data ---
    const steps = [
        {
            type: 'research',
            label: 'Research',
            emojis: ["🔬", "🌎", "🧠", "🔎", "💻"],
            explanation: '<strong>Explore</strong> and <strong>identify</strong> user problems and design opportunities.'
        },
        {
            type: 'design',
            label: 'Design',
            emojis: ["🎨", "✏️", "💡", "🌈", "🧩"],
            explanation: '<strong>Generate</strong>, <strong>develop</strong> and <strong>communicate</strong> creative ideas using annotated sketches and prototypes.'
        },
        {
            type: 'make',
            label: 'Make',
            emojis: ["🛠️", "🔨", "⚙️", "🏗️", "🧰"],
            explanation: '<strong>Select</strong> and <strong>use</strong> specialist tools and equipment to <strong>create</strong> quality products.'
        },
        {
            type: 'evaluate',
            label: 'Evaluate',
            emojis: ["🔍", "✅", "📊", "🧪", "⚖️"],
            explanation: '<strong>Test</strong>, <strong>analyse</strong> and <strong>refine</strong> ideas against <strong>specifications</strong>, for better <strong>user experience</strong>.'
        }
    ];

    // --- Create DOM ---
    function createCycle() {
        const container = document.createElement('div');
        container.className = 'ic-cycle-container';

        // Ring
        const ring = document.createElement('div');
        ring.className = 'ic-cycle-ring';
        container.appendChild(ring);

        // Tags
        steps.forEach((step, idx) => {
            const tag = document.createElement('div');
            tag.className = 'ic-tag';
            tag.setAttribute('data-type', step.type);
            tag.id = `ic-${step.type}-tag`;

            // Emoji
            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'ic-emoji';
            emojiSpan.textContent = step.emojis[0];
            tag.appendChild(emojiSpan);

            // Label
            const labelSpan = document.createElement('span');
            labelSpan.textContent = step.label;
            tag.appendChild(labelSpan);

            // Explanation
            const explanationDiv = document.createElement('div');
            explanationDiv.className = 'ic-explanation';
            explanationDiv.id = `ic-${step.type}-explanation`;
            tag.appendChild(explanationDiv);

            // Toggle explanation on click
            tag.addEventListener('click', function(e) {
                e.stopPropagation();
                if (e.target === explanationDiv) return;
                explanationDiv.innerHTML = step.explanation;
                explanationDiv.style.display = explanationDiv.style.display === 'block' ? 'none' : 'block';
            });

            container.appendChild(tag);
        });

        // Emoji cycling
        let emojiIndices = [0, 0, 0, 0];
        setInterval(() => {
            container.querySelectorAll('.ic-tag').forEach((tag, i) => {
                const emojiSpan = tag.querySelector('.ic-emoji');
                const emojis = steps[i].emojis;
                emojiIndices[i] = (emojiIndices[i] + 1) % emojis.length;
                emojiSpan.textContent = emojis[emojiIndices[i]];
            });
        }, 1000);

        return container;
    }

    // --- Insert into page ---
    function insertCycle() {
        let mount = document.getElementById('iterative-cycle');
        if (!mount) {
            mount = document.createElement('div');
            document.body.appendChild(mount);
        }
        mount.appendChild(createCycle());
    }

    // Wait for DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertCycle);
    } else {
        insertCycle();
    }
})(); 