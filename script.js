/* ===================================
   5 STAR IMPORTS - STRATEGIC BLUEPRINT
   Main JavaScript File
   
   This file handles:
   - Mobile menu toggle
   - Tab navigation for Blueprint section
   - Chart.js initialization for projections
   - OpenAI API integration (AI Playground)
   - Retell AI voice agent demo structure
   =================================== */

// ===================================
// API CONFIGURATION
// ===================================

// NOTE: For security, OpenAI API calls are now handled by a Netlify serverless function
// No API key needed in client-side code!
// Set your OPENAI_API_KEY in Netlify dashboard: Site settings > Environment variables

// NOTE: Retell AI credentials are now stored securely in Netlify environment variables
// RETELL_API_KEY and RETELL_AGENT_ID are set in Netlify dashboard
// The serverless function handles all secure API calls

// ===================================
// MOBILE MENU TOGGLE
// ===================================

// Get mobile menu elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Toggle mobile menu visibility when button is clicked
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked (for smooth UX)
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ===================================
// TAB NAVIGATION FOR BLUEPRINT SECTION
// ===================================

// Get all tab buttons and content panels
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Add click event listener to each tab button
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the target tab content ID from data attribute
        const targetTab = button.getAttribute('data-tab');
        
        // Remove 'active' class from all tab buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add 'active' class to the clicked button
        button.classList.add('active');
        
        // Hide all tab content panels
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Show the target tab content panel
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ===================================
// CHART.JS INITIALIZATION
// ===================================

// Wait for DOM to be fully loaded before initializing charts
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
});

/**
 * Initialize both Chart.js charts with brand colors
 */
function initializeCharts() {
    // Brand colors from CSS variables
    const brandRed = '#CC0000';
    const brandBlack = '#1A1A1A';
    const darkGray = '#6B7280';
    const lightGray = '#F9F9F9';
    
    // ===================================
    // CHART 1: MONTHLY QUALIFIED LEADS (Bar Chart)
    // ===================================
    
    const leadsCtx = document.getElementById('leadsChart').getContext('2d');
    
    new Chart(leadsCtx, {
        type: 'bar',
        data: {
            labels: ['Current', 'With AI Integration'],
            datasets: [{
                label: 'Monthly Qualified Leads',
                data: [45, 160], // Current: 45, With AI: 160 (250% increase)
                backgroundColor: [darkGray, brandRed],
                borderColor: [darkGray, brandRed],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Hide legend for cleaner look
                },
                tooltip: {
                    backgroundColor: brandBlack,
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        // Custom tooltip to show percentage increase
                        label: function(context) {
                            const value = context.parsed.y;
                            if (context.dataIndex === 1) {
                                return `${value} leads (+256% increase)`;
                            }
                            return `${value} leads`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: darkGray,
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: darkGray,
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                }
            }
        }
    });
    
    // ===================================
    // CHART 2: SALES FUNNEL EFFICIENCY (Horizontal Bar Chart)
    // ===================================
    
    const funnelCtx = document.getElementById('funnelChart').getContext('2d');
    
    new Chart(funnelCtx, {
        type: 'bar',
        data: {
            labels: ['Lead Response Time', 'Lead Qualification Rate', 'Lead-to-Appointment', 'Close Rate'],
            datasets: [
                {
                    label: 'Current',
                    data: [35, 42, 28, 15], // Current efficiency percentages
                    backgroundColor: darkGray,
                    borderColor: darkGray,
                    borderWidth: 2
                },
                {
                    label: 'Projected with AI',
                    data: [90, 75, 58, 28], // Projected efficiency with AI
                    backgroundColor: brandRed,
                    borderColor: brandRed,
                    borderWidth: 2
                }
            ]
        },
        options: {
            indexAxis: 'y', // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: darkGray,
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: brandBlack,
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.x}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: darkGray,
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + '%'; // Add percentage symbol
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: darkGray,
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// ===================================
// AI TOOLS PLAYGROUND - GEMINI LLM INTEGRATION
// ===================================

// ===================================
// TOOL 1: AI MARKETING COPY GENERATOR
// ===================================

const generateCopyBtn = document.getElementById('generateCopyBtn');
const carModelInput = document.getElementById('carModel');
const uspInput = document.getElementById('usp');
const copyOutput = document.getElementById('copyOutput');
const copyResult = document.getElementById('copyResult');
const copyBtnText = document.getElementById('copyBtnText');
const copySpinner = document.getElementById('copySpinner');

// Event listener for "Generate Ad Copy" button
generateCopyBtn.addEventListener('click', async () => {
    // Get input values
    const carModel = carModelInput.value.trim();
    const usp = uspInput.value.trim();
    
    // Validate inputs
    if (!carModel || !usp) {
        alert('Please fill in both fields before generating.');
        return;
    }
    
    // No need to check API key here - it's handled securely by Netlify function
    
    // Show loading state
    copyBtnText.textContent = 'Generating...';
    copySpinner.classList.remove('hidden');
    generateCopyBtn.disabled = true;
    
    try {
        // Construct the prompt for OpenAI
        const prompt = `You are an expert luxury automotive copywriter. Create a sophisticated, concise social media ad (under 60 words) for a ${carModel} with the unique selling point: ${usp}. The tone should be premium, aspirational, and compelling. Focus on exclusivity and quality.`;
        
        // Call OpenAI API
        const result = await callOpenAI(prompt);
        
        // Display the result
        copyResult.textContent = result;
        copyOutput.classList.remove('hidden');
        
    } catch (error) {
        // Handle errors gracefully
        console.error('Error generating copy:', error);
        alert('Error generating ad copy. Please check your API key and try again.');
    } finally {
        // Reset button state
        copyBtnText.textContent = 'Generate Ad Copy';
        copySpinner.classList.add('hidden');
        generateCopyBtn.disabled = false;
    }
});

// ===================================
// TOOL 2: AI SALES FOLLOW-UP EMAIL DRAFT
// ===================================

const generateEmailBtn = document.getElementById('generateEmailBtn');
const leadContextInput = document.getElementById('leadContext');
const emailOutput = document.getElementById('emailOutput');
const emailResult = document.getElementById('emailResult');
const emailBtnText = document.getElementById('emailBtnText');
const emailSpinner = document.getElementById('emailSpinner');

// Event listener for "Generate Follow-up Email" button
generateEmailBtn.addEventListener('click', async () => {
    // Get input value
    const leadContext = leadContextInput.value.trim();
    
    // Validate input
    if (!leadContext) {
        alert('Please provide lead context before generating.');
        return;
    }
    
    // No need to check API key here - it's handled securely by Netlify function
    
    // Show loading state
    emailBtnText.textContent = 'Generating...';
    emailSpinner.classList.remove('hidden');
    generateEmailBtn.disabled = true;
    
    try {
        // Construct the prompt for OpenAI
        const prompt = `You are a professional automotive sales representative at a luxury dealership. Write a personalized, professional follow-up email (under 100 words) based on this context: ${leadContext}. The email should be warm, helpful, include a clear next step, and maintain a premium tone. Sign it as "The 5 Star Imports Team".`;
        
        // Call OpenAI API
        const result = await callOpenAI(prompt);
        
        // Display the result
        emailResult.textContent = result;
        emailOutput.classList.remove('hidden');
        
    } catch (error) {
        // Handle errors gracefully
        console.error('Error generating email:', error);
        alert('Error generating email. Please check your API key and try again.');
    } finally {
        // Reset button state
        emailBtnText.textContent = 'Generate Follow-up Email';
        emailSpinner.classList.add('hidden');
        generateEmailBtn.disabled = false;
    }
});

// ===================================
// SECURE API FUNCTION (via Netlify Serverless Function)
// ===================================

/**
 * Calls the Netlify serverless function which securely handles OpenAI API calls
 * @param {string} prompt - The text prompt to send
 * @returns {Promise<string>} - The generated text response
 */
async function callOpenAI(prompt) {
    // Call your Netlify serverless function
    // In production: /.netlify/functions/generate-ai-content
    // For local development: http://localhost:8888/.netlify/functions/generate-ai-content
    const functionUrl = '/.netlify/functions/generate-ai-content';
    
    // Request payload - just the prompt, API key stays secure on server
    const requestBody = {
        prompt: prompt
    };
    
    // Make the API call to your serverless function
    const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    
    // Check if request was successful
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Request failed: ${errorData.error || 'Unknown error'}`);
    }
    
    // Parse the response
    const data = await response.json();
    
    // Extract the generated text from the serverless function response
    const generatedText = data.result;
    
    return generatedText;
}

// ===================================
// RETELL AI VOICE AGENT INTEGRATION DEMO
// ===================================

// Get Retell AI demo elements
const connectRetellBtn = document.getElementById('connectRetellBtn');
const connectionStatus = document.getElementById('connectionStatus');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const micIcon = document.getElementById('micIcon');
const transcriptArea = document.getElementById('transcriptArea');
const transcript = document.getElementById('transcript');

// Retell Web Client instance
let retellWebClient = null;

// Call status tracking
let isCallActive = false;

// Event listener for "Connect to AI Agent" button
connectRetellBtn.addEventListener('click', async () => {
    // Check if already connected
    if (isCallActive) {
        // Disconnect
        disconnectRetellAgent();
    } else {
        // Connect
        await connectRetellAgent();
    }
});

/**
 * Connect to the Retell AI voice agent using Retell Web SDK
 */
async function connectRetellAgent() {
    try {
        // Update UI to "Connecting" state
        updateConnectionStatus('connecting', 'Requesting microphone...');
        connectRetellBtn.textContent = 'Connecting...';
        connectRetellBtn.disabled = true;
        
        // Check if Retell Web Client SDK is loaded
        if (typeof RetellWebClient === 'undefined') {
            console.error('Retell Web SDK not loaded');
            alert('Voice agent SDK not loaded. Please refresh the page and try again.');
            updateConnectionStatus('disconnected', 'Disconnected');
            connectRetellBtn.textContent = 'Connect to AI Agent';
            connectRetellBtn.disabled = false;
            return;
        }
        
        // Call our serverless function to create a web call session
        updateConnectionStatus('connecting', 'Connecting to agent...');
        
        const response = await fetch('/.netlify/functions/create-retell-call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create call session');
        }
        
        const { accessToken } = await response.json();
        
        // Initialize Retell Web Client
        retellWebClient = new RetellWebClient();
        
        // Set up event listeners for the call
        retellWebClient.on('call_started', () => {
            console.log('Call started');
            isCallActive = true;
            updateConnectionStatus('connected', 'Connected - Listening');
            connectRetellBtn.textContent = 'Disconnect';
            connectRetellBtn.disabled = false;
            micIcon.classList.add('active');
            transcriptArea.classList.remove('hidden');
            addTranscriptMessage('agent', 'Hello! I\'m the 5 Star Imports AI assistant. How can I help you today?');
        });
        
        retellWebClient.on('call_ended', () => {
            console.log('Call ended');
            disconnectRetellAgent();
        });
        
        retellWebClient.on('agent_start_talking', () => {
            console.log('Agent started talking');
            updateConnectionStatus('connected', 'Agent speaking...');
        });
        
        retellWebClient.on('agent_stop_talking', () => {
            console.log('Agent stopped talking');
            updateConnectionStatus('connected', 'Connected - Listening');
        });
        
        retellWebClient.on('update', (update) => {
            // Handle transcript updates
            if (update.transcript) {
                const transcriptArray = update.transcript;
                // Clear existing transcript and rebuild
                transcript.innerHTML = '';
                transcriptArray.forEach(item => {
                    addTranscriptMessage(item.role === 'agent' ? 'agent' : 'user', item.content);
                });
            }
        });
        
        retellWebClient.on('error', (error) => {
            console.error('Retell error:', error);
            alert('Voice agent error: ' + error.message);
            disconnectRetellAgent();
        });
        
        // Start the call with the access token
        await retellWebClient.startCall({
            accessToken: accessToken
        });
        
    } catch (error) {
        console.error('Error connecting to Retell agent:', error);
        alert('Failed to connect to AI agent: ' + error.message);
        updateConnectionStatus('disconnected', 'Disconnected');
        connectRetellBtn.textContent = 'Connect to AI Agent';
        connectRetellBtn.disabled = false;
        isCallActive = false;
    }
}

/**
 * Disconnect from the Retell AI voice agent
 */
function disconnectRetellAgent() {
    // Stop the Retell call
    if (retellWebClient) {
        try {
            retellWebClient.stopCall();
        } catch (error) {
            console.error('Error stopping call:', error);
        }
        retellWebClient = null;
    }
    
    // Update state
    isCallActive = false;
    
    // Update UI to "Disconnected" state
    updateConnectionStatus('disconnected', 'Disconnected');
    connectRetellBtn.textContent = 'Connect to AI Agent';
    connectRetellBtn.disabled = false;
    micIcon.classList.remove('active'); // Stop pulse animation
}

/**
 * Update the connection status indicator
 * @param {string} status - Status: 'connected', 'connecting', or 'disconnected'
 * @param {string} text - Text to display
 */
function updateConnectionStatus(status, text) {
    // Remove all status classes
    connectionStatus.classList.remove('status-connected', 'status-connecting', 'status-disconnected');
    
    // Add the appropriate status class
    connectionStatus.classList.add(`status-${status}`);
    
    // Update status text
    statusText.textContent = text;
}


/**
 * Add a message to the conversation transcript
 * @param {string} speaker - 'user' or 'agent'
 * @param {string} text - Message text
 */
function addTranscriptMessage(speaker, text) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `transcript-message ${speaker}`;
    
    // Create label (User: or Agent:)
    const labelDiv = document.createElement('div');
    labelDiv.className = 'message-label';
    labelDiv.textContent = speaker === 'user' ? 'Customer:' : 'AI Agent:';
    
    // Create text content
    const textDiv = document.createElement('div');
    textDiv.textContent = text;
    
    // Append to message
    messageDiv.appendChild(labelDiv);
    messageDiv.appendChild(textDiv);
    
    // Append to transcript
    transcript.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    transcript.scrollTop = transcript.scrollHeight;
}


// ===================================
// SMOOTH SCROLL ENHANCEMENT
// Additional smooth scroll for better UX
// ===================================

// Add smooth scroll behavior to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// INITIALIZATION COMPLETE
// ===================================

console.log('5 Star Imports Strategic Blueprint - JavaScript Initialized');
console.log('Remember to configure API keys in script.js for full functionality.');

