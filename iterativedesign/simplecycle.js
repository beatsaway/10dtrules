// simplecycle.js (clean & polished)
(function () {
    const style = document.createElement('style');
    style.textContent = `
    .sc-cycle-container {
        position: relative;
        width: 160px;
        height: 160px;
        margin: 24px auto;
    }
    .sc-cycle-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 2.5px dashed #ccc;
        border-radius: 50%;
        left: 0;
        top: 0;
        box-sizing: border-box;
        animation: sc-rotate 40s linear infinite;
    }
    @keyframes sc-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .sc-step {
        position: absolute;
        width: 56px;
        height: 56px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
        text-align: center;
    }
    .sc-emoji {
        font-size: 26px;
        line-height: 1;
    }
    .sc-label {
        font-size: 12px;
        font-weight: 500;
        margin-top: 2px;
        color: #333;
        animation: sc-breathe 3.2s cubic-bezier(0.4,0,0.6,1) infinite;
    }
    @keyframes sc-breathe {
        0% { transform: scale(1); }
        20% { transform: scale(1.10); }
        50% { transform: scale(0.97); }
        80% { transform: scale(1.10); }
        100% { transform: scale(1); }
    }
    `;
    document.head.appendChild(style);

    const steps = [
        { emoji: '❓', label: 'Research' },
        { emoji: '💡', label: 'Design' },
        { emoji: '🔧', label: 'Make' },
        { emoji: '👥', label: 'Evaluate' }
    ];

    function createSimpleCycle() {
        const container = document.createElement('div');
        container.className = 'sc-cycle-container';

        const ring = document.createElement('div');
        ring.className = 'sc-cycle-ring';
        container.appendChild(ring);

        const centerX = 80;
        const centerY = 80;
        const stepSize = 56;
        const radius = 64; // adjusted for larger container
        const n = steps.length;

        steps.forEach((step, i) => {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2; // start from top
            const x = centerX + radius * Math.cos(angle) - stepSize / 2;
            const y = centerY + radius * Math.sin(angle) - stepSize / 2;

            const stepDiv = document.createElement('div');
            stepDiv.className = 'sc-step';
            stepDiv.style.left = `${x}px`;
            stepDiv.style.top = `${y}px`;

            const emoji = document.createElement('span');
            emoji.className = 'sc-emoji';
            emoji.textContent = step.emoji;

            const label = document.createElement('span');
            label.className = 'sc-label';
            label.textContent = step.label;

            stepDiv.appendChild(emoji);
            stepDiv.appendChild(label);
            container.appendChild(stepDiv);
        });

        return container;
    }

    function insertSimpleCycles() {
        document.querySelectorAll('.simple-cycle').forEach(div => {
            div.innerHTML = '';
            div.appendChild(createSimpleCycle());
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertSimpleCycles);
    } else {
        insertSimpleCycles();
    }
})();