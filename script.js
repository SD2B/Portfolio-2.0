/**
 * Sanoop Das M - Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initProjectDetails();
    initTicTacToe();
    initRockPaperScissors();
    initMemoryGame();
    initContactForm();
});

// 1. Navigation
function initNavbar() {
    const header = document.querySelector('header');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.innerText = navLinks.classList.contains('active') ? 'Close' : 'Menu';
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuBtn) menuBtn.innerText = 'Menu';
        });
    });
}

// 2. Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 3. Scroll Animations
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// 3.5 Project Details (Separate Page)
function initProjectDetails() {
    const container = document.getElementById('project-details-content');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    const projectData = {
        'billmate': {
            title: 'DB Billmate',
            description: 'A comprehensive Windows Desktop billing software tailored for retail stores.',
            details: [
                'Built with Flutter for Windows.',
                'Offline-first architecture with local database synchronization.',
                'Supports thermal printing and barcode scanning.',
                'Inventory management and sales reporting modules.'
            ]
        },
        'bullion-live': {
            title: 'Bullion Live Rate Apps',
            description: 'Real-time tracking applications for gold and silver market rates.',
            details: [
                'Low-latency WebSocket integration for live price updates.',
                'Interactive historical charts using custom painters.',
                'Push notifications for price alerts.',
                'Available on Android and iOS.'
            ]
        },
        'bullion-trade': {
            title: 'Bullion Trading Apps',
            description: 'Secure platforms for trading precious metals with live execution.',
            details: [
                'Secure authentication and KYC integration.',
                'Real-time order execution and portfolio tracking.',
                'Integration with multiple payment gateways.',
                'Multi-currency support.'
            ]
        },
        'ecommerce': {
            title: 'Jewelry Ecommerce Apps',
            description: 'Elegant shopping experiences for high-end jewelry brands.',
            details: [
                'High-fidelity UI with smooth animations.',
                'AR integration for "Try-On" features.',
                'Complex product filtering and search.',
                'Seamless checkout experience.'
            ]
        },
        'xellar': {
            title: 'Xellar FX Live',
            description: 'Xellar FX Live is a high-performance trading platform designed for modern traders.',
            details: [
                'Trade on Metals, Crypto, and Forex markets in one place.',
                'Advanced referral section with a tiered reward system.',
                'Real-time market analysis and technical indicators.',
                'Fast execution speeds and intuitive user interface.',
                'Secure wallet integration for crypto transactions.'
            ]
        }
    };

    const data = projectData[projectId];
    
    if (data) {
        document.title = `${data.title} | Sanoop Das M`;
        container.innerHTML = `
            <h1 style="font-size: 3rem; margin-bottom: 2rem;">${data.title}</h1>
            <div class="grid" style="grid-template-columns: 1fr; gap: 3rem;">
                <div class="project-info">
                    <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Overview</h2>
                    <p style="font-size: 1.1rem; line-height: 1.8;">${data.description}</p>
                    
                    <h2 style="font-size: 1.5rem; margin-top: 2.5rem; margin-bottom: 1rem;">Key Features</h2>
                    <ul style="list-style: none; padding: 0;">
                        ${data.details.map(detail => `
                            <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative;">
                                <span style="position: absolute; left: 0; top: 0;">&bull;</span>
                                ${detail}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <h1>Project Not Found</h1>
            <p>Sorry, the project you're looking for doesn't exist.</p>
        `;
    }
}

// 4. Games - Tic Tac Toe
function initTicTacToe() {
    const container = document.getElementById('ttt-game');
    if (!container) return;

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const statusDisplay = document.createElement('div');
    statusDisplay.className = 'game-status';
    statusDisplay.innerHTML = `Player X's turn`;

    const grid = document.createElement('div');
    grid.className = 'ttt-grid';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'ttt-cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        grid.appendChild(cell);
    }

    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn';
    resetBtn.style.marginTop = '1rem';
    resetBtn.style.padding = '0.5rem 1rem';
    resetBtn.innerText = 'Reset';
    resetBtn.addEventListener('click', resetGame);

    container.appendChild(statusDisplay);
    container.appendChild(grid);
    container.appendChild(resetBtn);

    function handleCellClick(e) {
        const index = e.target.getAttribute('data-index');
        if (board[index] !== '' || !gameActive) return;

        board[index] = currentPlayer;
        e.target.innerText = currentPlayer;
        
        checkResult();
    }

    function checkResult() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        let roundWon = false;
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (!board.includes('')) {
            statusDisplay.innerHTML = `Draw!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        statusDisplay.innerHTML = `Player X's turn`;
        document.querySelectorAll('.ttt-cell').forEach(cell => cell.innerText = '');
    }
}

// 5. Games - Rock Paper Scissors
function initRockPaperScissors() {
    const container = document.getElementById('rps-game');
    if (!container) return;

    const choices = ['Rock', 'Paper', 'Scissors'];
    
    const resultDisplay = document.createElement('div');
    resultDisplay.className = 'game-status';
    resultDisplay.innerHTML = 'Choose your weapon!';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'rps-buttons';

    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'rps-btn';
        btn.innerText = choice;
        btn.onclick = () => play(choice);
        btnContainer.appendChild(btn);
    });

    container.appendChild(resultDisplay);
    container.appendChild(btnContainer);

    function play(userChoice) {
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        let result = '';

        if (userChoice === computerChoice) {
            result = "It's a tie!";
        } else if (
            (userChoice === 'Rock' && computerChoice === 'Scissors') ||
            (userChoice === 'Paper' && computerChoice === 'Rock') ||
            (userChoice === 'Scissors' && computerChoice === 'Paper')
        ) {
            result = 'You win!';
        } else {
            result = 'Computer wins!';
        }

        resultDisplay.innerHTML = `You: ${userChoice} | CPU: ${computerChoice}<br><strong>${result}</strong>`;
    }
}

// 6. Games - Memory Game
function initMemoryGame() {
    const container = document.getElementById('memory-game');
    if (!container) return;

    const symbols = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let shuffled = symbols.sort(() => Math.random() - 0.5);
    let flippedCards = [];
    let matchedPairs = 0;

    const grid = document.createElement('div');
    grid.className = 'memory-grid';

    shuffled.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });

    container.appendChild(grid);

    function flipCard(card) {
        if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

        card.classList.add('flipped');
        card.innerText = card.dataset.symbol;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.symbol === card2.dataset.symbol) {
            matchedPairs++;
            if (matchedPairs === 8) {
                alert('You won the memory game!');
            }
        } else {
            card1.classList.remove('flipped');
            card1.innerText = '';
            card2.classList.remove('flipped');
            card2.innerText = '';
        }
        flippedCards = [];
    }
}

// 7. Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form-el');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('name');
        
        // Simulate form submission
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            alert(`Thanks ${name}! Your message has been sent (simulated).`);
            form.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
}
