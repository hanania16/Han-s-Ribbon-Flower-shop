// Animation and utility functions
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    });

    // --- Custom Design Modal Logic ---
    const designModal = document.getElementById('design-modal');
    const openModalBtns = document.querySelectorAll('#open-design-modal, #open-design-modal-mobile, #open-design-modal-gallery');
    const closeModalBtn = document.getElementById('close-design-modal');
    const quantityInput = document.getElementById('flower-quantity');
    const addonsCheckboxes = document.querySelectorAll('#addons-selection input[type="checkbox"]');
    const colorSwatches = document.querySelectorAll('.color-swatch');

    const BASE_PRICE_PER_FLOWER = 3.00; // Simplified base price for calculation

    const updatePrice = () => {
        const quantity = parseInt(quantityInput.value) || 0;
        let addonsCost = 0;
        
        addonsCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                addonsCost += parseFloat(checkbox.getAttribute('data-price')) || 0;
            }
        });

        const basePrice = quantity * BASE_PRICE_PER_FLOWER;
        const grandTotal = basePrice + addonsCost;
        const halfPayment = grandTotal / 2;

        document.getElementById('base-price').innerText = `$${basePrice.toFixed(2)}`;
        document.getElementById('addons-cost').innerText = `$${addonsCost.toFixed(2)}`;
        document.getElementById('grand-total').innerText = `$${grandTotal.toFixed(2)}`;
        document.getElementById('half-payment').innerText = `$${halfPayment.toFixed(2)}`;
    };

    // Event Listeners for price calculation
    quantityInput.addEventListener('input', updatePrice);
    addonsCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updatePrice));
    
    // Initialize price calculation on load
    updatePrice();

    // Color Swatch Selection Logic
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('selected'));
            swatch.classList.add('selected');
            // In a real app, you would update a visual flower preview here.
            // console.log('Selected Color:', swatch.getAttribute('data-color'));
        });
    });

    // Modal Open/Close handlers
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            designModal.classList.remove('hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                 mobileMenu.classList.add('hidden'); // Close mobile menu if open
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        designModal.classList.add('hidden');
    });
    
    // Close modal when clicking outside
    designModal.addEventListener('click', (e) => {
        if (e.target === designModal) {
            designModal.classList.add('hidden');
        }
    });

    // --- Occasion Filtering Logic (Shop) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button styling
            filterButtons.forEach(btn => {
                 btn.classList.remove('bg-primary-pink', 'text-white');
                 btn.classList.add('text-text-dark', 'border', 'border-secondary-pink');
            });
            button.classList.add('bg-primary-pink', 'text-white');
            button.classList.remove('text-text-dark', 'border', 'border-secondary-pink');

            productCards.forEach(card => {
                const occasions = card.getAttribute('data-occasions').split(',');
                if (filter === 'all' || occasions.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // --- Gallery Filtering Logic (Previous Work) ---
    const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button styling
            galleryFilterButtons.forEach(btn => {
                 btn.classList.remove('bg-primary-pink', 'text-white');
                 btn.classList.add('text-text-dark', 'border', 'border-secondary-pink');
            });
            button.classList.add('bg-primary-pink', 'text-white');
            button.classList.remove('text-text-dark', 'border', 'border-secondary-pink');

            galleryItems.forEach(item => {
                const styles = item.getAttribute('data-styles').split(',');
                if (filter === 'all' || styles.includes(filter)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

// --- Gemini API Integration for Bouquet Advisor ---

const API_MODEL = 'gemini-2.5-flash-preview-09-2025';
// The key is provided by the canvas environment automatically if left empty.
const API_KEY = ""; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${API_MODEL}:generateContent?key=${API_KEY}`;

// Elements
const promptInput = document.getElementById('advisor-prompt');
const advisorButton = document.getElementById('advisor-button');
const loadingIndicator = document.getElementById('advisor-loading');
const resultsContainer = document.getElementById('advisor-results');
const recommendationText = document.getElementById('recommendation-text');
const recommendationSources = document.getElementById('recommendation-sources');

/**
 * Helper function to implement exponential backoff for API calls.
 */
async function fetchWithBackoff(url, options, maxRetries = 5) {
    let delay = 1000;
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.status === 429) {
                throw new Error('Rate limit exceeded');
            }
            if (!response.ok) {
                const errorBody = await response.text();
                console.error('API Error Response:', errorBody);
                throw new Error(`API call failed with status: ${response.status}`);
            }
            return response;
        } catch (error) {
            console.warn(`Request failed (attempt ${i + 1}/${maxRetries}). Retrying in ${delay / 1000}s.`, error.message);
            if (i === maxRetries - 1) throw error; // Re-throw on last attempt
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2; // Exponential increase
        }
    }
}

/**
 * Generates a flower recommendation using the Gemini API.
 */
async function fetchGeminiRecommendation(userPrompt) {
    
    const systemInstruction = `
        You are a world-class artisan florist and a helpful assistant for Han's Ribbon Bouquet shop. 
        Your task is to recommend a perfect flower bouquet and suggest a brief, thoughtful card message based on the user's input (occasion, recipient, or sentiment).
        Your response must be structured clearly, addressing both the arrangement and the message. Use search grounding to ensure your recommendations are culturally appropriate, consider flower meanings, and reflect current trends or availability.
        
        Format your response with the sections bolded and separated by a line break:
        **Recommended Arrangement:** [Name and description of the bouquet, including 3-4 specific flowers and their colors/meaning.]
        **Suggested Card Message:** [A brief, heartfelt message (1-2 sentences) for the recipient.]
    `;

    const payload = {
        contents: [{ 
            parts: [{ text: userPrompt }] 
        }],
        tools: [{ "google_search": {} }],
        systemInstruction: {
            parts: [{ text: systemInstruction }]
        },
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetchWithBackoff(API_URL, options);
        const result = await response.json();
        
        const candidate = result.candidates?.[0];

        if (!candidate || !candidate.content?.parts?.[0]?.text) {
             // Throw an error if the model returned nothing useful
             throw new Error("Received an empty or malformed response from the model.");
        }

        const text = candidate.content.parts[0].text;
        let sources = [];
        const groundingMetadata = candidate.groundingMetadata;

        if (groundingMetadata && groundingMetadata.groundingAttributions) {
            sources = groundingMetadata.groundingAttributions
                .map(attribution => ({
                    uri: attribution.web?.uri,
                    title: attribution.web?.title,
                }))
                .filter(source => source.uri && source.title);
        }
        
        return { text, sources };

    } catch (error) {
        console.error("Gemini API Request Failed:", error);
        // Return a user-friendly error message
        return { text: "I apologize, but I couldn't generate a personalized recommendation right now. Please try again later or contact our support.", sources: [] };
    }
}

/**
 * Main handler for the Bouquet Advisor button click.
 */
async function recommendBouquet() {
    const prompt = promptInput.value.trim();
    if (prompt.length < 5) {
        // Display error message to user
        recommendationText.innerHTML = '<p class="text-red-500 font-semibold">Please enter a few more details about the occasion!</p>';
        resultsContainer.classList.remove('hidden');
        recommendationSources.innerHTML = '';
        return;
    }

    // Show loading state
    advisorButton.disabled = true;
    loadingIndicator.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    recommendationText.innerHTML = '';
    recommendationSources.innerHTML = '';

    const { text, sources } = await fetchGeminiRecommendation(prompt);

    // Hide loading state and show results
    advisorButton.disabled = false;
    loadingIndicator.classList.add('hidden');
    
    // Display the recommendation text
    // Simple markdown conversion for bolding and newlines
    recommendationText.innerHTML = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    
    resultsContainer.classList.remove('hidden');

    // Display sources if available
    if (sources.length > 0) {
        let sourcesHtml = '<strong>Sources:</strong> ';
        sources.forEach((source, index) => {
            sourcesHtml += `<a href="${source.uri}" target="_blank" class="text-primary-pink hover:text-rose-700 underline">${source.title}</a>${index < sources.length - 1 ? ', ' : ''}`;
        });
        recommendationSources.innerHTML = sourcesHtml;
    } else {
         recommendationSources.innerHTML = 'No external search sources were cited for this recommendation.';
    }
}